(async () => {
  const $ = selector => document.querySelector(selector);
  const view = window.TWIY_BLOG_VIEW;
  const request = window.TWIY_DATA.request;
  let sequence = 0, thumbnailObserver;
  async function hydrateThumbnails(root) {
    thumbnailObserver?.disconnect();
    const images = root.querySelectorAll('[data-blog-thumbnail]');
    const observer = new IntersectionObserver(entries=>{
      for(const entry of entries) if(entry.isIntersecting) {
        observer.unobserve(entry.target);
        request(`/api/blog/image?id=${encodeURIComponent(entry.target.dataset.blogThumbnail)}&size=thumb`).then(data=>{entry.target.src=data.dataUrl;}).catch(()=>{entry.target.alt='写真を読み込めませんでした';});
      }
    },{rootMargin:'300px'});
    thumbnailObserver=observer;
    images.forEach(img=>observer.observe(img));
  }
  function urlWith(values) {
    const url = new URL(location.href);
    for(const [key,value] of Object.entries(values)) { if(value) url.searchParams.set(key,value); else url.searchParams.delete(key); }
    url.hash=''; return url.href;
  }
  function navigate(values) { history.pushState(null,'',urlWith(values)); void loadList(true); }
  async function loadList(scroll = false) {
    const run = ++sequence, params = new URLSearchParams(location.search);
    const q = (params.get('q') || '').slice(0,100), category = params.get('category') || '';
    thumbnailObserver?.disconnect();
    $('#blog-search').value=q;
    $('#blog-results').setAttribute('aria-busy','true'); $('#blog-results-status').textContent='記事を読み込んでいます…';
    $('#blog-grid').replaceChildren(); $('#blog-pagination').replaceChildren(); $('#blog-empty').hidden=true;
    try {
      const data = await request(`/api/blog?${new URLSearchParams({q,category,page:params.get('page') || '1'})}`);
      if(run!==sequence)return;
      const categories = [...new Set([...data.categories,...(category ? [category] : [])])];
      $('#blog-categories').replaceChildren();
      for(const name of ['',...categories]) {
        const button=document.createElement('button'); button.type='button'; button.textContent=name || 'すべて'; button.setAttribute('aria-pressed',String(name===category)); button.addEventListener('click',()=>navigate({category:name,page:''})); $('#blog-categories').append(button);
      }
      $('#blog-results-status').textContent=`${data.total}件の記事${data.total ? ` ／ ${data.page} / ${data.totalPages}ページ` : ''}`;
      if(!data.total) {
        $('#blog-empty').hidden=false; $('#blog-empty h2').textContent=q || category ? '条件に合う記事が見つかりませんでした' : 'これから、少しずつお届けします。';
        $('#blog-empty p').textContent=q || category ? '検索する言葉やカテゴリを変えてお試しください。' : '事務所からのお知らせや、暮らしと事業にまつわる話題を掲載していきます。';
        $('#blog-reset').hidden=!(q || category);
      } else {
        $('#blog-grid').innerHTML=data.items.map(view.card).join(''); void hydrateThumbnails($('#blog-grid'));
      }
      if(data.totalPages>1) {
        const pages=[...(data.page>1 ? [[data.page-1,'前へ']] : []),...view.pageNumbers(data.page,data.totalPages).map(n=>[n,String(n)]),...(data.page<data.totalPages ? [[data.page+1,'次へ']] : [])];
        for(const [number,label] of pages) {
          const link=document.createElement('a'); link.href=urlWith({page:String(number)}); link.textContent=label;
          if(number===data.page && label===String(number)) link.setAttribute('aria-current','page');
          if(/^\d+$/.test(label)) link.setAttribute('aria-label',`${number}ページ目`);
          link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();navigate({page:String(number)});}); $('#blog-pagination').append(link);
        }
      }
    } catch(error) { if(run!==sequence)return; $('#blog-results-status').textContent='記事を読み込めませんでした。ページを開き直してお試しください。'; }
    finally { if(run===sequence){$('#blog-results').setAttribute('aria-busy','false'); if(scroll) $('#blog-results').scrollIntoView({block:'start'});} }
  }
  if($('#blog-grid')) {
    $('#blog-search-form').addEventListener('submit',event=>{event.preventDefault();navigate({q:$('#blog-search').value.trim(),page:''});});
    $('#blog-reset').addEventListener('click',()=>navigate({q:'',category:'',page:''}));
    addEventListener('popstate',()=>void loadList()); await loadList(); return;
  }
  const articleRoot=$('#blog-article');
  try {
    const id=new URLSearchParams(location.search).get('id');
    if(!id || !window.TWIY_BLOG.idPattern.test(id)) throw Object.assign(new Error(),{code:404});
    const post=await request(`/api/blog/post?id=${encodeURIComponent(id)}`);
    const images={}; await Promise.all(window.TWIY_BLOG.imageIds(post).map(async imageId=>{try{images[imageId]=await request(`/api/blog/image?id=${encodeURIComponent(imageId)}`);}catch{}}));
    articleRoot.innerHTML=view.article(post,images); articleRoot.setAttribute('aria-busy','false');
    document.title=`${post.title} | ブログ | TWIY法律事務所`; document.querySelector('meta[name="description"]').content=post.excerpt || post.title;
    $('#blog-current-title').textContent=post.title; $('#blog-post-end').hidden=false;
    try {
      const related=await request(`/api/blog?category=${encodeURIComponent(post.category)}`);
      const items=related.items.filter(item=>item.id!==post.id).slice(0,3);
      if(items.length){$('#blog-related').hidden=false;$('#blog-related-grid').innerHTML=items.map(view.card).join('');void hydrateThumbnails($('#blog-related-grid'));}
    } catch {}
    if(location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  } catch(error) {
    articleRoot.setAttribute('aria-busy','false'); const h=document.createElement('h1'); h.textContent=error.code===404 ? '記事が見つかりませんでした' : '記事を読み込めませんでした';
    const p=document.createElement('p'); p.textContent=error.code===404 ? 'この記事は掲載前、または掲載が終了している可能性があります。' : '通信状況やブラウザーの保存設定をご確認のうえ、ページを開き直してください。';
    const a=document.createElement('a');a.href='blog.html';a.className='inline-link';a.textContent='ブログ一覧へ戻る →';articleRoot.replaceChildren(h,p,a);
  }
})();
