/* One canonical file URL shares the same storage between file:// pages. Demo only. */
(() => {
  if (location.protocol !== 'file:' || parent === window) return;
  const key = 'twiy-offline-content-v1';
  const model = window.TWIY_CONTENT;
  function read() {
    const raw = localStorage.getItem(key);
    const saved = raw ? JSON.parse(raw) : {};
    return { public: { ...model.publicDefaults, ...saved.public, accepting: false }, articles: { ...model.articles, ...saved.articles } };
  }
  addEventListener('message', async event => {
    const message = event.data;
    if (event.source !== parent || !message || message.type !== 'twiy-demo-request' || typeof message.id !== 'string') return;
    if (message.action?.startsWith('blog-')) {
      try { const result = await window.TWIY_BLOG_STORE.handle(message.action,message.data); parent.postMessage({type:'twiy-demo-response',id:message.id,result},'*'); }
      catch(error) { parent.postMessage({type:'twiy-demo-response',id:message.id,error:error.message,code:error.code},'*'); }
      return;
    }
    try {
      const saved = read();
      if (message.action === 'settings') saved.public = { ...message.data, accepting: false };
      else if (message.action === 'article') {
        if (!Object.hasOwn(model.articles, message.data?.slug)) throw new Error('分野を確認してください。');
        saved.articles[message.data.slug] = model.validateArticle(message.data.article);
      } else if (message.action !== 'get') throw new Error('対応していない操作です。');
      if (message.action !== 'get') localStorage.setItem(key, JSON.stringify(saved));
      parent.postMessage({ type:'twiy-demo-response', id:message.id, result:saved }, '*');
    } catch (error) {
      parent.postMessage({ type:'twiy-demo-response', id:message.id, error: error.name === 'QuotaExceededError' ? 'ブラウザーの保存容量が不足しています。保存できませんでした。' : '保存領域を利用できません。ブラウザーの設定をご確認ください。保存済み内容は削除していません。' }, '*');
    }
  });
})();
