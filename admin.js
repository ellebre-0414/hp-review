(() => {
  const $ = (selector) => document.querySelector(selector);
  let csrf = '';
  let setup = false;
  const fragment = new URLSearchParams(location.hash.slice(1));
  const initialKey = fragment.get('setup') || '';
  if (location.hash) history.replaceState(null, '', location.href.split('#')[0]);
  $('#setup-key').value = initialKey;
  async function api(url, data) {
    if (window.TWIY_DATA.offline) return window.TWIY_DATA.request(url, data);
    const response = await fetch(url, { cache: 'no-store', ...(data === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf }, body: JSON.stringify(data) }) });
    const result = await response.json();
    if (!response.ok) {
      if (response.status === 401) { $('#admin-workspace').hidden = true; $('#auth-panel').hidden = false; $('#logout').hidden = true; }
      throw new Error(result.error || '処理できませんでした。');
    }
    return result;
  }
  window.TWIY_ADMIN = { api };
  async function loadSettings() {
    const settings = await api('/api/admin/settings');
    const form = $('#settings-form');
    settings.public.fees.forEach((fee, i) => { form.elements[`fee${i}`].value = fee; });
    for (const field of ['feeNotice','address','station','hours','mapUrl','accessNotice']) form.elements[field].value = settings.public[field];
    form.elements.accepting.checked = settings.public.accepting;
    for (const field of ['recipient','host','port','user','from']) form.elements[field].value = settings.mail[field];
    form.elements.smtpPassword.value = '';
    form.elements.clearPassword.checked = false;
    $('#smtp-password-state').textContent = settings.mail.passwordConfigured ? '設定済みです。空欄のまま保存すると現在のパスワードを保持します。' : '未設定です。';
  }
  async function enter() {
    $('#setup-key-field').hidden = true; $('#setup-key').required = false;
    $('#confirm-password-field').hidden = true; $('#confirm-password').required = false;
    $('#auth-heading').textContent = 'ログイン'; $('#auth-submit').textContent = 'ログイン';
    $('#admin-password').autocomplete = 'current-password';
    $('#auth-panel').hidden = true; $('#admin-workspace').hidden = false; $('#logout').hidden = false;
    $('#admin-status').textContent = window.TWIY_DATA.offline ? 'テスト用管理画面にログインしています。' : '管理者としてログインしています。';
    $('#admin-password').value = ''; $('#confirm-password').value = ''; $('#setup-key').value = '';
    await loadSettings();
    document.dispatchEvent(new Event('twiy-admin-ready'));
    showTab('articles');
  }
  $('#auth-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const password = $('#admin-password').value;
    if (setup && password !== $('#confirm-password').value) { $('#admin-status').textContent = '確認用パスワードが一致しません。'; return; }
    $('#auth-submit').disabled = true;
    try { const result = await api(`/api/admin/${setup ? 'setup' : 'login'}`, { password, token: $('#setup-key').value }); csrf = result.csrf; setup = false; await enter(); }
    catch (e) { $('#admin-status').textContent = e.message; }
    finally { $('#auth-submit').disabled = false; }
  });
  $('#logout').addEventListener('click', async () => {
    if ((window.TWIY_EDITOR?.isDirty() || window.TWIY_BLOG_EDITOR?.isDirty()) && !confirm('保存していない記事の変更があります。破棄してログアウトしますか？')) return;
    try { await api('/api/admin/logout', {}); window.TWIY_EDITOR?.discard(); window.TWIY_BLOG_EDITOR?.discard(); location.reload(); } catch (e) { $('#admin-status').textContent = e.message; }
  });
  $('#settings-form').addEventListener('submit', async (event) => {
    event.preventDefault(); const form = event.currentTarget; const data = Object.fromEntries(new FormData(form));
    const publicData = { fees: [0,1,2,3,4].map(i=>data[`fee${i}`]), accepting: form.elements.accepting.checked };
    for (const field of ['feeNotice','address','station','hours','mapUrl','accessNotice']) publicData[field] = data[field];
    $('#save-settings').disabled = true; $('#save-status').textContent = '保存中…';
    try { await api('/api/admin/settings', { public: publicData, mail: { recipient:data.recipient, from:data.from, host:data.host, port:Number(data.port), user:data.user, password:data.smtpPassword, clearPassword:form.elements.clearPassword.checked } }); await loadSettings(); $('#save-status').textContent = '保存しました。公開ページで確認できます。'; }
    catch (e) { $('#save-status').textContent = e.message; }
    finally { $('#save-settings').disabled = false; }
  });
  async function loadInquiries() {
    const list = $('#inquiry-list'); list.textContent = '読み込み中…';
    try {
      const entries = await api('/api/admin/inquiries'); list.replaceChildren();
      if (!entries.length) { list.textContent = 'お問い合わせはまだありません。'; return; }
      for (const entry of entries) {
        const details = document.createElement('details'); details.className = 'inquiry-card';
        const summary = document.createElement('summary'); summary.textContent = `${entry.is_read ? '既読' : '未読'} · #${entry.id} · ${new Date(entry.created).toLocaleString('ja-JP')} · ${entry.body.name}`;
        details.append(summary);
        const delivery = document.createElement('p'); delivery.textContent = `メール通知：${entry.mail_status}`; details.append(delivery);
        const dl = document.createElement('dl'); dl.className = 'review-list';
        for (const [key,label] of Object.entries({ name:'お名前',kana:'ふりがな',email:'メール',phone:'電話',category:'種類',message:'内容' })) {
          const row=document.createElement('div'), term=document.createElement('dt'), value=document.createElement('dd'); term.textContent=label; value.textContent=entry.body[key]||'未入力'; row.append(term,value); dl.append(row);
        }
        details.append(dl);
        details.addEventListener('toggle', async () => {
          if (details.open && !entry.is_read) { try { await api('/api/admin/read', { id:entry.id }); entry.is_read=1; summary.textContent=summary.textContent.replace(/^未読/,'既読'); } catch (e) { $('#admin-status').textContent=e.message; } }
        });
        list.append(details);
      }
    } catch (e) { list.textContent=e.message; }
  }
  function showTab(selected) {
    for (const name of ['articles','blog','settings','inquiries']) {
      $(`#${name}-panel`).hidden = name !== selected;
      $(`#${name}-tab`).setAttribute('aria-pressed', String(name === selected));
    }
    if (selected === 'inquiries') void loadInquiries();
  }
  for (const name of ['articles','blog','settings','inquiries']) $(`#${name}-tab`).addEventListener('click', () => showTab(name));
  $('#refresh-inquiries').addEventListener('click',loadInquiries);
  (async()=>{
    try {
      if (window.TWIY_DATA.offline) {
        $('#demo-notice').hidden = false;
        $('#auth-description').textContent = 'テスト用の管理者パスワードを入力してください。';
        $('#settings-tab').textContent = '料金・アクセス';
        $('#inquiries-tab').hidden = true;
        const mail = $('#smtp-host').closest('fieldset'); mail.hidden = true; mail.disabled = true;
        const accepting = $('#accepting').closest('fieldset'); accepting.hidden = true; accepting.disabled = true;
        $('#settings-panel > p').textContent = '保存すると、このブラウザーで各ページを次に開いたときに反映されます。テスト版ではメール受付・送信は行いません。';
      }
      const state=await api('/api/admin/session'); csrf=state.csrf||''; setup=state.needsSetup;
      if(state.authenticated) return await enter();
      $('#auth-panel').hidden=false; $('#admin-status').textContent='';
      if(setup){ $('#auth-heading').textContent='管理者の初回設定'; $('#auth-description').textContent='初期設定キーと、14文字以上の管理者パスワードを入力してください。'; $('#setup-key-field').hidden=false; $('#setup-key').required=true; $('#confirm-password-field').hidden=false; $('#confirm-password').required=true; $('#admin-password').minLength=14; $('#admin-password').autocomplete='new-password'; $('#auth-submit').textContent='管理者を設定する'; }
    } catch { $('#admin-status').textContent='管理画面はサーバーの起動が必要です。起動後、案内されたURLからアクセスしてください。'; }
  })();
})();
