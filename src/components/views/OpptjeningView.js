import React from "react";
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import {shallowEqual, useSelector} from "react-redux";
import {getOpptjening, getPensjonsBeholdningArray, getYearArray} from "../../redux/opptjening/opptjeningSelectors";
import Panel from 'nav-frontend-paneler';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import {LineChart} from '../elements/LineChart/LineChart';
import './OpptjeningView.less';

export const OpptjeningView = () => {
    const opptjening = useSelector(getOpptjening, shallowEqual);
    const { t } = useTranslation();

    const oData = opptjening.opptjeningData;
    const lastYear = _.max(Object.keys(oData), o => oData[o]);

    const yearArray = useSelector(getYearArray);
    const pensjonsBeholdningArray = useSelector(getPensjonsBeholdningArray);

    return(
        <div className="opptjeningBody">
            <Panel border>
                <div className="beholdningPanel">
                    <div className="content">
                        {t('opptjening-your-pension-assets')}
                        <h1 className="typo-systemtittel">{oData[lastYear].pensjonsbeholdning}</h1>
                    </div>
                </div>
            </Panel>
            <LineChart data={{"labels": yearArray, "data":pensjonsBeholdningArray}}/>
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
