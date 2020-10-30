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
import Panel from "nav-frontend-paneler";
import {LineChart} from '../../elements/LineChart/LineChart';
import {FAQPanel} from "../../elements/FAQPanel/FAQPanel";
import {OpptjeningDetailsPanel} from "../../elements/OpptjeningDetailsPanel/OpptjeningDetailsPanel";
import {InntektPanel} from "../../elements/InntektPanel/InntektPanel";
import {BeholdningPanel} from "../../elements/BeholdningPanel/BeholdningPanel";
import {BeholdningForklartPanel} from "../../elements/BeholdningForklartPanel/BeholdningForklartPanel";
import './OpptjeningView.less';
import {amplitudeLogger, SELECT_EVENT} from "../../../common/amplitude";
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

    const selectYear = (year) => {
        amplitudeLogger(SELECT_EVENT, {"component": t('opptjening-details-din-okning-ar-for-ar'), "year": year});
        setYear(year);
    };

    return(
        <div data-testid="opptjeningview">
            <section aria-labelledby="pensjonsBeholdningTitle">
                <BeholdningPanel data={latestPensjonsBeholdning}/>
            </section>
            <section title={t('pensjonsbeholdning-forklart')}>
                <BeholdningForklartPanel/>
            </section>
            <section aria-labelledby="chartTitle">
                <Panel border className="panelWrapper">
                    <LineChart
                        data={{"labels": yearArray, "data": pensjonsBeholdningArray}}
                        title={t("chart-pensjonsbeholdningen-din")}
                        yLabel={t("chart-pensjonsbeholdning")}
                        xLabel={t("chart-aar")}
                    />
                </Panel>
            </section>
            <section title={t('opptjening-details-din-okning-ar-for-ar')}>
                <OpptjeningDetailsPanel data={{opptjening}} currentYear={currentYear} yearArray={yearArray} onChange={selectYear}/>
            </section>
            <section title={t('opptjening-pensjonsgivende-inntekter')}>
                <InntektPanel data={{inntekter}}/>
            </section>
            <section aria-labelledby="faqTitle">
                <FAQPanel/>
            </section>
        </div>
    )
};
