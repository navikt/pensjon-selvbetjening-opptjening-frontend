import React from "react";
import {useTranslation} from "react-i18next";
import "./PensjonskalkulatorLenkePanel.css"
import {LenkepanelBase} from "nav-frontend-lenkepanel";
import kalkulator from "../../../assets/kalkulator.svg";
import {PanelTitle} from "../PanelTitle/PanelTitle";
import * as urlHelper from "../../../common/urlHelper";

export const PensjonskalkulatorLenkePanel = () => {
    const handleClick = () => {
        // TODO: Ta i bruk Umami.
    };

    const { t } = useTranslation();
    return(
        <LenkepanelBase border href={urlHelper.PENSJONSKALKULATOR_URL} className="panelWrapper" onClick={handleClick}>
            <PanelTitle id="pensjonskalkulatorLenke" type="lenkepanel" titleString={t('pensjonskalkulator-lenke-title')} illustrationClass="pensjonskalkulatorLenkeIllustration" illustration={kalkulator}/>
        </LenkepanelBase>
    )
};
