import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Tekstomrade from "nav-frontend-tekstomrade";
import "./OpptjeningFlereStederPanel.less";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";
import lommebok from "../../../assets/lommebok.svg";
import navBok from "../../../assets/navBok.svg";
import handMedSedler from "../../../assets/handMedSedler.svg";
import bank from "../../../assets/bank.svg";


const detailsTitle = (title) => {
    return(
        <div role="heading" aria-level="2" className="opptjeningFlereStederTitle">
            <img src={lommebok} className="illustration" alt=""/>
            <div className="title">{title}</div>
        </div>
    )
};

export const OpptjeningFlereStederPanel = () => {
    const [apen, setApen] = useState(false);
    const { t } = useTranslation();

    const toggleOpen = (props) => {
        logToAmplitude({eventType: CLICK_EVENT, name: "Åpne panel", titleKey: "opptjening-flere-steder-title", type: props.type, value: !apen});
        setApen(!apen);
    };

    return(
        <Ekspanderbartpanel tittel={detailsTitle(t('opptjening-flere-steder-title'))} border className="panelWrapper" apen={apen} onClick={()=>toggleOpen({type: "EkspanderbartPanel"})}>
            <Tekstomrade className="opptjeningMaterTitle">{t('opptjening-flere-steder-forklart-title')}</Tekstomrade>
            <div className="opptjeningMater">
                <div className="opptjeningMate">
                    <div role="presentation">
                        <img src={navBok} className="illustration" alt=""/>
                    </div>
                    <span className="opptjeningMateText">{t('opptjening-flere-steder-folketrygden')}</span>
                </div>

                <div className="opptjeningMate">
                    <div role="presentation">
                        <img src={handMedSedler} className="illustration" alt=""/>
                    </div>
                    <span className="opptjeningMateText">{t('opptjening-flere-steder-tjenestepensjon')}</span>
                </div>

                <div className="opptjeningMate">
                    <div role="presentation">
                        <img src={bank} className="illustration" alt=""/>
                    </div>
                    <span className="opptjeningMateText">{t('opptjening-flere-steder-individuell')}</span>
                </div>
            </div>
            <Tekstomrade>{t('opptjening-flere-steder-forklart')}</Tekstomrade>
        </Ekspanderbartpanel>
    )
};
