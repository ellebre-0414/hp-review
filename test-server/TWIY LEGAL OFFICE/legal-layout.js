/* Layout behavior only: no storage writes or publishing. */
(() => {
  const current=location.pathname.split('/').pop();
  // Keep incoming links to the former home sections useful after relocation.
  if (!current || current==='index.html') {
    const target={about:'career.html',strength:'career.html#career-history',office:'access.html',practice:'practice.html#practice'}[location.hash.slice(1)];
    if(target){location.replace(new URL(target,location.href));return;}
  }
  const menu=document.querySelector('.menu-button');
  // A partially visible link is not always scrolled fully into view by native focus.
  const openingLinks=document.querySelector('.legal-opening-links');
  openingLinks?.addEventListener('focusin',event=>{
    const link=event.target.closest('a');if(!link)return;
    const box=openingLinks.getBoundingClientRect(),item=link.getBoundingClientRect();
    if(item.right>box.right-6)openingLinks.scrollLeft+=item.right-box.right+6;
    else if(item.left<box.left+6)openingLinks.scrollLeft-=box.left-item.left+6;
  });
  const params=new URLSearchParams(location.search);
  if(params.get('parts')!=='1')return;
  document.body.classList.add('parts-mode');
  const banner=document.createElement('p');banner.className='parts-guide-banner';banner.textContent='制作確認用：赤い番号は部位の識別番号です。通常のサイトには表示されません。';
  const link=document.createElement('a');link.href='parts-guide.html';link.textContent='名称一覧に戻る';banner.append(link);document.body.prepend(banner);
  const selected=params.get('part');
  const labels=[];
  document.querySelectorAll('[data-part]').forEach(node=>{
    if(selected ? node.dataset.part!==selected : !/^(C1|C2|H1|H2|K[1-5]|P[12])$/.test(node.dataset.part))return;
    const marker=document.createElement('span');marker.className='parts-marker';marker.textContent=node.dataset.part;marker.setAttribute('aria-hidden','true');
    Object.assign(marker.style,{position:'fixed',zIndex:'100',pointerEvents:'none',margin:'0'});document.body.append(marker);labels.push({node,marker});
    if(selected){
      node.classList.add('part-selected');
      if(node.closest('#global-nav')&&menu.getAttribute('aria-expanded')!=='true')menu.click();
      requestAnimationFrame(()=>node.scrollIntoView({block:'center'}));
    }
  });
  const positionLabels=()=>labels.forEach(({node,marker})=>{
    const rect=node.getBoundingClientRect();
    marker.hidden=rect.bottom<=0||rect.top>=innerHeight||getComputedStyle(node).visibility==='hidden'||!rect.width;
    marker.style.left=Math.max(0,Math.min(rect.left,innerWidth-70))+'px';
    marker.style.top=Math.max(0,rect.top-22)+'px';
  });
  addEventListener('scroll',positionLabels,{passive:true});addEventListener('resize',positionLabels);document.addEventListener('twiy-career-rendered',positionLabels);requestAnimationFrame(positionLabels);
})();
