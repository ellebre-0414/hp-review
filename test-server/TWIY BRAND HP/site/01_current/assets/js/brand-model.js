/* Shared, versioned brand content; no customer/order data belongs here. */
(() => {
  const field = (key, label, kind = 'text', max = 160, required = true) => ({ key, label, kind, max, required });
  const fields = {
    common: [field('homeLink','ホームのメニュー'),field('collectionLink','コレクションのメニュー'),field('blogLink','ブログのメニュー'),field('purchaseLink','購入ページのメニュー'),field('adminLink','管理者リンク'),field('footerLine','フッターのメッセージ'),field('copyright','著作権表記'),field('logo','ロゴ文字の画像','image'),field('mark','ロゴマークの画像','image')],
    home: [field('eyebrow','上部の小見出し'),field('title','メインの見出し（改行可）','textarea',90),field('tagline','日本語のメッセージ'),field('edition','右下の表記'),field('collectionTitle','コレクション入口の見出し'),field('collectionText','コレクション入口の説明','textarea',500),field('collectionAction','コレクションへ進むリンク'),field('blogTitle','ブログ入口の見出し'),field('blogText','ブログ入口の説明','textarea',500),field('blogAction','ブログへ進むリンク'),field('closing','締めくくりのメッセージ')],
    collection: [field('eyebrow','小見出し'),field('title','見出し'),field('intro','紹介文','textarea',1000),field('sampleNotice','参考写真の案内','textarea',600),field('sampleLabel','参考写真のラベル'),field('viewPhoto','写真を大きく見るボタン'),field('buyLabel','購入ページへのボタン'),field('empty','商品がないときの案内'),field('photoPlaceholder','写真未登録の案内')],
    blog: [field('eyebrow','小見出し'),field('title','見出し'),field('intro','紹介文','textarea',1000),field('empty','記事がないときの案内','textarea',600),field('readLabel','記事を読むリンク'),field('backLabel','一覧に戻るリンク'),field('missing','記事が見つからないときの案内')],
    checkout: [field('eyebrow','小見出し'),field('title','ページの見出し'),field('guide1','購入方法の説明①','textarea',2000),field('guide2','購入方法の説明②','textarea',2000),field('photo','案内写真','image'),field('photoAlt','案内写真の説明'),field('caption','案内写真のキャプション'),field('nameLabel','氏名の見出し'),field('postalLabel','郵便番号の見出し'),field('addressLabel','住所の見出し'),field('contactLabel','連絡先の見出し'),field('emailLabel','メールの見出し'),field('phoneLabel','電話の見出し'),field('productLabel','商品の見出し'),field('quantityLabel','枚数の見出し'),field('paymentLabel','支払い方法の見出し'),field('confirmLabel','内容確認ボタン'),field('reviewTitle','確認画面の見出し'),field('editLabel','修正ボタン')]
  };
  const defaults = {
    version: 1,
    common: {homeLink:'HOME',collectionLink:'COLLECTION',blogLink:'BLOG',purchaseLink:'PURCHASE',adminLink:'管理者ページ',footerLine:'THE WORLD IS YOURS',copyright:'© TWIY',logo:'assets/images/logo1.png',mark:'assets/images/logo.png'},
    home: {eyebrow:'TWIY / APPAREL',title:'WEAR\nYOUR\nWORLD.',tagline:'自分の世界を、着る。',edition:'EST. 2026 — TOKYO',collectionTitle:'COLLECTION',collectionText:'一着ずつ、その輪郭を。\nTシャツの写真とラインナップはこちら。',collectionAction:'VIEW COLLECTION',blogTitle:'BLOG',blogText:'TWIYからのお知らせと、日々の記録。',blogAction:'READ THE BLOG',closing:'YOUR CLOTHES. YOUR CHOICE. YOUR WORLD.'},
    collection: {eyebrow:'TWIY / COLLECTION',title:'THE TEES.',intro:'写真から選ぶ、TWIYのTシャツ。',sampleNotice:'現在は写真差し替え前の参考表示です。商品名・仕様・写真は仮の内容です。',sampleLabel:'参考写真',viewPhoto:'写真を見る',buyLabel:'この商品を選ぶ',empty:'コレクションは準備中です。',photoPlaceholder:'商品写真を準備中'},
    blog: {eyebrow:'TWIY / JOURNAL',title:'BLOG.',intro:'ブランドのお知らせと、日々の記録。',empty:'記事は準備中です。',readLabel:'READ MORE',backLabel:'ブログ一覧に戻る',missing:'この記事は表示されていないか、見つかりません。'},
    checkout: {eyebrow:'TWIY / ORDER',title:'Purchase',guide1:'必要事項入力の上、ご購入確認ボタンを押して下さい。お支払い方法は振込、または代引きとなります。',guide2:'お振込みを選択の方は後ほど、お振込み先のご案内を、ご入力いただいたメールアドレス、または、電話番号へショートメッセージにてお送りいたします。',photo:'assets/images/tshirt-black-back.webp',photoAlt:'参考写真：Tシャツ着用イメージ',caption:'TWIY / T-SHIRTS',nameLabel:'氏名',postalLabel:'郵便番号',addressLabel:'配送先住所',contactLabel:'メールアドレス、または電話番号',emailLabel:'メールアドレス',phoneLabel:'電話番号',productLabel:'購入商品',quantityLabel:'購入枚数',paymentLabel:'支払い方法',confirmLabel:'ご購入確認',reviewTitle:'入力内容の確認',editLabel:'入力内容を修正する'},
    products: [
      {id:'tee-01',name:'T-SHIRT 01',color:'WHITE',description:'商品説明は準備中です。',priceNote:'',visible:true,sample:true,fit:'contain',alt:'参考写真：白いTシャツの前面',photos:['assets/images/tshirt-white-front.webp']},
      {id:'tee-02',name:'T-SHIRT 02',color:'WHITE',description:'商品説明は準備中です。',priceNote:'',visible:true,sample:true,fit:'contain',alt:'参考写真：白いTシャツの背面',photos:['assets/images/tshirt-white-back.webp']},
      {id:'tee-03',name:'T-SHIRT 03',color:'BLACK',description:'商品説明は準備中です。',priceNote:'',visible:true,sample:true,fit:'contain',alt:'参考写真：黒いTシャツの背面',photos:['assets/images/tshirt-black-back.webp']}
    ],
    posts: []
  };
  const clone = value => JSON.parse(JSON.stringify(value));
  const text = (v, max, required = false) => {
    if (typeof v !== 'string' || v.length > max || (required && !v.trim())) throw Error('未入力、または長すぎる文字があります。');
    return v.trim();
  };
  const image = v => {
    if (typeof v !== 'string' || v.length > 1600000 || !(v === '' || /^assets\/images\/[a-zA-Z0-9_.-]+\.(png|webp|jpg|jpeg)$/.test(v) || /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(v))) throw Error('写真の形式か大きさを確認してください。PNG・JPEG・WebPに対応しています。');
    return v;
  };
  const id = v => {
    if (typeof v !== 'string' || !/^[a-z0-9-]{1,70}$/.test(v)) throw Error('データのIDが正しくありません。');
    return v;
  };
  const flag = v => { if (typeof v !== 'boolean') throw Error('表示設定が正しくありません。'); return v; };
  function validate(input) {
    if (!input || input.version !== 1 || JSON.stringify(input).length > 32000000) throw Error('対応するブランドデータ（形式1・32MB以下）を選んでください。');
    const out = {version:1};
    for (const [group, definitions] of Object.entries(fields)) {
      if (!input[group] || typeof input[group] !== 'object') throw Error('ページのデータが足りません。');
      out[group] = {};
      for (const f of definitions) out[group][f.key] = f.kind === 'image' ? image(input[group][f.key]) : text(input[group][f.key], f.max, f.required);
    }
    if (!Array.isArray(input.products) || input.products.length > 24 || !Array.isArray(input.posts) || input.posts.length > 50) throw Error('商品は24件、記事は50件まで登録できます。');
    out.products = input.products.map(p => {
      if (!p || !Array.isArray(p.photos) || p.photos.length > 3 || !['contain','cover'].includes(p.fit)) throw Error('商品写真・表示方法を確認してください。');
      return {id:id(p.id),name:text(p.name,100,true),color:text(p.color,80),description:text(p.description,2000),priceNote:text(p.priceNote,100),alt:text(p.alt,200),visible:flag(p.visible),sample:flag(p.sample),fit:p.fit,photos:p.photos.map(image).filter(Boolean)};
    });
    out.posts = input.posts.map(p => {
      if (!p || !/^\d{4}-\d{2}-\d{2}$/.test(p.date) || !Number.isFinite(Date.parse(p.date)) || new Date(p.date).toISOString().slice(0,10) !== p.date) throw Error('記事の日付を確認してください。');
      return {id:id(p.id),title:text(p.title,160,true),date:p.date,excerpt:text(p.excerpt,500),body:text(p.body,20000,p.visible),photo:image(p.photo),alt:text(p.alt,200),visible:flag(p.visible)};
    });
    for (const rows of [out.products,out.posts]) if (new Set(rows.map(r=>r.id)).size !== rows.length) throw Error('重複したIDがあります。');
    return out;
  }
  globalThis.TWIY_BRAND_MODEL = {fields, defaults, clone, validate, image};
})();
