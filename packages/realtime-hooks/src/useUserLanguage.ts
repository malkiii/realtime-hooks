import { useCallback, useEffect, useState } from 'react';
import { useWindowEvents } from '.';

const languageCodes = {
  'Abkhazian': ['ab'],
  'Afar': ['aa'],
  'Afrikaans': ['af'],
  'Akan': ['ak'],
  'Albanian': ['sq'],
  'Amharic': ['am'],
  'Arabic': ['ar'],
  'Aragonese': ['an'],
  'Armenian': ['hy'],
  'Assamese': ['as'],
  'Avaric': ['av'],
  'Avestan': ['ae'],
  'Aymara': ['ay'],
  'Azerbaijani': ['az'],
  'Bambara': ['bm'],
  'Bashkir': ['ba'],
  'Basque': ['eu'],
  'Belarusian': ['be'],
  'Bengali': ['bn'],
  'Bihari': ['bh'],
  'Bislama': ['bi'],
  'Bosnian': ['bs'],
  'Breton': ['br'],
  'Bulgarian': ['bg'],
  'Burmese': ['my'],
  'Catalan': ['ca'],
  'Chamorro': ['ch'],
  'Chechen': ['ce'],
  'Chinese': ['zh'],
  'Chinese (Simplified)': ['zh-Hans'],
  'Chinese (Traditional)': ['[zh-Hant'],
  'Chuvash': ['cv'],
  'Cornish': ['kw'],
  'Corsican': ['co'],
  'Cree': ['cr'],
  'Croatian': ['hr'],
  'Czech': ['cs'],
  'Danish': ['da'],
  'Divehi': ['dv'],
  'Dutch': ['nl'],
  'Dzongkha': ['dz'],
  'English': ['en'],
  'Esperanto': ['eo'],
  'Estonian': ['et'],
  'Ewe': ['ee'],
  'Faroese': ['fo'],
  'Fijian': ['fj'],
  'Finnish': ['fi'],
  'French': ['fr'],
  'Fulah': ['ff'],
  'Galician': ['gl'],
  'Gaelic (Scottish)': ['gd'],
  'Gaelic (Manx)': ['gv'],
  'Georgian': ['ka'],
  'German': ['de'],
  'Greek': ['el'],
  'Greenlandic': ['kl'],
  'Guarani': ['gn'],
  'Gujarati': ['gu'],
  'Haitian Creole': ['ht'],
  'Hausa': ['ha'],
  'Hebrew': ['he'],
  'Herero': ['hz'],
  'Hindi': ['hi'],
  'Hiri Motu': ['ho'],
  'Hungarian': ['hu'],
  'Icelandic': ['is'],
  'Ido': ['io'],
  'Igbo': ['ig'],
  'Indonesian': ['id', 'in'],
  'Interlingua': ['ia'],
  'Interlingue': ['ie'],
  'Inuktitut': ['iu'],
  'Inupiak': ['ik'],
  'Irish': ['ga'],
  'Italian': ['it'],
  'Japanese': ['ja'],
  'Javanese': ['jv'],
  'Kalaallisut': ['kl'],
  'Kannada': ['kn'],
  'Kanuri': ['kr'],
  'Kashmiri': ['ks'],
  'Kazakh': ['kk'],
  'Khmer': ['km'],
  'Kikuyu': ['ki'],
  'Rwanda': ['rw'],
  'Kirundi': ['rn'],
  'Kyrgyz': ['ky'],
  'Komi': ['kv'],
  'Kongo': ['kg'],
  'Korean': ['ko'],
  'Kurdish': ['ku'],
  'Kwanyama': ['kj'],
  'Lao': ['lo'],
  'Latin': ['la'],
  'Latvian': ['lv'],
  'Limburgish': ['li'],
  'Lingala': ['ln'],
  'Lithuanian': ['lt'],
  'Luga-Katanga': ['lu'],
  'Luganda': ['lg'],
  'Luxembourgish': ['lb'],
  'Manx': ['gv'],
  'Macedonian': ['mk'],
  'Malagasy': ['mg'],
  'Malay': ['ms'],
  'Malayalam': ['ml'],
  'Maltese': ['mt'],
  'Maori': ['mi'],
  'Marathi': ['mr'],
  'Marshallese': ['mh'],
  'Moldavian': ['mo'],
  'Mongolian': ['mn'],
  'Nauru': ['na'],
  'Navajo': ['nv'],
  'Ndonga': ['ng'],
  'Northern Ndebele': ['nd'],
  'Nepali': ['ne'],
  'Norwegian': ['no'],
  'Norwegian bokmål': ['nb'],
  'Norwegian nynorsk': ['nn'],
  'Nuosu': ['ii'],
  'Nyanja': ['ny'],
  'Occitan': ['oc'],
  'Ojibwe': ['oj'],
  'Church Slavonic': ['cu'],
  'Oriya': ['or'],
  'Oromo': ['om'],
  'Ossetian': ['os'],
  'Pāli': ['pi'],
  'Pashto, Pushto': ['ps'],
  'Farsi': ['fa'],
  'Polish': ['pl'],
  'Portuguese': ['pt'],
  'Punjabi': ['pa'],
  'Quechua': ['qu'],
  'Romansh': ['rm'],
  'Romanian': ['ro'],
  'Russian': ['ru'],
  'Sami': ['se'],
  'Samoan': ['sm'],
  'Sango': ['sg'],
  'Sanskrit': ['sa'],
  'Serbian': ['sr'],
  'Serbo-Croatian': ['sh'],
  'Sesotho': ['st'],
  'Setswana': ['tn'],
  'Shona': ['sn'],
  'Sichuan Yi': ['ii'],
  'Sindhi': ['sd'],
  'Sinhalese': ['si'],
  'Siswati': ['ss'],
  'Slovak': ['sk'],
  'Slovenian': ['sl'],
  'Somali': ['so'],
  'Southern Ndebele': ['nr'],
  'Spanish': ['es'],
  'Sundanese': ['su'],
  'Swahili': ['sw'],
  'Swati': ['ss'],
  'Swedish': ['sv'],
  'Tagalog': ['tl'],
  'Tahitian': ['ty'],
  'Tajik': ['tg'],
  'Tamil': ['ta'],
  'Tatar': ['tt'],
  'Telugu': ['te'],
  'Thai': ['th'],
  'Tibetan': ['bo'],
  'Tigrinya': ['ti'],
  'Tonga': ['to'],
  'Tsonga': ['ts'],
  'Turkish': ['tr'],
  'Turkmen': ['tk'],
  'Twi': ['tw'],
  'Uyghur': ['ug'],
  'Ukrainian': ['uk'],
  'Urdu': ['ur'],
  'Uzbek': ['uz'],
  'Venda': ['ve'],
  'Vietnamese': ['vi'],
  'Volapük': ['vo'],
  'Wallon': ['wa'],
  'Welsh': ['cy'],
  'Wolof': ['wo'],
  'Western Frisian': ['fy'],
  'Xhosa': ['xh'],
  'Yiddish': ['yi', 'ji'],
  'Yoruba': ['yo'],
  'Zhuang': ['za'],
  'Zulu': ['zu']
};

