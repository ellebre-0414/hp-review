(() => {
  const toggle = document.querySelector('.school-menu-toggle');
  const menu = document.getElementById('school-menu');
  function closeMenu() {
    toggle?.classList.remove('active'); if(menu)menu.hidden=true;
    toggle?.setAttribute('aria-expanded','false'); toggle?.setAttribute('aria-label','メニューを開く');
  }
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.classList.toggle('active',open); menu.hidden=!open;
    toggle.setAttribute('aria-expanded',String(open)); toggle.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');
  });
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('click',event=>{if(!toggle?.contains(event.target)&&!menu?.contains(event.target))closeMenu();});
  document.addEventListener('focusin',event=>{if(!toggle?.contains(event.target)&&!menu?.contains(event.target))closeMenu();});
  toggle?.addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();if(menu.hidden)toggle.click();menu.querySelector('a')?.focus();}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape' && toggle?.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
  matchMedia('(min-width: 840px)').addEventListener('change',closeMenu);
  document.querySelectorAll('.voice__tit').forEach(button=>button.addEventListener('click',()=>{
    const content=document.getElementById(button.getAttribute('aria-controls'));
    const open=button.getAttribute('aria-expanded')!=='true';
    button.setAttribute('aria-expanded',String(open)); content.hidden=!open;
  }));
  // Stable article/paragraph destinations for later, user-confirmed result links.
  function openVoiceHash() {
    let id;
    try { id=decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if(!/^school-voice-[1-5](?:-p[1-9]\d*)?$/.test(id))return;
    const target=document.getElementById(id), panel=target?.closest('.voice__item');
    if(!panel)return;
    const button=[...document.querySelectorAll('.voice__tit')].find(b=>b.getAttribute('aria-controls')===panel.id);
    if(!button)return;
    panel.hidden=false;button.setAttribute('aria-expanded','true');
    target.focus({preventScroll:true});
    (target===panel?button:target).scrollIntoView({block:'start',behavior:'instant'});
  }
  window.addEventListener('hashchange',openVoiceHash);
  // Reopen a collapsed local story even when its anchor is already in the URL.
  document.addEventListener('click',event=>{
    const link=event.target.closest?.('a[href^="#school-voice-"]');
    if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    if(link.hash===location.hash){event.preventDefault();openVoiceHash();}
  });
  function textWithBreaks(element,text) {
    element.replaceChildren();
    text.split('\n').forEach((line,index)=>{if(index)element.append(document.createElement('br'));element.append(document.createTextNode(line));});
  }
  function renderOverview(overview) {
    const content=document.getElementById('school-overview-content');if(!content)return;
    const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
    const visible=items=>items.filter(item=>item.trim());
    const list=(items,plain=false)=>{
      const ul=node('ul','school-overview-list'+(plain?' school-overview-list--plain':''));
      visible(items).forEach(text=>ul.append(node('li','',text)));return ul;
    };
    content.replaceChildren();
    globalThis.TWIY_SCHOOL_MODEL.overviewSections.forEach(({key,label})=>{
      const people=key==='teachers'?overview.teachers.people.filter(person=>person.name.trim()||visible(person.items).length):[];
      const items=key==='teachers'?overview.teachers.general:overview[key];
      const shown=visible(items).length>0||people.length>0;
      const mapItem=document.querySelector('[data-overview-map="'+key+'"]');
      if(mapItem){const entry=node(shown?'a':'span','',label);if(shown)entry.href='#overview-'+key;mapItem.replaceChildren(entry);}
      if(!shown)return;
      const section=node('section','school-overview-element');section.id='overview-'+key;section.setAttribute('aria-labelledby',section.id+'-title');
      const heading=node('h3','school-overview-heading',label);heading.id=section.id+'-title';
      const body=node('div','school-overview-element-body');section.append(heading,body);
      if(key==='teachers'){
        if(visible(items).length){const general=node('div','school-overview-teacher-general');general.append(node('h4','school-overview-subheading','講師全体について'),list(items,true));body.append(general);}
        if(people.length){
          const individual=node('div','school-overview-teacher-individual');individual.append(node('h4','school-overview-subheading','講師紹介'));
          const profiles=node('div','school-overview-people');
          people.forEach(person=>{const article=node('article','school-overview-person');article.dataset.teacherId=person.id;
            if(person.name.trim())article.append(node('h5','school-overview-person-name',person.name));
            if(visible(person.items).length)article.append(list(person.items,true));profiles.append(article);
          });individual.append(profiles);body.append(individual);
        }
      }else body.append(list(items));
      content.append(section);
    });
  }
  // Keep the stored Japanese quote intact; only separate its attribution on mobile.
  const mobileHero = matchMedia('(max-width: 839px)');
  const englishQuote = document.querySelector('.school-home .top__quote-en');
  const japaneseQuote = document.querySelector('.school-home .top__quote-ja');
  let englishQuoteText = englishQuote?.textContent || '';
  let japaneseQuoteText = japaneseQuote?.textContent || '';
  function arrangeEnglishQuote() {
    if(!englishQuote)return;
    if(!mobileHero.matches || englishQuoteText!=='What is to give light must endure burning') {
      textWithBreaks(englishQuote,englishQuoteText);
      return;
    }
    const first=document.createElement('span'),second=document.createElement('span');
    first.className='top__quote-en-line';second.className='top__quote-en-line';
    first.textContent='What is to give light ';second.textContent='must endure burning';
    englishQuote.replaceChildren(first,second);
  }
  function arrangeJapaneseQuote() {
    if(!japaneseQuote)return;
    const sourceStart=japaneseQuoteText.indexOf('———');
    if(!mobileHero.matches || sourceStart<=0) {
      textWithBreaks(japaneseQuote,japaneseQuoteText);
      return;
    }
    const translation=document.createElement('span'),source=document.createElement('span');
    translation.className='top__quote-translation';source.className='top__quote-source';
    textWithBreaks(translation,japaneseQuoteText.slice(0,sourceStart));
    textWithBreaks(source,japaneseQuoteText.slice(sourceStart));
    japaneseQuote.replaceChildren(translation,source);
  }
  function arrangeHeroQuote() { arrangeEnglishQuote();arrangeJapaneseQuote(); }
  mobileHero.addEventListener('change',arrangeHeroQuote);
  arrangeHeroQuote();
  globalThis.TWIY_SCHOOL_DATA.read().then(result=>{
    const defaults=globalThis.TWIY_SCHOOL_MODEL.defaults.text;
    document.querySelectorAll('[data-school-key]').forEach(element=>{
      const key=element.dataset.schoolKey,value=result.data.text[key];
      if(key==='heroEnglish' && englishQuote && value!==undefined) {
        englishQuoteText=value;arrangeEnglishQuote();return;
      }
      if(key==='heroJapanese' && japaneseQuote && value!==undefined) {
        japaneseQuoteText=value;arrangeJapaneseQuote();return;
      }
      if(element.hasAttribute('data-school-hide-empty'))element.hidden=!value?.trim();
      if(value===undefined || value===defaults[key])return;
      if(['accessPhone','accessMobile'].includes(key)) {
        const link=element.querySelector('a');link.textContent=value;link.href='tel:'+value.replace(/[^+\d]/g,'');
      } else textWithBreaks(element,value);
    });
    const page=location.pathname.split('/').pop();
    if(page==='voice.html')document.title=result.data.text.navVoice+' | TWIY塾';
    if(page==='access.html')document.title=result.data.text.navAccess+' | TWIY塾';
    if(page==='results.html')document.title=result.data.text.navResultsStories+' | TWIY塾';
    if(page==='history.html')document.title=result.data.text.navHistory+' | TWIY塾';
    if(page==='overview.html')document.title=result.data.text.navOverview+' | TWIY塾';
    globalThis.TWIY_SCHOOL_HISTORY_RENDER?.(result.data.history);
    renderOverview(result.data.overview);
    document.body.dataset.schoolContentReady='true';
  }).catch(()=>{
    globalThis.TWIY_SCHOOL_HISTORY_RENDER?.(globalThis.TWIY_SCHOOL_MODEL.defaults.history);
    renderOverview(globalThis.TWIY_SCHOOL_MODEL.defaults.overview);
    document.body.dataset.schoolContentReady='fallback';
    const warning=document.createElement('p');warning.className='school-content-warning';warning.setAttribute('role','status');
    warning.textContent='このブラウザーの編集内容を読み込めないため、元の内容を表示しています。';
    document.querySelector('main')?.append(warning);
  }).finally(()=>{
    openVoiceHash();
    document.fonts?.ready.then(openVoiceHash);
  });
})();
