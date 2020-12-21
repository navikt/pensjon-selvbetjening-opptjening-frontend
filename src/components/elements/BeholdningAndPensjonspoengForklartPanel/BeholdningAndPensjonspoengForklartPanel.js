import {useTranslation} from "react-i18next";
import React from "react";
import Tekstomrade from "nav-frontend-tekstomrade";
import "./BeholdningAndPensjonspoengForklartPanel.less";
import Panel from "nav-frontend-paneler";
import {Undertittel} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";

const shareItem = (type, idx) => {
    return(
        <div key={type + idx} data-testid={type} className={type}/>
    )
}

const shareItems = (andelPensjonBasertPaBeholdning, andelPensjonBasertPaPensjonspoeng) =>{
    let shareItems = [];
    for(let i=0;i<andelPensjonBasertPaBeholdning; i++){
        shareItems.push(shareItem("pensjonsbeholdningShare", i))
    }
    for(let i=0;i<andelPensjonBasertPaPensjonspoeng; i++){
        shareItems.push(shareItem("pensjonspoengShare", i))
    }

    return shareItems
}


export const BeholdningAndPensjonspoengForklartPanel = (props) => {
    const { t } = useTranslation();
    const {andelPensjonBasertPaBeholdning, fodselsar}= props;
    const andelPensjonBasertPaPensjonspoeng = 10 - andelPensjonBasertPaBeholdning;

    return(
        <Panel border className="panelWrapper">
            <div className="beholdningAndPoengForklartTitleContainer">
                <Undertittel id="beholdingAndPensjonspoengForklartTitle" className="lenkepanel__heading title">{t('beholdning-and-pensjonspoeng-forklart')}</Undertittel>
            </div>
            <Tekstomrade className="beholdningAndPensjonspoengForklartExplanationText">
                {t('beholdning-and-pensjonspoeng-forklart-tekst', {fodselsar})}
            </Tekstomrade>
            <Tekstomrade className="beholdningAndPensjonspoengForklartIllustrationText">
                {t('beholdning-and-pensjonspoeng-forklart-illustrasjon-tekst')}
            </Tekstomrade>
            <div className="regelverkShareDiagram">
                {shareItems(andelPensjonBasertPaBeholdning, andelPensjonBasertPaPensjonspoeng)}
            </div>
            <div>
                <div className="pensjonsbeholdningColorBox"/>
                <span className="colorBoxText">{t("beholdning-and-pensjonspoeng-forklart-andel-pensjonsbeholdning", {andelPensjonBasertPaBeholdning})}</span>
                <div className="pensjonspoengColorBox"/>
                <span className="colorBoxText">{t("beholdning-and-pensjonspoeng-forklart-andel-pensjonspoeng", {andelPensjonBasertPaPensjonspoeng})}</span>
            </div>
            <div className="pensjonsopptjeningForklaring">
                <h3>{t('beholdning-and-pensjonspoeng-forklart-pensjonspoeng-title')}</h3>
                <Tekstomrade>
                    {t('beholdning-and-pensjonspoeng-forklart-pensjonspoeng-text')}
                </Tekstomrade>
            </div>
            <div className="pensjonsopptjeningForklaring">
                <h3>{t('beholdning-and-pensjonspoeng-forklart-pensjonsbeholdning-title')}</h3>
                <Tekstomrade>
                    {t('beholdning-and-pensjonspoeng-forklart-pensjonsbeholdning-text')}
                </Tekstomrade>
            </div>
            <div className="beholdningAndPoengForklartLink"><Lenke href={""} >{t('beholdning-and-pensjonspoeng-forklart-lenke')}</Lenke></div>
        </Panel>
    )

};
