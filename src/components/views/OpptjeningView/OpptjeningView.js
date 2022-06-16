import React, {useState} from "react";
import {useTranslation} from 'react-i18next';
import {useSelector} from "react-redux";
import {
    getAndelPensjonBasertPaBeholdning, getFodselsAar,
    getLatestPensjonsBeholdning,
    getOpptjeningByYear, getOpptjeningData, getPensjonsbeholdningAndPensjonspoeng, getUserGroup,
    getYearArray, getOmsorgsOpptjeningMap, hasOverforeOmsorgsOpptjeningLink, getAntallAarPensjonsPoeng, getName, hasOpptjeningData
} from "../../../redux/opptjening/opptjeningSelectors";
import Panel from "nav-frontend-paneler";
import {LineChart} from '../../elements/LineChart/LineChart';
import {FAQPanel} from "../../elements/FAQPanel/FAQPanel";
import {OpptjeningDetailsPanel} from "../../elements/OpptjeningDetailsPanel/OpptjeningDetailsPanel";
import {BeholdningPanel} from "../../elements/BeholdningPanel/BeholdningPanel";
import {BeholdningForklartPanel} from "../../elements/BeholdningForklartPanel/BeholdningForklartPanel";
import './OpptjeningView.less';
import { logToAmplitude, SELECT_EVENT} from "../../../common/amplitude";
import {
    BORN_AFTER_1962, BORN_BEFORE_1943, BORN_IN_OR_BETWEEN_1943_AND_1953,
    BORN_IN_OR_BETWEEN_1954_AND_1962
} from "../../../common/userGroups";
import {UserGroup} from "../../elements/UserGroup/UserGroup";
import {InntektWithMerknadPanel} from "../../elements/InntektWithMerknadPanel/InntektWithMerknadPanel";
import {PensjonspoengForklartPanel} from "../../elements/PensjonspoengForklartPanel/PensjonspoengForklartPanel";
import {BeholdningAndPensjonspoengForklartPanel} from "../../elements/BeholdningAndPensjonspoengForklartPanel/BeholdningAndPensjonspoengForklartPanel";
import {PensjonskalkulatorLenkePanel} from "../../elements/PensjonskalkulatorLenkePanel/PensjonskalkulatorLenkePanel";
import {OpptjeningFlereStederPanel} from "../../elements/OpptjeningFlereStederPanel/OpptjeningFlereStederPanel";
import {OverforeOmsorgsOpptjeningPanel} from "../../elements/OverforeOmsorgsOpptjeningPanel/OverforeOmsorgsOpptjeningPanel";
import {VeilederMedSnakkeboble} from "../../elements/VeilederMedSnakkeboble/VeilederMedSnakkeboble";
import {AlertStripeFeil} from "nav-frontend-alertstriper";

