import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Tekstomrade from "nav-frontend-tekstomrade";
import "./PensjonspoengForklartPanel.less";
import pengesekk from "../../../assets/pengesekk.svg";
import {PanelTitle} from "../PanelTitle/PanelTitle";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";

export const PensjonspoengForklartPanel = () => {
    const { t } = useTranslation();
    const toggleOpen = () => {
        logToAmplitude({eventType: CLICK_EVENT, name: "Åpne panel", titleKey: "pensjonspoeng-forklart", type: "EkspanderbartPanel", value: !apen});
        setApen(!apen);
    };
    const [apen, setApen] = useState(false);
    const panelTitle = <PanelTitle titleString={t('pensjonspoeng-forklart')} illustrationClass="pensjonspoengForklartIllustration" illustration={pengesekk}/>;

    return(
        <Ekspanderbartpanel tittel={panelTitle} border className="panelWrapper" onClick={toggleOpen}>
            <Tekstomrade data-testid="explanationText" className="explanationText">
                {t('pensjonspoeng-forklart-tekst', {joinArrays: "\n\n"})}
            </Tekstomrade>
        </Ekspanderbartpanel>
    )
};
