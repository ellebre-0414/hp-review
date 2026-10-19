/* Shared, plain-text career model. No HTML or remote photo URLs are accepted. */
(() => {
  const error=(message,code=400)=>Object.assign(new Error(message),{code});
  const defaults={name:'沢田 優乃',role:'代表予定者',introduction:'',entries:[],photo:null,revision:0};
  const text=(value,max,label)=>{if(typeof value!=='string'||value.length>max)throw error(`${label}の内容・文字数をご確認ください。`);return value.trim();};
  function validate(input){
    if(!input||typeof input!=='object')throw error('経歴の内容をご確認ください。');
    const profile={name:text(input.name,80,'氏名'),role:text(input.role,80,'肩書・所属'),introduction:text(input.introduction,4000,'紹介文')};
    if(!profile.name)throw error('氏名を入力してください。');
    if(!Array.isArray(input.entries)||input.entries.length>40)throw error('経歴は40項目以内で入力してください。');
    profile.entries=input.entries.map(entry=>{
      if(!entry||typeof entry!=='object')throw error('経歴の項目を確認してください。');
      const checked={period:text(entry.period,60,'年月・期間'),detail:text(entry.detail,2000,'経歴')};
      if(!checked.detail)throw error('経歴の内容を入力するか、空の項目を削除してください。');return checked;
    });
    profile.photo=null;
    if(input.photo!=null){
      const {dataUrl}=input.photo;const alt=text(input.photo.alt,200,'写真の説明');
      if(!alt)throw error('写真の説明を入力してください。');
      if(typeof dataUrl!=='string'||dataUrl.length>900000||!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(dataUrl))throw error('写真はJPEG・PNG・WebP形式で、表示用の容量以内にしてください。');
      let bytes;try{bytes=atob(dataUrl.split(',')[1]);}catch{throw error('写真の形式を確認してください。');}
      const valid=dataUrl.startsWith('data:image/jpeg')?bytes.startsWith('\xff\xd8\xff'):dataUrl.startsWith('data:image/png')?bytes.startsWith('\x89PNG\r\n\x1a\n'):bytes.startsWith('RIFF')&&bytes.slice(8,12)==='WEBP';
      if(!valid)throw error('写真の形式を確認してください。');profile.photo={dataUrl,alt};
    }
    return profile;
  }
  function prepareSave(input,current=defaults){
    if(!Number.isSafeInteger(input?.revision)||input.revision<0)throw error('保存状態を確認してください。');
    if(input.revision!==current.revision)throw error('別の画面で経歴が更新されています。入力内容をバックアップし、「保存済みを読み直す」から最新の内容を確認してください。',409);
    return {...validate(input.profile),revision:current.revision+1};
  }
  globalThis.TWIY_CAREER={defaults,validate,prepareSave,error};
})();
