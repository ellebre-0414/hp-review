(() => {
  const $ = selector => document.querySelector(selector);
  const model = window.TWIY_CONTENT;
  const form = $('#article-form');
  let articles, current = 'civil', dirty = false;
  const labels = { title:'分野名', english:'英語の表記', summary:'一覧カード・検索向けの短い紹介', headline:'冒頭のメッセージ', intro:'冒頭の本文', concernsTitle:'お悩みの見出し', supportTitle:'対応内容の見出し', flowTitle:'相談の進め方の見出し', flowText:'相談の進め方の本文', preparation:'ご相談にあたっての案内', ctaTitle:'問い合わせ前のメッセージ', ctaText:'問い合わせ前の本文' };
  const setDirty = () => { dirty = true; $('#article-save-status').textContent = '保存されていない変更があります。'; };
  window.TWIY_EDITOR = { isDirty:() => dirty, discard:() => { dirty = false; } };
  addEventListener('beforeunload', event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
  form.addEventListener('input', setDirty);
  function field(key, label, value, max, multiline = true) {
    const wrapper = document.createElement('div'); wrapper.className = 'field';
    const caption = document.createElement('label'); caption.htmlFor = `article-${key}`; caption.textContent = label;
    const input = document.createElement(multiline ? 'textarea' : 'input'); input.id = caption.htmlFor; input.name = key; input.maxLength = max; input.required = true; input.value = value;
    if (multiline) input.rows = ['intro','flowText','preparation','body','answer'].some(v => key.includes(v)) ? 5 : 3;
    wrapper.append(caption,input); return wrapper;
  }
  function repeater(key, values, shape) {
    const container = document.createElement('div'); container.dataset.repeater = key;
    const list = document.createElement('div'); const add = document.createElement('button'); add.type = 'button'; add.className = 'outline-button'; add.textContent = key === 'support' ? '対応内容を追加する' : '質問を追加する';
    let next = 0;
    function row(value) {
      const entry = document.createElement('div'); entry.className = 'editor-row'; entry.dataset.row = '';
      for (const [name, label, max] of shape) {
        const item = field(`${key}-${next}-${name}`, label, value[name] || '', max, name !== 'title');
        item.querySelector('input,textarea').dataset.part = name; entry.append(item);
      }
      next++;
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'outline-button'; remove.textContent = key === 'support' ? 'この対応内容を削除' : 'この質問を削除';
      remove.addEventListener('click', () => {
        if (list.childElementCount <= 1) { $('#article-save-status').textContent = '最低1項目は残してください。'; return; }
        if (!confirm('この項目を編集欄から削除しますか？保存するまでは掲載内容に影響しません。')) return;
        entry.remove(); add.disabled = false; setDirty(); add.focus();
      });
      entry.append(remove); list.append(entry); add.disabled = list.childElementCount >= 6;
      return entry;
    }
    values.forEach(row);
    add.addEventListener('click', () => { const entry = row({}); setDirty(); entry.querySelector('input,textarea').focus(); });
    container.append(list,add); return container;
  }
  function fill(article) {
    const root = $('#article-fields'); root.replaceChildren();
    const sections = [
      ['基本情報・冒頭のメッセージ',['title','english','summary','headline','intro']],
      ['01 / このようなお悩みに',['concernsTitle']],
      ['02 / お手伝いできること',['supportTitle']],
      ['03 / 相談の進め方',['flowTitle','flowText','preparation']],
      ['04 / よくあるご質問',[]],
      ['問い合わせへのご案内',['ctaTitle','ctaText']]
    ];
    sections.forEach(([label, keys], i) => {
      const section = document.createElement('details'); section.className = 'editor-section'; section.open = i === 0;
      const heading = document.createElement('summary'); heading.textContent = label; section.append(heading);
      for (const key of keys) section.append(field(key, labels[key], article[key], model.fields[key], !['title','english','concernsTitle','supportTitle','flowTitle','ctaTitle'].includes(key)));
      if (i === 1) {
        section.append(field('concerns','お悩みの一覧（1行につき1項目・最大8項目）',article.concerns.join('\n'),2407));
      }
      if (i === 2) section.append(repeater('support',article.support,[['title','対応内容の小見出し',120],['body','本文',2000]]));
      if (i === 4) section.append(repeater('faqs',article.faqs,[['question','質問',300],['answer','回答',1600]]));
      root.append(section);
    });
    $('#article-public-link').href = `practice-${current}.html`;
  }
  function read() {
    const result = {};
    for (const key of Object.keys(model.fields)) result[key] = form.elements.namedItem(key).value;
    result.concerns = form.elements.namedItem('concerns').value.split(/\r?\n/).map(v=>v.trim()).filter(Boolean);
    for (const name of ['support','faqs']) result[name] = [...form.querySelectorAll(`[data-repeater="${name}"] [data-row]`)].map(row=>Object.fromEntries([...row.querySelectorAll('[data-part]')].map(input=>[input.dataset.part,input.value])));
    return model.validateArticle(result);
  }
  function valid() {
    const invalid = [...form.querySelectorAll('input,textarea')].find(input => !input.validity.valid || !input.value.trim());
    if (invalid) { invalid.closest('details').open = true; invalid.focus(); throw new Error('未入力の項目、または文字数を超えた項目があります。'); }
    return read();
  }
  // Validate ourselves so that required controls in closed sections can be revealed first.
  form.noValidate = true;
  document.addEventListener('twiy-admin-ready', async () => {
    try {
      articles = await window.TWIY_ADMIN.api('/api/articles');
      fill(articles[current]); dirty = false; $('#article-save-status').textContent = '保存済みの記事を読み込みました。';
    } catch (error) { $('#article-save-status').textContent = error.message; }
  });
  $('#article-select').addEventListener('change', event => {
    if (!articles) return;
    if (dirty && !confirm('保存していない変更があります。変更を破棄して別の分野に移動しますか？')) { event.target.value = current; return; }
    current = event.target.value; fill(articles[current]); dirty = false; $('#article-save-status').textContent = '保存済みの記事を読み込みました。';
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    try {
      const article = valid(); const slug = current;
      $('#save-article').disabled = true; $('#article-select').disabled = true; $('#article-save-status').textContent = '保存中…';
      await window.TWIY_ADMIN.api('/api/admin/articles', { slug, article });
      articles[slug] = article;
      // Do not discard edits made while the save was in flight.
      dirty = JSON.stringify(read()) !== JSON.stringify(article);
      $('#article-save-status').textContent = dirty ? '保存しました。その後に入力した変更は、まだ保存されていません。' : '保存しました。詳細ページとトップの一覧を開き直すと反映されます。';
    } catch (error) { $('#article-save-status').textContent = error.message; }
    finally { $('#save-article').disabled = false; $('#article-select').disabled = false; }
  });
  $('#preview-article').addEventListener('click', () => {
    try { $('#article-preview-body').innerHTML = window.TWIY_VIEW.render(valid(), current); $('#article-preview').showModal(); $('#article-preview').scrollTop = 0; }
    catch (error) { $('#article-save-status').textContent = error.message; }
  });
  $('#close-preview').addEventListener('click', () => $('#article-preview').close());
  // A preview must not navigate away and silently lose a draft.
  $('#article-preview-body').addEventListener('click', event => { const link = event.target.closest('a'); if (link) { event.preventDefault(); if (link.hash && link.getAttribute('href').startsWith('#')) $('#article-preview-body').querySelector(link.hash)?.scrollIntoView(); } });
  $('#export-articles').addEventListener('click', async () => {
    try {
      const saved = await window.TWIY_ADMIN.api('/api/articles');
      const url = URL.createObjectURL(new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),articles:saved},null,2)],{type:'application/json'}));
      const link = document.createElement('a'); link.href = url; link.download = `TWIY-articles-${new Date().toISOString().slice(0,10)}.json`; document.body.append(link); link.click(); link.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
      $('#backup-status').textContent = '保存済みの記事を書き出しました。未保存の変更は含まれません。';
    } catch (error) { $('#backup-status').textContent = error.message; }
  });
  $('#import-article').addEventListener('click', () => $('#article-backup-file').click());
  $('#article-backup-file').addEventListener('change', async event => {
    const file = event.target.files[0]; if (!file) return;
    try {
      if (file.size > 512000) throw new Error('ファイルが大きすぎます。記事のバックアップファイルを選んでください。');
      const data = JSON.parse(await file.text());
      if (data.version !== 1 || !data.articles?.[current]) throw new Error('この分野の記事が含まれたバックアップを選んでください。');
      const article = model.validateArticle(data.articles[current]);
      if (dirty && !confirm('現在の未保存の変更を、読み込んだ記事で置き換えますか？')) return;
      fill(article); setDirty(); $('#backup-status').textContent = '編集欄に読み込みました。内容を確認して保存してください。';
    } catch (error) { $('#backup-status').textContent = error instanceof SyntaxError ? '記事のバックアップファイルを読み込めませんでした。' : error.message; }
    finally { event.target.value = ''; }
  });
})();
