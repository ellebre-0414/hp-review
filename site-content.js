window.TWIY_PUBLIC = (async () => {
  try {
    const settings = await window.TWIY_DATA.request('/api/public');
    document.querySelectorAll('[data-site-field]').forEach((node) => {
      const key = node.dataset.siteField;
      if (settings[key]) node.textContent = settings[key];
    });
    document.querySelectorAll('[data-fee-index]').forEach((node) => {
      const fee = settings.fees[Number(node.dataset.feeIndex)];
      if (fee) node.textContent = fee;
    });
    const map = document.querySelector('#map-link');
    if (map && settings.mapUrl) { map.href = settings.mapUrl; map.hidden = false; }
    if (settings.accepting) document.querySelectorAll('[data-contact-summary]').forEach((node) => { node.textContent = 'お問い合わせフォームからご相談の概要をお送りいただけます。'; });
    if (settings.address) document.querySelectorAll('[data-address-note]').forEach(node => { node.hidden = true; });
    return settings;
  } catch (error) {
    const notice = document.createElement('p'); notice.className = 'content-load-warning'; notice.setAttribute('role', 'status');
    notice.textContent = '保存した掲載内容を読み込めなかったため、初期原稿を表示しています。' + (window.TWIY_DATA.offline ? ' ' + error.message : ' 時間をおいてページを開き直してください。');
    document.querySelector('main')?.prepend(notice); return null;
  }
})();
