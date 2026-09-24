window.TWIY_VIEW = { render: function renderArticle(article, slug) {
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const paragraphs = value => value.split(/\n+/).filter(Boolean).map(line => `<p>${esc(line)}</p>`).join('');
  const contact = `contact.html?area=${slug}`;
  return `<section class="page-hero practice-hero"><div class="page-width">
<nav class="breadcrumbs" aria-label="パンくずリスト"><a href="index.html">ホーム</a><span aria-hidden="true">/</span><a href="index.html#practice">取扱分野</a><span aria-hidden="true">/</span><span aria-current="page">${esc(article.title)}</span></nav>
<div class="practice-hero-grid"><div><p class="overline">${esc(article.english)}</p><h1>${esc(article.title)}</h1><p class="practice-headline">${esc(article.headline)}</p></div><div class="practice-hero-intro">${paragraphs(article.intro)}<a class="inline-link" href="#concerns">このようなお悩みに <span aria-hidden="true">↓</span></a></div></div>
</div></section>
<div class="page-width article-layout">
<article class="practice-article" aria-label="${esc(article.title)}のご案内">
<section class="article-section" id="concerns"><p class="kicker">01 / YOUR CONCERNS</p><h2>${esc(article.concernsTitle)}</h2><ul class="concern-list">${article.concerns.map(v=>`<li>${esc(v)}</li>`).join('')}</ul></section>
<section class="article-section" id="support"><p class="kicker">02 / OUR SUPPORT</p><h2>${esc(article.supportTitle)}</h2><div class="support-list">${article.support.map((item,i)=>`<section><span class="card-no">${String(i+1).padStart(2,'0')}</span><div><h3>${esc(item.title)}</h3>${paragraphs(item.body)}</div></section>`).join('')}</div></section>
<section class="article-section" id="consultation"><p class="kicker">03 / CONSULTATION</p><h2>${esc(article.flowTitle)}</h2>${paragraphs(article.flowText)}<div class="article-note"><h3>ご相談にあたって</h3>${paragraphs(article.preparation)}</div><a class="inline-link" href="fees.html">費用とご依頼までの流れを見る <span aria-hidden="true">→</span></a></section>
<section class="article-section" id="questions"><p class="kicker">04 / QUESTIONS</p><h2>よくあるご質問</h2><div class="article-faq">${article.faqs.map(item=>`<details><summary><span aria-hidden="true">Q.</span>${esc(item.question)}</summary><div>${paragraphs(item.answer)}</div></details>`).join('')}</div></section>
</article>
<aside class="practice-sidebar" aria-label="この分野のご案内"><div class="sidebar-inner"><p class="kicker">このページのご案内</p><nav aria-label="ページ内の目次"><a href="#concerns">01 <span>このようなお悩みに</span></a><a href="#support">02 <span>お手伝いできること</span></a><a href="#consultation">03 <span>相談の進め方</span></a><a href="#questions">04 <span>よくあるご質問</span></a></nav><div class="sidebar-contact"><p>まずは、状況を<br>お聞かせください。</p><a class="solid-link" href="${contact}">この分野を相談する <span aria-hidden="true">↗</span></a><a class="inline-link" href="fees.html">料金案内 →</a><small>受付状況はお問い合わせページで<br>ご確認いただけます。</small></div></div></aside>
</div>
<section class="article-contact" aria-labelledby="article-cta-title"><div class="page-width"><p class="overline">LET'S TALK</p><h2 id="article-cta-title">${esc(article.ctaTitle)}</h2><div class="article-cta-copy">${paragraphs(article.ctaText)}</div><a class="round-link" href="${contact}">この内容について問い合わせる <span aria-hidden="true">↗</span></a><p class="article-cta-note">お問い合わせだけで、相談予約やご依頼が確定することはありません。<br>受付状況・相談方法は、リンク先でご確認ください。</p></div></section>
<section class="page-width related-section" aria-labelledby="related-title"><div class="related-heading"><p class="kicker">PRACTICE AREAS</p><h2 id="related-title">ほかの取扱分野</h2><a class="inline-link" href="index.html#practice">取扱分野の一覧へ →</a></div><div class="related-grid" id="related-areas"></div></section>`;
} };
