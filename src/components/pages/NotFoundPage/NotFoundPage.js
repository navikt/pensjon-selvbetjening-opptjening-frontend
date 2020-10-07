import React from 'react';
import {TopBanner} from "../../elements/TopBanner/TopBanner";
import Breadcrumbs from "../../elements/Breadcrumbs/Breadcrumbs";
import Alertstripe from "nav-frontend-alertstriper";
import {useTranslation} from "react-i18next";

export const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <div>
            <TopBanner title="404-title" text="" showIllustration={false} frontpage={false}/>
            <div className="mainBody">
                <Breadcrumbs/>
                <div className="contentWrapper" data-testid="error-status-404">
                    <Alertstripe type="feil">{t("error-status-404")}</Alertstripe>
                </div>
            </div>
        </div>
    )
};
