(() => {
  const model = globalThis.TWIY_SCHOOL_MODEL;
  const local = location.protocol === 'file:' || ['localhost','127.0.0.1','[::1]'].includes(location.hostname);
  let frame, ready;
  const pending = new Map();
  function bridge(action,payload) {
    if (!ready) {
      ready = new Promise((resolve,reject) => {
        frame = document.createElement('iframe'); frame.hidden=true; frame.title='塾編集データのローカル保存';
        const timer=setTimeout(()=>reject(Error('保存領域を読み込めませんでした。同じフォルダーのHTMLをChromeまたはEdgeで開いてください。')),10000);
        frame.addEventListener('load',()=>{clearTimeout(timer);resolve();},{once:true});
        frame.src='school-store.html'; document.body.append(frame);
      });
      addEventListener('message',event=>{
        if(event.source!==frame.contentWindow || event.data?.type!=='twiy-school-response')return;
        const item=pending.get(event.data.id);if(!item)return;
        clearTimeout(item.timer);pending.delete(event.data.id);
        if(event.data.error)item.reject(Error(event.data.error));else item.resolve(event.data.result);
      });
    }
    return ready.then(()=>new Promise((resolve,reject)=>{
      const id=crypto.randomUUID();
      const timer=setTimeout(()=>{pending.delete(id);reject(Error('保存結果を確認できません。ページを開き直し、内容をご確認ください。'));},10000);
      pending.set(id,{resolve,reject,timer}); frame.contentWindow.postMessage({type:'twiy-school-request',id,action,payload},'*');
    }));
  }
  async function request(action,payload) {
    if(!local) {
      if(action==='read')return {revision:0,data:model.clone(model.defaults)};
      throw Error('この管理画面はPC内のテスト専用です。本番サーバーの認証・共有保存は未接続です。');
    }
    return location.protocol==='file:' ? bridge(action,payload) : globalThis.TWIY_SCHOOL_STORAGE.run(action,payload);
  }
  globalThis.TWIY_SCHOOL_DATA={local,read:()=>request('read'),save:(data,revision)=>request('save',{data:model.validate(data),revision})};
})();
