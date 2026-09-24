(async () => {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const review = document.querySelector('#contact-review');
  const notice = document.querySelector('#contact-availability');
  const status = document.querySelector('#form-status');
  const sendButton = document.querySelector('#send-inquiry');
  const editButton = document.querySelector('#edit-inquiry');
  const settings = await window.TWIY_PUBLIC;
  const endpoint = settings?.accepting ? '/api/contact' : '';
  const labels = { name: 'お名前', kana: 'ふりがな', email: 'メールアドレス', phone: '電話番号', category: 'お問い合わせの種類', message: 'お問い合わせ内容' };
  let payload;
  let busy = false;
  let sent = false;
  const area = new URLSearchParams(location.search).get('area');
  const category = window.TWIY_CONTENT.articles[area]?.title;
  if (category) form.elements.category.value = category;
  if (window.TWIY_DATA.offline) notice.textContent = 'テスト表示です。入力と内容確認までお試しいただけます。メールは送信されません。実際の個人情報・相談内容の入力はお控えください。';
  if (endpoint) {
    notice.textContent = '必要事項をご入力ください。内容を確認したうえで、事務所からご連絡します。';
    sendButton.disabled = false;
    sendButton.textContent = 'この内容で送信する';
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    payload = Object.fromEntries(new FormData(form));
    for (const key of Object.keys(labels)) payload[key] = payload[key].trim();
    for (const key of ['name', 'message']) {
      const field = form.elements.namedItem(key);
      field.setCustomValidity(payload[key] ? '' : '内容を入力してください。');
      if (!field.reportValidity()) return;
    }
    const list = review.querySelector('dl');
    list.replaceChildren();
    for (const [key, label] of Object.entries(labels)) {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const value = document.createElement('dd');
      term.textContent = label;
      value.textContent = payload[key] || '未入力';
      row.append(term, value);
      list.append(row);
    }
    status.textContent = '';
    form.hidden = true;
    review.hidden = false;
    review.querySelector('h2').focus();
    review.scrollIntoView({ block: 'start' });
  });
  form.addEventListener('input', (event) => event.target.setCustomValidity?.(''));
  editButton.addEventListener('click', () => {
    if (busy || sent) return;
    review.hidden = true;
    form.hidden = false;
    form.elements.namedItem('name').focus();
  });
  sendButton.addEventListener('click', async () => {
    if (!endpoint || !payload || busy || sent) return;
    busy = true;
    sendButton.disabled = true;
    editButton.disabled = true;
    sendButton.textContent = '送信中…';
    status.textContent = '';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload), signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('not-accepted');
      sent = true;
      review.hidden = true;
      form.reset();
      payload = undefined;
      const success = document.querySelector('#contact-success');
      success.hidden = false;
      success.querySelector('h2').focus();
    } catch {
      status.textContent = '送信結果を確認できませんでした。入力内容はこの画面に残っています。重複送信を避けるため、通信状況と受付状況をご確認のうえ、再度お試しください。';
      sendButton.disabled = false;
      editButton.disabled = false;
      sendButton.textContent = 'この内容で送信する';
    } finally {
      clearTimeout(timer);
      busy = false;
    }
  });
})();
