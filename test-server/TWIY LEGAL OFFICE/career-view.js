(() => {
  function render(root,profile){
    const fields={name:profile.name,role:profile.role,introduction:profile.introduction};
    for(const [key,value]of Object.entries(fields))root.querySelectorAll('[data-career="'+key+'"]').forEach(el=>{el.textContent=value;el.hidden=!value;});
    const img=root.querySelector('[data-career-photo]'),placeholder=root.querySelector('[data-career-photo-placeholder]');
    img.hidden=!profile.photo;placeholder.hidden=!!profile.photo;
    if(profile.photo){img.src=profile.photo.dataUrl;img.alt=profile.photo.alt;}else{img.removeAttribute('src');img.alt='';}
    const list=root.querySelector('[data-career-entries]');list.replaceChildren();
    for(const entry of profile.entries){const row=document.createElement('div'),period=document.createElement('dt'),detail=document.createElement('dd');period.textContent=entry.period;detail.textContent=entry.detail;row.append(period,detail);list.append(row);}
    root.querySelector('[data-career-empty]').hidden=profile.entries.length>0;
  }
  window.TWIY_CAREER_VIEW={render};
  const root=document.querySelector('#career-profile');if(!root)return;
  const status=document.querySelector('#career-load-status');
  window.TWIY_CAREER_READY=(async()=>{
    try{const saved=await window.TWIY_DATA.request('/api/career');render(root,window.TWIY_CAREER.validate(saved));status.textContent='';}
    catch{status.textContent='経歴の掲載内容を読み込めませんでした。時間をおいてページを開き直してください。';}
    finally{root.setAttribute('aria-busy','false');document.dispatchEvent(new Event('twiy-career-rendered'));}
  })();
})();
