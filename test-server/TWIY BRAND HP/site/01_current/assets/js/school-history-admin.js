/* School-only local editor. Draft mutations are committed by the existing save flow. */
(() => {
  const model=globalThis.TWIY_SCHOOL_MODEL;
  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  function field(container,item,key,label,max,changed,multiline=false,idPrefix='history') {
    const row=node('div','school-admin-field'),caption=node('label','',label),input=node(multiline?'textarea':'input');
    input.id=idPrefix+'-'+key;caption.htmlFor=input.id;input.value=item[key];input.maxLength=max;
    if(multiline)input.rows=5;else input.type='text';
    input.addEventListener('input',()=>{item[key]=input.value;changed();});row.append(caption,input);container.append(row);
  }
  const button=(text,action)=>{const b=node('button','',text);b.type='button';b.addEventListener('click',action);return b;};
  async function shrinkImage(file) {
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>20*1024*1024)throw Error('20MB以下のJPEG・PNG・WebPを選んでください。');
    const src=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(Error('写真を読み込めませんでした。'));r.readAsDataURL(file);});
    const img=new Image();img.src=src;
    await new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>reject(Error('画像の読み込みがタイムアウトしました。')),15000);
      img.decode().then(()=>{clearTimeout(timer);resolve();},()=>{clearTimeout(timer);reject(Error('画像ファイルとして読み込めませんでした。'));});
    });
    if(!img.naturalWidth||img.naturalWidth*img.naturalHeight>40000000)throw Error('写真の画素数が大きすぎます。4000万画素以下に縮小してください。');
    const ratio=Math.min(1,1600/Math.max(img.naturalWidth,img.naturalHeight)),canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.round(img.naturalWidth*ratio));canvas.height=Math.max(1,Math.round(img.naturalHeight*ratio));
    const ctx=canvas.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
    for(const quality of [.86,.72,.56]){const data=canvas.toDataURL('image/jpeg',quality);if(data.length<=1600000)return model.historyPhoto(data);}
    throw Error('写真の容量が大きすぎます。小さな画像を選んでください。');
  }
  function photoFields(container,item,api,prefix) {
    const wrap=node('div','school-history-photo-editor'),label=node('label','','写真（任意・1枚）'),input=node('input');
    input.type='file';input.accept='image/jpeg,image/png,image/webp';input.id=prefix+'-photo';label.htmlFor=input.id;
    wrap.append(label,input,node('small','','JPEG・PNG・WebP／選択時20MBまで。長辺1600px以下のJPEGに縮小し、同じブラウザー内に保存します。透明部分は白になります。'));
    if(item.photo) {
      const img=node('img','school-history-photo-preview');img.src=item.photo;img.alt=item.alt||'登録写真のプレビュー';wrap.append(img);
      wrap.append(button('写真を外す',()=>{item.photo='';api.changed();api.render();document.getElementById(prefix+'-photo')?.focus();}));
    }
    input.addEventListener('change',async()=>{
      const file=input.files[0];if(!file)return;api.busy(true);api.message('写真を読み込んでいます…');
      try{item.photo=await shrinkImage(file);api.changed();api.render();api.message('写真を編集内容に追加しました。まだ未保存です。');}
      catch(error){api.message(error.message,true);}finally{api.busy(false);input.value='';document.getElementById(prefix+'-photo')?.focus();}
    });
    field(wrap,item,'alt','写真の説明（読み上げ用）',300,api.changed,false,prefix);
    field(wrap,item,'caption','写真の下に添える文章（任意）',500,api.changed,true,prefix);
    container.append(wrap);
  }
  globalThis.TWIY_SCHOOL_HISTORY_EDITOR=(container,group,api)=>{
    const help=node('p','school-history-edit-help');
    if(group==='沿革・代表挨拶') {
      help.textContent='本文・氏名・写真がすべて未入力のとき、代表挨拶の欄全体を表示しません。見出しや肩書きだけでは表示されません。';container.append(help);
      const g=api.draft.history.greeting;
      for(const [key,label,max,multi] of [['heading','見出し',200,false],['body','挨拶の本文',16000,true],['role','肩書き（任意）',200,false],['name','氏名（任意）',200,false]])field(container,g,key,label,max,api.changed,multi,'history-greeting');
      photoFields(container,g,api,'history-greeting');return true;
    }
    const year=Number(group.replace('沿革 ',''));if(!model.historyYears.includes(year))return false;
    const entries=api.draft.history.years.find(y=>y.year===year).events;
    help.textContent='件数は自由に増減できます（各年20件まで）。表示はこの並び順です。見出し・本文・写真がすべて空の出来事、および出来事がない年は表示しません。時期・写真説明のみでは表示されません。';container.append(help);
    const count=node('p','school-history-edit-count',year+'年：'+entries.length+'件の編集枠');container.append(count);
    entries.forEach((item,index)=>{
      const row=node('fieldset','school-history-edit-event');row.dataset.eventId=item.id;
      row.append(node('legend','',(index+1)+'件目'));
      const prefix='history-'+item.id;
      field(row,item,'date','月・時期（任意／例：4月）',80,api.changed,false,prefix);
      field(row,item,'title','出来事の見出し',200,api.changed,false,prefix);
      field(row,item,'body','出来事の本文（任意）',6000,api.changed,true,prefix);
      photoFields(row,item,api,prefix);
      const actions=node('div','school-admin-actions');
      const move=step=>{
        [entries[index],entries[index+step]]=[entries[index+step],entries[index]];
        api.changed();api.render();document.getElementById(prefix+'-title')?.focus();
      };
      const up=button('上へ',()=>move(-1)),down=button('下へ',()=>move(1));up.disabled=index===0;down.disabled=index===entries.length-1;
      const remove=button('この出来事を削除',()=>{
        if((item.date.trim()||item.title.trim()||item.body.trim()||item.photo||item.alt.trim()||item.caption.trim())&&!confirm('この出来事を編集内容から削除しますか？保存するまでは元の表示は変わりません。'))return;
        entries.splice(index,1);api.changed();api.render();document.getElementById('history-add-event')?.focus();
      });
      actions.append(up,down,remove);row.append(actions);container.append(row);
    });
    const add=button('出来事を追加',()=>{
      if(entries.length>=20)return;const item=model.emptyEvent();entries.push(item);api.changed();api.render();document.getElementById('history-'+item.id+'-title')?.focus();
    });add.id='history-add-event';add.disabled=entries.length>=20;container.append(add);return true;
  };
})();
