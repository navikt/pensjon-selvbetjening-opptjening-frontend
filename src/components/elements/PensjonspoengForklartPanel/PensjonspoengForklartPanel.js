import {useTranslation} from "react-i18next";
import React from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Tekstomrade from "nav-frontend-tekstomrade";
import "./PensjonspoengForklartPanel.less";
import pengesekk from "../../../assets/pengesekk.svg";

const detailsTitle = (title) => {
    return(
        <div role="heading" aria-level="2" className="beholdningForklartTitle">
            <img src={pengesekk} className="illustration" alt=""/>
            <div className="title">{title}</div>
        </div>
    )
};
export const PensjonspoengForklartPanel = () => {
    const { t } = useTranslation();
    return(
        <Ekspanderbartpanel tittel={detailsTitle(t('pensjonspoeng-forklart'))} border className="panelWrapper">
            <Tekstomrade data-testid="explanationText" className="explanationText">
                {t('pensjonspoeng-forklart-tekst', {joinArrays: "\n\n"})}
            </Tekstomrade>
        </Ekspanderbartpanel>
    )
};
