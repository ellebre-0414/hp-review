/* Content-driven heights: no empty years, placeholder cards or reserved image slots. */
(() => {
  const model=globalThis.TWIY_SCHOOL_MODEL;
  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  function figure(item) {
    const fig=node('figure','school-history-photo'),img=node('img');
    img.src=item.photo;img.alt=item.alt;img.loading='lazy';img.decoding='async';
    img.addEventListener('error',()=>fig.remove(),{once:true});
    fig.append(img);if(item.caption.trim())fig.append(node('figcaption','',item.caption));return fig;
  }
  globalThis.TWIY_SCHOOL_HISTORY_RENDER=history=>{
    const timeline=document.getElementById('school-history-timeline');if(!timeline)return;
    timeline.replaceChildren();
    for(const group of history.years) {
      const entries=group.events.filter(model.eventVisible);if(!entries.length)continue;
      const section=node('section','school-history-year');section.id='history-'+group.year;
      const heading=node('h3','school-history-year-label',String(group.year));heading.id='history-year-'+group.year;
      section.setAttribute('aria-labelledby',heading.id);section.append(heading);
      const list=node('ol','school-history-events');
      for(const event of entries) {
        const li=node('li','school-history-event');li.id=event.id;
        if(event.date.trim())li.append(node('p','school-history-date',event.date));
        if(event.title.trim())li.append(node('h4','school-history-event-title',event.title));
        if(event.body.trim())li.append(node('p','school-history-body',event.body));
        if(event.photo)li.append(figure(event));
        list.append(li);
      }
      section.append(list);timeline.append(section);
    }
    timeline.hidden=!timeline.childElementCount;
    const greeting=document.getElementById('school-history-greeting'),g=history.greeting;
    greeting.replaceChildren();greeting.hidden=!model.greetingVisible(g);
    if(!greeting.hidden) {
      const heading=node('h3','school-history-greeting-title',g.heading.trim()?g.heading:'代表挨拶');heading.id='history-greeting-title';greeting.append(heading);
      const content=node('div','school-history-greeting-content');
      if(g.body.trim())content.append(node('p','school-history-body',g.body));
      if(g.photo)content.append(figure(g));
      if(g.role.trim()||g.name.trim()) {
        const signature=node('div','school-history-signature');
        if(g.role.trim())signature.append(node('p','',g.role));
        if(g.name.trim())signature.append(node('p','',g.name));
        content.append(signature);
      }
      greeting.append(content);
    }
  };
})();
