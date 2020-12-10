import {onLanguageSelect, setAvailableLanguages, setParams} from "@navikt/nav-dekoratoren-moduler/dist";
import React from "react";
import {basePath} from "../../../common/routesConfig";
import {useTranslation} from "react-i18next";
import {useLocation, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";

export const SprakVelger = () => {
    const {i18n} = useTranslation();
    const location = useLocation();
    const history = useHistory();
    onLanguageSelect((language) => {
        i18n.changeLanguage(language.locale);

        const pathArr = history.location.pathname.split('/');

        // Ta vare på path etter /<lng/ og konkatener med language.url
        history.push(language.url + pathArr[2]);
    });

    setAvailableLanguages([
        {"locale": "nb", "url": "/nb/", handleInApp: true},
        {"locale": "en", "url": "/en/", handleInApp: true},
        {"locale": "nn", "url": "/nn/", handleInApp: true},
    ])

    return <></>;
};

