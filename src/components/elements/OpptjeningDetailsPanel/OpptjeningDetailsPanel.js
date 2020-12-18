import {formatAmount} from "../../../common/utils";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {EkspanderbartpanelBase} from "nav-frontend-ekspanderbartpanel";
import "./OpptjeningDetailsPanel.less"
import {YearSelector} from "../YearSelector/YearSelector";
import {Label} from "nav-frontend-skjema";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";
import {BORN_IN_OR_BETWEEN_1954_AND_1962} from "../../../common/userGroups";

const detailRow = (props) => {
    return(
        <div role="row" data-testid={props.key} key={props.key} className="detailRow">
            <span role="cell" data-testid={"label-"+ props.key} className="labelColumn">{props.label}</span>
            <span role="cell" data-testid={"kr-"+ props.key} className="krColumn">kr</span>
            <span role="cell" data-testid={"amount-"+ props.key} className="numberColumn">{props.amount}</span>
            <span aria-hidden="true" className="emptyColumn">&nbsp;</span>
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

const buildDetails = (opptjening, currentYear, t)  => {
    let details = [];
    let grunnlagTextArray = [];
    let grunnlagTypes = [];
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
                    const uforegrad = endring.uforegrad ?  endring.uforegrad + "%" : "";
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

                    item = detailRow(
                        {
                            "key": "detail-" + idx,
                            "label": label,
                            "amount": formatAmount(endring.endringBelop)
                        }
                    );
                    break;
                case "REGULERING":
                    item = detailRow(
                        {
                            "key": "detail-" + idx,
                            "label": t('opptjening-details-aarlig-regulering'),
                            "amount": formatAmount(endring.endringBelop)
                        }
                    );
                    break;
                case "UTTAK":
                    item = detailRow(
                        {
                            "key": "detail-" + idx,
                            "label": t('opptjening-details-uttak'),
                            "amount": formatAmount(endring.endringBelop)
                        }
                    );
                    break;
                default:
                    break;
            }
            details.push(item);
        });
    }
    return {
        "detailRows": details,
        "grunnlagTexts" : getTextParagraphsFromTextArray(grunnlagTextArray, "grunnlagtext")
    };
};

const detailsTitle = (title) => {
    return(
        <div id="opptjeningDetailsTitle" role="heading" aria-level="2" className="detailTitle">
            <svg viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="illustration">
                <rect x="2" width="24" height="13" fill="#E3B0A8"/>
                <rect x="21" width="3" height="13" fill="#F1D8D4"/>
                <rect x="1" y="1" width="24" height="13" fill="#C2EAF7"/>
                <rect x="20" y="1" width="3" height="13" fill="#E0F5FB"/>
                <rect y="2" width="24" height="13" fill="#9BD0B0"/>
                <rect x="19" y="2" width="3" height="13" fill="#CDE7D8"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M3 7.93408V4.06856H3.60472L5.9446 7.10349V4.06856H6.50982V7.93408H5.9051L3.56522 4.89651V7.93408H3ZM7.32118 6.05142C7.32118 5.4098 7.51971 4.90749 7.91678 4.5445C8.31386 4.1815 8.8264 4 9.45442 4C9.86567 4 10.2364 4.08526 10.5666 4.25577C10.8968 4.42628 11.1486 4.66403 11.3218 4.96902C11.495 5.27401 11.5816 5.61986 11.5816 6.00659C11.5816 6.3986 11.4904 6.74928 11.3081 7.05867C11.1258 7.36805 10.8675 7.60228 10.5332 7.76137C10.1989 7.92046 9.83832 8 9.45138 8C9.03202 8 8.65724 7.91211 8.32702 7.73632C7.9968 7.56054 7.74661 7.32059 7.57644 7.01648C7.40626 6.71237 7.32118 6.39069 7.32118 6.05142ZM7.92894 6.05933C7.92894 6.52516 8.07328 6.89211 8.36197 7.16018C8.65066 7.42826 9.01278 7.56229 9.44834 7.56229C9.89201 7.56229 10.2572 7.42694 10.5438 7.15623C10.8305 6.88552 10.9738 6.50143 10.9738 6.00396C10.9738 5.6893 10.9125 5.41464 10.79 5.17996C10.6674 4.94529 10.4881 4.76335 10.2521 4.63415C10.0161 4.50494 9.75121 4.44034 9.45746 4.44034C9.04013 4.44034 8.68104 4.56471 8.3802 4.81345C8.07936 5.06219 7.92894 5.47747 7.92894 6.05933ZM12.317 7.93408V4.06856H12.9065V5.9855L15.1187 4.06856H15.918L14.0491 5.63481L16 7.93408H15.2221L13.6358 5.97759L12.9065 6.59459V7.93408H12.317Z" fill="#117938"/>
                <path d="M5 20C7.20914 20 9 18.2091 9 16C9 13.7909 7.20914 12 5 12C2.79086 12 1 13.7909 1 16C1 18.2091 2.79086 20 5 20Z" fill="#FFD399"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8 17C8 18.6569 9.34315 20 11 20C12.6569 20 14 18.6569 14 17C14 15.3431 12.6569 14 11 14C9.34315 14 8 15.3431 8 17ZM12 17C12 17.5523 11.5523 18 11 18C10.4477 18 10 17.5523 10 17C10 16.4477 10.4477 16 11 16C11.5523 16 12 16.4477 12 17Z" fill="#E7E9E9"/>
            </svg>
            <div className="title">{title}</div>
        </div>
    )
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

const getGrunnlagTextsContainer = (grunnlagTexts)  => {
    if(grunnlagTexts && grunnlagTexts.length>0){
        return (
            <div className="detailsBox">
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
                <span className="labelColumn">{t('opptjening-details-pensjonspoeng-label', {currentYear})}</span>
                <span data-testid="pensjonspoengContainer-pensjonspoeng" className="numberColumn">{pensjonspoeng.toFixed(2)}</span>
                <span aria-hidden="true" className="emptyColumn">&nbsp;</span>
            </div>
        </div>
    )
}

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

    let {detailRows, grunnlagTexts} = buildDetails(opptjening, currentYear, t);
    const remarksContainer = getRemarksContainer(opptjening, currentYear, t);
    const grunnlagTextsContainer = getGrunnlagTextsContainer(grunnlagTexts);
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

    return(
        <EkspanderbartpanelBase tittel={detailsTitle(t('opptjening-details-din-okning-ar-for-ar'))} border className="panelWrapper" apen={apen} onClick={toggleOpen}>
            <div className="yearSelectorContainer">
                <h3><Label htmlFor="yearSelector" className="label">{t('opptjening-details-velg-ar')}</Label></h3>
                <div className="selectorWrapper">
                    <YearSelector id="yearSelector" years={props.yearArray} onChange={props.onChange} currentYear={currentYear} size="s"/>
                </div>
            </div>
            <div className="detailsBox">
                <h3>{t('opptjening-details-pensjonsbeholdning-title')}</h3>
                <div key="horizontalLine" className="horizontalLine"/>
                <div role="table">
                    {detailRows}
                </div>
            </div>
            {grunnlagTextsContainer}
            {remarksContainer}
            {userGroup === BORN_IN_OR_BETWEEN_1954_AND_1962 && pensjonspoengContainer}
        </EkspanderbartpanelBase>
    )
};
