(() => {
  const $=selector=>document.querySelector(selector),model=window.TWIY_CAREER;
  const api=(data)=>window.TWIY_ADMIN.api('/api/admin/career',data);
  let revision=0,photo=null,dirty=false,loaded=false,busy=false,uploading=false,generation=0;
  const status=message=>{$('#career-save-status').textContent=message;};
  const markDirty=()=>{dirty=true;status('保存されていない変更があります。');};
  const lock=()=>{
    $('#career-fields').disabled=!loaded||busy||uploading;
    for(const id of ['career-save','career-preview-button','career-export','career-import'])$('#'+id).disabled=!loaded||busy||uploading;
    $('#career-reload').disabled=busy||uploading;
  };
  window.TWIY_CAREER_EDITOR={isDirty:()=>dirty||uploading||busy,discard:()=>{dirty=false;generation++;}};
  addEventListener('beforeunload',event=>{if(dirty||uploading||busy){event.preventDefault();event.returnValue='';}});
  function rows(){return [...$('#career-entry-fields').children];}
  function updateRows(){rows().forEach((row,i)=>{row.querySelector('h4').textContent=`経歴 ${i+1}`;row.querySelector('[data-move="up"]').disabled=i===0;row.querySelector('[data-move="down"]').disabled=i===rows().length-1;});$('#career-add-entry').disabled=rows().length>=40;}
  function makeField(label,value,max,multiline=false){
    const wrap=document.createElement('div'),caption=document.createElement('label'),input=document.createElement(multiline?'textarea':'input');
    wrap.className='field';input.id='career-field-'+crypto.randomUUID();input.maxLength=max;input.value=value;caption.htmlFor=input.id;caption.textContent=label;
    if(multiline){input.rows=3;input.required=true;}wrap.append(caption,input);return wrap;
  }
  function addEntry(entry={period:'',detail:''}){
    const row=document.createElement('section');row.className='career-editor-row';const heading=document.createElement('h4');row.append(heading);
    const toolbar=document.createElement('div');toolbar.className='career-row-toolbar';
    for(const [action,label]of [['up','上へ'],['down','下へ'],['remove','削除']]){
      const button=document.createElement('button');button.type='button';button.className='outline-button';button.dataset.move=action;button.textContent=label;
      button.addEventListener('click',()=>{
        if(action==='remove'){
          if(row.querySelector('textarea').value.trim()&&!confirm('この経歴項目を削除しますか？保存するまでは掲載内容に影響しません。'))return;
          row.remove();$('#career-add-entry').focus();
        }else if(action==='up'&&row.previousElementSibling)row.parentNode.insertBefore(row,row.previousElementSibling);
        else if(action==='down'&&row.nextElementSibling)row.parentNode.insertBefore(row.nextElementSibling,row);
        updateRows();markDirty();
      });toolbar.append(button);
    }
    row.append(toolbar,makeField('年月・期間（任意）',entry.period,60),makeField('経歴の内容（必須）',entry.detail,2000,true));$('#career-entry-fields').append(row);updateRows();return row;
  }
  function showPhoto(){
    $('#career-photo-details').hidden=!photo;$('#career-photo-alt').required=!!photo;$('#career-photo-alt').value=photo?.alt||'';
    if(photo)$('#career-photo-preview').src=photo.dataUrl;else $('#career-photo-preview').removeAttribute('src');
    $('#career-photo-file').value='';
  }
  function populate(profile){
    revision=profile.revision;photo=profile.photo?{...profile.photo}:null;
    for(const key of ['name','role','introduction'])$('#career-'+key).value=profile[key];
    $('#career-entry-fields').replaceChildren();profile.entries.forEach(addEntry);updateRows();showPhoto();dirty=false;
  }
  function read(){return model.validate({name:$('#career-name').value,role:$('#career-role').value,introduction:$('#career-introduction').value,entries:rows().map(row=>({period:row.querySelector('input').value,detail:row.querySelector('textarea').value})),photo:photo?{dataUrl:photo.dataUrl,alt:$('#career-photo-alt').value}:null});}
  async function load(){
    const run=++generation;busy=true;loaded=false;lock();status('経歴を読み込んでいます…');
    try{const saved=await api();if(run!==generation)return;populate({...model.validate(saved),revision:saved.revision});loaded=true;status('保存済みの経歴を読み込みました。');}
    catch(error){if(run===generation)status(error.message+' 「保存済みを読み直す」から再試行できます。');}
    finally{if(run===generation){busy=false;lock();}}
  }
  document.addEventListener('twiy-admin-ready',()=>void load());
  $('#career-form').addEventListener('input',event=>{if(event.target.type!=='file')markDirty();});
  $('#career-add-entry').addEventListener('click',()=>{if(rows().length>=40)return;const row=addEntry();markDirty();row.querySelector('input').focus();});
  $('#career-remove-photo').addEventListener('click',()=>{photo=null;generation++;showPhoto();markDirty();});
  $('#career-reload').addEventListener('click',()=>{if(dirty&&!confirm('保存されていない変更を破棄して、保存済みの経歴を読み直しますか？'))return;void load();});
  $('#career-form').addEventListener('submit',async event=>{
    event.preventDefault();if(!loaded||busy||uploading)return;
    try{const profile=read();busy=true;lock();status('経歴と写真を保存しています…');const result=await api({profile,revision});populate(result.profile);status(window.TWIY_DATA.offline?'保存しました。同じブラウザーで経歴ページを開き直すと反映されます。外部には公開されません。':'保存しました。経歴ページで確認できます。');}
    catch(error){status(error.message);}
    finally{busy=false;lock();}
  });
  $('#career-preview-button').addEventListener('click',()=>{try{window.TWIY_CAREER_VIEW.render($('#career-preview-body'),read());$('#career-preview').showModal();}catch(error){status(error.message);}});
  $('#career-close-preview').addEventListener('click',()=>$('#career-preview').close());
  async function compress(file){
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>15*1024*1024)throw new Error('15MB以内のJPEG・PNG・WebPを選んでください。');
    const bitmap=await createImageBitmap(file);
    try{
      if(bitmap.width*bitmap.height>50000000)throw new Error('写真の解像度が大きすぎます。縮小してから選択してください。');
      const scale=Math.min(1,1600/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));
      const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);
      for(const quality of [.86,.7,.54,.38]){const dataUrl=canvas.toDataURL('image/jpeg',quality);if(dataUrl.length<=900000)return dataUrl;}
      throw new Error('写真の容量が大きすぎます。小さな画像にして選択し直してください。');
    }finally{bitmap.close();}
  }
  $('#career-photo-file').addEventListener('change',async event=>{
    const file=event.target.files?.[0];if(!file||busy||uploading||!loaded)return;
    const run=++generation;uploading=true;lock();status('写真を表示用に縮小しています…');
    try{const dataUrl=await compress(file);if(run!==generation)return;photo={dataUrl,alt:($('#career-name').value.trim()||'プロフィール')+'の写真'};showPhoto();markDirty();}
    catch(error){if(run===generation)status(error.message||'写真を読み込めませんでした。別の写真を選択してください。');}
    finally{uploading=false;event.target.value='';lock();}
  });
  $('#career-export').addEventListener('click',()=>{
    try{const data={format:'twiy-career-v1',exportedAt:new Date().toISOString(),profile:read()};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='TWIY-career-backup.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#career-backup-status').textContent='現在の編集内容を写真付きで書き出しました。';}
    catch(error){$('#career-backup-status').textContent=error.message;}
  });
  $('#career-import').addEventListener('click',()=>$('#career-import-file').click());
  $('#career-import-file').addEventListener('change',async event=>{
    const file=event.target.files?.[0];if(!file||!loaded||busy||uploading)return;
    if(dirty&&!confirm('現在の未保存の内容を、バックアップの内容に置き換えますか？')){event.target.value='';return;}
    busy=true;lock();
    try{if(file.size>1500000)throw new Error('バックアップの容量が大きすぎます。');const data=JSON.parse(await file.text());if(data.format!=='twiy-career-v1')throw new Error('経歴用のバックアップを選択してください。');const profile=model.validate(data.profile);populate({...profile,revision});markDirty();$('#career-backup-status').textContent='編集欄に読み込みました。確認後、「保存して反映」を押してください。';}
    catch(error){$('#career-backup-status').textContent='読み込めませんでした。'+error.message;}
    finally{busy=false;event.target.value='';lock();}
  });
})();
