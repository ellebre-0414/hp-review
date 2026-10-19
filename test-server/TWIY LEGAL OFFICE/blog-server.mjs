import './blog-model.js';
const model = globalThis.TWIY_BLOG;
export function createBlogStore(db) {
  db.exec('CREATE TABLE IF NOT EXISTS blog_posts (id TEXT PRIMARY KEY, body TEXT NOT NULL); CREATE TABLE IF NOT EXISTS blog_images (id TEXT PRIMARY KEY, body TEXT NOT NULL);');
  const all = () => db.prepare('SELECT body FROM blog_posts').all().map(row=>JSON.parse(row.body));
  const get = id => { const row=db.prepare('SELECT body FROM blog_posts WHERE id=?').get(id); return row ? JSON.parse(row.body) : null; };
  const put = post => db.prepare('INSERT INTO blog_posts VALUES (?,?) ON CONFLICT(id) DO UPDATE SET body=excluded.body').run(post.id,JSON.stringify(post));
  return function route(path, method, query, input, admin = false) {
    const action = path.replace(/^\/api\/(admin\/)?blog\/?/,'');
    if (method === 'GET' && !action) return model.list(all(),Object.fromEntries(query),admin);
    if (method === 'GET' && action === 'post') {
      const post = get(query.get('id') || ''); if (!post || (!admin && post.status !== 'published')) throw model.error('記事が見つかりません。',404); return post;
    }
    if (method === 'GET' && action === 'image') {
      const id=query.get('id') || '';
      if (!admin && !all().some(p=>p.status === 'published' && model.imageIds(p).includes(id))) throw model.error('画像が見つかりません。',404);
      const row=db.prepare('SELECT body FROM blog_images WHERE id=?').get(id); if (!row) throw model.error('画像が見つかりません。',404);
      const image=JSON.parse(row.body); return admin && query.get('full') === 'true' ? image : {dataUrl:query.get('size') === 'thumb' ? image.thumbnail : image.dataUrl};
    }
    if (admin && method === 'POST' && action === 'save') {
      const checked = model.prepareSave(input,get(input?.post?.id || ''),db.prepare('SELECT id FROM blog_images').all().map(row=>row.id));
      db.exec('BEGIN');
      try { for(const image of checked.images) db.prepare('INSERT INTO blog_images VALUES (?,?)').run(image.id,JSON.stringify(image)); put(checked.post); db.exec('COMMIT'); }
      catch(error) { db.exec('ROLLBACK'); throw error; }
      return {ok:true,post:checked.post};
    }
    if (admin && method === 'POST' && action === 'trash') {
      const post=get(input?.id || ''); if (!post) throw model.error('記事が見つかりません。',404);
      if (post.revision !== input.revision) throw model.error('記事が更新されています。一覧を更新してください。',409);
      post.status=input.restore ? 'draft' : 'trash'; post.revision++; post.updatedAt=new Date().toISOString(); put(post); return {ok:true,post};
    }
    throw model.error('ページが見つかりません。',404);
  };
}
