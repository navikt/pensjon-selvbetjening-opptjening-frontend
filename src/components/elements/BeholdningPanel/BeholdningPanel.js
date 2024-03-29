import React from "react";
import {useTranslation} from "react-i18next";
import {formatAmount} from "../../../common/utils";
import Panel from "nav-frontend-paneler";
import {Systemtittel} from "nav-frontend-typografi";
import "./BeholdningPanel.css"
import sparegris from "../../../assets/sparegris.svg"
import Tekstomrade from "nav-frontend-tekstomrade";
import {useSelector} from "react-redux";
import {getSisteUttaksgrad} from "../../../redux/opptjening/opptjeningSelectors";

export const BeholdningPanel = (props) => {
    const { t } = useTranslation();
    const latestPensjonsBeholdning = props.data;
    const uttaksgrad = useSelector(getSisteUttaksgrad)

    const Beskjed = () => {

        if (uttaksgrad === null) {
            return <div/>
        }

        if (uttaksgrad === 100) {
            return <Tekstomrade data-testid="explanationText" className="pensjonspoengDersom0">
                {t('beholdning-din-pensjonsbeholdning-i-folketrygden-dersom-0')}
            </Tekstomrade>
        } else if (uttaksgrad > 0 && uttaksgrad < 100) {
            return <Tekstomrade data-testid="explanationText" className="pensjonspoengDersom0">
                {t('beholdning-din-pensjonsbeholdning-i-folketrygden-dersom-delvis')}
            </Tekstomrade>
        }

        return <div/>
    };

    return(
        <Panel border>
            <div className="beholdningPanel">
                <img src={sparegris} className="illustration" alt=""/>
                <div className="content">
                    <Systemtittel id="pensjonsBeholdningTitle">{t('beholdning-din-pensjonsbeholdning-i-folketrygden')}</Systemtittel>
                    <div data-testid="assets" className="typo-sidetittel">kr {formatAmount(latestPensjonsBeholdning.beholdning)}</div>
                    <Beskjed />
                </div>
            </div>
        </Panel>
    )
};
