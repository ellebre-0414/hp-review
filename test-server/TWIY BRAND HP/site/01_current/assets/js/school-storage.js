/* Local prototype storage. A server-backed adapter can replace this without changing the content schema. */
(() => {
  const model = globalThis.TWIY_SCHOOL_MODEL;
  let opened;
  function database() {
    if (!opened) opened = new Promise((resolve,reject) => {
      const request = indexedDB.open('twiy-school-local-v1:'+new URL('.',location.href).pathname,1);
      request.onupgradeneeded = () => request.result.createObjectStore('content');
      request.onsuccess = () => { request.result.onversionchange = () => { request.result.close(); opened=null; }; resolve(request.result); };
      request.onerror = () => { opened=null; reject(Error('ブラウザーの保存領域を開けません。ChromeまたはEdgeの通常ウィンドウでお試しください。')); };
      request.onblocked = () => { opened=null; reject(Error('別の管理画面を閉じて、再読み込みしてください。')); };
    });
    return opened;
  }
  async function run(action, payload) {
    const db = await database();
    if (!['read','save'].includes(action)) throw Error('対応していない操作です。');
    const checked = action === 'save' ? model.validate(payload?.data) : null;
    return new Promise((resolve,reject) => {
      const tx = db.transaction('content', action === 'save' ? 'readwrite' : 'readonly');
      const store = tx.objectStore('content');
      let result, failure;
      const request = store.get('active');
      request.onsuccess = () => {
        try {
          const saved = request.result;
          const revision = saved?.revision || 0;
          if (action === 'save') {
            if (payload.revision !== revision) throw Error('別のタブで更新されています。未保存の内容を控えてから、再読み込みしてください。');
            result = {revision:revision+1,data:checked,updatedAt:new Date().toISOString()};
            store.put(result,'active');
          } else result = {revision,data:saved ? model.validate(saved.data) : model.clone(model.defaults),updatedAt:saved?.updatedAt || null};
        } catch(e) { failure=e; tx.abort(); }
      };
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => {};
      tx.onabort = () => reject(failure || Error(tx.error?.name === 'QuotaExceededError' ? '保存容量が不足しています。不要なデータを整理して再度保存してください。保存済みデータは変更していません。' : '保存できませんでした。ブラウザーの設定と空き容量を確認してください。'));
    });
  }
  globalThis.TWIY_SCHOOL_STORAGE = {run};
  if (parent !== window && location.pathname.endsWith('/school-store.html')) {
    addEventListener('message',async event => {
      if (event.source !== parent || event.data?.type !== 'twiy-school-request' || typeof event.data.id !== 'string') return;
      const m = event.data;
      try { const result = await run(m.action,m.payload); parent.postMessage({type:'twiy-school-response',id:m.id,result},'*'); }
      catch(e) { parent.postMessage({type:'twiy-school-response',id:m.id,error:e.message},'*'); }
    });
  }
})();
