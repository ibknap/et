const localeMap = {
  AED: "ar-AE", // United Arab Emirates Dirham
  AFN: "fa-AF", // Afghan Afghani (or consider "ps-AF" if preferred)
  ALL: "sq-AL", // Albanian Lek
  AMD: "hy-AM", // Armenian Dram
  ANG: "nl-AW", // Netherlands Antillean Guilder
  AOA: "pt-AO", // Angolan Kwanza
  ARS: "es-AR", // Argentine Peso
  AUD: "en-AU", // Australian Dollar
  AWG: "nl-AW", // Aruban Florin
  AZN: "az-Latn-AZ", // Azerbaijani Manat
  BAM: "bs-Latn-BA", // Bosnia-Herzegovina Convertible Mark
  BBD: "en-BB", // Barbadian Dollar
  BDT: "bn-BD", // Bangladeshi Taka
  BGN: "bg-BG", // Bulgarian Lev
  BHD: "ar-BH", // Bahraini Dinar
  BIF: "fr-BI", // Burundian Franc
  BMD: "en-BM", // Bermudian Dollar
  BND: "ms-BN", // Brunei Dollar
  BOB: "es-BO", // Bolivian Boliviano
  BRL: "pt-BR", // Brazilian Real
  BSD: "en-BS", // Bahamian Dollar
  BTN: "dz-BT", // Bhutanese Ngultrum (locale may vary; sometimes "en-BT")
  BWP: "en-BW", // Botswana Pula
  BYN: "be-BY", // Belarusian Ruble
  BZD: "en-BZ", // Belize Dollar
  CAD: "en-CA", // Canadian Dollar
  CDF: "fr-CD", // Congolese Franc
  CHF: "de-CH", // Swiss Franc
  CLP: "es-CL", // Chilean Peso
  CNY: "zh-CN", // Chinese Yuan
  COP: "es-CO", // Colombian Peso
  CRC: "es-CR", // Costa Rican Colón
  CUP: "es-CU", // Cuban Peso
  CVE: "pt-CV", // Cape Verdean Escudo
  CZK: "cs-CZ", // Czech Koruna
  DJF: "fr-DJ", // Djiboutian Franc
  DKK: "da-DK", // Danish Krone
  DOP: "es-DO", // Dominican Peso
  DZD: "ar-DZ", // Algerian Dinar
  EGP: "ar-EG", // Egyptian Pound
  ERN: "ti-ER", // Eritrean Nakfa (locale may vary; "en-ER" is also used)
  ETB: "am-ET", // Ethiopian Birr
  EUR: "de-DE", // Euro (you might choose other locales such as "fr-FR" or "es-ES" depending on context)
  FJD: "en-FJ", // Fijian Dollar
  FKP: "en-FK", // Falkland Islands Pound
  FOK: "fo-FO", // Faroese Króna
  GBP: "en-GB", // British Pound Sterling
  GEL: "ka-GE", // Georgian Lari
  GHS: "en-GH", // Ghanaian Cedi
  GIP: "en-GI", // Gibraltar Pound
  GMD: "en-GM", // Gambian Dalasi
  GNF: "fr-GN", // Guinean Franc
  GTQ: "es-GT", // Guatemalan Quetzal
  GYD: "en-GY", // Guyanese Dollar
  HKD: "zh-HK", // Hong Kong Dollar
  HNL: "es-HN", // Honduran Lempira
  HRK: "hr-HR", // Croatian Kuna
  HTG: "fr-HT", // Haitian Gourde
  HUF: "hu-HU", // Hungarian Forint
  IDR: "id-ID", // Indonesian Rupiah
  ILS: "he-IL", // Israeli New Shekel
  INR: "en-IN", // Indian Rupee
  IQD: "ar-IQ", // Iraqi Dinar
  IRR: "fa-IR", // Iranian Rial
  ISK: "is-IS", // Icelandic Króna
  JMD: "en-JM", // Jamaican Dollar
  JOD: "ar-JO", // Jordanian Dinar
  JPY: "ja-JP", // Japanese Yen
  KES: "en-KE", // Kenyan Shilling
  KGS: "ky-KG", // Kyrgyzstani Som
  KHR: "km-KH", // Cambodian Riel
  KID: "en-KI", // Kiribati Dollar
  KMF: "fr-KM", // Comorian Franc
  KRW: "ko-KR", // South Korean Won
  KWD: "ar-KW", // Kuwaiti Dinar
  KYD: "en-KY", // Cayman Islands Dollar
  KZT: "kk-KZ", // Kazakhstani Tenge
  LAK: "lo-LA", // Lao Kip
  LBP: "ar-LB", // Lebanese Pound
  LKR: "si-LK", // Sri Lankan Rupee
  LRD: "en-LR", // Liberian Dollar
  LSL: "en-LS", // Lesotho Loti
  LYD: "ar-LY", // Libyan Dinar
  MAD: "ar-MA", // Moroccan Dirham
  MDL: "ro-MD", // Moldovan Leu
  MGA: "mg-MG", // Malagasy Ariary
  MKD: "mk-MK", // Macedonian Denar
  MMK: "my-MM", // Myanmar Kyat
  MNT: "mn-MN", // Mongolian Tögrög
  MOP: "zh-MO", // Macanese Pataca
  MRU: "ar-MR", // Mauritanian Ouguiya (MRU)
  MUR: "en-MU", // Mauritian Rupee
  MVR: "dv-MV", // Maldivian Rufiyaa
  MWK: "en-MW", // Malawian Kwacha
  MXN: "es-MX", // Mexican Peso
  MYR: "ms-MY", // Malaysian Ringgit
  MZN: "pt-MZ", // Mozambican Metical
  NAD: "en-NA", // Namibian Dollar
  NGN: "en-NG", // Nigerian Naira
  NIO: "es-NI", // Nicaraguan Córdoba
  NOK: "no-NO", // Norwegian Krone
  NPR: "ne-NP", // Nepalese Rupee
  NZD: "en-NZ", // New Zealand Dollar
  OMR: "ar-OM", // Omani Rial
  PAB: "es-PA", // Panamanian Balboa
  PEN: "es-PE", // Peruvian Sol
  PGK: "en-PG", // Papua New Guinean Kina
  PHP: "en-PH", // Philippine Peso
  PKR: "en-PK", // Pakistani Rupee
  PLN: "pl-PL", // Polish Złoty
  PYG: "es-PY", // Paraguayan Guaraní
  QAR: "ar-QA", // Qatari Rial
  RON: "ro-RO", // Romanian Leu
  RSD: "sr-RS", // Serbian Dinar
  RUB: "ru-RU", // Russian Ruble
  RWF: "rw-RW", // Rwandan Franc
  SAR: "ar-SA", // Saudi Riyal
  SBD: "en-SB", // Solomon Islands Dollar
  SCR: "en-SC", // Seychellois Rupee
  SDG: "ar-SD", // Sudanese Pound
  SEK: "sv-SE", // Swedish Krona
  SGD: "en-SG", // Singapore Dollar
  SHP: "en-SH", // Saint Helena Pound
  SLL: "en-SL", // Sierra Leonean Leone
  SOS: "so-SO", // Somali Shilling
  SRD: "nl-SR", // Surinamese Dollar
  SSP: "en-SS", // South Sudanese Pound
  STN: "pt-ST", // São Tomé and Príncipe Dobra
  SYP: "ar-SY", // Syrian Pound
  SZL: "en-SZ", // Eswatini Lilangeni (Swazi)
  THB: "th-TH", // Thai Baht
  TJS: "tg-TJ", // Tajikistani Somoni
  TMT: "tk-TM", // Turkmenistani Manat
  TND: "ar-TN", // Tunisian Dinar
  TOP: "to-TO", // Tongan Paʻanga
  TRY: "tr-TR", // Turkish Lira
  TTD: "en-TT", // Trinidad and Tobago Dollar
  TVD: "en-TV", // Tuvaluan Dollar
  TWD: "zh-TW", // New Taiwan Dollar
  TZS: "sw-TZ", // Tanzanian Shilling
  UAH: "uk-UA", // Ukrainian Hryvnia
  UGX: "en-UG", // Ugandan Shilling
  USD: "en-US", // United States Dollar
  UYU: "es-UY", // Uruguayan Peso
  UZS: "uz-UZ", // Uzbekistani Som
  VES: "es-VE", // Venezuelan Bolívar Soberano
  VND: "vi-VN", // Vietnamese Đồng
  VUV: "bi-VU", // Vanuatu Vatu
  WST: "sm-WS", // Samoan Tala
  XAF: "fr-CM", // Central African CFA Franc (Common across several CAF countries)
  XCD: "en-AG", // East Caribbean Dollar
  XOF: "fr-BJ", // West African CFA Franc
  XPF: "fr-PF", // CFP Franc
  YER: "ar-YE", // Yemeni Rial
  ZAR: "en-ZA", // South African Rand
  ZMW: "en-ZM", // Zambian Kwacha
  ZWL: "en-ZW", // Zimbabwean Dollar
};

export function toCurrency(amount, currency) {
  const locale = localeMap[currency] || "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function add20Percent(amount) {
  const increased = amount * 1.2;
  return Number(increased.toFixed(2));
}
