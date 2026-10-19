/* School-only local prototype. Brand and legal content are intentionally separate. */
(() => {
  const fields = [
{
  "key": "navResults",
  "retired": true,
  "label": "合格実績：ページ見出し・実績内のリンク",
  "group": "共通メニュー",
  "value": "合格実績",
  "max": 80
},
{
  "key": "resultsIntro",
  "retired": true,
  "label": "ページの案内",
  "group": "合格実績 共通",
  "value": "各年度のチラシに掲載された合格校・進学先です。学校名・学部名は掲載時の表記を使用しています。",
  "max": 3000
},
{
  "key": "resultsNote",
  "retired": true,
  "label": "表示に関する注記",
  "group": "合格実績 共通",
  "value": "人数・進学の表示は、チラシに記載がある場合のみ掲載しています。",
  "max": 3000
},
{
  "key": "results2026juniorHeading",
  "label": "区分：中学受験生の合格校",
  "group": "合格実績 2026",
  "value": "中学受験生の合格校",
  "max": 500
},
{
  "key": "results2026juniorsokaName",
  "label": "創価中学校：学校・学部",
  "group": "合格実績 2026",
  "value": "創価中学校",
  "max": 500
},
{
  "key": "results2026juniorsokaStatus",
  "label": "創価中学校：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2026juniorseijoName",
  "label": "成城中学校：学校・学部",
  "group": "合格実績 2026",
  "value": "成城中学校",
  "max": 500
},
{
  "key": "results2026juniorseijoStatus",
  "label": "成城中学校：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2026highHeading",
  "label": "区分：高校受験生の合格高",
  "previousDefault": "高校受験生の合格校",
  "group": "合格実績 2026",
  "value": "高校受験生の合格高",
  "max": 500
},
{
  "key": "results2026highfukagawaName",
  "label": "都立 深川高校：学校・学部",
  "group": "合格実績 2026",
  "value": "都立 深川高校",
  "max": 500
},
{
  "key": "results2026highfukagawaDetail",
  "label": "都立 深川高校：補足",
  "group": "合格実績 2026",
  "value": "",
  "max": 500,
  "retired": true
},
{
  "key": "results2026highfukagawaStatus",
  "label": "都立 深川高校：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2026universityHeading",
  "label": "区分：大学受験生の合格校",
  "previousDefault": "大学受験生 全合格実績",
  "group": "合格実績 2026",
  "value": "大学受験生の合格校",
  "max": 500
},
{
  "key": "results2026universitytokyoName",
  "label": "東京大学 文科Ⅰ類：学校・学部",
  "group": "合格実績 2026",
  "value": "東京大学 文科Ⅰ類",
  "max": 500
},
{
  "key": "results2026universitytokyoDetail",
  "label": "東京大学 文科Ⅰ類：補足",
  "group": "合格実績 2026",
  "value": "",
  "max": 500,
  "retired": true
},
{
  "key": "results2026universitytokyoStatus",
  "label": "東京大学 文科Ⅰ類：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2026universitychibaName",
  "label": "千葉大学 園芸学部：学校・学部",
  "group": "合格実績 2026",
  "value": "千葉大学 園芸学部",
  "max": 500
},
{
  "key": "results2026universitychibaStatus",
  "label": "千葉大学 園芸学部：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2026universitykeioName",
  "label": "慶應義塾大学 薬学部：学校・学部",
  "group": "合格実績 2026",
  "value": "慶應義塾大学 薬学部",
  "max": 500
},
{
  "key": "results2026universitykeioStatus",
  "label": "慶應義塾大学 薬学部：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2026universitywasedaName",
  "label": "早稲田大学 法学部：学校・学部",
  "group": "合格実績 2026",
  "value": "早稲田大学 法学部",
  "max": 500
},
{
  "key": "results2026universitywasedaStatus",
  "label": "早稲田大学 法学部：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2026otherHeading",
  "label": "区分：その他の生徒の合格校や進学先",
  "group": "合格実績 2026",
  "value": "その他の生徒の合格校や進学先",
  "max": 500,
  "retired": true
},
{
  "key": "results2026otherwasedacultureName",
  "label": "早稲田大学（文化構想）：学校・学部",
  "group": "合格実績 2026",
  "value": "早稲田大学（文化構想）",
  "max": 500
},
{
  "key": "results2026otherwasedacultureStatus",
  "label": "早稲田大学（文化構想）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026otherwasedalawName",
  "label": "早稲田大学（法）：学校・学部",
  "group": "合格実績 2026",
  "value": "早稲田大学（法）",
  "max": 500,
  "retired": true
},
{
  "key": "results2026otherkeiocommerceName",
  "label": "慶應大学（商）：学校・学部",
  "group": "合格実績 2026",
  "value": "慶應大学（商）",
  "max": 500
},
{
  "key": "results2026otherkeiocommerceStatus",
  "label": "慶應大学（商）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026othermeijiagricultureName",
  "label": "明治大学（農）：学校・学部",
  "group": "合格実績 2026",
  "value": "明治大学（農）",
  "max": 500
},
{
  "key": "results2026othermeijiagricultureStatus",
  "label": "明治大学（農）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026otherwasedaliteratureName",
  "label": "早稲田大学（文）：学校・学部",
  "group": "合格実績 2026",
  "value": "早稲田大学（文）",
  "max": 500
},
{
  "key": "results2026otherwasedaliteratureStatus",
  "label": "早稲田大学（文）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026otherwasedacommerceName",
  "label": "早稲田大学（商）：学校・学部",
  "group": "合格実績 2026",
  "value": "早稲田大学（商）",
  "max": 500
},
{
  "key": "results2026otherwasedacommerceStatus",
  "label": "早稲田大学（商）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026otherkeiolawName",
  "label": "慶應大学（法）：学校・学部",
  "group": "合格実績 2026",
  "value": "慶應大学（法）",
  "max": 500
},
{
  "key": "results2026otherkeiolawStatus",
  "label": "慶應大学（法）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026othermeijiscienceName",
  "label": "明治大学（理工）：学校・学部",
  "group": "合格実績 2026",
  "value": "明治大学（理工）",
  "max": 500
},
{
  "key": "results2026othermeijiscienceStatus",
  "label": "明治大学（理工）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026otherwasedaeducationName",
  "label": "早稲田大学（教育）：学校・学部",
  "group": "合格実績 2026",
  "value": "早稲田大学（教育）",
  "max": 500
},
{
  "key": "results2026otherwasedaeducationStatus",
  "label": "早稲田大学（教育）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026otherwasedascienceName",
  "label": "早稲田大学（理工）：学校・学部",
  "group": "合格実績 2026",
  "value": "早稲田大学（理工）",
  "max": 500
},
{
  "key": "results2026otherwasedascienceStatus",
  "label": "早稲田大学（理工）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026othersophialiteratureName",
  "label": "上智大学（文）：学校・学部",
  "group": "合格実績 2026",
  "value": "上智大学（文）",
  "max": 500
},
{
  "key": "results2026othersophialiteratureStatus",
  "label": "上智大学（文）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026othertusName",
  "label": "東京理科大（創域理工）：学校・学部",
  "group": "合格実績 2026",
  "value": "東京理科大（創域理工）",
  "max": 500
},
{
  "key": "results2026othertusStatus",
  "label": "東京理科大（創域理工）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026othergakushuinName",
  "label": "学習院大学（理）：学校・学部",
  "group": "合格実績 2026",
  "value": "学習院大学（理）",
  "max": 500
},
{
  "key": "results2026othergakushuinStatus",
  "label": "学習院大学（理）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026othertokyowomanName",
  "label": "東京女子大学（文）：学校・学部",
  "group": "合格実績 2026",
  "value": "東京女子大学（文）",
  "max": 500
},
{
  "key": "results2026othertokyowomanStatus",
  "label": "東京女子大学（文）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026otherjapanwomenName",
  "label": "日本女子大学（文）：学校・学部",
  "group": "合格実績 2026",
  "value": "日本女子大学（文）",
  "max": 500
},
{
  "key": "results2026otherjapanwomenStatus",
  "label": "日本女子大学（文）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2026othertokaiName",
  "label": "東海大学（海洋）：学校・学部",
  "group": "合格実績 2026",
  "value": "東海大学（海洋）",
  "max": 500
},
{
  "key": "results2026othertokaiStatus",
  "label": "東海大学（海洋）：人数",
  "group": "合格実績 2026",
  "value": "1名",
  "max": 500
},
{
  "key": "results2025juniorHeading",
  "label": "区分：中学受験生の合格校",
  "previousDefault": "中学受験生（全1名）の進学",
  "group": "合格実績 2025",
  "value": "中学受験生の合格校",
  "max": 500
},
{
  "key": "results2025juniortoyoeiwaName",
  "label": "東洋英和女学院：学校・学部",
  "group": "合格実績 2025",
  "value": "東洋英和女学院",
  "max": 500
},
{
  "key": "results2025juniortoyoeiwaDetail",
  "label": "東洋英和女学院：補足",
  "group": "合格実績 2025",
  "value": "",
  "max": 500,
  "retired": true
},
{
  "key": "results2025juniortoyoeiwaStatus",
  "label": "東洋英和女学院：人数",
  "group": "合格実績 2025",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2025highHeading",
  "label": "区分：高校受験生の合格高",
  "previousDefault": "高校受験生（全1名）の進学",
  "group": "合格実績 2025",
  "value": "高校受験生の合格高",
  "max": 500
},
{
  "key": "results2025highhoseiName",
  "label": "法政国際高校：学校・学部",
  "group": "合格実績 2025",
  "value": "法政国際高校",
  "max": 500
},
{
  "key": "results2025highhoseiDetail",
  "label": "法政国際高校：補足",
  "group": "合格実績 2025",
  "value": "",
  "max": 500,
  "retired": true
},
{
  "key": "results2025highhoseiStatus",
  "label": "法政国際高校：人数",
  "group": "合格実績 2025",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2025highNote",
  "label": "高校受験生（全1名）の進学：注記",
  "group": "合格実績 2025",
  "value": "＊Yさん：早稲アカの最下位クラス(3R2)生でしたが、中学三年時の7月に当塾へ移籍し、大逆転合格",
  "max": 3000
},
{
  "key": "results2025universityHeading",
  "label": "区分：大学受験生の合格校",
  "previousDefault": "大学受験生（全5名）の進学",
  "group": "合格実績 2025",
  "value": "大学受験生の合格校",
  "max": 500
},
{
  "key": "results2025universitychibaName",
  "label": "千葉大学 理学部：学校・学部",
  "group": "合格実績 2025",
  "value": "千葉大学 理学部",
  "previousDefault": "千葉大学（国立） 理学部",
  "max": 500
},
{
  "key": "results2025universitychibaDetail",
  "label": "千葉大学（国立） 理学部：補足",
  "group": "合格実績 2025",
  "value": "",
  "max": 500,
  "retired": true
},
{
  "key": "results2025universitychibaStatus",
  "label": "千葉大学（国立） 理学部：人数",
  "group": "合格実績 2025",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2025universitygakushuinName",
  "label": "学習院大学 理学部：学校・学部",
  "group": "合格実績 2025",
  "value": "学習院大学 理学部",
  "max": 500
},
{
  "key": "results2025universitygakushuinDetail",
  "label": "学習院大学 理学部：補足",
  "group": "合格実績 2025",
  "value": "",
  "max": 500,
  "retired": true
},
{
  "key": "results2025universitygakushuinStatus",
  "label": "学習院大学 理学部：人数",
  "group": "合格実績 2025",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2025universitykeioName",
  "label": "慶應義塾大学 理工学部：学校・学部",
  "group": "合格実績 2025",
  "value": "慶應義塾大学 理工学部",
  "max": 500
},
{
  "key": "results2025universitykeioDetail",
  "label": "慶應義塾大学 理工学部：補足",
  "group": "合格実績 2025",
  "value": "",
  "max": 500,
  "retired": true
},
{
  "key": "results2025universitykeioStatus",
  "label": "慶應義塾大学 理工学部：人数",
  "group": "合格実績 2025",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2025universitytamaName",
  "label": "多摩美術大学 彫刻科：学校・学部",
  "group": "合格実績 2025",
  "value": "多摩美術大学 彫刻科",
  "max": 500
},
{
  "key": "results2025universitytamaDetail",
  "label": "多摩美術大学 彫刻科：補足",
  "group": "合格実績 2025",
  "value": "",
  "max": 500,
  "retired": true
},
{
  "key": "results2025universitytamaStatus",
  "label": "多摩美術大学 彫刻科：人数",
  "group": "合格実績 2025",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2025universityhoseiName",
  "label": "法政大学 理工学部：学校・学部",
  "group": "合格実績 2025",
  "value": "法政大学 理工学部",
  "max": 500
},
{
  "key": "results2025universityhoseiDetail",
  "label": "法政大学 理工学部：補足",
  "group": "合格実績 2025",
  "value": "",
  "max": 500,
  "retired": true
},
{
  "key": "results2025universityhoseiStatus",
  "label": "法政大学 理工学部：人数",
  "group": "合格実績 2025",
  "value": "1名",
  "max": 500,
  "previousDefault": "進学"
},
{
  "key": "results2025universityNote",
  "label": "大学受験生（全5名）の進学：注記",
  "group": "合格実績 2025",
  "value": "＊A君：元早稲アカ生、高校受験時、最下位クラス（３R２）からの大逆転合格\n＊SさんとN君：元早稲アカ生、中学受験時、最下位クラス（６ＳＡ）からの大逆転合格",
  "max": 3000
},
{
  "key": "results2024featuredHeading",
  "label": "区分：大学受験生の合格校",
  "previousDefault": "大学受験・現役合格",
  "group": "合格実績 2024",
  "value": "大学受験生の合格校",
  "max": 500
},
{
  "key": "results2024featuredwasedasocialName",
  "label": "早稲田大学 社会科学部：学校・学部",
  "group": "合格実績 2024",
  "value": "早稲田大学 社会科学部",
  "max": 500
},
{
  "key": "results2024featuredwasedasocialDetail",
  "label": "早稲田大学 社会科学部：補足",
  "group": "合格実績 2024",
  "value": "",
  "max": 500,
  "retired": true
},
{
  "key": "results2024featuredwasedasocialStatus",
  "label": "早稲田大学 社会科学部：人数",
  "group": "合格実績 2024",
  "value": "1名",
  "max": 500,
  "previousDefault": "現役合格"
},
{
  "key": "results2024featuredmeijiliteratureName",
  "label": "明治大学 文学部：学校・学部",
  "group": "合格実績 2024",
  "value": "明治大学 文学部",
  "max": 500
},
{
  "key": "results2024featuredmeijiliteratureDetail",
  "label": "明治大学 文学部：補足",
  "group": "合格実績 2024",
  "value": "",
  "max": 500,
  "retired": true
},
{
  "key": "results2024featuredmeijiliteratureStatus",
  "label": "明治大学 文学部：人数",
  "group": "合格実績 2024",
  "value": "1名",
  "max": 500,
  "previousDefault": "現役合格"
},
{
  "key": "results2024featuredwasedacommerceName",
  "label": "早稲田大学 商学部：学校・学部",
  "group": "合格実績 2024",
  "value": "早稲田大学 商学部",
  "max": 500
},
{
  "key": "results2024featuredwasedacommerceDetail",
  "label": "早稲田大学 商学部：補足",
  "group": "合格実績 2024",
  "value": "",
  "max": 500,
  "retired": true
},
{
  "key": "results2024featuredwasedacommerceStatus",
  "label": "早稲田大学 商学部：人数",
  "group": "合格実績 2024",
  "value": "2名",
  "max": 500,
  "previousDefault": "現役合格"
},
{
  "key": "results2024otherHeading",
  "label": "区分：その他の生徒の合格校や進学先",
  "previousDefault": "上記の三名を除いた2024年度生徒6名（内浪人1名 Ⓡ）の合格校",
  "group": "合格実績 2024",
  "value": "その他の生徒の合格校や進学先",
  "max": 500,
  "retired": true
},
{
  "key": "results2024otherkeioeconomicsName",
  "label": "慶應大学 経済学部：学校・学部",
  "group": "合格実績 2024",
  "value": "慶應大学 経済学部",
  "max": 500
},
{
  "key": "results2024otherkeioeconomicsStatus",
  "label": "慶應大学 経済学部：人数",
  "group": "合格実績 2024",
  "value": "1名",
  "max": 500,
  "previousDefault": "1名 Ⓡ"
},
{
  "key": "results2024otherkeiosfcName",
  "label": "慶應大学 SFC：学校・学部",
  "group": "合格実績 2024",
  "value": "慶應大学 SFC",
  "max": 500
},
{
  "key": "results2024otherkeiosfcStatus",
  "label": "慶應大学 SFC：人数",
  "group": "合格実績 2024",
  "value": "1名",
  "max": 500,
  "previousDefault": "1名 Ⓡ"
},
{
  "key": "results2024otherkeioscienceName",
  "label": "慶應大学 理工学部：学校・学部",
  "group": "合格実績 2024",
  "value": "慶應大学 理工学部",
  "max": 500
},
{
  "key": "results2024otherkeioscienceStatus",
  "label": "慶應大学 理工学部：人数",
  "group": "合格実績 2024",
  "value": "1名",
  "max": 500,
  "previousDefault": "1名"
},
{
  "key": "results2024otherwasedascienceName",
  "label": "早稲田大学 理工学部：学校・学部",
  "group": "合格実績 2024",
  "value": "早稲田大学 理工学部",
  "max": 500
},
{
  "key": "results2024otherwasedascienceStatus",
  "label": "早稲田大学 理工学部：人数",
  "group": "合格実績 2024",
  "value": "1名",
  "max": 500,
  "previousDefault": "1名"
},
{
  "key": "results2024otherwasedacommerceName",
  "label": "早稲田大学 商学部：学校・学部",
  "group": "合格実績 2024",
  "value": "早稲田大学 商学部",
  "max": 500,
  "retired": true
},
{
  "key": "results2024otherwasedacommerceStatus",
  "label": "早稲田大学 商学部：人数・進学",
  "group": "合格実績 2024",
  "value": "1名",
  "max": 500,
  "retired": true
},
{
  "key": "results2024othersophiaName",
  "label": "上智大学 看護学部：学校・学部",
  "group": "合格実績 2024",
  "value": "上智大学 看護学部",
  "max": 500
},
{
  "key": "results2024othersophiaStatus",
  "label": "上智大学 看護学部：人数",
  "group": "合格実績 2024",
  "value": "1名",
  "max": 500,
  "previousDefault": "1名"
},
{
  "key": "results2024othermeijiinformationName",
  "label": "明治大学情コミ学部：学校・学部",
  "group": "合格実績 2024",
  "value": "明治大学情コミ学部",
  "max": 500
},
{
  "key": "results2024othermeijiinformationStatus",
  "label": "明治大学情コミ学部：人数",
  "group": "合格実績 2024",
  "value": "1名",
  "max": 500,
  "previousDefault": "1名"
},
{
  "key": "results2024othermeijilawName",
  "label": "明治大学法学：学校・学部",
  "group": "合格実績 2024",
  "value": "明治大学法学",
  "max": 500
},
{
  "key": "results2024othermeijilawStatus",
  "label": "明治大学法学：人数",
  "group": "合格実績 2024",
  "value": "1名",
  "max": 500,
  "previousDefault": "1名"
},
{
  "key": "results2024otherrikkyoName",
  "label": "立教大学法学部：学校・学部",
  "group": "合格実績 2024",
  "value": "立教大学法学部",
  "max": 500
},
{
  "key": "results2024otherrikkyoStatus",
  "label": "立教大学法学部：人数",
  "group": "合格実績 2024",
  "value": "1名",
  "max": 500,
  "previousDefault": "1名"
},
{
  "key": "results2024othertusName",
  "label": "東京理科大学 理工学部：学校・学部",
  "group": "合格実績 2024",
  "value": "東京理科大学 理工学部",
  "max": 500
},
{
  "key": "results2024othertusStatus",
  "label": "東京理科大学 理工学部：人数",
  "group": "合格実績 2024",
  "value": "1名",
  "max": 500,
  "previousDefault": "1名"
},
{
  "key": "results2024otherNote",
  "label": "上記の三名を除いた2024年度生徒6名（内浪人1名 Ⓡ）の合格校：注記",
  "group": "合格実績 2024",
  "value": "Ⓡはチラシの表記を保持しています。",
  "max": 3000
},
{
  "key": "results2023juniorHeading",
  "label": "区分：中学受験生の合格校",
  "previousDefault": "中学校 合格校",
  "group": "合格実績 2023",
  "value": "中学受験生の合格校",
  "max": 500
},
{
  "key": "results2023juniorikubunkanName",
  "label": "郁文館：学校・学部",
  "group": "合格実績 2023",
  "value": "郁文館",
  "max": 500
},
{
  "key": "results2023juniorikubunkanStatus",
  "label": "郁文館：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023juniorichikawaName",
  "label": "市川：学校・学部",
  "group": "合格実績 2023",
  "value": "市川",
  "max": 500
},
{
  "key": "results2023juniorichikawaStatus",
  "label": "市川：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023juniorkogyokushaName",
  "label": "攻玉社：学校・学部",
  "group": "合格実績 2023",
  "value": "攻玉社",
  "max": 500
},
{
  "key": "results2023juniorkogyokushaStatus",
  "label": "攻玉社：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023juniorsakaehigashiName",
  "label": "栄東：学校・学部",
  "group": "合格実績 2023",
  "value": "栄東",
  "max": 500
},
{
  "key": "results2023juniorsakaehigashiStatus",
  "label": "栄東：人数・進学",
  "group": "合格実績 2023",
  "value": "3名",
  "max": 500
},
{
  "key": "results2023juniorshibauraName",
  "label": "芝浦工業附属：学校・学部",
  "group": "合格実績 2023",
  "value": "芝浦工業附属",
  "max": 500
},
{
  "key": "results2023juniorshibauraStatus",
  "label": "芝浦工業附属：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023juniorshibumakuName",
  "label": "渋谷幕張中学校：学校・学部",
  "group": "合格実績 2023",
  "value": "渋谷幕張中学校",
  "max": 500
},
{
  "key": "results2023juniorshibumakuStatus",
  "label": "渋谷幕張中学校：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023juniorshowaName",
  "label": "昭和秀英：学校・学部",
  "group": "合格実績 2023",
  "value": "昭和秀英",
  "max": 500
},
{
  "key": "results2023juniorshowaStatus",
  "label": "昭和秀英：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023juniorsugamoName",
  "label": "巣鴨：学校・学部",
  "group": "合格実績 2023",
  "value": "巣鴨",
  "max": 500
},
{
  "key": "results2023juniorsugamoStatus",
  "label": "巣鴨：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023juniortohoName",
  "label": "東邦大東邦：学校・学部",
  "group": "合格実績 2023",
  "value": "東邦大東邦",
  "max": 500
},
{
  "key": "results2023juniortohoStatus",
  "label": "東邦大東邦：人数・進学",
  "group": "合格実績 2023",
  "value": "2名",
  "max": 500
},
{
  "key": "results2023juniorhongoName",
  "label": "本郷：学校・学部",
  "group": "合格実績 2023",
  "value": "本郷",
  "max": 500
},
{
  "key": "results2023juniorhongoStatus",
  "label": "本郷：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023juniormeijinakanoName",
  "label": "明治大学中野：学校・学部",
  "group": "合格実績 2023",
  "value": "明治大学中野",
  "max": 500
},
{
  "key": "results2023juniormeijinakanoStatus",
  "label": "明治大学中野：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023juniorwasedaName",
  "label": "早稲田中学校：学校・学部",
  "group": "合格実績 2023",
  "value": "早稲田中学校",
  "max": 500
},
{
  "key": "results2023juniorwasedaStatus",
  "label": "早稲田中学校：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023highuniversityHeading",
  "label": "区分：高校受験生の合格高",
  "previousDefault": "高校・大学 合格校",
  "group": "合格実績 2023",
  "value": "高校受験生の合格高",
  "max": 500
},
{
  "key": "results2023highuniversityikubunkanName",
  "label": "郁文館高校（グローバル）：学校・学部",
  "group": "合格実績 2023",
  "value": "郁文館高校（グローバル）",
  "max": 500
},
{
  "key": "results2023highuniversityikubunkanStatus",
  "label": "郁文館高校（グローバル）：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023highuniversitygakushuinName",
  "label": "学習院大学（国際）：学校・学部",
  "group": "合格実績 2023",
  "value": "学習院大学（国際）",
  "max": 500
},
{
  "key": "results2023highuniversitygakushuinStatus",
  "label": "学習院大学（国際）：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023highuniversitykitasatoName",
  "label": "北里大学（海洋）：学校・学部",
  "group": "合格実績 2023",
  "value": "北里大学（海洋）",
  "max": 500
},
{
  "key": "results2023highuniversitykitasatoStatus",
  "label": "北里大学（海洋）：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023highuniversitykokugakuinName",
  "label": "国学院大学（観光）：学校・学部",
  "group": "合格実績 2023",
  "value": "国学院大学（観光）",
  "max": 500
},
{
  "key": "results2023highuniversitykokugakuinStatus",
  "label": "国学院大学（観光）：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023highuniversitytoyoName",
  "label": "東洋大学（生命）：学校・学部",
  "group": "合格実績 2023",
  "value": "東洋大学（生命）",
  "max": 500
},
{
  "key": "results2023highuniversitytoyoStatus",
  "label": "東洋大学（生命）：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023highuniversityhoseiName",
  "label": "法政大学（文）：学校・学部",
  "group": "合格実績 2023",
  "value": "法政大学（文）",
  "max": 500
},
{
  "key": "results2023highuniversityhoseiStatus",
  "label": "法政大学（文）：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023highuniversitymeijiliteratureName",
  "label": "明治大学（文）：学校・学部",
  "group": "合格実績 2023",
  "value": "明治大学（文）",
  "max": 500
},
{
  "key": "results2023highuniversitymeijiliteratureStatus",
  "label": "明治大学（文）：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023highuniversitymeijicommerceName",
  "label": "明治大学（商）：学校・学部",
  "group": "合格実績 2023",
  "value": "明治大学（商）",
  "max": 500
},
{
  "key": "results2023highuniversitymeijicommerceStatus",
  "label": "明治大学（商）：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
{
  "key": "results2023highuniversityrikkyoName",
  "label": "立教大学（スポ）：学校・学部",
  "group": "合格実績 2023",
  "value": "立教大学（スポ）",
  "max": 500
},
{
  "key": "results2023highuniversityrikkyoStatus",
  "label": "立教大学（スポ）：人数・進学",
  "group": "合格実績 2023",
  "value": "1名",
  "max": 500
},
  {
    "key": "navVoice",
    "label": "合格体験記：ページ見出し・実績内のリンク",
    "group": "共通メニュー",
    "value": "合格体験記",
    "max": 80
  },
  {
    "key": "navAccess",
    "label": "アクセス：メニュー・ページ見出し",
    "group": "共通メニュー",
    "value": "アクセス",
    "max": 80
  },
  {
    "key": "navApparel",
    "label": "アパレルのリンク名",
    "group": "共通メニュー",
    "value": "TWIYアパレル",
    "max": 80
  },
  {
    "key": "navLegal",
    "label": "法律事務所のリンク名",
    "group": "共通メニュー",
    "value": "TWIY法律事務所",
    "max": 80
  },
  {
    "key": "heroEnglish",
    "label": "英語のキャッチコピー",
    "group": "ホーム",
    "value": "What is to give light must endure burning",
    "max": 500
  },
  {
    "key": "heroJapanese",
    "label": "日本語のキャッチコピー（改行可能）",
    "group": "ホーム",
    "value": "世界を照らすものは己の身を焼かねばならぬ ———『夜と霧』 V・E・フランクル",
    "max": 500
  },
  {
    "key": "heroTitle",
    "retired": true,
    "label": "H1 ロゴ右側のタイトル",
    "group": "ホーム",
    "value": "TWIY 学習塾",
    "max": 200
  },
  {
    "key": "heroEyebrow",
    "retired": true,
    "label": "小さな英語の見出し",
    "group": "ホーム",
    "value": "The World Is Yours",
    "max": 200
  },
  {
    "key": "homeNotice",
    "retired": true,
    "label": "ロゴの下の募集状況",
    "group": "ホーム",
    "value": "現在満員御礼。空きが出次第、入塾ご希望の方が3名となります。次回の入塾者募集は2027年3月1日からとなります。",
    "max": 3000
  },
  {
    "key": "accessIntro",
    "label": "電話番号の前の案内",
    "group": "アクセス",
    "value": "ご連絡は下記番号まで",
    "max": 1000
  },
  {
    "key": "accessPhone",
    "label": "固定電話番号",
    "group": "アクセス",
    "value": "【03-6458-4710】",
    "max": 80
  },
  {
    "key": "accessHours",
    "label": "連絡時間の案内",
    "group": "アクセス",
    "value": "23時～14時の時間帯は下記携帯番号にお願い致します。",
    "max": 1000
  },
  {
    "key": "accessMobile",
    "label": "携帯電話番号",
    "group": "アクセス",
    "value": "【080-2050-5468】",
    "max": 80
  },
  {
    "key": "accessAddress",
    "label": "住所",
    "group": "アクセス",
    "value": "東京都江東区東陽5-31-21 藤ビル105号 ",
    "max": 1000
  },
  {
    "key": "voice1Title",
    "label": "体験記1の見出し（改行可能）",
    "group": "合格体験記 1",
    "value": "▶︎ 中学受験 2023\n渋谷幕張中進学\nお母様の合格体験記",
    "max": 500
  },
  {
    "key": "voice1Paragraph1",
    "label": "本文 第1段落",
    "group": "合格体験記 1",
    "value": "中学受験にチャレンジすると決めた時から、詰め込み勉強で消耗するのではなく、将来の学びにつながる勉強方法を身につけ、どんな結果に終わっても成長を喜び、納得できる受験にしたいと思っていました。",
    "max": 16000
  },
  {
    "key": "voice1Paragraph2",
    "label": "本文 第2段落",
    "group": "合格体験記 1",
    "value": "6年生の春、憧れの学校の学校別クラスに入れるかどうかの瀬戸際で苦しんでいました。\n成績が不安定、心も不安定。家では集中することができず、勉強時間は足りず、少しやってもその質は低く、成績が上がるはずもない状態でした。そんなときにＴＷＩＹに出会いました。親としては、正直なところ少し不安でしたが、本人は先生に絶大な信頼をもっており、先生の熱意にかけてみようと思いました。",
    "max": 16000
  },
  {
    "key": "voice1Paragraph3",
    "label": "本文 第3段落",
    "group": "合格体験記 1",
    "value": "一生懸命に勉強した合間には、先生が一緒に身体を動かしてくださったり友達と遊んだりしながらの気分転換が楽しく、せっせと通うようになりました。勉強と気分転換とどっちがメイン？と思わないでもなかったですが、そのうちにやる気に火がつき、夏頃には塾、学校以外は常にＴＷＩＹで勉強するようになりました。この頃は頑張った分が成績に表れる好循環が生まれ、夏休み明けの成績は憧れの学校を第一志望として戦えるところまでたどり着くことができました。",
    "max": 16000
  },
  {
    "key": "voice1Paragraph4",
    "label": "本文 第4段落",
    "group": "合格体験記 1",
    "value": "本格的に第一志望対策が始まる秋、親のさらなる協力が必要になる時期にも関わらず、親の言葉なんて素直に受け入れてくれません。信頼している先生に言われると何だかんだ言いながらも従うので、先生に相談させていただいたところ、スケジュール管理から過去問の準備、採点、その結果を踏まえて弱点補強などの細かな指導もしてくださいました。模試や過去問の点数、塾のクラスの変動などで、ついつい一喜一憂し、もうだめだ、と落ち込んでいるときにも上手く声をかけて下さり、持ち直すことができました。そして親は勉強の内容についてはほとんど関与しなくなり、むしろ、見るとついつい口を出したくなってしまうのでできるだけ見ないようにして、日々の健康管理や精神状態の安定に徹することにしていました。とはいえ、テストの結果などやはり気になってしまい、先生にご相談することで親も安定を保っていたように思います。",
    "max": 16000
  },
  {
    "key": "voice1Paragraph5",
    "label": "本文 第5段落",
    "group": "合格体験記 1",
    "value": "受験直前の冬には、小学生がこんなにも勉強するものなのか？もう少し休んでもよいのでは？と思う程、自分から進んで勉強に向かうようになっていました。先生の見守りで適度な緊張感の中、周りのみんなも勉強していて、時間制限なく自分のペースで勉強できる環境は素晴らしいものでした。これ以上は無理！というぐらい頑張っている中での成績のアップダウンは精神的にもジェットコースターのようで、本人も親もきつかったですが、先生はいつも気持ちの上がるアドバイスを続けて下さいました。こんなに努力してきたのだから、結果がどうであれ悔いはなく、誰になんと言われようとあこがれの第一志望校を受験させてあげようと決めていました。1年前には目指すことすらも躊躇う成績だったのに受験できるだけでもすごいよ！と本人にも親自身にも言い聞かせ続け、何度も心折れそうになりながらも憧れの学校を目指して勉強の日々でした。",
    "max": 16000
  },
  {
    "key": "voice1Paragraph6",
    "label": "本文 第6段落",
    "group": "合格体験記 1",
    "value": "ついに受験本番。すでに合否それぞれ経験していたものの、やはり、第一志望入試当日朝はいつも以上の緊張です。試験終了後、会場から出てきたときの表情で全てを出し切ったのがわかりました。翌日は前受けで不合格だったチャレンジ校を再度受ける予定でしたが、本人は疲れ果てて、（どうせ受からないのだから）受けたくないと言っていました。親も本人がそう言うなら、その後の日程に備えて休養にあてても良いかと思って相談したところ、先生は受けた方が良いと言って下さいました。そして、その日の夜、本人が先生と話した結果、チャレンジ校を受験することに決めました。第一志望は残念な結果でしたが、そのチャレンジ校からまさか、まさかの合格を貰いました。あまりに予想外の結果だったので本人も親もなかなか信じられませんでしたが、受験、最後まで何が起こるかわからないことを実感しました。しかし、このチャレンジ校合格、ただのまぐれや奇跡ではないと思います。第一志望校の対策として過去問に何年分も取り組んでいたので、本人がチャレンジしたいと言い出して受験しました。これまでの、すべての努力が実を結び、ご縁を頂くことができたものと思います。",
    "max": 16000
  },
  {
    "key": "voice1Paragraph7",
    "label": "本文 第7段落",
    "group": "合格体験記 1",
    "value": "中学受験を通して、無理かもしれないと思ってしまう大きな壁にも立ち向かい、苦しくてもあきらめずに最後まで頑張るその姿は、頼もしく、大きな成長を感じることができました。この経験はこの先、大いに生かされるものと期待しています。",
    "max": 16000
  },
  {
    "key": "voice1Paragraph8",
    "label": "本文 第8段落",
    "group": "合格体験記 1",
    "value": "最後まで本人に寄り添い叱咤激励してくださり、この不安の塊のような親のとりとめのない愚痴や要望にもつきあって下さり、本当にありがとうございました。最初に私が賭けてみようと思った先生の熱意は本物でした。",
    "max": 16000
  },
  {
    "key": "voice1Paragraph9",
    "label": "本文 第9段落",
    "group": "合格体験記 1",
    "value": "（渋谷幕張中進学N君お母様より）",
    "max": 16000
  },
  {
    "key": "voice2Title",
    "label": "体験記2の見出し（改行可能）",
    "group": "合格体験記 2",
    "value": "▶︎ 中学受験 2023\n早稲田中学進学\nお父様の合格体験記",
    "max": 500
  },
  {
    "key": "voice2Paragraph1",
    "label": "本文 第1段落",
    "group": "合格体験記 2",
    "value": "「地頭は、いいんだろうな」親バカですが、そう思うときもありました。でも、その能力を活かせなければ、本当にただの親バカです。彼との中学受験は、後悔と無力感に苦しむ日々でした。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph2",
    "label": "本文 第2段落",
    "group": "合格体験記 2",
    "value": "彼が小学4年生のときから、大手学習塾に通わせました。「中学受験は親の受験」スケジュールを組み、プリントを整理して、毎日つきっきりで勉強をみました。そして、最初の試験で塾1番の成績を修めました。ーーこれがよくなかった。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph3",
    "label": "本文 第3段落",
    "group": "合格体験記 2",
    "value": "「勉強はやらされるもの」と、彼はインプットしてしまったようです。こちらのエスカレートする期待とは裏腹に、彼の意気込みはどんどん消沈し、成績も徐々に下がり始めました。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph4",
    "label": "本文 第4段落",
    "group": "合格体験記 2",
    "value": "このままではいけない。彼が自らすすんで勉強しなければいけないのだと気づき、押し付けないよう、軌道修正を図りました。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph5",
    "label": "本文 第5段落",
    "group": "合格体験記 2",
    "value": "が、5年生のとき、ついにクラス落ちしました。「いいんだよ」と慰めつつも、夜中にスヤスヤしてる我が子の寝顔を見て「いいわけないだろ！」と叩き起こして勉強させたい憤りを覚え、不眠にさえなりました。なんでこうなったんだろうと後悔し、この頃は本当に辛い日々でした。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph6",
    "label": "本文 第6段落",
    "group": "合格体験記 2",
    "value": "受験生になっても、彼は家で勉強できないようでした。何かあると、すぐにイライラして手につかないあり様。「勉強しろ」と言えば振り出しに戻ってしまうので、何もできず悶々としていました。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph7",
    "label": "本文 第7段落",
    "group": "合格体験記 2",
    "value": "夏、天王山と言われる期間、彼も彼なりに、やらなければいけないと思っていたようで、不得意だった国語を、自習室でなんとか勉強していました。しかし模試の結果は、思うように国語も伸びず、惨敗でした。彼は大泣きしました。「国語なんて、やらなければよかった、時間を返せ！」子どもらしく泣きわめく彼を慰めながら、八方塞がりで無力さを感じていました。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph8",
    "label": "本文 第8段落",
    "group": "合格体験記 2",
    "value": "TWIYに通わせることを決めたのは、このときでした。「自学自習」スタイルなので、他塾との両立もできました。どうせ家で勉強できないのだから、ここでやらせてみようと思いました。何より、本人がここでやりたいと強く希望していました。以前に、沢田先生の国語の授業を受けたとき、相当楽しかったようです。子どもの言うことなので、本当か嘘かよくわかりませんが「馬のマスクを被っている」「変なハンコを使っている」とにかく変わった先生なのかな？という印象を受けていたのを覚えています。TWIYは、その沢田先生が立ち上げられた塾でした。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph9",
    "label": "本文 第9段落",
    "group": "合格体験記 2",
    "value": "TWIYに初めて伺ったとき、雰囲気のいい教室だな、と感じました。それぞれが机に向かって自習していますが、窮屈な感じがしませんでした。\r\n授業は、先生が思い立ったときに、学年に関係なくされているそうで、彼は中学生と一緒に授業を受けるときもありました。\r\n",
    "max": 16000
  },
  {
    "key": "voice2Paragraph10",
    "label": "本文 第10段落",
    "group": "合格体験記 2",
    "value": "TWIYで、先生や友達と過ごす時間は、とにかく楽しかったようでした。\r\n時間さえあればTWIYに通い、休日には、朝の9時から夜の9時までTWIYにいました。それでも、まだ足りないと教室に残って、なかなか帰ってこないので、妻が心配する日々でした。冬の夜道、キンキンに冷えたアスファルトを、自転車で疾走して帰ってきた彼の真っ赤な顔には、充実感がありました。彼は、自らすすんで勉強するようになっていました。\r\n",
    "max": 16000
  },
  {
    "key": "voice2Paragraph11",
    "label": "本文 第11段落",
    "group": "合格体験記 2",
    "value": "国語の成績も安定してきました。沢田先生から、さぞスペシャルな国語の解法術を教えてもらったのかと思いきや、やらされたことは意外にも「漢字」でした。この時期に漢字なんて、私はやらなくていいと思っていました。ですが「君は漢字さえできれば、第一志望に合格できる」先生は本気のようでした。その本気に応え、彼は漢字を必死に頑張りました。そして過去問では、漢字で点数を落とすことがなくなりました。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph12",
    "label": "本文 第12段落",
    "group": "合格体験記 2",
    "value": "自信を取り戻した彼は、受験終盤にも、学力を伸ばしていました。試験日が近づくと、不安になるものだと思いますが、私はむしろ安心していました。成績もそうですが、自らすすんで勉強をするようになった彼の姿を見て、以前の苦しさから解放されていました。もう得るものは得た気がして、受験には落ちても構わないとさえ本当に思っていました。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph13",
    "label": "本文 第13段落",
    "group": "合格体験記 2",
    "value": "試験を終えた日、「何がしたい？」と彼に聞いたら「すぐにTWIYに行って、お礼する！」と、言われてしまいました。TWIYの先生方には、もう嫉妬しかありません。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph14",
    "label": "本文 第14段落",
    "group": "合格体験記 2",
    "value": "妻ともよく話しますが、もし、あのときTWIYに通わせていなかったら・・彼は第一志望に合格できる能力を持っていた、はずだったのに、私たちでは、それを引き出すことはできなかったでしょう。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph15",
    "label": "本文 第15段落",
    "group": "合格体験記 2",
    "value": "受験を終えた今でこそ思いますが、やっぱり中学受験は「変」です。学校を疎かにして、テストで得点させるために、授業料を払って塾に通わせる。遊びたい盛りの子どもに無理をさせる。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph16",
    "label": "本文 第16段落",
    "group": "合格体験記 2",
    "value": "でも彼は、楽しい授業を受けた後は、活き活きとして帰ってきました。友達と難しい問題が解けたときは、すごく興奮して喜んでいました。やると決めたことをやり遂げて、苦手を克服できたときの達成感は、ひとしおだったことでしょう。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph17",
    "label": "本文 第17段落",
    "group": "合格体験記 2",
    "value": "これらの経験は、きっと彼の将来にも役立つはずです。中学受験をしてよかったと思えました。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph18",
    "label": "本文 第18段落",
    "group": "合格体験記 2",
    "value": "本当に、TWIYの先生方には感謝（と少しの嫉妬を）いたします。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph19",
    "label": "本文 第19段落",
    "group": "合格体験記 2",
    "value": "ありがとうございました。",
    "max": 16000
  },
  {
    "key": "voice2Paragraph20",
    "label": "本文 第20段落",
    "group": "合格体験記 2",
    "value": "（早稲田中学進学I君お父様より）",
    "max": 16000
  },
  {
    "key": "voice3Title",
    "label": "体験記3の見出し（改行可能）",
    "group": "合格体験記 3",
    "value": "▶︎ 大学受験\n医師国家試験",
    "max": 500
  },
  {
    "key": "voice3Paragraph1",
    "label": "本文 第1段落",
    "group": "合格体験記 3",
    "value": "貴方にとって受験とはなんであろうか。\n私は受験とは信念の戦いであると思う。\nここでいう信念はただ自分と自分の信じていることを信じ続けるということに他ならない。\n具体的な参考書、勉強方法などを伝えることもできるが受験の方式、課程も変化があるだろうし参考書だって私がいた時よりも良いものが出ているだろう。\nだが、それらの内容が何であるかは私は重要だと思っていない。大事なのはそんな事ではないからだ。",
    "max": 16000
  },
  {
    "key": "voice3Paragraph2",
    "label": "本文 第2段落",
    "group": "合格体験記 3",
    "value": "私は愛知県に生まれ、前庭水管拡大症という先天性難聴を患っていた。\nこの病気は聴力が進行的に悪化していくものであり、良くなることはない。\n現在は左はほぼ聞こえず、右は常人の10分の1程度の聴力しかない。\n私の両親は食いっぱぐれないようにと小さい頃から教育に力をいれてくれたし、お陰で、耳が不自由なこと以外に生活に何ら支障はなかった。\nお陰で有名進学校に進学できた。\nそこは中高一貫ということもあり6年間それほど努力せずとも進級できるシステムで、あれほど中学受験で頑張ったにも関わらず、私は気づいたら全ての教科で知識がほぼ無に等しい有様となってしまっていた。塾にも通ってはいたが何を話しているかわからず、終いにはサボるようになり退塾させられてしまった。要は落ちこぼれであったのだ。\nただ、学校生活は楽しかったし、なるようになるだろうと高をくくっていた。\n転機は高校2年生の物理のテストで0点をとってしまったことだ。\n他の教科も点数は散々であり、周りが大学受験を意識する中で何から手をつけて良いかもわからず途方に暮れていた。勧められた参考書を大量に買い込み、予備校の有名講師の授業も受けまくった。だが何にも変わらなかった。参考書はやるにはやったが成績は伸びず、予備校は楽しかったが先生の雑談しか覚えていない。",
    "max": 16000
  },
  {
    "key": "voice3Paragraph3",
    "label": "本文 第3段落",
    "group": "合格体験記 3",
    "value": "そんな時、ボクシングを教えてくれていた近所の兄ちゃんが勉強の仕方も教えてやると言ってきた。\nそこで教えてもらった勉強法は一言で言うならば「正しい方法で」一つのことを徹底的にやるということだった。\nその兄ちゃんは昔からなぜか妙に言葉に説得力があり、私は言われたことを導かれるようにやってみたのだ。先ず大量にあった参考書を全部捨てさせられ、机の上の積み上げられたプリントも何もかもを捨てさせられた。そして軽く英語文法の問題を出された後、薄い参考書を渡されて一言。「気合いで一日一周しろ」衝撃であった。",
    "max": 16000
  },
  {
    "key": "voice3Paragraph4",
    "label": "本文 第4段落",
    "group": "合格体験記 3",
    "value": "近所の兄ちゃんは全ては自分次第であり、参考書や先生の解説に頼る心こそが問題なのだ、と熱心に言い続けていたと記憶している。そして励まし勇気付け続けてくれた。\n私は1ヶ月でその文法書を31周し、そして勉強の仕方の正体を身体で知った。私は生まれて初めて「自分で」勉強した気がした。後はお手のものであった。",
    "max": 16000
  },
  {
    "key": "voice3Paragraph5",
    "label": "本文 第5段落",
    "group": "合格体験記 3",
    "value": "勉強方法を身につけた私は高校2年生の初めにボロボロだった成績が高校三年生の夏が終わる頃、東大理一、志望していた国公立大学の医学部がB判定になるまでとなっていた。\nそして現役で国公立医学部に合格することができた。",
    "max": 16000
  },
  {
    "key": "voice3Paragraph6",
    "label": "本文 第6段落",
    "group": "合格体験記 3",
    "value": "この話をするとよく言われるのが「元々の頭が違うんだよ」と。私が思うのは貴方は私と同じやり方を実践できるのか？ということだ。私は私より頭が良い人、本当の天才などたくさん見てきたし嫌と言うほど自分の凡庸さを知っている。特に自分に厳しいタイプでもない。\n私はただ、受験勉強の二年間に対しては一つの決めた参考書を誰よりもやったと言える自負がある。そしてその実践の積み重ねにより心、信念がより盤石になり、自信を持っていた。",
    "max": 16000
  },
  {
    "key": "voice3Paragraph7",
    "label": "本文 第7段落",
    "group": "合格体験記 3",
    "value": "もちろん、順風満帆に全てが進んだわけでもない、結果が出ないこともあったし、やる気が起きない日もあった。\nそんな時に支えてくれたのは読み込んでぼろぼろになった参考書だったし医師になりたいという心の奥底から出る自分の気持ちであった。",
    "max": 16000
  },
  {
    "key": "voice3Paragraph8",
    "label": "本文 第8段落",
    "group": "合格体験記 3",
    "value": "ここで私の一番言いたい、実体験を元にした意見を述べさせてもらいたい。\n近所の兄ちゃんから勉強の仕方を教えてもらっている時、つまり、初めて「自分自身で」勉強をし始めていた時の心の揺れ動いた話だ。\n最初は全く基礎知識がない私にとって全ての学問を1からやり直すことは焦りを禁じ得なかったし、周りから置き去りにされている様な気がした。\n最初に私は受験における信念とは自分がやっていることを信じることだと述べた。\nただそこには大きな落とし穴がが一つあって、異なる方向を向いたベクトルの勉強は時が経てば経つほど的違いな方向へ進んでしまうということだ。\nだから「正しい方法で」やらなければならない。\nそして正しい道を見つけるのは受験生の課題ではないと割り切るべきだ。生まれて初めて受験をするのに一発で正しい道を選べる者などそういない。\nそれは教育者の課題である。良い教育者ほど良い導きを与えられる。後はそれを如何にして自分の道として、信じ抜けるかだ。\n私の経験上必ず自分自身と向き合うという問題にぶつかるはずだ。もしもその問題にぶつかっていないならば、その勉強法はあなたを根本的に変えてくれるほどの力は持っていない。\n今や受験大国となった日本では巷に参考書、塾は溢れ、これぞ受験の王道であると言ったような決まり文句がどこかしこでも聴こえて来る。\nその情報の波に惑わされたとしても、自分の方向性を確かに信じて最後まで突き進めることができる信念の力を持つことこそが最初にして一番の関門だ、ということだ。\nそして繰り返しになるがその信念は勉強を始めた序盤にこそ最も揺らぐものである。本当にこれであっているのだろうか、あちらのやり方の方が良いのではないか、力がついている気がしない等々、疑心暗鬼になってしまう。\n私が伝えたく、そして役に立つアドバイスはそれを一旦信じて乗り越えてみたらどうだろうか、ということだ。その勉強法がもし正しいならば、あなたは絶対に乗り越えられるはずだ。反対になんの疑念もなく、乗り越えるものもないならば、その勉強法は毒にも薬にもならない。\nつまり貴方は今までの貴方のままであって、何も変わらないだろう。そして一旦越えれば必然的に力がついているという実感を手にいれ、その実感は次には自身の信念を支える土台となってくれる。これは本当に私が実感したことである。",
    "max": 16000
  },
  {
    "key": "voice3Paragraph9",
    "label": "本文 第9段落",
    "group": "合格体験記 3",
    "value": "貴方がもし本当に成績不振で苦しんでいたり、情報に溺れ、何が正しいかわからなくなった時に少しでも私の体験記が道標となってくれたら幸いだと思う。",
    "max": 16000
  },
  {
    "key": "voice3Paragraph10",
    "label": "本文 第10段落",
    "group": "合格体験記 3",
    "value": "今私は医師国家試験に合格し、医師として、また社会人としての人生を歩んでいる。\nここで私が経験した体験を最後に紹介しよう。\n通常、医学生は国家試験を受ける前に大手の医師国家試験予備校のビデオを見て勉強する。\n私は難聴のことがあったので字幕のないビデオは講師が話していることが半分ほどしかわからずビデオを見て勉強することを諦めざるを得なかった。\n確かに私は焦った。焦りに焦ったが、そんな時も勉強の方法は身体が覚えているものだ。\n大学受験の時の様に最もメジャーな一つの参考書を7周ほどやり込んだ。\n普通は真面目な多い人でも3周ほどのものだが、みんながビデオを見る時間を自由に使うことができたので、ひたすら同じものを最後には解説を覚えるくらいやった。倍はやるぞ、と意気込みそれ以上を達成した。\nすると、最後国家試験で9割ほどの得点を取ることができた。\nそれほどやり込むことは自分の血となり肉となるのである。\nそしてこのやり方が実践できたのは受験で成功したという自信が自分の方法が正しいという信念をより強固にしてくれたお陰である。",
    "max": 16000
  },
  {
    "key": "voice3Paragraph11",
    "label": "本文 第11段落",
    "group": "合格体験記 3",
    "value": "一つのことを自分を信じてやり遂げた経験は間違い無く自分の中の礎、誇りとして生き続けていると感じる。\nそしてそれは、決して大学受験の勉強法に留まるものではなく、医師国家試験、医師、社会人として生きていくなかでの全ての困難な場面において拠り所となるものである。\nぜひ貴方たちも、受験を自分の道標としてもらいたい。",
    "max": 16000
  },
  {
    "key": "voice3Paragraph12",
    "label": "本文 第12段落",
    "group": "合格体験記 3",
    "value": "あのボクシングを教えてくれた近所の兄ちゃんが先生になっていて、体験記を書いてくれという話を貰った時、ああついに思想、哲学塾を開くのかと思ったが意外にも受験勉強の塾だと聞いて驚いている。この人は教育から日本を本気で変える気らしい。\nただ話を聞くとまた妙に説得力があり、私はどうもその夢を彼なら達成する予感がする。\n昔を思い返し、勉強を教えて貰ってた夏、ことあるごとに彼が言っていた「一歩踏み出し、さらにもう一歩、それを続けることが救いに繋がる」という私も大好きな言葉が思い出された。\n彼は一歩踏み出したのだなと思った。そしてそれを続けるのだな、とも。",
    "max": 16000
  },
  {
    "key": "voice3Paragraph13",
    "label": "本文 第13段落",
    "group": "合格体験記 3",
    "value": "（28歳 男性　医師）",
    "max": 16000
  },
  {
    "key": "voice4Title",
    "label": "体験記4の見出し（改行可能）",
    "group": "合格体験記 4",
    "value": "▶︎ 大学受験\n司法試験",
    "max": 500
  },
  {
    "key": "voice4Paragraph1",
    "label": "本文 第1段落",
    "group": "合格体験記 4",
    "value": "司法試験は、日本で最難関の試験といわれている。\n試験科目は8科目、短答式試験と論文式試験があり、その試験範囲は膨大だ。また、法律家が集まって1年またはそれ以上の年月をかけて練りに練って作った問題である。量的にも質的にも、最難関といわれる所以がある。",
    "max": 16000
  },
  {
    "key": "voice4Paragraph2",
    "label": "本文 第2段落",
    "group": "合格体験記 4",
    "value": "2021年、私は司法試験に上位の成績で合格した。\n毎年1500人近く出る合格者にはそれぞれの勉強方法があるであろうが、近年では、多くの合格者が大手予備校を利用している。\n私はそれらの予備校を利用したことはないが、大学入学後、ありがたい指導者に出会い、法律学という学問を一から学ぶことができた。\nそこで私が実践した勉強は、司法試験の合格という結果を生むにとどまらず、私の生き方そのものを変えてくれた。",
    "max": 16000
  },
  {
    "key": "voice4Paragraph3",
    "label": "本文 第3段落",
    "group": "合格体験記 4",
    "value": "私の先生はいつも言っていた。\n「ある学問を一本の木に例えると、木の幹の部分と、そこから派生する枝葉部分に分類できる。木の幹の部分は、その学問の体系および原理原則であり、枝葉部分は、個々の具体的な事象・事柄をいう。\n学問を学ぶときに大切なのは、まずもって木の幹の部分をきちんと押さえることである。」",
    "max": 16000
  },
  {
    "key": "voice4Paragraph4",
    "label": "本文 第4段落",
    "group": "合格体験記 4",
    "value": "これは真理だろう。\n枝葉の知識だけ身につけても、初めてぶつかる問題に太刀打ちできない。\n全ての枝葉は木の幹から派生している。木の幹を正しく押さえていれば、どんな問題にぶつかっても、木の幹に立ち返って出発する限り間違えることはない。",
    "max": 16000
  },
  {
    "key": "voice4Paragraph5",
    "label": "本文 第5段落",
    "group": "合格体験記 4",
    "value": "しかし、学んでいて面白いのは大抵、枝葉部分だ。難しい言葉を使って、何か知ったような気になれる。(私の周りにも、難しい用語を多用して些末な知識を得意げに披露し、勉強した気になっている人間は少なからず存在した。)\n一方、木の幹を深く理解するために必要なことは大抵、地味で面倒臭い。どうしても「わかった気」になって次に進みたくなってしまうところを、ぐっと堪えて、もう一歩、更にもう一歩深く、自分の中に落とし込み、血となり肉となるまで、咀嚼しなければならない。\nここが、己自身との闘争だ。\n地味で面倒臭いことを避けて楽をしたい自分と、分からないという不快感に耐えきれずに分かった気になってしまう自分と、与えられた言葉や表現で満足して自分の頭を使わない怠惰な自分と、毎日毎日、戦わなければならない。",
    "max": 16000
  },
  {
    "key": "voice4Paragraph6",
    "label": "本文 第6段落",
    "group": "合格体験記 4",
    "value": "「楽をしたい」「やりたいことだけやっていたい」「レッテルを貼って目を背けたい」\nこれは人間に備わる性(さが)ともいえるだろう。",
    "max": 16000
  },
  {
    "key": "voice4Paragraph7",
    "label": "本文 第7段落",
    "group": "合格体験記 4",
    "value": "本当の勉強は、人間に備わる性(さが)に、あらがう戦いなのだ。己自身との闘争なのだ。\n思考を、行動を、生き方を変えていく営みなのだ。",
    "max": 16000
  },
  {
    "key": "voice4Paragraph8",
    "label": "本文 第8段落",
    "group": "合格体験記 4",
    "value": "だから、勉強は尊い営みであるといえる。\n勉強をやめてはならないと、私は思う。\n最後に、この塾はそれをとことん励まし、自身で気づくまで寄り添い続ける塾である。ということを私も寄り添い続けてもらった一人として確信し信じている。",
    "max": 16000
  },
  {
    "key": "voice4Paragraph9",
    "label": "本文 第9段落",
    "group": "合格体験記 4",
    "value": "（26歳　女性　裁判官）",
    "max": 16000
  },
  {
    "key": "voice5Title",
    "label": "体験記5の見出し（改行可能）",
    "group": "合格体験記 5",
    "value": "▶︎ 大学受験\n慶應義塾大学",
    "max": 500
  },
  {
    "key": "voice5Paragraph1",
    "label": "本文 第1段落",
    "group": "合格体験記 5",
    "value": "私は22歳の時に大学受験を決意して、受験勉強を始めました。\n私は高校卒業後に家の都合で3年間働かなければならない状況でした。22歳の時に兄弟3人で生活することになり、大学には行っておいた方が良いと考え、受験勉強をしました。私はストレスを受けると心不全を起こす持病を持っており、受験勉強中呼吸が突然苦しくなり勉強に手がつかなくなりました。そうなった時、実家の宮崎の祖母の家に行き、祖父の仕事について行ったり、祖母の買い物についていったりすることで何とか元の状態にして、東京に戻ってまた勉強ということを繰り返しました。そして文京学院大学に合格し、入学しました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph2",
    "label": "本文 第2段落",
    "group": "合格体験記 5",
    "value": "大学1年生の前期は全ての授業に参加し単位を全て取得しました。そして夏休みが明け後期初日の授業中「ここに居たくない」と突然思い、席を立ち、そのまま退学をしました。私はずっと前から慶應義塾大学に入りたかったのです。その事に気づかないようにしていただけで大学生活を過ごす内に心の中でここは私のいる場所ではないという思いがつのり爆発してしまったのだと思います。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph3",
    "label": "本文 第3段落",
    "group": "合格体験記 5",
    "value": "そして10月中旬から再び受験を決意しました。今度は自分の行きたい慶應義塾大学合格を目指しました。\n当時、偏差値35の大学に通っていた私が偏差値70近い志望校に4ヶ月で合格するのは難しいと思いましたが、できるところまでやってみようと勉強を始めました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph4",
    "label": "本文 第4段落",
    "group": "合格体験記 5",
    "value": "勉強を始めて数日経ったある日、ご縁があり、沢田先生に会う機会がありました。実は自分は大学受験をしようとしていると打ち明けました。自分が高校卒業後働いていたこと、文京学院大学を辞め再受験を決めたこと、慶應義塾大学に行きたいと言うことを先生に伝えました。その時に先生は本気で行きたいのかという事を何度も確認されました。私はそのたびごとにはい、本気ですと答えました。先生は一番大事なのは予備校や参考書や今の偏差値ではなく勉強法だ、とおっしゃいました。話を聞く中で、私はこの人を信じる事に決めました。\nそれまで独学で取り組んでいた方法を止めて、沢田先生から教わった方法で取り組む事にしました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph5",
    "label": "本文 第5段落",
    "group": "合格体験記 5",
    "value": "大手町の丸善に行き参考書売り場で問題集を手に取りいくつかの問題をその場で質問されました。ただその質問は異常に短時間でした。私が答えを考える間もないほど直ぐに問題を切り上げ、次の質問に移るというような感じです。そのあと基礎教材と呼んでいたものを3冊選んで頂きました。先生はこの三つの教材を完璧にこなせば慶應に合格できると断定されました。どの教材も分厚くなくて左ページに問題があり、右ページには答えがありました。そして答えが分からなかったらすぐ答えを読むよう指示されました。また次に会った時までに全ての問題をさっき質問されたスピードですぐ答えられるように指示されました。その為にはこれら教材を50周ずつしなければならないと言われました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph6",
    "label": "本文 第6段落",
    "group": "合格体験記 5",
    "value": "そして最後に、一つの教材を50周すれことで「頑張る」「やった」「勉強する」「完璧」「理解」「習得」「本気」という当たり前の言葉がどういう意味なのかを知って下さい、と言われました。\n私は目から鱗が落ちた思いでした。私は今まで勉強してきたと思っていましたが、それは勉強とは言えなかったのだと思ったからです。基礎問題にも関わらず即答できず、記憶の糸を辿って出した答えは、答えたと言う事にはならないのだと初めて知りました。私はこれは面白いことになりそうだとわくわくしました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph7",
    "label": "本文 第7段落",
    "group": "合格体験記 5",
    "value": "私は浪人生と同じように時間を好きに使えたのでとにかく基礎教材と呼んでいた教材を毎日こなしました。毎日こなす事で先生がおっしゃっていた言葉の意味が分かるようになりました。\nまず一冊を一周する事は大変ではありませんでした。答えを直ぐ見て良いと言われたので、解説を読み理解して行けばいいと思えました。それくらい軽い気持ちで出来たのはどうせこれをあと50回やるのだから大丈夫だろうと思ったからです。また一周するのに最初は一週間かかりましたが、二周目は４日で出来ました。二周目でも正解できた問題は全体の3割程でした。三周目は2日で出来ました。正解できた問題は半分以上だった気がします。そして四周目は一日で回しました。この時にはほとんどの問題が分かっている状態でした。そして一日一周する事を続けて行き、10周したあたりで完璧になったと思ったので先生に報告したところ、50周やれと言ったはずだと言われました。私は受験までの残りの日数的に焦っていたので本当にやる必要があるのかと思いましたが、とりあえず先生を信じてやりました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph8",
    "label": "本文 第8段落",
    "group": "合格体験記 5",
    "value": "そして一日一教材を一周して行くと、２つの事にに気がつきました。\n一つ目は解説の「意味」が理解できたという事です。最初は無味乾燥に見えた解説が、一つ一つの表現に意味があるという事に気がつきました。第１章の解説が第13章の解説とリンクしているというような感じです。章ごとにバラバラに見えた解説は実は繋がりがある事に気づく事ができるようになりました。またどの解説も実は全て味わい深く、緻密に計算された素晴らしいものであり、そのような教材を選んで頂いたのだと思いました。一周するごとにこんなこと書いてあったんだと新たな気づきを得られる事は自分が成長しているのだという実感にもなりました。\n二つ目は自分の精神状態が安定していることに気がつきました。私はストレスを感じると心不全を起こしてしまう恐れがあり、それがとても不安でした。しかし、同じ教材を毎日継続し反復をすることで安心感を得ている事に気がつきました。何周もしているのですぐ答えられ、自分はできるという感覚に自然となれました。しかもそれが300問分得られることは、やったことのある人にしか分からない快感だと思います。多分本当に勉強ができる人というのはこんな感覚だったんだろうなと思います。また日を追うごとに、解くスピードが速くなり、一周する時間が短くなり、他の教材をやる時間が増えて行く事が実感できました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph9",
    "label": "本文 第9段落",
    "group": "合格体験記 5",
    "value": "50周を終えた頃には、嘘だと思われるかも知れませんが問題を見た瞬間に答えと、他の選択肢が間違っている理由と、解説で覚えましょうと言われたポイントの３つが同時に浮かぶレベルになっていました。\n一日1周では物足りなくなり、一日2,3周やったり、空いた時間を他の教材に費やす事ができました。またその教材も同じようにやって行きました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph10",
    "label": "本文 第10段落",
    "group": "合格体験記 5",
    "value": "年明けには基礎教材はそれぞれ100周以上ずつ行っており、しかも一冊一時間以内に終わらせることができていました。そして何より私はできるという自信を持つ事ができていました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph11",
    "label": "本文 第11段落",
    "group": "合格体験記 5",
    "value": "先生にその事を伝えると、やり過ぎだと言われました（笑）そして精神は安定しているかと聞かれました。安定していると言うと、赤本（大学受験の過去問）をやりなさいと言われました。そして、過去問のやり方は、解かないで答えを先ず記入してそれを何回も音読するというやり方でした。つまり基礎教材3冊と同じことを過去問でもやる、ということでした。\n過去問は学部によるが30〜50周こなしました。勿論ですが、1周目よりも2周目、2周目よりも3周目の方が、スピードも気づいた事も増えて行きます。過去問に答えを記入し、音読教材を自分でつくり、そして何年分か音読し、飽きたら基礎教材を一周ずつするという日々が続きました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph12",
    "label": "本文 第12段落",
    "group": "合格体験記 5",
    "value": "しかし私はある時から、復習や音読ばかりで、自分は本当に合格できるのだろうかと不安になっていました。そんな時、同居していた兄の友人が家にやって来たので私はその事を相談してみました。その人は私より年下ではありましたが早稲田大学に現役で合格した人で、塾で英語を教えている人でもあったのでアドバイスをもらう感覚で聞いてみました。するとその先生は、アウトプットをしないなんて考えられない、今まで何をやっていたんだ、慶應大学は長文読解が出るから長文の問題集をやれと言われました。\n私は聞いている内に不安になってきてしまい、その方がオススメして下さった英語長文の問題集をその日のうちに買いに行き、解きました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph13",
    "label": "本文 第13段落",
    "group": "合格体験記 5",
    "value": "その数日後に先生に家までご足労いただき、勉強の進捗状況を見ていただいている時に先生が英語長文の問題集を見つけ、質問されました。私は先日あった事を説明しました。\nその時に先生は、君の指導は私がしている、私とその人のどちらの方が君を知っているだろうか、とおっしゃいました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph14",
    "label": "本文 第14段落",
    "group": "合格体験記 5",
    "value": "私はどこかでこの先生は適当に教えているのではないか、と思っていました。というのもやり方があまりにシンプルで、解説や指導をして来ないからです。だからどこかで私の指導に手を抜いているのではないかと疑っていました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph15",
    "label": "本文 第15段落",
    "group": "合格体験記 5",
    "value": "先生はその問題集は誰が勧めたのか聞きました。そしてその人は本当に慶應の受験に精通している人なのかを問いました。私はそうは思わなかったので違うと思いますと言いました。次に先生はその参考書の著者は誰なのかを聞いて来ました。そしてその人がピックアップした問題が慶應合格に本当に直結すると一点の疑念なく信用していますかと聞いて来ました。私はそこまでは信用していませんと答えました。\n先生は君が一点の疑念なく、一番に信用できるものは君の第一志望の慶應義塾大学自身が作った問題、つまり過去問ではないのかと仰いました。それ以外の教材はどんなに素晴らしくとも必ず一点の疑いを差し挟むことができてしまう、と先生は穏やかに説明してくれていたように記憶しています。私はマズイことをやってしまったと思いました。\n受験勉強の終盤、一番心が揺れる時期にほんの一点の疑いが、今までの積み上げた努力を疑うまで広がってしまうものです。実際私がそうでした。それを先生は指摘されました。先生は、先ずそもそも私には4か月で慶應に合格するプランで指導されていたのです。私がしていた慶應義塾大学の過去問の復習は100%疑いようがなく信用できた唯一の教材であり、それを何回も何回も復習する事は慶應合格を目指す私にとって一番実力をつける行動であったのです。私はその考えに自分で辿りつけなかった。\n先生は君と第一志望の問題の間にたとえ私でさえも、余計なものは要らないはずだ。ただでさえ時間のない君に余計な事をする時間はないはずだ、と仰いました。自分で考えずに不安からとにかく他人任せにして来た事を反省しました。\nそして何より先生の指導は自分自身で考える機会を大量に用意してくれていたのだということにも気づきました。先生は解説をせず手を抜いていたのではなく、わざとせずに私自身が自分で考えられる人間になるまで辛抱してくださったのだと思う。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph16",
    "label": "本文 第16段落",
    "group": "合格体験記 5",
    "value": "そして私は4ヶ月で志望校である慶應義塾大学総合政策学部に合格できた。他にも法政大学に合格した。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph17",
    "label": "本文 第17段落",
    "group": "合格体験記 5",
    "value": "受験当日はとても落ち着いた状態で試験を受けることができた。誰よりもひとつの参考書をやった自信があったし、誰よりも自分が行きたい慶應義塾大学の過去問をやったと言えたからだ。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph18",
    "label": "本文 第18段落",
    "group": "合格体験記 5",
    "value": "私が憧れの慶應義塾大学に入学した年、ビリギャルというドラマか漫画かが流行っていました。学年ビリのギャルが1年間で慶應義塾大学に合格したというお話です。しかも私はそのビリギャルさんと同じ学部であり、私が在学中ビリギャルさんもまだ慶應にいました。自分と境遇が似ていると思ったので、自分の受験勉強を振り返りながら調べてみました。\n彼女が進学校であったことや、小論文の偏差値が低かっただけであったこと、そして親が百数十万円を塾に出し合格したと誇らしげに書いてありました。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph19",
    "label": "本文 第19段落",
    "group": "合格体験記 5",
    "value": "先生、私はあのぼろぼろになった基礎教材の3冊さえも自分では買っていません。先生が購入してくださいましたね。兄弟だけで生活するのがやっとでお金が無かったからです。受験指導料どころか、お腹すいていないかといつも受験指導していただく場所はご飯屋さんでご飯をお腹いっぱいになるまでご馳走させて頂きました。ただの一度もお金を払ったことがありません。先生がとても疲れていたのでせめてマッサージさせて下さいと言った時も、大丈夫といって帰られましたよね。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph20",
    "label": "本文 第20段落",
    "group": "合格体験記 5",
    "value": "先生、私は先生のお陰で憧れの慶應義塾大学に合格できたと思っておりません。先生に合格させてもらったと思っておりません。何百周も、何十周も毎日毎日毎日繰り返した自分の努力の成果だと思っています。そして、そう思わせてくれるようにしてくださっていたんですね。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph21",
    "label": "本文 第21段落",
    "group": "合格体験記 5",
    "value": "私は今医者や、税理士や、法律家になろうかと思っている。私は何にだってなれる。本当にそう思っている。勉強法は身につけられている、だから私は何にだってなれると思える。そしてそれが何よりも幸福であると感じている。",
    "max": 16000
  },
  {
    "key": "voice5Paragraph22",
    "label": "本文 第22段落",
    "group": "合格体験記 5",
    "value": "（29歳　川添　剛）",
    "max": 16000
  }
];
  fields.push(
{
  "key": "results2025juniorScope",
  "value": "当塾在籍の中学受験生（全1名）の進学",
  "group": "合格実績 2025",
  "label": "中学受験生の人数・進学の注記",
  "max": 500,
  "retired": true
},
{
  "key": "results2025highScope",
  "value": "当塾在籍の高校受験生（全1名）の進学",
  "group": "合格実績 2025",
  "label": "高校受験生の人数・進学の注記",
  "max": 500,
  "retired": true
},
{
  "key": "results2025universityScope",
  "value": "当塾在籍の大学受験生（全5名）の進学",
  "group": "合格実績 2025",
  "label": "大学受験生の人数・進学の注記",
  "max": 500,
  "retired": true
},
{
  "key": "results2024otherScope",
  "value": "上記の三名を除いた2024年度生徒6名（内浪人1名 Ⓡ）の合格校",
  "group": "合格実績 2024",
  "label": "その他の生徒の人数・範囲の注記",
  "max": 500,
  "retired": true
},
{
  "key": "results2023universityHeading",
  "value": "大学受験生の合格校",
  "group": "合格実績 2023",
  "label": "区分：大学受験生の合格校",
  "max": 500
},
{
  "key": "resultsVoiceLinkLabel",
  "value": "合格体験記",
  "group": "合格実績 共通",
  "label": "学校名の横に添える体験記リンクの表記",
  "max": 80,
  "retired": true
});
  fields.push(
{
  "key": "resultsFeaturedLead",
  "label": "最上部の体験記：見出し",
  "group": "合格実績内の体験記",
  "value": "はじまりの子弟",
  "max": 200
},
{
  "key": "resultsFeaturedSubtitle",
  "label": "最上部の体験記：小さめの副題",
  "group": "合格実績内の体験記",
  "value": "慶應義塾大学合格体験記",
  "max": 200
},
{
  "key": "results2023StoriesHeading",
  "label": "2023年度の体験記：欄の見出し",
  "group": "合格実績内の体験記",
  "value": "2023年度合格体験記",
  "max": 200
},
{
  "key": "resultsEarlierStoriesHeading",
  "label": "過年度の体験記：欄の見出し",
  "group": "合格実績内の体験記",
  "value": "それ以前の合格体験記",
  "max": 200
}
  );
  fields.push({key:'navHistory',label:'理念：メニュー・ページタイトル',group:'共通メニュー',value:'理念',previousDefaults:['TWIY塾沿革','TWIY塾理念・概要'],max:80});
  fields.push({key:'navOverview',label:'概要：メニュー・ページタイトル',group:'共通メニュー',value:'概要',max:80});
  fields.push({key:'navResultsStories',label:'実績：メニュー・ページタイトル',group:'共通メニュー',value:'実績',previousDefault:'合格実績・体験記',max:80});
  fields.push({key:'overviewBody',label:'概要の追加本文（以前の編集内容・空欄は非表示）',group:'概要',value:'',max:16000});
  // Verbatim 2026 flyer page 2, excluding the Address/Access/QR block.
  fields.push(
    {"key":"overviewSystemTitle","label":"授業形態・運営システム：見出し","value":"TWIY の授業形態と、運営システムについて","max":300,"group":"概要"},
    {"key":"overviewSystemLead","label":"冒頭の文","value":"TWIYは前提として生徒が初めから授業を受け聞く「器」を持っていると思っていません。","max":1000,"group":"概要"},
    {"key":"overviewSystemParagraph1","label":"本文1：器と水","value":"お子さんの受け取れる能力を「器（コップ）」だとします。先生の与える授業や計画表などをその器に注がれる「水」だとします。重要なのは注がれる「水」の種類ではありません。受け取る側のお子さんの「器」の大きさです。「器」が小さい子に、どんなに素晴らしい授業をし、どんなに素晴らしい参考書を与え、どんなに完璧な計画表を与えても、その子は本質的に進歩することがありません。どんなに素晴らしい「水」を注ごうと、「おちょこ」が「バケツ」へと変化することはないからです。勿論、子供はその小さな自分の「器」に収まる範囲で「水」を受け取ります。「授業分かりやすい」と言います。しかし、同時に「器」の大きい子なら取りこぼさない、多くを取りこぼしてもいるのです。数か月後には「器」は早くも満杯になり、真面目に授業を受けているにも関わらず成績が伸びなくなります。その後は悲惨です。満杯のコップに水を注ぐが如く意味の無い授業を受けさせられ、無駄金を払い続けます。そして、最後には本人も親も、「自分（この子）は馬鹿だから」と卑下をして諦めるか、他人（先生や塾）のせいにするようになります。さて、ここで先生を変えたり、塾を変えたり、すなわちより良い「水」を求めても意味がありません。変わるべきはお子さん自身だからです。","max":6000,"group":"概要"},
    {"key":"overviewSystemParagraph2","label":"本文2：個人教育","value":"ですから先ずは何よりも子供の持つ「器」を変えることから始めなければなりませんが、ではどうすれば「器」を大きくさせられるのでしょうか。皆さん本当は知っているはずです。一番面倒がかかり、莫大なお金が掛かることをすることです。例えるなら旧時代の貴族階級が子弟に専属の家庭教師を付けたように、その子の人生や生活に直接関わるレベルでの、長期間、長時間の「個人」教育を受けさせることです。週数回、何時間いくらというような生半可な教育でお子様の「器」に変革が起こることは構造上あり得ません。本当に子供を変えようとするならば、長期間、長い時間かけて、毎日、全ての勉強時間に力のある先生がつき、子供の一挙手一投足に至るまでの行動に対し、*あるべき「型・器」へと指導しなければ、子供の「器」が変わることは叶いません。","max":6000,"group":"概要"},
    {"key":"overviewMethodNote","label":"面談での説明についての注記","value":"＊この具体的方法、手順は来塾時の面談にて詳細を説明させていただきます。","max":2000,"group":"概要"},
    {"key":"overviewSystemParagraph3","label":"本文3：運営システム","value":"あらゆる組織に言えることですが、塾が子どもに対してできることや与えられるものは、その塾の「運営システム」に構造上限界づけられています。例えば、週数回、何時間いくら何回でいくら、集団授業の講義形式、休校日がある、15：00から22；00までの営業時間、そういった「運営システム」を採用しているならば、当たり前ですが、その塾は生徒一人一人に時間をかけてライフスタイルや「器」から変革させるような可能性を構造上持ち得ません。よってこのような運営システムの塾に通った場合、その子が元々持つ「器」の大きさがそのまま結果となりますので、残酷なようですが、もともと賢い子は難関校へ、もともと平均的な子は平均的学校へ、そして平均以下の子は誰でも行ける学校へ行くことが、入塾前に既に運命づけられています。ですから、先ず親が何よりもしなければならないことは、「自分や我が子の望みが、この運営システムで果たして構造的に可能なのか？」という確認であり、合格実績を見ることではありません。もし今の我が子の運命を変えることを望むならば、普通を超えた既存のサービス業的枠組みに収まらない「システム」で実際に運営しているかどうかが、塾選びの唯一と言って良い基準なのです。","max":6000,"group":"概要"},
    {"key":"overviewSystemParagraph4","label":"本文4：当塾の授業・営業時間","value":"さて当塾は長期間、長時間、毎日、全ての勉強時間に先生がつき、子供の一挙手一投足に至る行動に対して指導する塾です。実際それを可能とする為に、年中無休で、毎日、朝（9：00）から深夜（上限無し）までを営業時間とし、また生徒は毎日通塾が基本で、毎日、主要科目を個別授業で受けてもらうというシステムで運営しています。簡単に言えば大手塾の夏期講習が毎日受けられる塾だと思ってください。（だからと言って当塾は裕福な家庭の為の塾ではないので、料金は大手塾よりも敢えて安くし、費用対効果がおかしいとお母様方から言われる値段設定にしています。）我々が子供の「器」の変容という課題に対し「本気」であることご確認下さい。","max":6000,"group":"概要"},
    {"key":"overviewCapacityNote","label":"定員・入塾についての注記","value":"＊ただし当塾は、講師の数と生徒数の関係により、多くの生徒を構造上持てません。生徒数は３０人が限界です。\nもしお知り合いの方からのお薦めであっても、生徒数が上限に達していた場合、入塾をお断りさせていただいております。","max":2000,"group":"概要"},
    {"key":"overviewTeachersTitle","label":"講師紹介：見出し","value":"講師紹介","max":300,"group":"概要"},
    {"key":"overviewTeacherCriterion1","label":"講師紹介：条件1","value":"➀全員が東京大学合格レベルまでの指導と解答能力を持つ。","max":1000,"group":"概要"},
    {"key":"overviewTeacherCriterion2","label":"講師紹介：条件2","value":"➁講師歴が１０年以上である。","max":1000,"group":"概要"},
    {"key":"overviewTeacherCriterion3","label":"講師紹介：条件3","value":"➂大手塾または予備校の文系、理系の最上位クラスを歴任した経験を持つ。","max":1000,"group":"概要"},
    {"key":"overviewTeacherCriterion4","label":"講師紹介：条件4","value":"➃元勤務の大手塾内のアンケートにおいて「授業の分かりやすさ」という評価目で継続的にトップであった。","max":1000,"group":"概要"},
    {"key":"overviewTeacherCriterion5","label":"講師紹介：条件5","value":"➄なにより人品骨柄に優れ「先生」としての資質を持つ。","max":1000,"group":"概要"},
    {"key":"overviewTeachersNote","label":"講師紹介：説明文","value":"＊「個人教育」や「運営システム」を強調していますが、当塾は、先ず何より生徒へ注ぐ「水（授業）」が上記のように高いレベルに達している者のみを採用し、授業の面白さ、分かりやすさで他塾と勝負しております。ぜひ体験授業を受け、ご比較下さい。","max":3000,"group":"概要"},
    {"key":"overviewTeacher1Name","label":"講師1：氏名","value":"田尾 先生","max":200,"group":"概要"},
    {"key":"overviewTeacher1Bio","label":"講師1：経歴","value":"千葉大学 工学部\n同大学院元准教授","max":2000,"group":"概要"},
    {"key":"overviewTeacher2Name","label":"講師2：氏名","value":"西田 先生","max":200,"group":"概要"},
    {"key":"overviewTeacher2Bio","label":"講師2：経歴","value":"東京大学 理科一類\n→東京理科大 物理学科","max":2000,"group":"概要"},
    {"key":"overviewTeacher3Name","label":"講師3：氏名","value":"中川 先生","max":200,"group":"概要"},
    {"key":"overviewTeacher3Bio","label":"講師3：経歴","value":"元大手塾 室長\n明治大学 英米文学科卒","max":2000,"group":"概要"},
    {"key":"overviewTeacher4Name","label":"講師4：氏名","value":"沢田 廉也（次郎）","max":200,"group":"概要"},
    {"key":"overviewTeacher4Bio","label":"講師4：経歴","value":"TWIY 代表\n早稲田大学 社会科学部卒","max":2000,"group":"概要"},
    {"key":"overviewTeacher5Name","label":"講師5：氏名","value":"泰平 先生","max":200,"group":"概要"},
    {"key":"overviewTeacher5Bio","label":"講師5：経歴","value":"元大手塾 室長\n早稲田大学 文学部卒","max":2000,"group":"概要"},
    {"key":"overviewTeacher6Name","label":"講師6：氏名","value":"ANNA 先生","max":200,"group":"概要"},
    {"key":"overviewTeacher6Bio","label":"講師6：経歴","value":"早稲田大学 政経学部卒\n同大学院修士課程修了","max":2000,"group":"概要"},
    {"key":"overviewTeacher7Name","label":"講師7：氏名","value":"高戸 先生","max":200,"group":"概要"},
    {"key":"overviewTeacher7Bio","label":"講師7：経歴","value":"ICU\n（国際基督教大学）卒","max":2000,"group":"概要"}
  );
  fields.push({key:'navLegalConsultation',label:'法律相談へのリンク（C1最下部）',group:'共通メニュー',value:'法律相談はこちら',max:80});
  fields.push(
    {key:'accessDirectionsStation',label:'道順：駅からの道順',group:'アクセス',value:'東京メトロ東陽町駅1番出口または2番出口から出て、四ツ目通りを区役所方面に直進。徒歩約5分。',max:2000},
    {key:'accessDirectionsOffice',label:'道順：江東区役所',group:'アクセス',value:'通りを挟んで江東区役所の前。',max:2000},
    {key:'accessDirectionsAlley',label:'道順：路地の目印',group:'アクセス',value:'自動車メーカースバルと、ケーキ屋さんHARUの間の路地を入ったところにあります。',max:2000}
  );
  const historyYears=[2021,2022,2023,2024,2025,2026];
  const emptyEvent=()=>({id:'event-'+crypto.randomUUID(),date:'',title:'',body:'',photo:'',alt:'',caption:''});
  const historyDefaults={
    years:historyYears.map(year=>({year,events:year===2021 ? [{id:'history-2021-start',date:'',title:'TWIYの前身となる東陽町での活動',body:'',photo:'',alt:'',caption:''}] : year===2022 ? [{id:'history-2022-opening',date:'4月',title:'東陽町で開業',body:'',photo:'',alt:'',caption:''}] : []})),
    greeting:{heading:'代表挨拶',body:'',role:'',name:'',photo:'',alt:'',caption:''}
  };
  // Retain legacy flyer fields in backups, but replace their public layout/editor.
  fields.filter(field=>field.key.startsWith('overview')).forEach(field=>{field.retired=true;});
  const overviewSections=[
    {key:'students',label:'対象生徒'}, {key:'hours',label:'営業時間'},
    {key:'lessons',label:'授業形態'}, {key:'fees',label:'料金'}, {key:'teachers',label:'講師'}
  ];
  const overviewLimits={items:60,people:40,text:6000,name:200};
  const initialText=Object.fromEntries(fields.map(field=>[field.key,field.value]));
  function initialOverview(text=initialText) {
    return {
      students:['小学生・中学生・高校生・浪人生。','入塾テストはありません。','生徒数は30人まで。定員に達した場合は入塾をお断りしています。'],
      hours:['年中無休。','毎日9:00から深夜まで（上限なし）。'],
      lessons:['毎日の通塾を基本に、主要科目を個別授業で指導します。','生徒一人ひとりに合わせた「個人教育」。授業だけでなく、復習の仕方や学習習慣まで継続して指導します。','個人の能力と志望校に合わせて、年間の学習スケジュールを作成します。','個別授業・理解の確認・復習・テストを繰り返し、学習内容の定着を図ります。','自習は毎日可能。入塾後は、一人ひとりに自習ブースを用意します。'],
      fees:[],
      teachers:{
        general:[1,2,3,4,5].map(i=>text['overviewTeacherCriterion'+i]).concat(text.overviewTeachersNote),
        people:Array.from({length:7},(_,i)=>({id:'teacher-'+(i+1),name:text['overviewTeacher'+(i+1)+'Name'],items:[text['overviewTeacher'+(i+1)+'Bio']]}))
      }
    };
  }
  function validateOverview(input,text=initialText) {
    // Derive legacy teacher text in memory only; never rewrite browser storage on read.
    if(input===undefined)return initialOverview(text);
    const shape=(value,keys)=>{
      if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(key=>!keys.includes(key)))throw Error('概要のデータ形式を確認してください。');
    };
    const string=(value,max)=>{
      if(typeof value!=='string'||value.length>max||value.includes('\u0000'))throw Error('概要の説明は'+max+'文字以内で入力してください。');
      return value;
    };
    const items=value=>{
      if(!Array.isArray(value)||value.length>overviewLimits.items)throw Error('説明欄は各項目'+overviewLimits.items+'件まで追加できます。');
      return Array.from(value,item=>string(item,overviewLimits.text));
    };
    shape(input,['students','hours','lessons','fees','teachers']);
    const teachers=input.teachers;shape(teachers,['general','people']);
    if(!Array.isArray(teachers.people)||teachers.people.length>overviewLimits.people)throw Error('講師は'+overviewLimits.people+'名まで追加できます。');
    const ids=new Set();
    const people=Array.from(teachers.people,person=>{
      shape(person,['id','name','items']);
      if(typeof person.id!=='string'||!/^[a-z0-9-]{1,80}$/.test(person.id)||ids.has(person.id))throw Error('講師の識別番号を確認してください。');
      ids.add(person.id);
      return {id:person.id,name:string(person.name,overviewLimits.name),items:items(person.items)};
    });
    return {students:items(input.students),hours:items(input.hours),lessons:items(input.lessons),fees:items(input.fees),teachers:{general:items(teachers.general),people}};
  }
  const defaults = {schema:1,text:initialText,history:historyDefaults,overview:initialOverview()};
  const clone = value => JSON.parse(JSON.stringify(value));
  const historyText=(value,max)=>{
    if(typeof value!=='string'||value.length>max||value.includes('\u0000'))throw Error('沿革の文字数・入力内容を確認してください。');
    return value;
  };
  function historyPhoto(value) {
    if(typeof value!=='string'||value.length>1600000||!(value===''||/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value)))throw Error('沿革の写真はJPEG・PNG・WebPの画像データで登録してください。');
    return value;
  }
  const object=(value,keys)=>{
    if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(key=>!keys.includes(key)))throw Error('沿革のデータ形式を確認してください。');
  };
  function validateHistory(input) {
    if(input===undefined)return clone(historyDefaults); // Older backups, memory only.
    object(input,['years','greeting']);
    if(!Array.isArray(input.years)||input.years.length!==historyYears.length)throw Error('沿革は2021〜2026年の6年分を指定してください。');
    const ids=new Set();let imageSize=0;
    const photo=value=>{const result=historyPhoto(value);imageSize+=result.length;return result;};
    const years=historyYears.map(year=>{
      const matches=input.years.filter(item=>item?.year===year);
      if(matches.length!==1)throw Error('沿革の年が不足しているか重複しています。');
      const group=matches[0];object(group,['year','events']);
      if(!Array.isArray(group.events)||group.events.length>20)throw Error('各年の出来事は20件まで追加できます。');
      return {year,events:group.events.map(event=>{
        object(event,['id','date','title','body','photo','alt','caption']);
        if(typeof event.id!=='string'||!/^[a-z0-9-]{1,80}$/.test(event.id)||ids.has(event.id))throw Error('出来事の識別番号を確認してください。');
        ids.add(event.id);
        return {id:event.id,date:historyText(event.date,80),title:historyText(event.title,200),body:historyText(event.body,6000),photo:photo(event.photo),alt:historyText(event.alt,300),caption:historyText(event.caption,500)};
      })};
    });
    const g=input.greeting;object(g,['heading','body','role','name','photo','alt','caption']);
    const greeting={heading:historyText(g.heading,200),body:historyText(g.body,16000),role:historyText(g.role,200),name:historyText(g.name,200),photo:photo(g.photo),alt:historyText(g.alt,300),caption:historyText(g.caption,500)};
    if(imageSize>24000000)throw Error('写真の合計容量が大きすぎます。写真を減らして再度保存してください。');
    return {years,greeting};
  }
  const eventVisible=event=>!!(event.title.trim()||event.body.trim()||event.photo);
  const greetingVisible=g=>!!(g.body.trim()||g.name.trim()||g.photo);
  function validate(value) {
    if(!value || value.schema!==1 || !value.text || typeof value.text!=='object' || Array.isArray(value.text)) throw Error('塾用の保存データを選んでください。');
    if(Object.keys(value.text).some(key=>!Object.hasOwn(defaults.text,key))) throw Error('この版では対応していない項目があります。');
    const text = {};
    for(const field of fields) {
      // New display fields are optional in older exports. Fill only in memory;
      // reading a page never migrates or overwrites saved browser content.
      const addedField = field.key==='heroTitle' || field.key==='navResults' || field.key==='navHistory' || field.key==='navOverview' || field.key.startsWith('overview') || field.key==='navResultsStories' || field.key==='navLegalConsultation' || field.key.startsWith('results') || field.key.startsWith('accessDirections');
      let current = addedField && value.text[field.key]===undefined ? field.value : value.text[field.key];
      // Apply requested text/count revisions to unchanged former defaults only.
      // Custom text and the stored/imported object are never overwritten on read.
      if(field.previousDefault!==undefined && current===field.previousDefault)current=field.value;
      if(field.previousDefaults?.includes(current))current=field.value;
      if(typeof current!=='string' || current.length>field.max || current.includes('\u0000')) throw Error(field.label+'は'+field.max+'文字以内で入力してください。');
      if(field.group==='共通メニュー' && !current.trim()) throw Error(field.label+'を入力してください。');
      if(['accessPhone','accessMobile'].includes(field.key) && !/^[\s【】()（）+\dー−-]+$/.test(current)) throw Error(field.label+'は数字とハイフン等で入力してください。');
      text[field.key]=current;
    }
    return {schema:1,text,history:validateHistory(value.history),overview:validateOverview(value.overview,text)};
  }
  globalThis.TWIY_SCHOOL_MODEL={fields,defaults,clone,validate,historyYears,emptyEvent,historyPhoto,eventVisible,greetingVisible,overviewSections,overviewLimits,validateOverview};
})();
