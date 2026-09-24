import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, createHash, scrypt, timingSafeEqual, createCipheriv, createDecipheriv } from 'node:crypto';
import { promisify } from 'node:util';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import './content-model.js';
import { createBlogStore } from './blog-server.mjs';

const contentModel = globalThis.TWIY_CONTENT;

const root = dirname(fileURLToPath(import.meta.url));
// Local preview of the explicitly linked current school site; never serve its archive or workspace files.
const schoolRoot = join(root, '..', 'TWIY BRAND HP', 'site', '01_current');
const schoolFiles = new Set([
  'index.html','brand.html','voice.html','checkout.html','collection.html','blog.html','blog-post.html','brand-admin.html','brand-store.html',
  ...['logo.png','logo1.png','logo2.png','sns1-sp.png','sns1.png','sns2-sp.png','sns2.png','sns3-sp.png','sns3.png','top-sp.png','top.png','tshirt-black-back.webp','tshirt-white-back.webp','tshirt-white-front.webp'].map(name => `assets/images/${name}`),
  ...['checkout.js','index.js','jquery-3.5.1.min.js','brand-model.js','brand-storage.js','brand-data.js','brand-view.js','brand-admin.js'].map(name => `assets/js/${name}`),
  ...['brand.css','checkout.css','home-background.css','related-sites.css','style.css','voice-page.css','brand-pages.css','brand-admin.css'].map(name => `assets/stylesheets/${name}`)
]);
const derive = promisify(scrypt);
const token = () => randomBytes(32).toString('hex');
const digest = (value) => createHash('sha256').update(value).digest('hex');
const categories = ['民事・家事事件', '刑事事件', '事業者向け法務', '予防法務・顧問業務', 'その他のお問い合わせ'];
const emailValid = (v) => typeof v === 'string' && v.length <= 254 && /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(v);
const defaults = { fees: ['料金確定後に掲載', '個別にお見積り', '個別にお見積り', '内容により異なります', '料金確定後に掲載'], feeNotice: '具体的な料金・算定基準は、確定後にこちらでご案内します。ご依頼の内容や手続によって費用が異なるため、個別のお見積りをご確認ください。', address: '', station: '', hours: '9:00 - 18:00', mapUrl: '', accessNotice: '現在は開業準備中のため、来所の受付は開始していません。地図、最寄り駅からの経路、ご予約方法は準備が整い次第お知らせします。', accepting: false };
const blankMail = { recipient: '', host: '', port: 465, secure: true, user: '', password: '', from: '' };

