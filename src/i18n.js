import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {logger} from "./common/logging";
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
        fallbackLng: 'nb',
        supportedLngs: ['en', 'nn', 'nb'],
        whitelist: ['en', 'nn', 'nb'],
        //load: 'currentOnly',
        detection: {
            order:['path', 'localStorage', 'cookie', 'navigator', 'htmlTag', 'sessionStorage', 'subdomain', 'querystring'],
            lookupFromPathIndex: 2
        },
        debug: true,
        backend:{
            loadPath: process.env.PUBLIC_URL + '/locales/{{lng}}/{{ns}}.json'
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    }, (err) => {
            if (err) return logger.error(`'Loading i18n error'. ${err}`);
            i18n.changeLanguage('nb')
    });


i18n.loadLanguages(['nb', 'nn','en'], () => {});
// i18n.language = 'nb';
// document.documentElement.lang = 'nb';

export default i18n;
