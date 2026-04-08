import {useTranslation} from "react-i18next";
import React from "react";
import {PanelTitle} from "../PanelTitle/PanelTitle";
import * as urlHelper from "../../../common/urlHelper";
import {LenkepanelBase} from "nav-frontend-lenkepanel";
import baby from "../../../assets/baby.svg";
import "./OverforeOmsorgsOpptjeningPanel.css";


export const OverforeOmsorgsOpptjeningPanel = (props) => {
    const { t } = useTranslation();
    const overforeUrl = urlHelper.OVERFORE_OMSORGSOPPTJENING_URL ? urlHelper.OVERFORE_OMSORGSOPPTJENING_URL : "";
    const handleClick = () => {
        // TODO: Ta i bruk Umami.
    };

    return(
        <LenkepanelBase href={overforeUrl} border  className="panelWrapper" onClick={handleClick}>
            <div>
                <PanelTitle type="lenkepanel" titleString={t('overfore-omsorgsopptjening-title')} illustrationClass="overforeOmsorgsOpptjeningLenkeIllustration" illustration={baby}/>
                <p className="overforeOmsorgsOpptjeningText">
                    {t('overfore-omsorgsopptjening-text')}
                </p>
            </div>
        </LenkepanelBase>
    )
};
