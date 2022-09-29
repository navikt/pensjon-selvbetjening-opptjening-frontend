import {useTranslation} from "react-i18next";
import React from "react";
import {PanelTitle} from "../PanelTitle/PanelTitle";
import * as urlHelper from "../../../common/urlHelper";
import {LenkepanelBase} from "nav-frontend-lenkepanel";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";
import baby from "../../../assets/baby.svg";
import "./OverforeOmsorgsOpptjeningPanel.css";


export const OverforeOmsorgsOpptjeningPanel = (props) => {
    const { t } = useTranslation();
    const logOverforeOmsorgsOpptjeningClickToAmplitude = (props) => {
        logToAmplitude({eventType: CLICK_EVENT, name: "Klikk på lenke", titleKey: "", type: props.type, value: true});
    };
    const overforeUrl = urlHelper.OVERFORE_OMSORGSOPPTJENING_URL ? urlHelper.OVERFORE_OMSORGSOPPTJENING_URL : "";

    return(
        <LenkepanelBase href={overforeUrl} border  className="panelWrapper" onClick={() => logOverforeOmsorgsOpptjeningClickToAmplitude({type: "Lenkepanel"})}>
            <div>
                <PanelTitle type="lenkepanel" titleString={t('overfore-omsorgsopptjening-title')} illustrationClass="overforeOmsorgsOpptjeningLenkeIllustration" illustration={baby}/>
                <p className="overforeOmsorgsOpptjeningText">
                    {t('overfore-omsorgsopptjening-text')}
                </p>
            </div>
        </LenkepanelBase>
    )
};
