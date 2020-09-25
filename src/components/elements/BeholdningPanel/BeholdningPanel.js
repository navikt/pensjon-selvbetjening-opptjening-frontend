import React from "react";
import {useTranslation} from "react-i18next";
import {formatAmount} from "../../../common/utils";
import Panel from "nav-frontend-paneler";
import {Systemtittel} from "nav-frontend-typografi";
import sparegris from '../../../assets/sparegris.png'
import "./BeholdningPanel.less"
import Tekstomrade from "nav-frontend-tekstomrade";

export const BeholdningPanel = (props) => {
    const { t } = useTranslation();
    const latestPensjonsBeholdning = props.data;
    return(
        <Panel border>
            <div className="beholdningPanel">
                <div role="presentation" className="illustration">
                    <img alt="sparegris" src={sparegris}/>
                </div>
                <div className="content">
                    <Systemtittel>{t('opptjening-your-pension-assets-in-folketrygden')}</Systemtittel>
                    <div data-testid="assets" className="typo-sidetittel">{formatAmount(latestPensjonsBeholdning.beholdning)}</div>
                    <Tekstomrade>
                        {t('opptjening-beholdning-panel-text')}
                    </Tekstomrade>
                </div>
            </div>
        </Panel>
    )
};