type LanguageName = keyof typeof languageCodes;
const languageNames = Object.keys(languageCodes) as LanguageName[];

type Language = {
  name: LanguageName;
  codes: string[];
};

const isLanguageCode = (lang: LanguageName, code: string) => {
  return new RegExp(`^(${languageCodes[lang].join('|')})`, 'i').test(code);
};

const getUserLanguages = (): Language[] => {
  return languageNames
    .map(name => ({
      name,
      codes: [...new Set(navigator.languages.filter(code => isLanguageCode(name, code)))]
    }))
    .filter(lang => !!lang.codes);
};

export const useUserLanguage = (defaultLang?: LanguageName) => {
  const [languages, setLanguages] = useState<Language[]>();
  const [language, setLanguage] = useState<Language | undefined>(
    defaultLang && {
      name: defaultLang,
      codes: languageCodes[defaultLang]
    }
  );

  const setCurrentUserLanguage = useCallback(() => {
    const perferredLanguages = getUserLanguages();
    setLanguages(perferredLanguages);
    setLanguage(perferredLanguages.find(({ name }) => isLanguageCode(name, navigator.language)));
  }, []);

  useEffect(setCurrentUserLanguage, []);
  useWindowEvents('languagechange', setCurrentUserLanguage);

  return { language, userLanguages: languages };
};
