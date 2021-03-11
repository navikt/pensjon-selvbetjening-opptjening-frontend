import {formatAmount, formatNumber} from "../../../common/utils";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {EkspanderbartpanelBase} from "nav-frontend-ekspanderbartpanel";
import "./OpptjeningDetailsPanel.less"
import {YearSelector} from "../YearSelector/YearSelector";
import {Label} from "nav-frontend-skjema";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";
import {BORN_IN_OR_BETWEEN_1954_AND_1962} from "../../../common/userGroups";
import sedler from "../../../assets/sedler.svg"
import {PanelTitle} from "../PanelTitle/PanelTitle";

const detailRow = (props) => {
    return(
        <div role="row" data-testid={props.key} key={props.key} className="detailRow">
            <span role="cell" data-testid={"label-"+ props.key} className="labelColumn">{props.label}</span>
            <span role="cell" data-testid={"kr-"+ props.key} className="krColumn">kr</span>
            <span role="cell" data-testid={"amount-"+ props.key} className="numberColumn">{props.amount}</span>
            <span role="presentation" className="emptyColumn">&nbsp;</span>
        </div>
    )
};

const getTextParagraph = (text, key) =>{
    return(
        <p key={key} data-testid={key} className="typo-normal">{text}</p>
    )
};

const getTextParagraphsFromTextArray = (textArray, key) =>{
    return textArray.map((txt, idx) => {
        return getTextParagraph(txt, key + "-" + idx);
    });
};

const getLabelForGrunnlagCode = (grunnlagCode, grunnlag, t) => {
    switch(grunnlagCode){
        case "INNTEKT_GRUNNLAG":
            return t("opptjening-details-opptjening-basert-paa-pensjonsgivende-inntekt", {grunnlag});
        case "UFORE_GRUNNLAG":
            return t("opptjening-details-opptjening-basert-paa-uforetrygd", {grunnlag});
        case "FORSTEGANGSTJENESTE_GRUNNLAG":
            return t("opptjening-details-opptjening-basert-paa-forstegangstjeneste", {grunnlag});
        case "DAGPENGER_GRUNNLAG":
            return t("opptjening-details-opptjening-basert-paa-dagpenger", {grunnlag});
        case "OMSORGSOPPTJENING_GRUNNLAG":
            return t("opptjening-details-omsorgsopptjening", {grunnlag});
        case "NO_GRUNNLAG":
            return t("opptjening-details-opptjening");
        default:
            return t("opptjening-details-opptjening");
    }
};

