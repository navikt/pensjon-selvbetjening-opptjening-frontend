import React from 'react';
import {TopBanner} from "../../elements/TopBanner/TopBanner";
import Alertstripe from "nav-frontend-alertstriper";
import {useTranslation} from "react-i18next";
import Breadcrumbs from "../../elements/Breadcrumbs/Breadcrumbs";
import {LanguageSelector} from "../../elements/LanguageSelector/LanguageSelector";

export const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <div>
            <Breadcrumbs/>
            <LanguageSelector/>
            <TopBanner title="404-title" text="" showIllustration={false} frontpage={false}/>
            <div className="mainBody">
                <main className="contentWrapper" data-testid="error-status-404">
                    <Alertstripe type="feil">{t("error-status-404")}</Alertstripe>
                </main>
            </div>
        </div>
    )
};
