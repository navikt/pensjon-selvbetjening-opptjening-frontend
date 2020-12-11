import {onLanguageSelect, setAvailableLanguages} from "@navikt/nav-dekoratoren-moduler/dist";
import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useHistory, useLocation} from "react-router-dom";

export const SprakVelger = () => {
    const {i18n} = useTranslation();
    const location = useLocation();
    const history = useHistory();

    // TODO Noen feil her trenger a fikse den
   useEffect(() => {
        const pathArr = history.location.pathname.split('/');
        const [, second] = pathArr;
        i18n.changeLanguage(second);
    }, []);

    onLanguageSelect((language) => {
        i18n.changeLanguage(language.locale);

        const pathArr = history.location.pathname.split('/');
        const [, third] = pathArr;

        if(pathArr.length > 2){
            const urlTail = pathArr.slice(2,pathArr.length);
            const urlJoin = urlTail.join("/");
            console.log(urlJoin);
            history.push(language.url + urlJoin);
        }else
            history.push(language.url);
    });

    setAvailableLanguages([
        {"locale": "nb", "url": "/nb/", handleInApp: true},
        {"locale": "en", "url": "/en/", handleInApp: true},
        {"locale": "nn", "url": "/nn/", handleInApp: true},
    ])

    return <></>;
};

