import React from "react";
import {useTranslation} from "react-i18next";
import {formatAmount} from "../../../common/utils";
import Panel from "nav-frontend-paneler";
import {Systemtittel, Sidetittel} from "nav-frontend-typografi";
import "./BeholdningPanel.less"

export const BeholdningPanel = (props) => {
    const { t } = useTranslation();
    const latestPensjonsBeholdning = props.data;
    return(
        <Panel border>
            <div className="beholdningPanel">
                <div className="content">
                    <Systemtittel>{t('opptjening-your-pension-assets')}</Systemtittel>
                    <div data-testid="assets" className="typo-sidetittel">{formatAmount(latestPensjonsBeholdning.beholdning)}</div>
                </div>
            </div>
        </Panel>
    )
};
