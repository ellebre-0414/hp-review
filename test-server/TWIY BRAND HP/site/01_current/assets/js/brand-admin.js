(() => {
  const M=globalThis.TWIY_BRAND_MODEL, API=globalThis.TWIY_BRAND_DATA;
  const $=id=>document.getElementById(id);
  const sessionKey='twiy-brand-editor-test-v1';
  let draft, revision=0, tab='common', dirty=false, working=false;
  const headings={common:['共通の表示','各ブランドページのメニュー、ロゴ、フッターを編集します。'],home:['トップページ','大きな見出しと、コレクション・ブログへの案内文を編集します。'],collection:['コレクション','写真を主役にした一覧です。商品は24件まで、各商品に写真を3枚まで登録できます。'],blog:['ブログ','記事は50件まで登録できます。「一覧に表示」がオフの記事は下書きです。'],checkout:['購入ページ','案内文と掲載写真を編集します。購入手続きは従来どおり入力・確認までで、送信や決済は行いません。']};
  function node(tag,className,text){const n=document.createElement(tag);if(className)n.className=className;if(text!==undefined)n.textContent=text;return n;}
  function message(text,error=false){$('admin-message').textContent=text;$('admin-message').dataset.error=String(error);}
  function markDirty(){dirty=true;$('save-state').textContent='未保存の変更があります';}
  function busy(on){
    working=on;$('editor-body').inert=on;document.querySelector('.admin-tabs').inert=on;
    for(const id of ['save-content','discard','logout','export-content','import-content'])$(id).disabled=on;
  }
  function button(text,action){const b=node('button','',text);b.type='button';b.onclick=action;return b;}
  function inputField(object,f,prefix){
    const wrap=node('div','editor-field'+(f.kind==='textarea'?' wide':''));
    const id='edit-'+prefix+'-'+f.key;
    const label=node('label','',f.label);label.htmlFor=id;wrap.append(label);
    const input=node(f.kind==='textarea'?'textarea':'input');input.id=id;input.name=id;
    if(f.kind!=='textarea')input.type=f.kind==='date'?'date':'text';
    input.value=object[f.key]??'';input.maxLength=f.max||2000;input.required=Boolean(f.required);
    if(f.kind==='textarea')input.rows=f.key==='body'?14:4;
    input.addEventListener('input',()=>{object[f.key]=input.value;markDirty();});
    wrap.append(input);return wrap;
  }
  function checkbox(object,key,label,prefix){
    const wrap=node('label','editor-check');const input=node('input');input.type='checkbox';input.id='edit-'+prefix+'-'+key;input.checked=object[key];
    input.onchange=()=>{object[key]=input.checked;markDirty();};wrap.append(input,node('span','',label));return wrap;
  }
  async function readImage(file){
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>20*1024*1024)throw Error('JPEG・PNG・WebPの写真（20MB以下）を選んでください。');
    const source=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(Error('写真を読み込めません。別の写真を選んでください。'));reader.readAsDataURL(file);});
    try {
      const img=new Image();img.src=source;await img.decode();
      if(!img.naturalWidth||img.naturalWidth*img.naturalHeight>50000000)throw Error('写真が大きすぎます。5000万画素以下にしてお試しください。');
      for(const size of [1600,1200,900]){
        const ratio=Math.min(1,size/Math.max(img.naturalWidth,img.naturalHeight));
        const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.naturalWidth*ratio));canvas.height=Math.max(1,Math.round(img.naturalHeight*ratio));
        canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
        for(const quality of [.88,.75,.6]){
          const data=canvas.toDataURL('image/webp',quality);
          if(data.length<=1500000)return M.image(data);
        }
      }
      throw Error('写真を小さくしてから、もう一度選んでください。');
    } catch(e) {throw Error(e.message.startsWith('写真')?e.message:'写真を読み込めません。JPEG・PNG・WebPの画像を選び直してください。');}
  }
  function photoField(label,value,onChange,key){
    const wrap=node('div','editor-field wide');const title=node('label','',label);title.htmlFor='image-'+key;wrap.append(title);
    const row=node('div','editor-image'),preview=node('img');preview.alt='登録中の写真';preview.hidden=!value;if(value)preview.src=value;
    const input=node('input');input.type='file';input.id='image-'+key;input.accept='image/jpeg,image/png,image/webp';
    input.onchange=async()=>{
      if(!input.files[0])return;busy(true);message('写真を読み込んでいます…');
      try{const data=await readImage(input.files[0]);onChange(data);markDirty();render();message('写真を登録しました。ページへ反映するには保存してください。');}
      catch(e){message(e.message,true);}
      finally{input.value='';busy(false);}
    };
    row.append(preview,input,button('写真を外す',()=>{onChange('');markDirty();render();}));
    wrap.append(row);return wrap;
  }
  function fields(group){
    const grid=node('div','editor-fields');
    for(const f of M.fields[group]){
      if(f.kind==='image')grid.append(photoField(f.label,draft[group][f.key],value=>draft[group][f.key]=value,group+'-'+f.key));
      else grid.append(inputField(draft[group],f,group));
    }
    return grid;
  }
  function productEditor(p,index){
    const box=node('fieldset','editor-item'),prefix='product-'+p.id;box.append(node('legend','',String(index+1).padStart(2,'0')+' / '+p.name));
    const grid=node('div','editor-fields');
    const descriptions=[
      {key:'name',label:'商品名',max:100,required:true},{key:'color',label:'色・バリエーション',max:80},
      {key:'description',label:'商品説明',kind:'textarea',max:2000},{key:'priceNote',label:'価格などの表示（任意・決済には連動しません）',max:100},
      {key:'alt',label:'写真の説明（読み上げ用）',max:200}
    ];
    descriptions.forEach(f=>grid.append(inputField(p,f,prefix)));
    const fitWrap=node('div','editor-field'),fitLabel=node('label','','写真の表示方法'),fit=node('select');
    fit.id='edit-'+prefix+'-fit';fitLabel.htmlFor=fit.id;
    fit.add(new Option('服全体を表示する','contain'));fit.add(new Option('枠いっぱいに表示する','cover'));fit.value=p.fit;fit.onchange=()=>{p.fit=fit.value;markDirty();};fitWrap.append(fitLabel,fit);grid.append(fitWrap);
    const photos=node('div','editor-photo-grid');
    for(let i=0;i<3;i++)photos.append(photoField('写真 '+(i+1)+(i===0?'（メイン）':''),p.photos[i]||'',value=>{
      p.photos=Array.from({length:3},(_,n)=>n===i?value:(p.photos[n]||''));
      if(p.photos.some(Boolean)&&p.photos.every(src=>!src||src.startsWith('data:')))p.sample=false;
    },prefix+'-'+i));
    grid.append(photos,checkbox(p,'visible','コレクションと購入選択に表示',prefix),checkbox(p,'sample','参考写真・仮の商品として表示',prefix));box.append(grid);
    const actions=node('div','editor-item-actions'),reorder=node('div');
    const move=offset=>{const at=draft.products.findIndex(v=>v.id===p.id);const target=at+offset;if(target<0||target>=draft.products.length)return;draft.products.splice(at,1);draft.products.splice(target,0,p);markDirty();render();};
    const up=button('↑ 上へ',()=>move(-1)),down=button('↓ 下へ',()=>move(1));up.disabled=index===0;down.disabled=index===draft.products.length-1;reorder.append(up,down);
    actions.append(reorder,button('この商品を削除',()=>{if(confirm('この商品を編集内容から削除しますか？保存するまでは取り消せます。')){draft.products=draft.products.filter(v=>v.id!==p.id);markDirty();render();}}));box.append(actions);return box;
  }
  function postEditor(p,index){
    const box=node('fieldset','editor-item'),prefix='post-'+p.id;box.append(node('legend','',String(index+1).padStart(2,'0')+' / '+p.title));
    const grid=node('div','editor-fields');
    [{key:'title',label:'記事タイトル',max:160,required:true},{key:'date',label:'掲載日',kind:'date',max:10,required:true},{key:'excerpt',label:'一覧に載せる短い説明',kind:'textarea',max:500},{key:'body',label:'記事本文（段落の間は空行にします）',kind:'textarea',max:20000},{key:'alt',label:'写真の説明（読み上げ用）',max:200}].forEach(f=>grid.append(inputField(p,f,prefix)));
    grid.append(photoField('記事の写真',p.photo,value=>p.photo=value,prefix),checkbox(p,'visible','ブログ一覧・記事ページに表示（オフなら下書き）',prefix));box.append(grid);
    const actions=node('div','editor-item-actions');
    actions.append(node('p','admin-help',p.visible?'保存後にこのブラウザー内で表示されます。':'下書きは訪問者向けの一覧・記事ページに表示されません。'),button('この記事を削除',()=>{if(confirm('この記事を編集内容から削除しますか？保存するまでは取り消せます。')){draft.posts=draft.posts.filter(v=>v.id!==p.id);markDirty();render();}}));box.append(actions);return box;
  }
  function render(){
    const body=$('editor-body');body.replaceChildren(node('h2','editor-section-title',headings[tab][0]),node('p','editor-description',headings[tab][1]),fields(tab));
    document.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tab===tab)));
    if(tab==='collection'){
      draft.products.forEach((p,i)=>body.append(productEditor(p,i)));
      const add=button('＋ 商品を追加',()=>{draft.products.push({id:'tee-'+crypto.randomUUID(),name:'新しいTシャツ',color:'',description:'',priceNote:'',alt:'',visible:false,sample:false,fit:'contain',photos:[]});markDirty();render();});
      add.className='editor-add';add.disabled=draft.products.length>=24;body.append(add);
    }
    if(tab==='blog'){
      draft.posts.forEach((p,i)=>body.append(postEditor(p,i)));
      const add=button('＋ 記事を追加',()=>{const date=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);draft.posts.unshift({id:'post-'+crypto.randomUUID(),title:'新しい記事',date,excerpt:'',body:'',photo:'',alt:'',visible:false});markDirty();render();});
      add.className='editor-add';add.disabled=draft.posts.length>=50;body.append(add);
    }
  }
  async function load(){
    const result=await API.read();draft=M.clone(result.data);revision=result.revision;dirty=false;
    $('save-state').textContent=result.updatedAt?'保存済み：'+new Date(result.updatedAt).toLocaleString('ja-JP'):'初期内容（まだ保存されていません）';render();
  }
  async function openEditor(){
    await load();$('admin-login').hidden=true;$('admin-workspace').hidden=false;message('編集後は「このブラウザーに保存」を押してください。');
  }
  $('login-form').addEventListener('submit',async event=>{
    event.preventDefault();
    if(!API.local){message('この編集画面はPC内のテスト専用です。公開サーバーの管理機能にはまだ接続されていません。',true);return;}
    if($('admin-password').value!=='TWIY'){message('パスワードを確認してください。',true);return;}
    try{await openEditor();sessionStorage.setItem(sessionKey,'yes');$('admin-password').value='';}
    catch(e){message(e.message,true);}
  });
  document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{if(working)return;tab=b.dataset.tab;render();});
  $('editor-form').addEventListener('submit',async event=>{
    event.preventDefault();if(working)return;busy(true);message('保存しています…');
    try{const result=await API.save(M.validate(draft),revision);draft=M.clone(result.data);revision=result.revision;dirty=false;render();$('save-state').textContent='保存済み：'+new Date(result.updatedAt).toLocaleString('ja-JP');message('このブラウザーに保存しました。各ページを開き直すと反映されます。');}
    catch(e){message(e.message,true);}
    finally{busy(false);}
  });
  $('discard').onclick=async()=>{if(!dirty||confirm('未保存の変更を取り消し、最後に保存した内容へ戻しますか？')){busy(true);try{await load();message('最後に保存した内容に戻しました。');}catch(e){message(e.message,true);}finally{busy(false);}}};
  $('logout').onclick=()=>{if(dirty&&!confirm('未保存の変更を破棄してログアウトしますか？'))return;sessionStorage.removeItem(sessionKey);dirty=false;draft=null;$('admin-workspace').hidden=true;$('admin-login').hidden=false;$('editor-body').replaceChildren();message('ログアウトしました。');};
  $('export-content').onclick=async()=>{
    busy(true);
    try{const saved=await API.read();const blob=new Blob([JSON.stringify({format:'twiy-brand-backup',createdAt:new Date().toISOString(),data:saved.data},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=node('a');a.href=url;a.download='twiy-brand-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);message('保存済みデータを書き出しました。未保存の変更は含みません。');}
    catch(e){message(e.message,true);}finally{busy(false);}
  };
  $('import-content').onclick=()=>{if(!dirty||confirm('現在の未保存の編集内容を、読み込む内容に置き換えますか？'))$('backup-file').click();};
  $('backup-file').onchange=async()=>{
    const file=$('backup-file').files[0];if(!file)return;busy(true);
    try{if(file.size>32000000)throw Error('バックアップは32MB以下のJSONを選んでください。');const parsed=JSON.parse(await file.text());draft=M.validate(parsed.format==='twiy-brand-backup'?parsed.data:parsed);markDirty();render();message('バックアップを編集画面に読み込みました。まだ保存していません。確認後に保存してください。');}
    catch(e){message('読み込めませんでした。'+e.message,true);}finally{$('backup-file').value='';busy(false);}
  };
  addEventListener('beforeunload',event=>{if(dirty||working){event.preventDefault();event.returnValue='';}});
  if(!API.local){$('login-form').querySelector('button').disabled=true;message('PC内のファイル、またはlocalhost・127.0.0.1から開いてください。本番共有の管理機能は未接続です。',true);}
  else {try{if(sessionStorage.getItem(sessionKey)==='yes')openEditor().catch(e=>message(e.message,true));}catch(e){message('ブラウザーの保存機能が無効です。通常のウィンドウでお試しください。',true);}}
})();
