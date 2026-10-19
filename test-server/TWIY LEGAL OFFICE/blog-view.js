(() => {
  const escape = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paragraphs = value => String(value).split(/\n\s*\n/).filter(Boolean).map(p=>`<p>${escape(p).replace(/\n/g,'<br>')}</p>`).join('');
  const date = value => String(value).replaceAll('-','.');
  function figure(photo, images = {}, cover = false) {
    const data = images[photo.imageId];
    const src = typeof data === 'string' ? data : data?.dataUrl;
    return `<figure class="blog-figure${cover ? ' blog-cover' : ''}">${src ? `<img src="${escape(src)}" alt="${escape(photo.alt)}" decoding="async"${cover ? '' : ' loading="lazy"'}>` : `<div class="blog-image-unavailable">画像を読み込めませんでした</div>`}${photo.caption ? `<figcaption>${escape(photo.caption)}</figcaption>` : ''}</figure>`;
  }
  function article(post, images = {}) {
    const headings = post.blocks.map((b,i)=>({...b,anchor:`section-${i}`})).filter(b=>b.type === 'heading');
    return `<header class="blog-article-header"><p class="overline">JOURNAL / TWIY LEGAL OFFICE</p><div class="blog-meta"><time datetime="${escape(post.date)}">${date(post.date)}</time><a href="blog.html?category=${encodeURIComponent(post.category)}">${escape(post.category)}</a></div><h1>${escape(post.title)}</h1>${post.excerpt ? `<p class="blog-article-lead">${escape(post.excerpt)}</p>` : ''}</header>${post.cover ? figure(post.cover,images,true) : ''}<div class="blog-reading-layout"><article class="blog-prose" aria-label="記事本文">${headings.length >= 2 ? `<nav class="blog-toc" aria-label="記事の目次"><p>この記事の内容</p><ol>${headings.map(b=>`<li><a href="#${b.anchor}">${escape(b.text)}</a></li>`).join('')}</ol></nav>` : ''}${post.blocks.map((block,i)=>block.type === 'heading' ? `<h2 id="section-${i}">${escape(block.text)}</h2>` : block.type === 'image' ? figure(block,images) : paragraphs(block.text)).join('')}</article></div>`;
  }
  function card(post) {
    return `<article class="blog-card"><a href="blog-post.html?id=${encodeURIComponent(post.id)}"><div class="blog-card-photo">${post.cover ? `<img data-blog-thumbnail="${escape(post.cover.imageId)}" alt="${escape(post.cover.alt)}" width="640" height="400" loading="lazy">` : '<div class="blog-no-photo"><span>TWIY</span><small>LEGAL OFFICE JOURNAL</small></div>'}</div><div class="blog-card-copy"><div class="blog-meta"><time datetime="${escape(post.date)}">${date(post.date)}</time><span>${escape(post.category)}</span></div><h2>${escape(post.title)}</h2><p>${escape(post.excerpt)}</p><span class="blog-read-more">記事を読む <span aria-hidden="true">↗</span></span></div></a></article>`;
  }
  function pageNumbers(page, total) {
    return [...new Set([1,total,...Array.from({length:5},(_,i)=>page+i-2).filter(n=>n>=1&&n<=total)])].sort((a,b)=>a-b);
  }
  window.TWIY_BLOG_VIEW = { escape, article, card, pageNumbers };
})();
