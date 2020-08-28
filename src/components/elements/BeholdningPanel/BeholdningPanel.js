import React from "react";
import {useTranslation} from "react-i18next";
import {formatAmount} from "../../../common/utils";
import Panel from "nav-frontend-paneler";
import "./BeholdningPanel.less"

export const BeholdningPanel = (props) => {
    const { t } = useTranslation();
    const latestPensjonsBeholdning = props.data;
    return(
        <Panel border>
            <div className="beholdningPanel">
                <div className="content">
                    <div className="typo-systemtittel">{t('opptjening-your-pension-assets')}</div>
                    <div className="typo-sidetittel">{formatAmount(latestPensjonsBeholdning.beholdning)}</div>
                </div>
            </div>
        </Panel>
    )
};
