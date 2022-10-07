import {useTranslation} from "react-i18next";
import React from "react";
import Tekstomrade from "nav-frontend-tekstomrade";
import "./BeholdningAndPensjonspoengForklartPanel.css";
import Panel from "nav-frontend-paneler";
import Lenke from "nav-frontend-lenker";
import {PanelTitle} from "../PanelTitle/PanelTitle";
import {PENSJONSOPPTJENING_FOR_DEG_FODT_MELLOM_1954_OG_1962} from "../../../common/externalUrls";
import ReactMarkdown from "react-markdown";

const shareItem = (type, idx) => {
    return(
        <div key={type + idx} data-testid={type} className={type}/>
    )
};

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
    const {andelPensjonBasertPaBeholdning, fodselsar} = props;
    const andelPensjonBasertPaPensjonspoeng = 10 - andelPensjonBasertPaBeholdning;

    return(
        <Panel border className="panelWrapper">
            <div className="beholdningAndPoengForklartTitleContainer">
                <PanelTitle titleString={t('beholdning-and-pensjonspoeng-forklart')}/>
            </div>
            <ReactMarkdown className="beholdningAndPensjonspoengForklartExplanationText">
                {t('beholdning-and-pensjonspoeng-forklart-tekst', {fodselsar, andelPensjonBasertPaBeholdning, andelPensjonBasertPaPensjonspoeng})}
            </ReactMarkdown>
            <Tekstomrade className="beholdningAndPensjonspoengForklartIllustrationText">
                {t('beholdning-and-pensjonspoeng-forklart-illustrasjon-tekst')}
            </Tekstomrade>
            <div className="regelverkShareDiagram">
                {shareItems(andelPensjonBasertPaBeholdning, andelPensjonBasertPaPensjonspoeng)}
            </div>
            <div>
                <div className="pensjonsbeholdningColorBox"/>
                <span className="colorBoxText">{t("beholdning-and-pensjonspoeng-forklart-andel-pensjonsbeholdning")}</span>
                <div className="pensjonspoengColorBox"/>
                <span className="colorBoxText">{t("beholdning-and-pensjonspoeng-forklart-andel-pensjonspoeng")}</span>
            </div>
            <div className="pensjonsopptjeningForklaring">
                <h3>{t('beholdning-and-pensjonspoeng-forklart-pensjonspoeng-title')}</h3>
                <Tekstomrade>
                    {t('beholdning-and-pensjonspoeng-forklart-pensjonspoeng-text', {joinArrays: "\n\n"})}
                </Tekstomrade>
            </div>
            <div className="pensjonsopptjeningForklaring">
                <h3>{t('beholdning-and-pensjonspoeng-forklart-pensjonsbeholdning-title')}</h3>
                <Tekstomrade>
                    {t('beholdning-and-pensjonspoeng-forklart-pensjonsbeholdning-text')}
                </Tekstomrade>
            </div>
            <div className="beholdningAndPoengForklartLink"><Lenke href={PENSJONSOPPTJENING_FOR_DEG_FODT_MELLOM_1954_OG_1962}>{t('beholdning-and-pensjonspoeng-forklart-lenke')}</Lenke></div>
        </Panel>
    )

};
