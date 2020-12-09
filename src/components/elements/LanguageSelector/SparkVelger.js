import { onLanguageSelect, setAvailableLanguages } from "@navikt/nav-dekoratoren-moduler/dist";
import * as React from "react";
import {basePath} from "../../../common/routesConfig";
import { useHistory } from "react-router";

export const SparkVelger = () => {
    const history = useHistory();
    onLanguageSelect((language) => {
        history.push(language.url);
    });
    setAvailableLanguages([
        {"locale":"nb", "url":basePath + "?lng=nb-NO"},
        {"locale":"en", "url":basePath + "?lng=en-GB" },
        {"locale":"nn", "url":basePath + "?lng=nn-NO" },
    ])

    return <></>;
};

