import {useTranslation} from "react-i18next";
import React from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Tekstomrade from "nav-frontend-tekstomrade";
import "./BeholdningForklartPanel.less";

const detailsTitle = (title) => {
    return(
        <div role="heading" aria-level="2" className="beholdningForklartTitle">{title}</div>
    )
};
export const BeholdningForklartPanel = (props) => {
    const { t } = useTranslation();
    return(
        <Ekspanderbartpanel tittel={detailsTitle(t('pensjonsbeholdning-forklart'))} border className="panelWrapper">
            <Tekstomrade className="explanationText">
                {t('pensjonsbeholdning-forklart-tekst', {joinArrays: "\n\n"})}
            </Tekstomrade>
        </Ekspanderbartpanel>
    )
};
