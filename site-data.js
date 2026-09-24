/* file:// is a password-gated local demo. HTTP always uses the authenticated server. */
(() => {
  const offline = location.protocol === 'file:';
  const model = window.TWIY_CONTENT;
  let frame, frameReady;
  const pending = new Map();
  const sessionKey = 'twiy-offline-admin-v1';
  function storage(action = 'get', data) {
    if (!frameReady) {
      frameReady = new Promise((resolve, reject) => {
        frame = document.createElement('iframe');
        frame.hidden = true; frame.title = 'テスト用の掲載内容保存';
        const timer = setTimeout(() => reject(new Error('保存領域を開けませんでした。ChromeまたはEdgeで、同じフォルダーのHTMLを開いてください。')), 8000);
        frame.addEventListener('load', () => { clearTimeout(timer); resolve(); }, { once:true });
        frame.src = 'demo-store.html'; document.body.append(frame);
      });
      addEventListener('message', event => {
        if (event.source !== frame.contentWindow || event.data?.type !== 'twiy-demo-response') return;
        const item = pending.get(event.data.id);
        if (!item) return;
        clearTimeout(item.timer); pending.delete(event.data.id);
        if (event.data.error) item.reject(Object.assign(new Error(event.data.error),{code:event.data.code})); else item.resolve(event.data.result);
      });
    }
    return frameReady.then(() => new Promise((resolve, reject) => {
      const id = crypto.randomUUID();
      const timer = setTimeout(() => { pending.delete(id); reject(new Error('保存結果を確認できません。ページを開き直して確認してください。')); }, 8000);
      pending.set(id, { resolve, reject, timer });
      frame.contentWindow.postMessage({ type:'twiy-demo-request', id, action, data }, '*');
    }));
  }
  async function request(url, data) {
    if (!offline) {
      const response = await fetch(url, { cache:'no-store' });
      const result = await response.json();
      if (!response.ok) throw Object.assign(new Error(result.error || '読み込めませんでした。'),{code:response.status});
      return result;
    }
    const address = new URL(url, 'http://local.test');
    if (/^\/api\/(admin\/)?blog(?:\/|$)/.test(address.pathname)) {
      const admin = address.pathname.startsWith('/api/admin/');
      if (admin && sessionStorage.getItem(sessionKey) !== 'yes') throw new Error('ログインしてください。');
      const action = address.pathname.replace(/^\/api\/(admin\/)?blog\/?/,'');
      if (!admin && data !== undefined) throw new Error('ログインしてください。');
      if (action === 'save' || action === 'trash') {
        if (!admin || !data) throw new Error('ログインしてください。');
        return storage(`blog-${action}`,data);
      }
      if (action === 'post' || action === 'image') return storage(`blog-${action}`,{id:address.searchParams.get('id'),size:address.searchParams.get('size'),full:admin && address.searchParams.get('full') === 'true',admin});
      if (!action) return storage('blog-list',{options:Object.fromEntries(address.searchParams),admin});
      throw new Error('ページが見つかりません。');
    }
    if (url === '/api/public') return (await storage()).public;
    if (url === '/api/articles') return (await storage()).articles;
    if (url === '/api/admin/session') return { authenticated:sessionStorage.getItem(sessionKey) === 'yes', needsSetup:false };
    if (url === '/api/admin/login') {
      if (data?.password !== 'TWIY') throw new Error('パスワードを確認してください。');
      sessionStorage.setItem(sessionKey, 'yes'); return { ok:true };
    }
    if (sessionStorage.getItem(sessionKey) !== 'yes') throw new Error('ログインしてください。');
    if (url === '/api/admin/logout') { sessionStorage.removeItem(sessionKey); return { ok:true }; }
    if (url === '/api/admin/settings') {
      if (data !== undefined) {
        const p = data.public;
        if (!p || !Array.isArray(p.fees) || p.fees.length !== 5 || p.fees.some(fee => typeof fee !== 'string' || !fee.trim() || fee.length > 300)) throw new Error('料金欄を確認してください。');
        const checked = { fees:p.fees.map(fee => fee.trim()), accepting:false };
        for (const field of ['feeNotice','address','station','hours','mapUrl','accessNotice']) {
          if (typeof p[field] !== 'string' || p[field].length > 2000) throw new Error('入力内容を確認してください。');
          checked[field] = p[field].trim();
        }
        if (checked.mapUrl && !/^https:\/\/(www\.)?(google\.(com|co\.jp)|maps\.app\.goo\.gl)(\/|$)/i.test(checked.mapUrl)) throw new Error('地図はGoogleマップのHTTPSリンクを入力してください。');
        await storage('settings', checked); return { ok:true };
      }
      return { public:(await storage()).public, mail:{recipient:'',host:'',port:465,user:'',from:'',passwordConfigured:false} };
    }
    if (url === '/api/admin/articles' && data) {
      if (!Object.hasOwn(model.articles, data.slug)) throw new Error('分野を確認してください。');
      await storage('article', { slug:data.slug, article:model.validateArticle(data.article) }); return { ok:true };
    }
    if (url === '/api/admin/inquiries') return [];
    throw new Error('テスト版ではこの機能を利用できません。');
  }
  window.TWIY_DATA = { offline, request };
})();
