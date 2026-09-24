(() => {
  const $ = selector => document.querySelector(selector), model = window.TWIY_BLOG, view = window.TWIY_BLOG_VIEW;
  const api = (path,data) => window.TWIY_ADMIN.api(`/api/admin/blog${path}`,data);
  let draft, dirty=false, busy=false, uploads=0, generation=0, listGeneration=0, currentPage=1;
  let images=new Map(), incoming=new Map();
  const status = message => { $('#blog-save-status').textContent=message; };
  const markDirty = () => { dirty=true; status('保存されていない変更があります。'); };
  window.TWIY_BLOG_EDITOR={isDirty:()=>dirty || uploads>0,discard:()=>{dirty=false;uploads=0;generation++;}};
  addEventListener('beforeunload',event=>{if(dirty || uploads>0){event.preventDefault();event.returnValue='';}});
  const localDate = () => { const now=new Date(); return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`; };
  const canLeave = () => !busy && (!(dirty || uploads>0) || confirm('保存されていない変更があります。破棄して移動しますか？'));
  function button(label,callback,cls='outline-button') {const b=document.createElement('button');b.type='button';b.className=cls;b.textContent=label;b.addEventListener('click',callback);return b;}
  function setBusy(value) { busy=value; $('#blog-edit-fields').disabled=value; $('#blog-editor').querySelectorAll('button').forEach(b=>b.disabled=value); }
  function read(statusValue=draft.status) {
    return model.validatePost({...draft,title:$('#blog-title').value,category:$('#blog-category').value,date:$('#blog-date').value,excerpt:$('#blog-excerpt').value,status:statusValue});
  }
  function showEditor(post, photoMap=new Map(), pending=new Map()) {
    generation++; draft=structuredClone(post); images=photoMap; incoming=pending; dirty=false;
    $('#blog-library').hidden=true;$('#blog-editor').hidden=false;
    for(const field of ['title','category','date','excerpt']) $(`#blog-${field}`).value=draft[field];
    $('#blog-open-page').hidden=draft.status!=='published';$('#blog-open-page').href=`blog-post.html?id=${encodeURIComponent(draft.id)}`;
    $('#blog-save-draft').textContent=draft.status==='published' ? '下書きに戻して保存' : '下書き保存';
    renderCover();renderBlocks();status(draft.revision ? '保存済みの記事を開きました。' : '新しい記事です。まずは下書きから始められます。');
    $('#blog-title').focus();
  }
  async function list(page=1) {
    const run=++listGeneration;currentPage=page;$('#blog-library-status').textContent='記事を読み込んでいます…';
    try {
      const query=new URLSearchParams({q:$('#blog-admin-search').value,state:$('#blog-admin-state').value,page:String(page)});
      const data=await api(`?${query}`);if(run!==listGeneration)return;currentPage=data.page;
      $('#blog-library-status').textContent=`${data.total}件 ／ ${data.page} / ${data.totalPages}ページ`;
      const root=$('#blog-admin-list');root.replaceChildren();$('#blog-admin-pagination').replaceChildren();
      if(!data.items.length){const p=document.createElement('p');p.className='blog-admin-empty';p.textContent=$('#blog-admin-state').value==='all' && !$('#blog-admin-search').value ? '記事はまだありません。「新しい記事を書く」から作成できます。' : 'この条件の記事はありません。';root.append(p);}
      for(const post of data.items){
        const row=document.createElement('article');row.className='blog-admin-row';const info=document.createElement('div');
        const meta=document.createElement('p');meta.className='blog-meta';meta.textContent=`${{draft:'下書き',published:'掲載中',trash:'ごみ箱'}[post.status]}　${post.date}　${post.category}`;
        const h=document.createElement('h3');h.textContent=post.title;info.append(meta,h);
        const actions=document.createElement('div');actions.className='blog-row-actions';
        if(post.status==='trash') actions.append(button('下書きに戻す',()=>changeTrash(post,true)));
        else {actions.append(button('編集する',()=>open(post.id)));actions.append(button('ごみ箱へ',()=>changeTrash(post,false)));}
        row.append(info,actions);root.append(row);
      }
      if(data.totalPages>1) for(const n of view.pageNumbers(data.page,data.totalPages)){const b=button(String(n),()=>list(n));b.setAttribute('aria-label',`${n}ページ目`);if(n===data.page)b.setAttribute('aria-current','page');$('#blog-admin-pagination').append(b);}
      const values=[...new Set([...model.categories,...data.categories])];$('#blog-category-options').replaceChildren();for(const value of values){const o=document.createElement('option');o.value=value;$('#blog-category-options').append(o);}
    }catch(error){if(run===listGeneration)$('#blog-library-status').textContent=error.message;}
  }
  async function open(id){
    if(!canLeave())return; const run=++generation;$('#blog-library-status').textContent='記事と写真を読み込んでいます…';
    try{const post=await api(`/post?id=${encodeURIComponent(id)}`), photos=new Map();await Promise.all(model.imageIds(post).map(async imageId=>photos.set(imageId,await api(`/image?id=${encodeURIComponent(imageId)}&full=true`))));if(run!==generation)return;showEditor(post,photos);}
    catch(error){$('#blog-library-status').textContent=error.message;}
  }
  async function changeTrash(post,restore){
    if(busy)return;if(!restore && !confirm(`「${post.title}」をごみ箱へ移しますか？掲載ページから非表示になります。ごみ箱から下書きに戻せます。`))return;
    try{await api('/trash',{id:post.id,revision:post.revision,restore});await list(currentPage);}catch(error){$('#blog-library-status').textContent=error.message;}
  }
  function field(label,value,max,onInput,multiline=false){
    const wrapper=document.createElement('div');wrapper.className='field';const caption=document.createElement('label');const input=document.createElement(multiline ? 'textarea' : 'input');
    input.id=`blog-field-${crypto.randomUUID()}`;caption.htmlFor=input.id;caption.textContent=label;input.value=value || '';input.maxLength=max;if(multiline)input.rows=6;
    input.addEventListener('input',()=>{onInput(input.value);markDirty();});wrapper.append(caption,input);return wrapper;
  }
  function renderCover(){
    const photo=draft.cover;$('#blog-cover-details').hidden=!photo;
    if(photo){$('#blog-cover-preview').src=images.get(photo.imageId)?.thumbnail || '';$('#blog-cover-alt').value=photo.alt;$('#blog-cover-caption').value=photo.caption || '';}
    else{$('#blog-cover-preview').removeAttribute('src');$('#blog-cover-alt').value='';$('#blog-cover-caption').value='';}
    $('#blog-cover-file').value='';
  }
  function renderBlocks(){
    const root=$('#blog-blocks');root.replaceChildren();
    draft.blocks.forEach((block,index)=>{
      const row=document.createElement('section');row.className='blog-editor-block';row.dataset.blogBlock=block.type;
      const bar=document.createElement('div');bar.className='blog-block-bar';const label=document.createElement('h4');label.textContent=`${index+1}. ${{text:'段落',heading:'見出し',image:'写真'}[block.type]}`;const actions=document.createElement('div');
      for(const [offset,name] of [[-1,'上へ'],[1,'下へ']]){const b=button(name,()=>{[draft.blocks[index],draft.blocks[index+offset]]=[draft.blocks[index+offset],draft.blocks[index]];markDirty();renderBlocks();$('#blog-blocks').children[index+offset].querySelector('button').focus();});b.disabled=index+offset<0||index+offset>=draft.blocks.length;b.setAttribute('aria-label',`${index+1}番目のパーツを${name}`);actions.append(b);}
      actions.append(button('削除',()=>{if(!confirm('この本文パーツを削除しますか？保存するまでは掲載内容に影響しません。'))return;draft.blocks.splice(index,1);markDirty();renderBlocks();}));bar.append(label,actions);row.append(bar);
      if(block.type==='image'){
        if(images.has(block.imageId)){const img=document.createElement('img');img.className='blog-editor-image';img.src=images.get(block.imageId).thumbnail;img.alt='選択中の写真';row.append(img);}
        const upload=document.createElement('div');upload.className='field';const caption=document.createElement('label'),input=document.createElement('input');input.type='file';input.accept='image/jpeg,image/png,image/webp';input.id=`blog-upload-${crypto.randomUUID()}`;caption.htmlFor=input.id;caption.textContent='写真を選ぶ・差し替える';input.addEventListener('change',()=>uploadPhoto(input,image=>{block.imageId=image.id;block.alt='';renderBlocks();}));upload.append(caption,input);row.append(upload);
        row.append(field('写真の説明（読み上げ用・掲載時必須）',block.alt,300,value=>block.alt=value),field('写真の下に添える説明（任意）',block.caption,500,value=>block.caption=value));
      }else row.append(field(block.type==='heading' ? '見出しの文字' : '本文',block.text,block.type==='heading' ? 160 : 6000,value=>block.text=value,block.type==='text'));
      root.append(row);
    });
  }
  async function compress(file){
    if(!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size>15*1024*1024)throw new Error('15MB以内のJPEG・PNG・WebPを選んでください。');
    const bitmap=await createImageBitmap(file);
    try{
      if(bitmap.width*bitmap.height>50000000)throw new Error('写真の解像度が大きすぎます。縮小してから選択してください。');
      const encode=(edge,limit)=>{const scale=Math.min(1,edge/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));const ctx=canvas.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);for(const quality of [.86,.7,.54,.38]){const value=canvas.toDataURL('image/jpeg',quality);if(value.length<=limit)return value;}throw new Error('写真の容量が大きすぎます。もう少し小さな写真を選択してください。');};
      return model.validateImage({id:crypto.randomUUID(),dataUrl:encode(1600,1200000),thumbnail:encode(480,180000)});
    }finally{bitmap.close();}
  }
  async function uploadPhoto(input,apply){
    const file=input.files?.[0];if(!file)return;const run=generation;uploads++;dirty=true;status('写真を表示用に縮小しています…');input.disabled=true;
    try{const photo=await compress(file);if(run!==generation)return;images.set(photo.id,photo);incoming.set(photo.id,photo);apply(photo);markDirty();}
    catch(error){if(run===generation)status(error.message || '写真を読み込めませんでした。別のファイルを選んでください。');}
    finally{uploads=Math.max(0,uploads-1);input.value='';input.disabled=false;}
  }
  async function save(state){
    if(busy)return;if(uploads){status('写真の読み込みが終わるまでお待ちください。');return;}
    if(state==='draft' && draft.status==='published' && !confirm('下書きに戻すと閲覧者には表示されなくなります。よろしいですか？'))return;
    try{const post=read(state), refs=model.imageIds(post);setBusy(true);status('保存しています…');const saved=await api('/save',{post,revision:draft.revision || 0,images:refs.filter(id=>incoming.has(id)).map(id=>incoming.get(id))});showEditor(saved.post,images);incoming.clear();dirty=false;status(state==='published' ? (window.TWIY_DATA.offline ? '掲載用に保存しました。同じブラウザーでブログを開くと反映されます。外部には公開されません。' : '掲載しました。ブログページで確認できます。') : '下書きを保存しました。閲覧者には表示されません。');}
    catch(error){status(error.message);}
    finally{setBusy(false);renderBlocks();}
  }
  document.addEventListener('twiy-admin-ready',()=>void list());
  $('#blog-admin-search-form').addEventListener('submit',event=>{event.preventDefault();void list();});$('#blog-admin-state').addEventListener('change',()=>void list());
  $('#blog-new').addEventListener('click',()=>{if(canLeave())showEditor({id:crypto.randomUUID(),title:'',excerpt:'',category:model.categories[0],date:localDate(),status:'draft',cover:null,blocks:[{type:'text',text:''}],revision:0});});
  $('#blog-back').addEventListener('click',()=>{if(!canLeave())return;generation++;dirty=false;$('#blog-editor').hidden=true;$('#blog-library').hidden=false;void list(currentPage);});
  $('#blog-edit-form').addEventListener('input',event=>{if(event.target.type!=='file')markDirty();});
  $('#blog-edit-form').addEventListener('submit',event=>{event.preventDefault();void save('published');});$('#blog-save-draft').addEventListener('click',()=>save('draft'));
  $('#blog-cover-file').addEventListener('change',event=>uploadPhoto(event.target,image=>{draft.cover={imageId:image.id,alt:'',caption:''};renderCover();}));
  $('#blog-cover-alt').addEventListener('input',event=>{if(draft.cover)draft.cover.alt=event.target.value;});$('#blog-cover-caption').addEventListener('input',event=>{if(draft.cover)draft.cover.caption=event.target.value;});
  $('#blog-remove-cover').addEventListener('click',()=>{draft.cover=null;renderCover();markDirty();$('#blog-cover-file').focus();});
  document.querySelectorAll('[data-add-blog]').forEach(button=>button.addEventListener('click',()=>{if(draft.blocks.length>=60){status('本文は60パーツまでです。');return;}draft.blocks.push(button.dataset.addBlog==='image' ? {type:'image',imageId:'',alt:'',caption:''} : {type:button.dataset.addBlog,text:''});renderBlocks();markDirty();$('#blog-blocks').lastElementChild.querySelector('input,textarea')?.focus();}));
  $('#blog-preview-button').addEventListener('click',()=>{try{if(uploads)throw new Error('写真の読み込み中です。');$('#blog-preview-body').innerHTML=view.article(read('draft'),Object.fromEntries(images));$('#blog-preview').showModal();$('#blog-preview').scrollTop=0;}catch(error){status(error.message);}});
  $('#blog-close-preview').addEventListener('click',()=>$('#blog-preview').close());
  $('#blog-preview-body').addEventListener('click',event=>{const link=event.target.closest('a');if(link){event.preventDefault();if(link.getAttribute('href').startsWith('#'))$('#blog-preview-body').querySelector(link.hash)?.scrollIntoView();}});
  $('#blog-export').addEventListener('click',()=>{try{if(uploads)throw new Error('写真の読み込み中です。');const post=read('draft'), photos=model.imageIds(post).map(id=>images.get(id));if(photos.some(p=>!p))throw new Error('写真が読み込まれていません。');const data={format:'twiy-blog-post',version:1,post,images:photos};const url=URL.createObjectURL(new Blob([JSON.stringify(data)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`TWIY-blog-${post.id}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);status('入力中の文章と写真をバックアップしました。読み込み時は新しい下書きになります。');}catch(error){status(error.message);}});
  $('#blog-import').addEventListener('click',()=>$('#blog-import-file').click());
  $('#blog-import-file').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{if(file.size>12000000)throw new Error('12MB以内の記事バックアップを選んでください。');const data=JSON.parse(await file.text());if(data.format!=='twiy-blog-post'||data.version!==1||!Array.isArray(data.images)||data.images.length>8)throw new Error('ブログの記事バックアップを選んでください。');const post=model.validatePost({...data.post,id:crypto.randomUUID(),status:'draft'});const originals=new Map(data.images.map(model.validateImage).map(p=>[p.id,p]));const remap=new Map(),photos=new Map();for(const id of model.imageIds(post)){const photo=originals.get(id);if(!photo)throw new Error('バックアップに必要な写真がありません。');const fresh={...photo,id:crypto.randomUUID()};remap.set(id,fresh.id);photos.set(fresh.id,fresh);}if(post.cover)post.cover.imageId=remap.get(post.cover.imageId);post.blocks.filter(b=>b.type==='image').forEach(b=>b.imageId=remap.get(b.imageId));if(!canLeave())return;showEditor({...post,revision:0},photos,new Map(photos));markDirty();status('新しい下書きとして読み込みました。内容を確認し、保存してください。');}catch(error){$('#blog-import-status').textContent=error instanceof SyntaxError ? 'ファイルを読み込めませんでした。' : error.message;}finally{event.target.value='';}});
})();
