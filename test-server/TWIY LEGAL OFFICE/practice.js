(async () => {
  let articles = window.TWIY_CONTENT.articles;
  let loadWarning;
  try { articles = await window.TWIY_DATA.request('/api/articles'); }
  catch {
    loadWarning = document.createElement('p'); loadWarning.className = 'content-load-warning'; loadWarning.setAttribute('role', 'status'); loadWarning.textContent = '記事の更新内容を読み込めなかったため、初期原稿を表示しています。';
  }
  const slug = document.body.dataset.practice;
  if (slug && Object.hasOwn(articles, slug)) {
    document.querySelector('#main-content').innerHTML = window.TWIY_VIEW.render(articles[slug], slug);
    document.title = `${articles[slug].title} | TWIY法律事務所`;
    document.querySelector('meta[name="description"]').content = articles[slug].summary;
    const related = document.querySelector('#related-areas');
    for (const [key, article] of Object.entries(articles)) {
      if (key === slug || !Object.hasOwn(window.TWIY_CONTENT.articles, key)) continue;
      const link = document.createElement('a'); link.className = 'related-card'; link.href = `practice-${key}.html`;
      for (const [tag, text] of [['span',article.english],['h3',article.title],['p',article.summary],['span','詳しく見る ↗']]) {
        const node = document.createElement(tag); node.textContent = text; link.append(node);
      }
      link.lastElementChild.className = 'practice-detail-link'; related.append(link);
    }
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }
  document.querySelectorAll('[data-area]').forEach(card => {
    const article = articles[card.dataset.area]; if (!article) return;
    card.querySelector('h3').textContent = article.title;
    card.querySelector('p').textContent = article.summary;
  });
  if (loadWarning) document.querySelector('main').prepend(loadWarning);
})();