export const OpptjeningView = () => {
    const { t } = useTranslation(['translation', 'remarks']);
    const userGroup = useSelector(getUserGroup);
    const fodselsar = useSelector(getFodselsAar);
    const name = useSelector(getName);
    const antallAarPensjonsPoeng = useSelector(getAntallAarPensjonsPoeng);
    const yearArray = useSelector(getYearArray);
    const latestPensjonsBeholdning = useSelector(getLatestPensjonsBeholdning);
    const pensjonsbeholdningAndPensjonspoengMap = useSelector(getPensjonsbeholdningAndPensjonspoeng);
    const andelPensjonBasertPaBeholdning = useSelector(getAndelPensjonBasertPaBeholdning);
    const omsorgsOpptjeningMap = useSelector(getOmsorgsOpptjeningMap);
    const hasOverforeLink  = useSelector(hasOverforeOmsorgsOpptjeningLink);
    const [currentYear, setYear] = useState(latestPensjonsBeholdning.year);

    const opptjening = useSelector(state => getOpptjeningByYear(state, currentYear));
    const opptjeningData = useSelector(getOpptjeningData);

    const hasOmsorgsOpptjeningTwoYearsBack = omsorgsOpptjeningMap && omsorgsOpptjeningMap[currentYear-2] ? omsorgsOpptjeningMap[currentYear-2].hasOmsorgsOpptjening : null;

    const selectYear = (year) => {
        logToAmplitude({eventType: SELECT_EVENT, name: "År", titleKey: "opptjening-details-din-okning-ar-for-ar", type: "Select", value: year});
        setYear(year);
    };

    const ForklartSection = () =>{
        if(userGroup===BORN_AFTER_1962){
            return (
                <section aria-labelledby={t('pensjonsbeholdning-forklart')} id="forklartseksjon">
                    <BeholdningForklartPanel/>
                </section>
            )
        } else if(userGroup===BORN_IN_OR_BETWEEN_1954_AND_1962){
            return (
                <section aria-labelledby={t('beholdning-and-pensjonspoeng-forklart')} id="forklartseksjon">
                    <BeholdningAndPensjonspoengForklartPanel andelPensjonBasertPaBeholdning={andelPensjonBasertPaBeholdning} fodselsar={fodselsar}/>
                </section>
            )
        }
    };

    const Veiledertext = () => {
        let nameString = "!";
        if(name) nameString = ", " + name.toLowerCase() + "!";
        return(
            <div>
                <span className="capitalizedString">{t('opptjening-hei') + nameString}</span>  <br/>
                {t('opptjening-intro-tekst')}
            </div>
        )
    };

    const hasData = useSelector(hasOpptjeningData);

    return(
        <div data-testid="opptjeningview">
            {!hasData && <AlertStripeFeil>{t('error-status-nodata')}</AlertStripeFeil>}
            {hasData &&
                <div>
                    <VeilederMedSnakkeboble veilederText={<Veiledertext/>}/>
                    <UserGroup userGroups={[BORN_IN_OR_BETWEEN_1954_AND_1962, BORN_AFTER_1962]} include={true}>
                        <section aria-labelledby="pensjonsBeholdningTitle">
                            <BeholdningPanel data={latestPensjonsBeholdning}/>
                        </section>
                        <ForklartSection/>
                        <section id="inntektmedmerknadpanel" aria-label={"title " + t('inntekt-pensjonsgivende-inntekter')}>
                            <InntektWithMerknadPanel data={opptjeningData} userGroup={userGroup} antallAarPensjonsPoeng={antallAarPensjonsPoeng}/>
                        </section>
                        <section aria-labelledby="chartTitle">
                            <Panel border className="panelWrapper">
                                <LineChart
                                    data={pensjonsbeholdningAndPensjonspoengMap}
                                    userGroup={userGroup}
                                    antallAarPensjonsPoeng={antallAarPensjonsPoeng}
                                />
                            </Panel>
                        </section>
                        <section id="din-okning-aar-for-aar" aria-label={"title " + t('opptjening-details-din-okning-ar-for-ar')}>
                            <OpptjeningDetailsPanel data={{opptjening}} currentYear={currentYear} yearArray={yearArray}
                                                    onChange={selectYear} userGroup={userGroup} hasOmsorgsOpptjeningTwoYearsBack={hasOmsorgsOpptjeningTwoYearsBack}/>
                        </section>
                    </UserGroup>
                    <UserGroup userGroups={[BORN_IN_OR_BETWEEN_1943_AND_1953, BORN_BEFORE_1943]} include={true}>
                        <section aria-label={"title " + t('pensjonspoeng-forklart')}>
                            <PensjonspoengForklartPanel/>
                        </section>
                        <section aria-label={"title " + t('inntekt-pensjonsgivende-inntekter')}>
                            <InntektWithMerknadPanel data={opptjeningData} userGroup={userGroup} antallAarPensjonsPoeng={antallAarPensjonsPoeng}/>
                        </section>
                    </UserGroup>
                    {hasOverforeLink &&
                        <section aria-label={"title " + t('overfore-omsorgsopptjening-title')}>
                            <OverforeOmsorgsOpptjeningPanel/>
                        </section>
                    }
                    <section aria-label={"title " + t('opptjening-flere-steder-title')}>
                        <OpptjeningFlereStederPanel/>
                    </section>
                    <section>
                        <PensjonskalkulatorLenkePanel/>
                    </section>
                    <section aria-labelledby="faqTitle">
                        <FAQPanel userGroup={userGroup}/>
                    </section>
                </div>
            }
        </div>
    )
};
