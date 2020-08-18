import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
// load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
// learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        detection: {
            order:['localStorage', 'cookie', 'navigator', 'htmlTag', 'querystring', 'sessionStorage', 'path', 'subdomain'],
            caches: ['localStorage', 'cookie']
        },
        fallbackLng: 'nb-NO',
        debug: true,
        backend:{
            loadPath: process.env.PUBLIC_URL + '/locales/{{lng}}/{{ns}}.json'
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    }, (err) => {
            if (err) return console.log('Loading i18n error', err);
            i18n.changeLanguage('nb-NO')
    });

i18n.loadLanguages(['nb-NO'], () => {});
i18n.language = 'nb-NO';
document.documentElement.lang = 'nb-NO';

export default i18n;
