import { onLanguageSelect, setAvailableLanguages, setParams} from "@navikt/nav-dekoratoren-moduler/dist";
import React from "react";
import {basePath} from "../../../common/routesConfig";
import {useTranslation} from "react-i18next";
import { useLocation, useHistory} from "react-router-dom";
import { useEffect, useState } from "react";

export const SprakVelger = () => {
    const { i18n } = useTranslation();
    const location = useLocation();
    const history = useHistory();
    onLanguageSelect((language) => {
       let languageCode;
       switch (language.locale){
           case "nb":
               languageCode = "nb-NO";
               break;
           case "nn":
               languageCode = "nn-NO";
               break;
           case "en":
               languageCode = "en-GB";
               break;
           default:
               languageCode = "nb-NO";
       }
        i18n.changeLanguage(languageCode);
        history.push(language.url);
    });

    setAvailableLanguages([
        {"locale":"nb", "url": "/nb/",handleInApp:true},
        {"locale":"en", "url": "/en/", handleInApp:true},
        {"locale":"nn", "url": "/nn/", handleInApp:true },
    ])

    return <></>;
};

