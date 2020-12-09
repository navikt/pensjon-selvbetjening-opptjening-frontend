import { onLanguageSelect, setAvailableLanguages, setParams} from "@navikt/nav-dekoratoren-moduler/dist";
import React, { useEffect } from "react";
import {basePath} from "../../../common/routesConfig";
import { useHistory } from "react-router";

export const SparkVelger = () => {
    const history = useHistory();
    onLanguageSelect((language) => {
        history.push(language.url);
        setParams({language: language});
    });
    useEffect(() => {
        setParams({language: 'nb' | 'nn' | 'en'});
    }, []);

    setAvailableLanguages([
        {"locale":"nb", "url":basePath + "?lng=nb-NO"},
        {"locale":"en", "url":basePath + "?lng=en-GB" },
        {"locale":"nn", "url":basePath + "?lng=nn-NO" },
    ])

    return <></>;
};

