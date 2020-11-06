import {formatAmount, getLabelByLanguage} from "../../../common/utils";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {EkspanderbartpanelBase} from "nav-frontend-ekspanderbartpanel";
import "./OpptjeningDetailsPanel.less"
import Lenke from "nav-frontend-lenker";
import {YearSelector} from "../YearSelector/YearSelector";
import {Label} from "nav-frontend-skjema";
import {amplitudeLogger, CLICK_EVENT} from "../../../common/amplitude";

const detailRow = (props) => {
    return(
        <div role="row" data-testid={props.key} key={props.key} className="detailRow">
            <span role="cell" data-testid={"label-"+ props.key} className="labelColumn">{props.label}</span>
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
                    if(endring.grunnlagTypes.length === 1){
                        const grunnlagType = t('grunnlag:' + endring.grunnlagTypes[0] + '_TYPE');
                        label = getLabelForGrunnlagCode(endring.grunnlagTypes[0], grunnlag, t);
                        grunnlagTextArray.push(t('grunnlag:' + endring.grunnlagTypes[0] + '_DESCRIPTION', {year: currentYear-2}));
                        grunnlagTextArray.push(t('opptjening-details-lurer-du-paa-se-ofte-stilte-spm', {'grunnlagType': grunnlagType}));
                    } else {
                        endring.grunnlagTypes.forEach((type) => {
                            grunnlagTextArray.push(t('grunnlag:' + type + '_DESCRIPTION', {maksUforegrad: opptjening.maksUforegrad + "%", year: currentYear-2}));
                            grunnlagTypes.push(t('grunnlag:' + type + '_TYPE'));
                        });

                        const ogString = t('opptjening-details-og');
                        label = t('opptjening-details-opptjening-basert-paa-flere-ytelser', {grunnlagTypes: grunnlagTypes.join(', ').replace(/,([^,]*)$/,' ' + ogString + '$1'), grunnlag});
                        grunnlagTextArray.push(t('opptjening-details-lurer-du-paa-se-ofte-stilte-spm', {'grunnlagType': grunnlagTypes.join(', ')}));
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
            <svg width="1.2rem" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="illustration">
                <path d="M1.56614 10.7656L27 5V24.3821L2.43386 29.951C1.35559 30.1954 0.287241 29.5019 0.0476259 28.4019C0.0159704 28.2566 0 28.1082 0 27.9593L0 12.7573C0 11.801 0.651064 10.9731 1.56614 10.7656Z" fill="#3E3832"/>
                <path d="M18 6C19.6569 6 21 4.65685 21 3C21 1.34315 19.6569 0 18 0C16.3431 0 15 1.34315 15 3C15 4.65685 16.3431 6 18 6Z" fill="#E7E9E9"/>
                <path d="M26 8C27.6569 8 29 6.65685 29 5C29 3.34315 27.6569 2 26 2C24.3431 2 23 3.34315 23 5C23 6.65685 24.3431 8 26 8Z" fill="#E7E9E9"/>
                <rect x="6" y="5" width="24" height="13" fill="#E3B0A8"/>
                <rect x="25" y="5" width="3" height="13" fill="#F1D8D4"/>
                <rect x="5" y="6" width="24" height="13" fill="#C2EAF7"/>
                <rect x="24" y="6" width="3" height="13" fill="#E0F5FB"/>
                <rect x="4" y="7" width="24" height="13" fill="#9BD0B0"/>
                <rect x="23" y="7" width="3" height="13" fill="#CDE7D8"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7 12.9341V9.06856H7.60472L9.9446 12.1035V9.06856H10.5098V12.9341H9.9051L7.56522 9.89651V12.9341H7ZM11.3212 11.0514C11.3212 10.4098 11.5197 9.90749 11.9168 9.5445C12.3139 9.1815 12.8264 9 13.4544 9C13.8657 9 14.2364 9.08526 14.5666 9.25577C14.8968 9.42628 15.1486 9.66403 15.3218 9.96902C15.495 10.274 15.5816 10.6199 15.5816 11.0066C15.5816 11.3986 15.4904 11.7493 15.3081 12.0587C15.1258 12.3681 14.8675 12.6023 14.5332 12.7614C14.1989 12.9205 13.8383 13 13.4514 13C13.032 13 12.6572 12.9121 12.327 12.7363C11.9968 12.5605 11.7466 12.3206 11.5764 12.0165C11.4063 11.7124 11.3212 11.3907 11.3212 11.0514ZM11.9289 11.0593C11.9289 11.5252 12.0733 11.8921 12.362 12.1602C12.6507 12.4283 13.0128 12.5623 13.4483 12.5623C13.892 12.5623 14.2572 12.4269 14.5438 12.1562C14.8305 11.8855 14.9738 11.5014 14.9738 11.004C14.9738 10.6893 14.9125 10.4146 14.79 10.18C14.6674 9.94529 14.4881 9.76335 14.2521 9.63415C14.0161 9.50494 13.7512 9.44034 13.4575 9.44034C13.0401 9.44034 12.681 9.56471 12.3802 9.81345C12.0794 10.0622 11.9289 10.4775 11.9289 11.0593ZM16.317 12.9341V9.06856H16.9065V10.9855L19.1187 9.06856H19.918L18.0491 10.6348L20 12.9341H19.2221L17.6358 10.9776L16.9065 11.5946V12.9341H16.317Z" fill="#117938"/>
                <path d="M2.06897 13H30V32H2.06897C0.926307 32 0 31.1046 0 30V15C0 13.8954 0.926307 13 2.06897 13Z" fill="#59514B"/>
                <rect x="23" y="21" width="7" height="4" rx="2" fill="#E7E9E9"/>
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
        opptjening.merknader.forEach((merknad, idx) => {
            // Create link for OVERFOR_OMSORGSOPPTJENING merknad
            if(merknad === "OVERFORE_OMSORGSOPPTJENING") {
                remarks.push(<Lenke href="">{t('remarks:' + merknad)}</Lenke>)
            } else if (merknad === "UFOREGRAD") {
                // Do not show merknad, already explained in grunnlag
            } else {
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

export const OpptjeningDetailsPanel = (props) => {
    const toggleOpen = () => {
        const componentTitle = getLabelByLanguage("nb-NO", "opptjening-details-din-okning-ar-for-ar");
        amplitudeLogger(CLICK_EVENT, {"component": componentTitle, "type": "EkspanderbartPanel", "name": "Åpne panel", "value": !apen});
        setApen(!apen);
    };
    const [apen, setApen] = useState(false);

    const { t } = useTranslation(['translation', 'remarks', 'grunnlag']);
    const opptjening = props.data.opptjening;
    const currentYear = props.currentYear;

    const {detailRows, grunnlagTexts} = buildDetails(opptjening, currentYear, t);
    const remarksContainer = getRemarksContainer(opptjening, currentYear, t);
    const grunnlagTextsContainer = getGrunnlagTextsContainer(grunnlagTexts);

    let label = "opptjening-details-din-pensjonsbeholdning";
    let key = "opptjening-details-din-pensjonsbeholdning";
    if(detailRows.length>0){
        key = "opptjening-details-total-pensjonsbeholdning";
        label = "opptjening-details-total-pensjonsbeholdning";
        detailRows.push(<div key="horizontalLine" className="horizontalLine"/>);
    }

    detailRows.push(
        detailRow(
            {
                "key": key,
                "label": t(label, {currentYear}),
                "amount": formatAmount(opptjening.pensjonsbeholdning)
            })
    );

    return(
        <EkspanderbartpanelBase tittel={detailsTitle(t('opptjening-details-din-okning-ar-for-ar'))} border className="panelWrapper" apen={apen} onClick={toggleOpen}>
            <div className="detailsBox">
                <div className="yearSelectorContainer">
                    <h3><Label htmlFor="yearSelector" className="label">{t('opptjening-details-vis-pensjonsbeholdningen-for')}</Label></h3>
                    <div className="selectorWrapper">
                        <YearSelector id="yearSelector" years={props.yearArray} onChange={props.onChange} currentYear={currentYear} size="s"/>
                    </div>
                </div>
                <div key="horizontalLine" className="horizontalLine"/>
                <div role="table">
                    {detailRows}
                </div>
            </div>
            {grunnlagTextsContainer}
            {remarksContainer}
        </EkspanderbartpanelBase>
    )
};
