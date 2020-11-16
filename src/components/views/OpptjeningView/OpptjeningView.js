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
import { logToAmplitude, SELECT_EVENT} from "../../../common/amplitude";

export const OpptjeningView = () => {
    const { t } = useTranslation(['translation', 'remarks']);
    const yearArray = useSelector(getYearArray);
    const pensjonsBeholdningArray = useSelector(getPensjonsBeholdningArray);
    const latestPensjonsBeholdning = useSelector(getLatestPensjonsBeholdning);

    const [currentYear, setYear] = useState(latestPensjonsBeholdning.year);

    const opptjening = useSelector(state => getOpptjeningByYear(state, currentYear));
    const inntekter = useSelector(getInntekter);

    const selectYear = (year) => {
        logToAmplitude({eventType: SELECT_EVENT, name: "År", titleKey: "opptjening-details-din-okning-ar-for-ar", type: "Select", value: year});
        setYear(year);
    };

    return(
        <div data-testid="opptjeningview">
            <section aria-labelledby="pensjonsBeholdningTitle">
                <BeholdningPanel data={latestPensjonsBeholdning}/>
            </section>
            <section aria-label={"title " + t('pensjonsbeholdning-forklart')}>
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
            <section aria-label={"title " + t('opptjening-details-din-okning-ar-for-ar')}>
                <OpptjeningDetailsPanel data={{opptjening}} currentYear={currentYear} yearArray={yearArray} onChange={selectYear}/>
            </section>
            <section aria-label={"title " + t('opptjening-pensjonsgivende-inntekter')}>
                <InntektPanel data={{inntekter}}/>
            </section>
            <section aria-labelledby="faqTitle">
                <FAQPanel/>
            </section>
        </div>
    )
};
