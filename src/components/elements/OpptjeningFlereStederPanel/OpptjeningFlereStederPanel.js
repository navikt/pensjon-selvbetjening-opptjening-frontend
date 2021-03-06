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
import {PanelTitle} from "../PanelTitle/PanelTitle";

export const OpptjeningFlereStederPanel = () => {
    const [apen, setApen] = useState(false);
    const { t } = useTranslation();

    const toggleOpen = (props) => {
        logToAmplitude({eventType: CLICK_EVENT, name: "Åpne panel", titleKey: "opptjening-flere-steder-title", type: props.type, value: !apen});
        setApen(!apen);
    };

    const panelTitle = <PanelTitle titleString={t('opptjening-flere-steder-title')} illustrationClass="opptjeningFlereStederIllustration" illustration={lommebok}/>;

    return(
        <Ekspanderbartpanel tittel={panelTitle} border className="panelWrapper" apen={apen} onClick={()=>toggleOpen({type: "EkspanderbartPanel"})}>
            <Tekstomrade className="opptjeningMaterTitle">{t('opptjening-flere-steder-forklart-title')}</Tekstomrade>
            <div className="opptjeningMater">
                <div className="opptjeningMate">
                    <div role="presentation">
                        <img src={navBok} alt=""/>
                    </div>
                    <span className="opptjeningMateText">{t('opptjening-flere-steder-folketrygden')}</span>
                </div>

                <div className="opptjeningMate">
                    <div role="presentation">
                        <img src={handMedSedler} alt=""/>
                    </div>
                    <span className="opptjeningMateText">{t('opptjening-flere-steder-tjenestepensjon')}</span>
                </div>

                <div className="opptjeningMate">
                    <div role="presentation">
                        <img src={bank} alt=""/>
                    </div>
                    <span className="opptjeningMateText">{t('opptjening-flere-steder-individuell')}</span>
                </div>
            </div>
            <Tekstomrade>{t('opptjening-flere-steder-forklart')}</Tekstomrade>
        </Ekspanderbartpanel>
    )
};
