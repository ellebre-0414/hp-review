/* Plain-text blog content shared by the offline editor and authenticated server. */
(() => {
  const categories = ['お知らせ','暮らしと法律','事業と法律','事務所の日々'];
  const idPattern = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/;
  const error = (message, code = 400) => Object.assign(new Error(message), { code });
  const text = (value, max, label) => {
    if (typeof value !== 'string' || value.length > max) throw error(`${label}の内容・文字数をご確認ください。`);
    return value.trim();
  };
  function validatePost(input) {
    if (!input || !idPattern.test(input.id || '')) throw error('記事の番号を確認してください。');
    if (!['draft','published','trash'].includes(input.status)) throw error('掲載状態を確認してください。');
    const post = { id:input.id, title:text(input.title,120,'タイトル'), excerpt:text(input.excerpt,300,'紹介文'), category:text(input.category,40,'カテゴリ'), date:text(input.date,10,'掲載日'), status:input.status };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date) || !Number.isFinite(Date.parse(post.date)) || new Date(post.date).toISOString().slice(0,10) !== post.date) throw error('掲載日を確認してください。');
    if (!post.category) throw error('カテゴリを入力してください。');
    if (!post.title && post.status === 'published') throw error('掲載する記事にはタイトルを入力してください。');
    post.title ||= '無題の記事';
    const photo = value => {
      if (!value || !idPattern.test(value.imageId || '')) throw error('写真を選択してください。');
      const result = { imageId:value.imageId, alt:text(value.alt,300,'画像の説明'), caption:text(value.caption || '',500,'キャプション') };
      if (post.status === 'published' && !result.alt) throw error('写真の内容が伝わる説明（読み上げ用）を入力してください。');
      return result;
    };
    post.cover = input.cover ? photo(input.cover) : null;
    if (!Array.isArray(input.blocks) || input.blocks.length > 60) throw error('本文は60ブロック以内にしてください。');
    post.blocks = input.blocks.map(block => {
      if (block?.type === 'image') return { type:'image', ...photo(block) };
      if (!['heading','text'].includes(block?.type)) throw error('本文の形式を確認してください。');
      return { type:block.type, text:text(block.text,block.type === 'heading' ? 160 : 6000,'本文') };
    }).filter(block => block.type === 'image' || block.text);
    if (post.status === 'published' && !post.blocks.length) throw error('掲載する記事の本文を入力してください。');
    if (JSON.stringify(post).length > 50000) throw error('記事が長すぎます。本文を分けてください。');
    if (imageIds(post).length > 8) throw error('写真は1記事につき8枚までです。');
    return post;
  }
  function imageIds(post) { return [...new Set([post.cover?.imageId, ...post.blocks.filter(b=>b.type === 'image').map(b=>b.imageId)].filter(Boolean))]; }
  function validateImage(input) {
    if (!input || !idPattern.test(input.id || '')) throw error('画像の番号を確認してください。');
    const check = (data, max) => {
      if (typeof data !== 'string' || data.length > max || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(data)) throw error('JPEG・PNG・WebPの写真を選択してください。画像の容量が大きすぎる場合は縮小してください。');
      const [prefix, encoded] = data.split(',');
      let bytes; try { bytes = atob(encoded); } catch { throw error('画像の形式を確認してください。'); }
      const valid = prefix.includes('/jpeg') ? bytes.startsWith('\xff\xd8\xff') : prefix.includes('/png') ? bytes.startsWith('\x89PNG\r\n\x1a\n') : bytes.startsWith('RIFF') && bytes.slice(8,12) === 'WEBP';
      if (!valid) throw error('画像の形式を確認してください。');
      return data;
    };
    return { id:input.id, dataUrl:check(input.dataUrl,1200000), thumbnail:check(input.thumbnail,180000) };
  }
  function validateSave(input) {
    const post = validatePost(input?.post);
    if (!Number.isInteger(input.revision) || input.revision < 0) throw error('保存状態を確認してください。');
    if (!Array.isArray(input.images) || input.images.length > 8) throw error('写真は8枚までです。');
    const images = input.images.map(validateImage);
    const refs = imageIds(post);
    if (new Set(images.map(i=>i.id)).size !== images.length || images.some(i=>!refs.includes(i.id))) throw error('記事内で使う画像だけを保存してください。');
    return { post, images, revision:input.revision };
  }
  function summary(post) {
    return { id:post.id, title:post.title, excerpt:post.excerpt || post.blocks.filter(b=>b.type === 'text').map(b=>b.text).join(' ').slice(0,180), category:post.category, date:post.date, status:post.status, cover:post.cover, revision:post.revision, updatedAt:post.updatedAt };
  }
  function list(posts, options = {}, admin = false) {
    const base = posts.filter(p=>admin ? options.state === 'trash' ? p.status === 'trash' : p.status !== 'trash' : p.status === 'published');
    const categories = [...new Set(base.map(p=>p.category))].sort((a,b)=>a.localeCompare(b,'ja'));
    const q = String(options.q || '').trim().slice(0,100).normalize('NFKC').toLocaleLowerCase('ja');
    const filtered = base.filter(p=>(!options.category || p.category === options.category) && (!admin || !options.state || ['all','trash'].includes(options.state) || p.status === options.state) && (!q || [p.title,p.excerpt,p.category,...p.blocks.filter(b=>b.type !== 'image').map(b=>b.text)].join(' ').normalize('NFKC').toLocaleLowerCase('ja').includes(q))).sort((a,b)=>b.date.localeCompare(a.date) || (b.updatedAt || '').localeCompare(a.updatedAt || '') || a.id.localeCompare(b.id));
    const pageSize = admin ? 10 : 9;
    const totalPages = Math.max(1,Math.ceil(filtered.length/pageSize));
    const page = Math.min(totalPages,Math.max(1,Number.parseInt(options.page,10) || 1));
    return { items:filtered.slice((page-1)*pageSize,page*pageSize).map(summary), total:filtered.length, page, totalPages, categories };
  }
  function prepareSave(input, existing, knownImageIds) {
    const checked = validateSave(input);
    if ((existing?.revision || 0) !== checked.revision) throw error('別の画面でこの記事が更新されています。入力内容をバックアップし、一覧から記事を開き直してください。',409);
    const incoming = new Set(checked.images.map(i=>i.id));
    if (checked.images.some(i=>knownImageIds.includes(i.id))) throw error('同じ番号の写真は上書きできません。写真を選び直してください。',409);
    if (imageIds(checked.post).some(id=>!knownImageIds.includes(id) && !incoming.has(id))) throw error('写真が見つかりません。選び直してください。');
    return { ...checked, post:{...checked.post,revision:checked.revision+1,updatedAt:new Date().toISOString()} };
  }
  globalThis.TWIY_BLOG = { categories, idPattern, error, validatePost, validateImage, validateSave, imageIds, list, summary, prepareSave };
})();
