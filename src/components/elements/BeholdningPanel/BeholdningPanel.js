import React from "react";
import {useTranslation} from "react-i18next";
import {formatAmount} from "../../../common/utils";
import Panel from "nav-frontend-paneler";
import {Systemtittel} from "nav-frontend-typografi";
import "./BeholdningPanel.css"
import sparegris from "../../../assets/sparegris.svg"

export const BeholdningPanel = (props) => {
    const { t } = useTranslation();
    const latestPensjonsBeholdning = props.data;
    return(
        <Panel border>
            <div className="beholdningPanel">
                <img src={sparegris} className="illustration" alt=""/>
                <div className="content">
                    <Systemtittel id="pensjonsBeholdningTitle">{t('beholdning-din-pensjonsbeholdning-i-folketrygden')}</Systemtittel>
                    <div data-testid="assets" className="typo-sidetittel">kr {formatAmount(latestPensjonsBeholdning.beholdning)}</div>
                </div>
            </div>
        </Panel>
    )
};
