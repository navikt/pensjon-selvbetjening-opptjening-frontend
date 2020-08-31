import {LenkepanelBase} from "nav-frontend-lenkepanel";
import {Undertittel} from "nav-frontend-typografi";
import React from "react";
import {useTranslation} from "react-i18next";
import "./FAQLinkPanel.less";

export const FAQLinkPanel = () => {
    const { t } = useTranslation();
    return(
        <LenkepanelBase role="link" href={process.env.PUBLIC_URL + "/faq"} border className="panelWrapper">
            <div className="faqTitle">
                <Undertittel role="title" className="lenkepanel__heading">{t('opptjening-frequently-asked-questions')}</Undertittel>
            </div>
        </LenkepanelBase>
    );
};
