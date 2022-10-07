import React from 'react';
import { useTranslation } from 'react-i18next';
import Alertstripe from "nav-frontend-alertstriper";
import {Knapp} from "nav-frontend-knapper";
import './containers/App/App.css';


const ErrorView = () => {
    const { t } = useTranslation();


    return <div className="mainBody" id="maincontent" tabIndex="-1">
        <Alertstripe type="feil">{t("error-status-common")}</Alertstripe>
        <Knapp onClick={() => window.location.reload()}>{t("error-proev-igjen")}</Knapp>
    </div>
}

export default ErrorView;