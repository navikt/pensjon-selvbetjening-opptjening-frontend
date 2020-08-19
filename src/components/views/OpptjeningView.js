import React from "react";
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import {shallowEqual, useSelector} from "react-redux";
import {getOpptjening} from "../../redux/opptjening/opptjeningSelectors";
import Panel from 'nav-frontend-paneler';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import {LineChart} from '../elements/LineChart/LineChart';
import './OpptjeningView.less';

export const OpptjeningView = () => {
    const opptjening = useSelector(getOpptjening, shallowEqual);
    const { t } = useTranslation();

    let oData = opptjening.opptjeningData;
    let maxKey = _.max(Object.keys(oData), o => oData[o]);
    return(
        <div className="opptjeningBody">
            <Panel border>
                <div className="beholdningPanel">
                    <div className="content">
                        {t('opptjening-your-pension-assets')}
                        <h1 className="typo-systemtittel">{oData[maxKey].pensjonsbeholdning}</h1>
                    </div>
                </div>
            </Panel>
            <LineChart data={oData}/>
            <Ekspanderbartpanel tittel={t("opptjening-what-happened-this-year")} border className="panelWrapper">
                {oData && Object.keys(oData).map((year, idx) => {
                    return (
                        <p key={idx}>
                            <h3>{t('opptjening-year')}: {year}</h3>
                            <pre id="json">{JSON.stringify(oData[year], null, 4)}</pre>
                        </p>
                    )
                })}
            </Ekspanderbartpanel>
        </div>
    )
};
