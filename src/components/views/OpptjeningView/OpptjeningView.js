import React, {useState} from "react";
import {useTranslation} from 'react-i18next';
import {useSelector} from "react-redux";
import {
    getInntekter,
    getLatestPensjonsBeholdning,
    getOpptjeningByYear,
    getPensjonsBeholdningArray,
    getYearArray
} from "../../../redux/opptjening/opptjeningSelectors";
import {LineChart} from '../../elements/LineChart/LineChart';
import {FAQPanel} from "../../elements/FAQPanel/FAQPanel";
import {OpptjeningDetailsPanel} from "../../elements/OpptjeningDetailsPanel/OpptjeningDetailsPanel";
import {InntektPanel} from "../../elements/InntektPanel/InntektPanel";
import './OpptjeningView.less';
import {BeholdningPanel} from "../../elements/BeholdningPanel/BeholdningPanel";
import Panel from "nav-frontend-paneler";
import {BeholdningForklartPanel} from "../../elements/BeholdningForklartPanel/BeholdningForklartPanel";
import {getUnleash} from "../../../redux/unleash/unleashSelectors";



export const OpptjeningView = () => {
    const { t } = useTranslation(['translation', 'remarks']);
    const yearArray = useSelector(getYearArray);
    const pensjonsBeholdningArray = useSelector(getPensjonsBeholdningArray);
    const latestPensjonsBeholdning = useSelector(getLatestPensjonsBeholdning);

    const unleash = useSelector(getUnleash);
    console.log(unleash);

    const [currentYear, setYear] = useState(latestPensjonsBeholdning.year);
    const opptjening = useSelector(state => getOpptjeningByYear(state, currentYear));
    const inntekter = useSelector(getInntekter);

    return(
        <div data-testid="opptjeningview">
            <BeholdningPanel data={latestPensjonsBeholdning}/>
            <BeholdningForklartPanel/>
            <Panel border className="panelWrapper">
                <LineChart
                    data={{"labels": yearArray, "data": pensjonsBeholdningArray}}
                    title={t("chart-pensjonsbeholdningen-din")}
                    yLabel={t("chart-pensjonsbeholdning")}
                    xLabel={t("chart-aar")}
                />
            </Panel>
            <OpptjeningDetailsPanel data={{opptjening}} currentYear={currentYear} yearArray={yearArray} onChange={setYear}/>
            <InntektPanel data={{inntekter}}/>
            <FAQPanel/>
            {unleash.toggle1}
        </div>
    )
};
