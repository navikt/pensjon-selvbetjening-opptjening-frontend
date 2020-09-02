import React, {useState} from "react";
import {useTranslation} from 'react-i18next';
import {useSelector} from "react-redux";
import {
    getLatestPensjonsBeholdningAndInntekt,
    getOpptjeningByYear,
    getPensjonsBeholdningArray,
    getYearArray
} from "../../redux/opptjening/opptjeningSelectors";
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import {LineChart} from '../elements/LineChart/LineChart';
import {FAQLinkPanel} from "../elements/FAQLinkPanel/FAQLinkPanel";
import {YearSelector} from "../elements/YearSelector/YearSelector";
import {OpptjeningDetailsPanel} from "../elements/OpptjeningDetailsPanel/OpptjeningDetailsPanel";
import {isDev} from "../../common/utils";
import './OpptjeningView.less';
import {BeholdningAndInntektPanel} from "../elements/BeholdningAndInntektPanel/BeholdningAndInntektPanel";

export const OpptjeningView = () => {
    const { t } = useTranslation(['translation', 'remarks']);
    const yearArray = useSelector(getYearArray);
    const pensjonsBeholdningArray = useSelector(getPensjonsBeholdningArray);
    const latestPensjonsBeholdningAndInntekt = useSelector(getLatestPensjonsBeholdningAndInntekt);

    const [currentYear, setYear] = useState(latestPensjonsBeholdningAndInntekt.year);
    const opptjening = useSelector(state => getOpptjeningByYear(state, currentYear));
    const opptjeningTwoYearsBack = useSelector(state => getOpptjeningByYear(state, currentYear-2));

    return(
        <div>
            <BeholdningAndInntektPanel data={latestPensjonsBeholdningAndInntekt}/>
            <LineChart
                data={{"labels": yearArray, "data": pensjonsBeholdningArray}}
                title={t('opptjening-your-pension-assets')}
                datasetLabel={t("opptjening-pension-assets")}
                onclick={setYear}
            />
            <div className="contentCentered">
                <YearSelector years={yearArray} onChange={setYear} currentYear={currentYear} size="xs"/>
            </div>
            <OpptjeningDetailsPanel data={{opptjening, opptjeningTwoYearsBack}} currentYear={currentYear}/>
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
