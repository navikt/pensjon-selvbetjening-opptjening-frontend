import React from "react";
import {useTranslation} from "react-i18next";
import Panel from "nav-frontend-paneler";
import {Undertittel} from "nav-frontend-typografi";
import {Knapp} from "nav-frontend-knapper";
import "./LoginPanel.css";

export const LoginPanel = (props) => {
    const { t } = useTranslation();
    return(
        <Panel border>
            <Undertittel>{t('login-text')}</Undertittel>
            <div className="buttonWrapper">
                <Knapp onClick={() => window.location.href = process.env.REACT_APP_LOGINSERVICE_URL + encodeURIComponent(window.location.href)}>{t('login-logg-inn')}</Knapp>
            </div>
        </Panel>
    )
};
