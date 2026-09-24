/* IndexedDB keeps uploaded photos separate from the small existing text settings. */
(() => {
  const model = window.TWIY_BLOG;
  let opening;
  function database() {
    return opening ||= new Promise((resolve,reject)=>{
      const request = indexedDB.open('twiy-blog-v1',1);
      request.onupgradeneeded = () => { request.result.createObjectStore('posts',{keyPath:'id'}); request.result.createObjectStore('images',{keyPath:'id'}); };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => { opening = null; reject(new Error('ブログの保存領域を開けません。ブラウザーの保存設定をご確認ください。')); };
      request.onblocked = () => reject(new Error('ほかのブログ画面を閉じ、再度お試しください。'));
    });
  }
  const result = request => new Promise((resolve,reject)=>{ request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error); });
  async function transaction(mode, callback) {
    const db = await database(), tx = db.transaction(['posts','images'],mode);
    const done = new Promise((resolve,reject)=>{ tx.oncomplete=resolve; tx.onabort=()=>reject(tx.error || new Error('保存できませんでした。')); tx.onerror=()=>{}; });
    // Attach immediately: a failed request must not become an unhandled rejection.
    void done.catch(()=>{});
    try { const value = await callback(tx.objectStore('posts'),tx.objectStore('images')); await done; return value; }
    catch(error) { try{tx.abort();}catch{} await done.catch(()=>{}); if (error.name === 'QuotaExceededError') throw new Error('保存容量が不足しています。記事をバックアップし、写真の枚数や容量を見直してください。'); throw error; }
  }
  async function handle(action, data = {}) {
    return transaction(action === 'blog-save' || action === 'blog-trash' ? 'readwrite' : 'readonly', async (posts,images)=>{
      if (action === 'blog-list') return model.list(await result(posts.getAll()),data.options,data.admin);
      if (action === 'blog-post') {
        const post = await result(posts.get(data.id));
        if (!post || (!data.admin && post.status !== 'published')) throw model.error('記事が見つかりません。',404);
        return post;
      }
      if (action === 'blog-image') {
        if (!data.admin && !(await result(posts.getAll())).some(p=>p.status === 'published' && model.imageIds(p).includes(data.id))) throw model.error('画像が見つかりません。',404);
        const image = await result(images.get(data.id)); if (!image) throw model.error('画像が見つかりません。',404);
        return data.full ? image : {dataUrl:data.size === 'thumb' ? image.thumbnail : image.dataUrl};
      }
      if (action === 'blog-save') {
        const id = data.post?.id;
        const [existing,keys] = await Promise.all([result(posts.get(id)),result(images.getAllKeys())]);
        const checked = model.prepareSave(data,existing,keys);
        checked.images.forEach(image=>images.put(image)); posts.put(checked.post);
        return {ok:true,post:checked.post};
      }
      if (action === 'blog-trash') {
        const post = await result(posts.get(data.id)); if (!post) throw model.error('記事が見つかりません。',404);
        if (post.revision !== data.revision) throw model.error('記事が更新されています。一覧を更新してください。',409);
        post.status = data.restore ? 'draft' : 'trash'; post.revision++; post.updatedAt = new Date().toISOString(); posts.put(post); return {ok:true,post};
      }
      throw model.error('対応していない操作です。');
    });
  }
  window.TWIY_BLOG_STORE = {handle};
})();
