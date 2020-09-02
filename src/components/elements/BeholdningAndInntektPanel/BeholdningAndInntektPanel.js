import React from "react";
import {useTranslation} from "react-i18next";
import {formatAmount} from "../../../common/utils";
import Panel from "nav-frontend-paneler";
import "./BeholdningAndInntektPanel.less"

export const BeholdningAndInntektPanel = (props) => {
    const { t } = useTranslation();
    const latestPensjonsBeholdningAndInntekt = props.data;
    return(
        <Panel border>
            <div className="beholdningAndInntektPanel">
                <div className="content">
                    <div className="typo-systemtittel">{t('opptjening-your-pension-assets')}</div>
                    <div className="typo-sidetittel">{formatAmount(latestPensjonsBeholdningAndInntekt.beholdning)}</div>
                </div>
                {latestPensjonsBeholdningAndInntekt.pensjonsgivendeInntekt &&
                    <div className="content">
                        <div className="typo-systemtittel">{t('opptjening-your-pensionable-income')}</div>
                        <div className="typo-sidetittel">{formatAmount(latestPensjonsBeholdningAndInntekt.pensjonsgivendeInntekt)}</div>
                    </div>
                }
            </div>
        </Panel>
    )
};
