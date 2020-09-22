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
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import {LineChart} from '../../elements/LineChart/LineChart';
import {FAQLinkPanel} from "../../elements/FAQLinkPanel/FAQLinkPanel";
import {YearSelector} from "../../elements/YearSelector/YearSelector";
import {OpptjeningDetailsPanel} from "../../elements/OpptjeningDetailsPanel/OpptjeningDetailsPanel";
import {InntektPanel} from "../../elements/InntektPanel/InntektPanel";
import {isDev} from "../../../common/utils";
import './OpptjeningView.less';
import {BeholdningPanel} from "../../elements/BeholdningPanel/BeholdningPanel";

export const OpptjeningView = () => {
    const { t } = useTranslation(['translation', 'remarks']);
    const yearArray = useSelector(getYearArray);
    const pensjonsBeholdningArray = useSelector(getPensjonsBeholdningArray);
    const latestPensjonsBeholdning = useSelector(getLatestPensjonsBeholdning);

    const [currentYear, setYear] = useState(latestPensjonsBeholdning.year);
    const opptjening = useSelector(state => getOpptjeningByYear(state, currentYear));
    const opptjeningTwoYearsBack = useSelector(state => getOpptjeningByYear(state, currentYear-2));
    const inntekter = useSelector(getInntekter);

    return(
        <div>
            <BeholdningPanel data={latestPensjonsBeholdning}/>
            <LineChart
                data={{"labels": yearArray, "data": pensjonsBeholdningArray}}
                onclick={setYear}
                title={t("opptjening-increase-in-pension-assets-per-year")}
                yLabel={t("opptjening-pension-assets")}
                xLabel={t("opptjening-year")}

            />
            <div className="contentCentered">
                <YearSelector years={yearArray} onChange={setYear} currentYear={currentYear} size="xs"/>
            </div>
            <OpptjeningDetailsPanel data={{opptjening, opptjeningTwoYearsBack}} currentYear={currentYear}/>
            <InntektPanel data={{inntekter}}/>
            <FAQLinkPanel/>

            {/*Show raw data in DEVELOPMENT*/}
            {isDev() &&
                <Ekspanderbartpanel tittel="Data" className="panelWrapper">
                    <pre id="json">{JSON.stringify(opptjening, null, 4)}</pre>
                </Ekspanderbartpanel>
            }
        </div>
    )
};