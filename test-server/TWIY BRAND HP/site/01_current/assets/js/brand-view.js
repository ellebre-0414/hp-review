(() => {
  const M=globalThis.TWIY_BRAND_MODEL, API=globalThis.TWIY_BRAND_DATA;
  const page=document.body.dataset.brandPage;
  const el=(tag,className,text)=>{const n=document.createElement(tag);if(className)n.className=className;if(text!==undefined)n.textContent=text;return n;};
  function image(src,alt){const n=el('img');n.src=src;n.alt=alt;n.loading='lazy';return n;}
  function link(href,text,className='brand-text-link'){const n=el('a',className,text);n.href=href;return n;}
  function bind(data) {
    document.querySelectorAll('[data-copy]').forEach(n=>{const [group,key]=n.dataset.copy.split('.');if(typeof data[group]?.[key]==='string')n.textContent=data[group][key];});
    document.querySelectorAll('[data-image]').forEach(n=>{const [group,key]=n.dataset.image.split('.');const src=data[group]?.[key];n.hidden=!src;if(src)n.src=src;});
    document.querySelectorAll('.brand-header__nav a').forEach(n=>{if(new URL(n.href).pathname===location.pathname)n.setAttribute('aria-current','page');});
  }
  function gallery(product,start=0) {
    const dialog=document.getElementById('photo-dialog');if(!dialog||!product.photos.length)return;
    let index=start;
    const show=()=>{document.getElementById('dialog-photo').src=product.photos[index];document.getElementById('dialog-photo').alt=product.alt||product.name;document.getElementById('dialog-caption').textContent=product.name;document.getElementById('photo-position').textContent=(index+1)+' / '+product.photos.length;dialog.querySelector('.dialog-controls').hidden=product.photos.length<2;};
    document.getElementById('photo-prev').onclick=()=>{index=(index-1+product.photos.length)%product.photos.length;show();};
    document.getElementById('photo-next').onclick=()=>{index=(index+1)%product.photos.length;show();};
    dialog.querySelector('.dialog-close').onclick=()=>dialog.close();
    show();dialog.showModal();
  }
  function renderCollection(data) {
    const rows=data.products.filter(p=>p.visible), grid=document.getElementById('collection-grid');grid.replaceChildren();
    document.getElementById('sample-notice').hidden=!rows.some(p=>p.sample);
    if(!rows.length){grid.append(el('p','brand-empty',data.collection.empty));return;}
    rows.forEach(p=>{
      const article=el('article','product-card');article.id=p.id;
      const frame=el(p.photos.length?'button':'div','product-photo '+p.fit);
      if(p.photos.length){frame.type='button';frame.setAttribute('aria-label',data.collection.viewPhoto+'：'+p.name);frame.append(image(p.photos[0],p.alt||p.name));frame.onclick=()=>gallery(p);}
      else frame.append(el('span','product-placeholder',data.collection.photoPlaceholder));
      if(p.sample)frame.append(el('span','sample-tag',data.collection.sampleLabel));
      article.append(frame);
      if(p.photos.length)article.append(el('span','photo-view-label',data.collection.viewPhoto+' ↗'+(p.photos.length>1?' / '+p.photos.length+' PHOTOS':'')));
      const heading=el('div','product-heading');heading.append(el('h2','',p.name),el('span','',p.color));article.append(heading);
      if(p.description)article.append(el('p','',p.description));
      if(p.priceNote)article.append(el('p','product-price',p.priceNote));
      article.append(link('checkout.html?product='+encodeURIComponent(p.id),data.collection.buyLabel+' ↗'));
      grid.append(article);
    });
  }
  function renderBlog(data) {
    const container=document.getElementById('blog-list');container.replaceChildren();
    const posts=data.posts.filter(p=>p.visible).sort((a,b)=>b.date.localeCompare(a.date)||a.id.localeCompare(b.id));
    if(!posts.length){container.append(el('p','brand-empty',data.blog.empty));return;}
    posts.forEach((p,index)=>{
      const href='blog-post.html?id='+encodeURIComponent(p.id), row=el('article','blog-row');
      const visual=link(href,'','');visual.setAttribute('aria-label',p.title);
      visual.append(p.photo?image(p.photo,p.alt||p.title):el('span','blog-number',String(index+1).padStart(2,'0')));
      const copy=el('div'),date=el('time','',p.date);date.dateTime=p.date;
      const title=el('h2');title.append(link(href,p.title,''));
      copy.append(date,title,el('p','',p.excerpt),link(href,data.blog.readLabel+' ↗'));
      row.append(visual,copy);container.append(row);
    });
  }
  function renderPost(data) {
    const node=document.getElementById('post-content'), id=new URLSearchParams(location.search).get('id'),p=data.posts.find(p=>p.id===id&&p.visible);
    node.replaceChildren();
    if(!p){node.append(el('p','brand-empty',data.blog.missing),link('blog.html',data.blog.backLabel+' ↗'));return;}
    const date=el('time','',p.date);date.dateTime=p.date;node.append(date,el('h1','',p.title));
    if(p.photo)node.append(image(p.photo,p.alt||p.title));
    const content=el('div','post-body');p.body.split(/\n\s*\n/).filter(Boolean).forEach(part=>content.append(el('p','',part)));
    node.append(content,link('blog.html',data.blog.backLabel+' ↗'));document.title=p.title+' | TWIY BLOG';
  }
  function renderCheckout(data) {
    const select=document.getElementById('product'), previous=select.value;
    const requested=new URLSearchParams(location.search).get('product');
    select.replaceChildren(new Option('商品を選択',''));
    const products=data.products.filter(p=>p.visible);
    products.forEach(p=>select.add(new Option(p.name+(p.color?' / '+p.color:''),p.id)));
    select.value=products.some(p=>p.id===requested)?requested:previous;
    const updatePhoto=()=>{
      const p=products.find(p=>p.id===select.value),photo=document.querySelector('.checkout-visual img');
      const src=p?.photos[0]||data.checkout.photo;photo.hidden=!src;if(src)photo.src=src;photo.alt=p?(p.alt||p.name):data.checkout.photoAlt;
      document.querySelector('.checkout-visual p').textContent=p?((p.sample?'参考写真 / ':'')+p.name):data.checkout.caption;
    };
    select.addEventListener('change',updatePhoto);updatePhoto();
    const submit=document.querySelector('.checkout-submit');submit.disabled=!products.length;
    if(!products.length){const notice=document.getElementById('brand-load-status');notice.hidden=false;notice.textContent=data.collection.empty;}
  }
  function render(data) {
    bind(data);
    if(page==='home'){
      const strip=document.querySelector('[data-product-strip]');strip.replaceChildren();
      data.products.filter(p=>p.visible&&p.photos.length).slice(0,3).forEach(p=>strip.append(image(p.photos[0],'')));
      strip.hidden=!strip.childElementCount;
    }
    if(page==='collection')renderCollection(data);
    if(page==='blog')renderBlog(data);
    if(page==='post')renderPost(data);
    if(page==='checkout')renderCheckout(data);
    document.body.dataset.contentReady='true';
  }
  API.read().then(result=>render(result.data)).catch(error=>{
    render(M.clone(M.defaults));
    const notice=document.getElementById('brand-load-status');if(notice){notice.hidden=false;notice.textContent='保存済みの内容を読み込めないため、初期表示にしています。'+error.message;}
  });
})();
