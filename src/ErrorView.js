import React from 'react';
import { withTranslation } from 'react-i18next';
import Alertstripe from "nav-frontend-alertstriper";
import {Knapp} from "nav-frontend-knapper";


const ErrorView = (props) => {
    const {t} = props;

    return <div className="mainBody" id="maincontent" tabIndex="-1">
        <Alertstripe type="feil">{t("error-status-common")}</Alertstripe>
        <Knapp onClick={() => window.location.reload()}>{t("error-proev-igjen")}</Knapp>
    </div>
}

export default withTranslation()(ErrorView);