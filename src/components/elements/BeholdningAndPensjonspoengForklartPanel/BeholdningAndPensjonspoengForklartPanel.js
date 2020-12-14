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

const shareItems = (andelNyttRegelverk, andelGammeltRegelverk) =>{
    let shareItems = [];
    for(let i=0;i<andelNyttRegelverk; i++){
        shareItems.push(shareItem("pensjonsbeholdningShare", i))
    }
    for(let i=0;i<andelGammeltRegelverk; i++){
        shareItems.push(shareItem("pensjonspoengShare", i))
    }

    return shareItems
}


export const BeholdningAndPensjonspoengForklartPanel = (props) => {
    const { t } = useTranslation();
    const {andelNyttRegelverk}= props;
    const andelGammeltRegelverk = 10 - andelNyttRegelverk;

    return(
        <Panel border className="panelWrapper">
            <div className="beholdningAndPoengForklartTitleContainer">
                <Undertittel id="beholdingAndPensjonspoengForklartTitle" className="lenkepanel__heading title">{t('beholdning-and-pensjonspoeng-forklart')}</Undertittel>
            </div>
            <Tekstomrade className="beholdningAndPensjonspoengForklartExplanationText">
                {t('beholdning-and-pensjonspoeng-forklart-tekst', {joinArrays: "\n\n"})}
            </Tekstomrade>
            <Tekstomrade className="beholdningAndPensjonspoengForklartExplanationText">
                {t('beholdning-and-pensjonspoeng-forklart-illustrasjon-tekst')}
            </Tekstomrade>
            <div className="regelverkShareDiagram">
                {shareItems(andelNyttRegelverk, andelGammeltRegelverk)}
            </div>
            <div>
                <div className="pensjonsbeholdningColorBox"/>
                <span className="colorBoxText">{t("beholdning-and-pensjonspoeng-forklart-andel-pensjonsbeholdning", {andelNyttRegelverk})}</span>
                <div className="pensjonspoengColorBox"/>
                <span className="colorBoxText">{t("beholdning-and-pensjonspoeng-forklart-andel-pensjonspoeng", {andelGammeltRegelverk})}</span>
            </div>
            <div className="opptjeningForklartLink"><Lenke href={""} >{t('beholdning-and-pensjonspoeng-forklart-lenke')}</Lenke></div>
        </Panel>
    )

};
