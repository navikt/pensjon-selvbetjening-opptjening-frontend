import {useTranslation} from "react-i18next";
import React from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Tekstomrade from "nav-frontend-tekstomrade";
import "./PensjonspoengForklartPanel.less";
import pengesekk from "../../../assets/pengesekk.svg";
import {PanelTitle} from "../PanelTitle/PanelTitle";

export const PensjonspoengForklartPanel = () => {
    const { t } = useTranslation();
    const panelTitle = <PanelTitle titleString={t('pensjonspoeng-forklart')} illustrationClass="pensjonspoengForklartIllustration" illustration={pengesekk}/>

    return(
        <Ekspanderbartpanel tittel={panelTitle} border className="panelWrapper">
            <Tekstomrade data-testid="explanationText" className="explanationText">
                {t('pensjonspoeng-forklart-tekst', {joinArrays: "\n\n"})}
            </Tekstomrade>
        </Ekspanderbartpanel>
    )
};
