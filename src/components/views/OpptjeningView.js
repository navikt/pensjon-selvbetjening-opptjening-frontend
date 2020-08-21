import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import {useSelector} from "react-redux";
import {getPensjonsBeholdningArray, getYearArray, getOpptjeningByYear, getLatestPensjonsBeholdning} from "../../redux/opptjening/opptjeningSelectors";
import Panel from 'nav-frontend-paneler';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import {LineChart} from '../elements/LineChart/LineChart';
import './OpptjeningView.less';

export const OpptjeningView = () => {
    const { t } = useTranslation();
    const yearArray = useSelector(getYearArray);
    const pensjonsBeholdningArray = useSelector(getPensjonsBeholdningArray);
    const latestPensjonsBeholdning = useSelector(getLatestPensjonsBeholdning);

    const [currentYear, setYear] = useState(latestPensjonsBeholdning.year);
    const opptjeningByYear = useSelector(state => getOpptjeningByYear(state, currentYear));

    return(
        <div className="opptjeningBody">
            <Panel border>
                <div className="beholdningPanel">
                    <div className="content">
                        {t('opptjening-your-pension-assets')}
                        <h1 className="typo-systemtittel">{latestPensjonsBeholdning.beholdning}</h1>
                    </div>
                </div>
            </Panel>
            <LineChart data={{"labels": yearArray, "data":pensjonsBeholdningArray}} onclick={setYear} datasetLabel={t("opptjening-pension-assets")}/>
            <div className="contentCentered">
                <h2>{currentYear}</h2>
            </div>
            <Ekspanderbartpanel tittel={t("opptjening-what-happened-this-year")} border className="panelWrapper">
                <pre id="json">{JSON.stringify(opptjeningByYear, null, 4)}</pre>
            </Ekspanderbartpanel>
        </div>
    )
};
