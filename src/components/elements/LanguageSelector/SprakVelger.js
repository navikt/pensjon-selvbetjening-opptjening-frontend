import { onLanguageSelect, setAvailableLanguages} from "@navikt/nav-dekoratoren-moduler/dist";
import React from "react";
import {basePath} from "../../../common/routesConfig";
import {useTranslation} from "react-i18next";
import { useLocation, useHistory } from "react-router-dom";

export const SprakVelger = () => {
    const { i18n } = useTranslation();
    const location = useLocation();

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
    });

    setAvailableLanguages([
        {"locale":"nb", "url":basePath + "?lng=nb-NO",handleInApp:true},
        {"locale":"en", "url":basePath + "?lng=en-GB", handleInApp:true},
        {"locale":"nn", "url":basePath + "?lng=nn-NO", handleInApp:true },
    ])

    return <></>;
};