const buildDetails = (opptjening, currentYear, hasOmsorgsOpptjeningTwoYearsBack, t)  => {
    let details = [];
    let grunnlagTextArray = [];
    let grunnlagTypes = [];
    let uttakTexts = {};
    let currentRegulering;
    if (opptjening && opptjening.endringOpptjening) {
        opptjening.endringOpptjening.forEach((endring, idx) => {
            let item;
            switch(endring.arsakType){
                case "INNGAENDE":
                    item = detailRow(
                        {
                            "key": "detail-" + idx,
                            "label": t('opptjening-details-beholdning-i-starten-av-aaret'),
                            "amount": formatAmount(endring.pensjonsbeholdningBelop)
                        }
                    );
                    break;
                case "INNGAENDE_2010":
                    grunnlagTextArray.push(t('opptjening-details-okning-pga-reform-merknad'));
                    item = detailRow(
                        {
                            "key": "detail-" + idx,
                            "label": t('opptjening-details-okning-pga-reform'),
                            "amount": formatAmount(endring.endringBelop)
                        }
                    );
                    break;
                case "OPPTJENING":
                    const grunnlag = formatAmount(endring.grunnlag);
                    let label = "";
                    const uforegrad = endring.uforegrad ?  endring.uforegrad + " %" : "";
                    if(endring.grunnlagTypes.length === 1){
                        const grunnlagType = t('grunnlag:' + endring.grunnlagTypes[0] + '_TYPE');
                        label = getLabelForGrunnlagCode(endring.grunnlagTypes[0], grunnlag, t);
                        grunnlagTextArray.push(t('grunnlag:' + endring.grunnlagTypes[0] + '_DESCRIPTION', {uforegrad, year: currentYear-2}));
                        grunnlagTextArray.push(t('opptjening-details-lurer-du-paa-se-ofte-stilte-spm', {'grunnlagType': grunnlagType}));
                    } else {
                        endring.grunnlagTypes.forEach((type) => {
                            grunnlagTextArray.push(t('grunnlag:' + type + '_DESCRIPTION', {uforegrad, year: currentYear-2}));
                            grunnlagTypes.push(t('grunnlag:' + type + '_TYPE'));
                        });

                        const ogString = t('opptjening-details-og');
                        const grunnlagTypesString = grunnlagTypes.join(', ').replace(/,([^,]*)$/,' ' + ogString + '$1');
                        label = t('opptjening-details-opptjening-basert-paa-flere-ytelser', {grunnlagTypes: grunnlagTypesString, grunnlag});
                        grunnlagTextArray.push(t('opptjening-details-lurer-du-paa-se-ofte-stilte-spm', {'grunnlagType': grunnlagTypesString}));
                    }

                    if(hasOmsorgsOpptjeningTwoYearsBack && !endring.grunnlagTypes.includes("OMSORGSOPPTJENING_GRUNNLAG")){
                        grunnlagTextArray.push(t('opptjening-details-omsorgsopptjening-text', {year:currentYear-2}))
                    }

                    if(endring.uttaksgrad>0 && endring.uttaksgrad<100){
                        //GRADERT UTTAK
                        uttakTexts["gradert"] = t('opptjening-details-gradert-uttak-text');
                    } else if (endring.uttaksgrad===100){
                        //FULLT UTTAK
                        uttakTexts["fullt"] = t('opptjening-details-fullt-uttak-text');
                    }

                    item = detailRow(
                        {
                            "key": "detail-" + idx,
                            "label": label,
                            "amount": formatAmount(endring.endringBelop)
                        }
                    );
                    break;
                case "REGULERING":
                    if(endring.uttaksgrad!==100){
                        item = detailRow(
                            {
                                "key": "detail-" + idx,
                                "label": t('opptjening-details-aarlig-regulering'),
                                "amount": formatAmount(endring.endringBelop)
                            }
                        );
                    } else {
                        currentRegulering = endring.endringBelop;
                    }
                    break;
                case "UTTAK":
                    if(endring.endringBelop!==0 && Math.abs(endring.endringBelop) !== currentRegulering){
                        item = detailRow(
                            {
                                "key": "detail-" + idx,
                                "label": t('opptjening-details-uttak', {uttaksgrad: endring.uttaksgrad}),
                                "amount": formatAmount(endring.endringBelop)
                            }
                        );
                        uttakTexts["uttak"]=t('opptjening-details-uttak-text');
                    }
                    break;
                default:
                    break;
            }
            details.push(item);
        });
    }

    return {
        "detailRows": details,
        "grunnlagTexts" : getTextParagraphsFromTextArray(grunnlagTextArray, "grunnlagtext"),
        "uttakTexts": getTextParagraph(Object.values(uttakTexts).join(" "), "uttaktext")
    };
};

const getRemarksContainer = (opptjening, currentYear, t)  => {
    let remarks = [];
    if(currentYear<2010){
        remarks.push(t('remarks:PRE_2010'));
    }

    if (opptjening && opptjening.merknader) {
        opptjening.merknader.forEach((merknad) => {
            if (merknad==='REFORM'){
                remarks.push(t('remarks:'+merknad));
            }
        });
    }

    if(remarks.length>0){
        return(
            <div className="detailsBox">
                <h3>{t('opptjening-details-merknader-tittel')}</h3>
                {getTextParagraphsFromTextArray(remarks, "remarkstext")}
            </div>
        )
    } else {
        return null;
    }
};

const getExplanationTextsContainer = (grunnlagTexts, uttakTexts)  => {
    if(grunnlagTexts && grunnlagTexts.length>0){
        return (
            <div className="detailsBox">
                {uttakTexts}
                {grunnlagTexts}
            </div>
        )
    } else {
        return null;
    }
};

