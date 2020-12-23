import React from "react";
import {useTranslation} from "react-i18next";
import "./PensjonskalkulatorLenkePanel.less"
import {LenkepanelBase} from "nav-frontend-lenkepanel";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";
import kalkulator from "../../../assets/kalkulator.svg";
import {PanelTitle} from "../PanelTitle/PanelTitle";

export const PensjonskalkulatorLenkePanel = () => {
    const logPensjonskalkulatorClickToAmplitude = (props) => {
        logToAmplitude({eventType: CLICK_EVENT, name: "Klikk på lenke", titleKey: "pensjonskalkulator-lenke-title", type: props.type, value: true});
    };

    const { t } = useTranslation();
    return(
        <LenkepanelBase border href={process.env.REACT_APP_PENSJONSKALKULATOR_URL} className="panelWrapper" onClick={() => logPensjonskalkulatorClickToAmplitude({type: "Lenkepanel"})}>
            <PanelTitle id="pensjonskalkulatorLenke" type="lenkepanel" titleString={t('pensjonskalkulator-lenke-title')} illustrationClass="pensjonskalkulatorLenkeIllustration" illustration={kalkulator}/>
        </LenkepanelBase>
    )
};