export function createApp({ dataDir = join(root, '.data'), publicOrigin = process.env.PUBLIC_ORIGIN || '', mailTransport } = {}) {
  mkdirSync(dataDir, { recursive: true, mode: 0o700 });
  const keyPath = join(dataDir, 'mail-key');
  if (!existsSync(keyPath)) writeFileSync(keyPath, randomBytes(32), { mode: 0o600 });
  const key = readFileSync(keyPath);
  const encrypt = (value) => { const iv = randomBytes(12); const cipher = createCipheriv('aes-256-gcm', key, iv); return Buffer.concat([iv, cipher.update(value, 'utf8'), cipher.final(), cipher.getAuthTag()]).toString('base64'); };
  const decrypt = (value) => { if (!value) return ''; const buf = Buffer.from(value, 'base64'); const cipher = createDecipheriv('aes-256-gcm', key, buf.subarray(0, 12)); cipher.setAuthTag(buf.subarray(-16)); return Buffer.concat([cipher.update(buf.subarray(12, -16)), cipher.final()]).toString('utf8'); };
  const db = new DatabaseSync(join(dataDir, 'site.sqlite'));
  const blog = createBlogStore(db);
  db.exec('PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS config (id TEXT PRIMARY KEY, value TEXT NOT NULL); CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, csrf TEXT NOT NULL, expires INTEGER NOT NULL); CREATE TABLE IF NOT EXISTS inquiries (id INTEGER PRIMARY KEY AUTOINCREMENT, created TEXT NOT NULL, body TEXT NOT NULL, is_read INTEGER NOT NULL DEFAULT 0, mail_status TEXT NOT NULL DEFAULT \'未設定\');');
  const get = (id, fallback) => { const row = db.prepare('SELECT value FROM config WHERE id=?').get(id); return row ? JSON.parse(row.value) : fallback; };
  const set = (id, value) => db.prepare('INSERT INTO config VALUES (?,?) ON CONFLICT(id) DO UPDATE SET value=excluded.value').run(id, JSON.stringify(value));
  const bootstrapToken = get('admin', null) ? null : token();
  const limits = new Map();
  const rate = (req, scope, max) => { const now = Date.now(); const id = `${scope}:${req.socket.remoteAddress}`; for (const [k,v] of limits) if (v.until < now) limits.delete(k); const item = limits.get(id) || { count: 0, until: now + 15 * 60000 }; item.count++; limits.set(id, item); return item.count <= max; };
  const passwordHash = async (password, salt = token()) => ({ salt, hash: (await derive(password, salt, 64)).toString('hex') });
  const verify = async (password, admin) => { if (!admin || typeof password !== 'string' || password.length > 1024) return false; return timingSafeEqual(await derive(password, admin.salt, 64), Buffer.from(admin.hash, 'hex')); };
  const json = (res, code, data) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
  const fail = (code, message) => Object.assign(new Error(message), { code });
  const body = async (req, maxBytes = 32768) => { if (!(req.headers['content-type'] || '').startsWith('application/json')) throw fail(415, 'JSON形式で送信してください。'); const chunks = []; let size = 0; for await (const chunk of req) { size += chunk.length; if (size > maxBytes) throw fail(413, '入力内容が長すぎます。'); chunks.push(chunk); } try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw fail(400, '入力を確認してください。'); } };
  const session = (req) => { const sid = /(?:^|;\s*)twiy_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie || '')?.[1]; if (!sid) return null; return db.prepare('SELECT * FROM sessions WHERE id=? AND expires>?').get(digest(sid), Date.now()); };
  const login = (res) => { const sid = token(); const csrf = token(); db.prepare('DELETE FROM sessions WHERE expires<?').run(Date.now()); db.prepare('INSERT INTO sessions VALUES (?,?,?)').run(digest(sid), csrf, Date.now() + 8 * 3600000); res.setHeader('Set-Cookie', `twiy_session=${sid}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${publicOrigin.startsWith('https:') ? '; Secure' : ''}`); return csrf; };
  const staticFiles = new Set(['index.html','fees.html','access.html','contact.html','admin.html','styles.css','script.js','contact.js','site-content.js','admin.js','favicon.svg','assets/images/themis-statue.png','content-model.js','site-data.js','practice-view.js','practice.js','article-editor.js','practice-civil.html','practice-criminal.html','practice-business.html','practice-advisory.html']);
  for (const file of ['blog.html','blog-post.html','blog-model.js','blog-view.js','blog.js','blog-admin.js','blog.css']) staticFiles.add(file);
  const server = http.createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('Referrer-Policy', 'same-origin'); res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'");
    try {
      const origin = publicOrigin || `http://${req.headers.host}`;
      if (!publicOrigin && !/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(req.headers.host || '')) throw fail(403, 'ホストが許可されていません。');
      let path;
      try { path = decodeURIComponent(new URL(req.url, origin).pathname); } catch { throw fail(400, 'URLを確認してください。'); }
      if (path.startsWith('/api/')) {
        if (!['GET','POST'].includes(req.method)) throw fail(405, '対応していない操作です。');
        if (req.method === 'POST' && req.headers.origin !== origin) throw fail(403, 'ページを再読み込みしてください。');
        if (path === '/api/public' && req.method === 'GET') return json(res, 200, get('public', defaults));
        if (path === '/api/articles' && req.method === 'GET') return json(res, 200, { ...contentModel.articles, ...get('articles', {}) });
        if (/^\/api\/blog(?:\/|$)/.test(path)) return json(res,200,blog(path,req.method,new URL(req.url,origin).searchParams,null,false));
        if (path === '/api/admin/session' && req.method === 'GET') { const user = session(req); return json(res, 200, { authenticated: !!user, needsSetup: !get('admin', null), csrf: user?.csrf }); }
        if (['/api/admin/setup','/api/admin/login'].includes(path) && req.method === 'POST') {
          if (!rate(req, 'login', 12)) throw fail(429, 'しばらく時間をおいてからお試しください。');
          const input = await body(req);
          if (path.endsWith('/setup')) {
            if (get('admin', null) || !bootstrapToken || typeof input.token !== 'string' || digest(input.token) !== digest(bootstrapToken)) throw fail(403, '初期設定キーを確認してください。');
            if (typeof input.password !== 'string' || input.password.length < 14 || input.password.length > 256) throw fail(400, 'パスワードは14〜256文字にしてください。');
            const hashed = await passwordHash(input.password);
            if (get('admin', null)) throw fail(409, '初期設定は完了しています。');
            set('admin', hashed);
          } else if (!await verify(input.password, get('admin', null))) throw fail(401, 'パスワードを確認してください。');
          return json(res, 200, { ok: true, csrf: login(res) });
        }
        if (path.startsWith('/api/admin/')) {
          const user = session(req); if (!user) throw fail(401, 'ログインしてください。');
          if (req.method === 'POST' && req.headers['x-csrf-token'] !== user.csrf) throw fail(403, '再度ログインしてください。');
          if (/^\/api\/admin\/blog(?:\/|$)/.test(path)) return json(res,200,blog(path,req.method,new URL(req.url,origin).searchParams,req.method === 'POST' ? await body(req,12000000) : null,true));
          if (path === '/api/admin/logout' && req.method === 'POST') { db.prepare('DELETE FROM sessions WHERE id=?').run(user.id); res.setHeader('Set-Cookie', 'twiy_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0'); return json(res, 200, { ok: true }); }
          if (path === '/api/admin/articles' && req.method === 'POST') {
            const input = await body(req);
            if (!Object.hasOwn(contentModel.articles, input?.slug)) throw fail(400, '分野を確認してください。');
            let article;
            try { article = contentModel.validateArticle(input.article); } catch (error) { throw fail(400, error.message); }
            set('articles', { ...get('articles', {}), [input.slug]: article });
            return json(res, 200, { ok:true });
          }
          if (path === '/api/admin/settings' && req.method === 'GET') { const mail = get('mail', blankMail); return json(res, 200, { public: get('public', defaults), mail: { ...mail, password: '', passwordConfigured: !!mail.password } }); }
          if (path === '/api/admin/settings' && req.method === 'POST') {
            const input = await body(req); const p = input.public; const m = input.mail;
            if (!p || !m || !Array.isArray(p.fees) || p.fees.length !== 5 || p.fees.some(v => typeof v !== 'string' || !v.trim() || v.length > 300)) throw fail(400, '料金欄を確認してください。');
            const result = { accepting: p.accepting === true, fees: p.fees.map(v=>v.trim()) };
            for (const field of ['feeNotice','address','station','hours','mapUrl','accessNotice']) { if (typeof p[field] !== 'string' || p[field].length > 2000) throw fail(400, '入力内容を確認してください。'); result[field] = p[field].trim(); }
            if (result.mapUrl && !/^https:\/\/(www\.)?(google\.(com|co\.jp)|maps\.app\.goo\.gl)(\/|$)/i.test(result.mapUrl)) throw fail(400, '地図はGoogleマップのHTTPSリンクを入力してください。');
            const mail = { ...blankMail };
            for (const field of ['recipient','host','user','from']) { if (typeof m[field] !== 'string' || m[field].length > 254 || /[\r\n]/.test(m[field])) throw fail(400, 'メール設定を確認してください。'); mail[field] = m[field].trim(); }
            if ((mail.recipient && !emailValid(mail.recipient)) || (mail.from && !emailValid(mail.from))) throw fail(400, 'メールアドレスを確認してください。');
            mail.port = Number(m.port); if (![465,587].includes(mail.port)) throw fail(400, 'SMTPポートは465か587を指定してください。'); mail.secure = mail.port === 465;
            if (m.password && (typeof m.password !== 'string' || m.password.length > 1024)) throw fail(400, 'SMTPパスワードを確認してください。');
            mail.password = m.clearPassword ? '' : m.password ? encrypt(m.password) : get('mail', blankMail).password;
            db.exec('BEGIN'); try { set('public', result); set('mail', mail); db.exec('COMMIT'); } catch (e) { db.exec('ROLLBACK'); throw e; }
            return json(res, 200, { ok: true });
          }
          if (path === '/api/admin/inquiries' && req.method === 'GET') return json(res, 200, db.prepare('SELECT * FROM inquiries ORDER BY id DESC LIMIT 100').all().map(row=>({ ...row, body: JSON.parse(row.body) })));
          if (path === '/api/admin/read' && req.method === 'POST') { const input = await body(req); if (!Number.isInteger(input.id)) throw fail(400, '番号を確認してください。'); db.prepare('UPDATE inquiries SET is_read=1 WHERE id=?').run(input.id); return json(res, 200, { ok: true }); }
          throw fail(404, 'ページが見つかりません。');
        }
        if (path === '/api/contact' && req.method === 'POST') {
          if (!get('public', defaults).accepting) throw fail(503, '現在は受付準備中です。');
          if (!rate(req, 'contact', 5)) throw fail(429, '時間をおいて再度お試しください。');
          const input = await body(req); const data = {};
          for (const [field, max] of Object.entries({name:100,kana:100,email:254,phone:30,category:100,message:5000})) { if (typeof input[field] !== 'string' || input[field].length > max) throw fail(400, '入力内容を確認してください。'); data[field] = input[field].trim(); }
          if (!data.name || !data.message || !emailValid(data.email) || !categories.includes(data.category) || input.consent !== 'agreed' || input.website) throw fail(400, '必須項目・同意欄をご確認ください。');
          const record = db.prepare('INSERT INTO inquiries (created,body) VALUES (?,?)').run(new Date().toISOString(), JSON.stringify(data));
          const id = Number(record.lastInsertRowid); const mail = get('mail', blankMail);
          const ready = !!(mail.host && mail.from && mail.recipient && mail.user && mail.password);
          if (ready) {
            db.prepare('UPDATE inquiries SET mail_status=? WHERE id=?').run('通知処理中', id);
            // Acceptance is durable in SQLite. Email failure must never discard an inquiry.
            void (async () => {
              let transport;
              try {
                transport = mailTransport || nodemailer.createTransport({ host: mail.host, port: mail.port, secure: mail.secure, requireTLS: !mail.secure, auth: { user: mail.user, pass: decrypt(mail.password) }, connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000 });
                await transport.sendMail({ from: mail.from, to: mail.recipient, replyTo: data.email, subject: `TWIY お問い合わせ #${id}`, text: Object.entries(data).map(([k,v])=>`${k}: ${v}`).join('\n\n') });
                db.prepare('UPDATE inquiries SET mail_status=? WHERE id=?').run('通知済み', id);
              } catch { try { db.prepare('UPDATE inquiries SET mail_status=? WHERE id=?').run('通知失敗（内容は保存済み）', id); } catch {} }
              finally { transport?.close?.(); }
            })();
          }
          return json(res, 201, { ok: true });
        }
        throw fail(404, 'ページが見つかりません。');
      }
      if (!['GET','HEAD'].includes(req.method)) throw fail(405, '対応していない操作です。');
      const schoolPrefix = '/TWIY BRAND HP/site/01_current/';
      const legalPrefix = '/TWIY LEGAL OFFICE/';
      const isSchool = path.startsWith(schoolPrefix);
      const file = isSchool ? path.slice(schoolPrefix.length) : path.startsWith(legalPrefix) ? path.slice(legalPrefix.length) : path === '/' ? 'index.html' : path.slice(1);
      if (!(isSchool ? schoolFiles : staticFiles).has(file)) throw fail(404, 'ページが見つかりません。');
      const filePath = join(isSchool ? schoolRoot : root, file);
      if (!existsSync(filePath)) throw fail(404, 'ページが見つかりません。');
      if (file === 'admin.html') res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp' }[extname(file)];
      res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'no-cache' }); res.end(req.method === 'HEAD' ? undefined : readFileSync(filePath));
    } catch (e) { if (!res.headersSent) json(res, e.code && Number.isInteger(e.code) ? e.code : 500, { ok: false, error: e.code && Number.isInteger(e.code) ? e.message : '処理できませんでした。時間をおいてお試しください。' }); }
  });
  server.on('close', () => db.close());
  return { server, bootstrapToken };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const app = createApp(); const port = Number(process.env.PORT || 8787);
  app.server.listen(port, process.env.HOST || '127.0.0.1', () => {
    console.log(`TWIY: http://127.0.0.1:${port}`);
    if (app.bootstrapToken) console.log(`初回管理者設定: http://127.0.0.1:${port}/admin.html#setup=${app.bootstrapToken}`);
  });
}
