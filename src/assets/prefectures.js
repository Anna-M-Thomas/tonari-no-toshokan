const prefectures = [
  { name_jp: "北海道", name_en: "Hokkaido" },
  { name_jp: "青森県", name_en: "Aomori" },
  { name_jp: "岩手県", name_en: "Iwate" },
  { name_jp: "宮城県", name_en: "Miyagi" },
  { name_jp: "秋田県", name_en: "Akita" },
  { name_jp: "山形県", name_en: "Yamagata" },
  { name_jp: "福島県", name_en: "Fukushima" },
  { name_jp: "茨城県", name_en: "Ibaraki" },
  { name_jp: "栃木県", name_en: "Tochigi" },
  { name_jp: "群馬県", name_en: "Gunma" },
  { name_jp: "埼玉県", name_en: "Saitama" },
  { name_jp: "千葉県", name_en: "Chiba" },
  { name_jp: "東京都", name_en: "Tokyo" },
  { name_jp: "神奈川県", name_en: "Kanagawa" },
  { name_jp: "新潟県", name_en: "Niigata" },
  { name_jp: "富山県", name_en: "Toyama" },
  { name_jp: "石川県", name_en: "Ishikawa" },
  { name_jp: "福井県", name_en: "Fukui" },
  { name_jp: "山梨県", name_en: "Yamanashi" },
  { name_jp: "長野県", name_en: "Nagano" },
  { name_jp: "岐阜県", name_en: "Gifu" },
  { name_jp: "静岡県", name_en: "Shizuoka" },
  { name_jp: "愛知県", name_en: "Aichi" },
  { name_jp: "三重県", name_en: "Mie" },
  { name_jp: "滋賀県", name_en: "Shiga" },
  { name_jp: "京都府", name_en: "Kyoto" },
  { name_jp: "大阪府", name_en: "Osaka" },
  { name_jp: "兵庫県", name_en: "Hyogo" },
  { name_jp: "奈良県", name_en: "Nara" },
  { name_jp: "和歌山県", name_en: "Wakayama" },
  { name_jp: "鳥取県", name_en: "Tottori" },
  { name_jp: "島根県", name_en: "Shimane" },
  { name_jp: "岡山県", name_en: "Okayama" },
  { name_jp: "広島県", name_en: "Hiroshima" },
  { name_jp: "山口県", name_en: "Yamaguchi" },
  { name_jp: "徳島県", name_en: "Tokushima" },
  { name_jp: "香川県", name_en: "Kagawa" },
  { name_jp: "愛媛県", name_en: "Ehime" },
  { name_jp: "高知県", name_en: "Kochi" },
  { name_jp: "福岡県", name_en: "Fukuoka" },
  { name_jp: "佐賀県", name_en: "Saga" },
  { name_jp: "長崎県", name_en: "Nagasaki" },
  { name_jp: "熊本県", name_en: "Kumamoto" },
  { name_jp: "大分県", name_en: "Oita" },
  { name_jp: "宮崎県", name_en: "Miyazaki" },
  { name_jp: "鹿児島県", name_en: "Kagoshima" },
  { name_jp: "沖縄県", name_en: "Okinawa" },
];

export default prefectures;

//name_jp is for the actual query going to Calil api 
//http://api.calil.jp/library?appkey={あなたのアプリキー}&pref=埼玉県
//name_en is what shows up in the menu