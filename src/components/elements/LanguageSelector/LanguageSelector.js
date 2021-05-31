import { onLanguageSelect, setAvailableLanguages } from "@navikt/nav-dekoratoren-moduler/dist";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { logToAmplitude, SELECT_EVENT} from "../../../common/amplitude";

export const LanguageSelector = () => {
    const {i18n} = useTranslation();
    const history = useHistory();

    onLanguageSelect((language) => {
        logToAmplitude({eventType: SELECT_EVENT, name: "Velg språk", titleKey: "LanguageSelector", type: "Select", value: language.locale});
        i18n.changeLanguage(language.locale);

        const pathArr = history.location.pathname.split('/');
        const queryParams = history.location.search;

        if(pathArr.length > 2){
            const urlTail = pathArr.slice(2,pathArr.length);
            const urlJoin = urlTail.join("/");
            history.push(language.url + urlJoin + queryParams);
        } else {
            history.push(language.url + queryParams);
        }
    });

    setAvailableLanguages([
        {"locale": "nb", "url": "/nb/", handleInApp: true},
        {"locale": "en", "url": "/en/", handleInApp: true},
        {"locale": "nn", "url": "/nn/", handleInApp: true},
    ]);

    return <></>;
};

