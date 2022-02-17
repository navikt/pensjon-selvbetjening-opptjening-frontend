import React from 'react';
import Bowser from "bowser";
import Alertstripe from "nav-frontend-alertstriper";
import {useTranslation} from "react-i18next";

export const BrowserCheck = () => {
    const { t } = useTranslation(['translation']);
    const browser = Bowser.getParser(window.navigator.userAgent);
    const isValidBrowser = browser.satisfies({
        macos: {
            safari: ">=12"
        },
        mobile: {
            safari: '>=12',
        },
        edge: ">=93",
        firefox: ">=91",
        opera: ">=81",
        samsung_internet: ">=83",
        chromium: ">=91",
        chrome: ">=91"      //kjører lik versjonering på alle devices.
    });

    return(
        <>
            {!isValidBrowser &&
                <Alertstripe type="advarsel">{t('gammel-nettleser-advarsel')}</Alertstripe>
            }
        </>)
}