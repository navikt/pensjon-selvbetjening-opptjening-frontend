import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Tekstomrade from "nav-frontend-tekstomrade";
import "./BeholdningForklartPanel.less";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";
import pengesekk from "../../../assets/pengesekk.svg";

const detailsTitle = (title) => {
    return(
        <div role="heading" aria-level="2" className="beholdningForklartTitle">
            <img src={pengesekk} className="illustration" alt=""/>
            <div className="title">{title}</div>
        </div>
    )
};
export const BeholdningForklartPanel = () => {
    const { t } = useTranslation();

    const toggleOpen = () => {
        logToAmplitude({eventType: CLICK_EVENT, name: "Åpne panel", titleKey: "pensjonsbeholdning-forklart", type: "EkspanderbartPanel", value: !apen});
        setApen(!apen);
    };
    const [apen, setApen] = useState(false);

    return(
        <Ekspanderbartpanel tittel={detailsTitle(t('pensjonsbeholdning-forklart'))} border className="panelWrapper" onClick={toggleOpen}>
            <Tekstomrade data-testid="explanationText" className="explanationText">
                {t('pensjonsbeholdning-forklart-tekst', {joinArrays: "\n\n"})}
            </Tekstomrade>
        </Ekspanderbartpanel>
    )
};