const getPensjonspoengContainer = (pensjonspoeng, currentYear, t) =>{
    return (
        <div className="detailsBox">
            <h3>{t('opptjening-details-pensjonspoeng-title')}</h3>
            <div  className="detailRow">
                <span className="labelColumn">{pensjonspoeng!=null ? t('opptjening-details-pensjonspoeng-label', {currentYear}) : t('opptjening-details-ingen-pensjonspoeng')}</span>
                {pensjonspoeng!=null && <span data-testid="pensjonspoengContainer-pensjonspoeng" className="numberColumn">{formatNumber(pensjonspoeng)}</span>}
                <span role="presentation" className="emptyColumn">&nbsp;</span>
            </div>
        </div>
    )
};

export const OpptjeningDetailsPanel = (props) => {
    const toggleOpen = () => {
        logToAmplitude({
            eventType: CLICK_EVENT,
            name: "Åpne panel",
            titleKey: "opptjening-details-din-okning-ar-for-ar",
            type: "EkspanderbartPanel",
            value: !apen
        });
        setApen(!apen);
    };
    const [apen, setApen] = useState(false);

    const {t} = useTranslation(['translation', 'remarks', 'grunnlag']);
    const opptjening = props.data.opptjening;
    const currentYear = props.currentYear;
    const userGroup = props.userGroup;
    const hasOmsorgsOpptjeningTwoYearsBack = props.hasOmsorgsOpptjeningTwoYearsBack;

    let {detailRows, grunnlagTexts, uttakTexts} = buildDetails(opptjening, currentYear, hasOmsorgsOpptjeningTwoYearsBack, t);
    const remarksContainer = getRemarksContainer(opptjening, currentYear, t);
    const explanationTextsContainer = getExplanationTextsContainer(grunnlagTexts, uttakTexts);
    const pensjonspoengContainer = getPensjonspoengContainer(opptjening.pensjonspoeng, currentYear, t);

    let label = "opptjening-details-din-pensjonsbeholdning";
    let key = "opptjening-details-din-pensjonsbeholdning";

    if (detailRows.length > 0) {
        key = "opptjening-details-total-pensjonsbeholdning";
        label = "opptjening-details-total-pensjonsbeholdning";
        detailRows.push(<div key="horizontalLine" className="horizontalLine"/>);
    }

    if (opptjening.pensjonsbeholdning !== null) {
        detailRows.push(
            detailRow(
                {
                    "key": key,
                    "label": t(label, {currentYear}),
                    "amount": formatAmount(opptjening.pensjonsbeholdning)
                })
        );
    } else{
        detailRows=(
            <div role="row">
                <span role="cell">{t('opptjening-details-ingen-pensjonsbeholdning',{year: currentYear-2})}</span>
            </div>
        )
    }

    const panelTitle = <PanelTitle id="opptjeningDetailsTitle" titleString={t('opptjening-details-din-okning-ar-for-ar')} illustrationClass="detailIllustration" illustration={sedler}/>;

    return(
        <EkspanderbartpanelBase tittel={panelTitle} border className="panelWrapper" apen={apen} onClick={toggleOpen}>
            <div className="yearSelectorContainer">
                <h3><Label htmlFor="yearSelector" className="label">{t('opptjening-details-velg-ar')}</Label></h3>
                <div className="selectorWrapper">
                    <YearSelector years={props.yearArray} onChange={props.onChange} currentYear={currentYear} size="s"/>
                </div>
            </div>
            <div className="detailsBox">
                <h3>{t('opptjening-details-pensjonsbeholdning-title')}</h3>
                <div key="horizontalLine" className="horizontalLine"/>
                <div role="table">
                    {detailRows}
                </div>
            </div>
            {explanationTextsContainer}
            {remarksContainer}
            {userGroup === BORN_IN_OR_BETWEEN_1954_AND_1962 && pensjonspoengContainer}
        </EkspanderbartpanelBase>
    )
};
