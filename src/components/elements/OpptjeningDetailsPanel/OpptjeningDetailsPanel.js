import {formatAmount} from "../../../common/utils";
import React from "react";
import {useTranslation} from "react-i18next";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import "./OpptjeningDetailsPanel.less"
import Lenke from "nav-frontend-lenker";
import {YearSelector} from "../YearSelector/YearSelector";
import {Label} from "nav-frontend-skjema";

const detailRow = (props) => {
    return(
        <div role="row" data-testid={props.key} key={props.key} className="detailRow">
            <span role="cell" data-testid={"label-"+ props.key} className="labelColumn">{props.label}</span>
            <span role="cell" data-testid={"amount-"+ props.key} className="numberColumn">{props.amount}</span>
            <span aria-hidden="true" className="numberColumn">&nbsp;</span>
        </div>
    )
};

const getTextParagraph = (text, key) =>{
    return(
        <p key={key} className="typo-normal">{text}</p>
    )
};

const grunnlagTexts = (grunnlagTextArray, faqText) =>{
    const grunnlagTexts = grunnlagTextArray.map((txt, idx) => {
        return getTextParagraph(txt, "grunnlagtext-" + idx);
    });
    grunnlagTexts.push(getTextParagraph(faqText, "faqtext"));
    return grunnlagTexts;
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
    let faqText = "";
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
                        faqText = t('opptjening-details-lurer-du-paa-se-ofte-stilte-spm', {'grunnlagType': grunnlagType});
                    } else {
                        endring.grunnlagTypes.forEach((type) => {
                            grunnlagTextArray.push(t('grunnlag:' + type + '_DESCRIPTION', {year: currentYear-2}));
                            grunnlagTypes.push(t('grunnlag:' + type + '_TYPE'));
                        });
                        label = t('opptjening-details-opptjening-basert-paa-flere-ytelser', {grunnlagTypes: grunnlagTypes.join(', '), grunnlag});
                        faqText = t('opptjening-details-lurer-du-paa-se-ofte-stilte-spm', {'grunnlagType': grunnlagTypes.join(', ')});
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
        "grunnlagTexts" : grunnlagTexts(grunnlagTextArray, faqText)
    };
};

const detailsTitle = (title) => {
    return(
        <div role="heading" aria-level="2" className="detailTitle">{title}</div>
    )
};

const getRemarksContainer = (opptjening, t)  => {
    let remarks = [];
    if (opptjening && opptjening.merknader) {
        opptjening.merknader.forEach((merknad, idx) => {
            // Create link for OVERFOR_OMSORGSOPPTJENING merknad
            if(merknad === "OVERFORE_OMSORGSOPPTJENING"){
                remarks.push(
                    <div role="row" data-testid={"remark-row-" + idx} key={idx}>
                        <span data-testid={"remark-" + idx} role="cell">
                            <Lenke href="">{t('remarks:'+merknad)}</Lenke>
                        </span>
                    </div>
                )
            } else {
                remarks.push(<div role="row" data-testid={"remark-row-" + idx} key={idx}><span data-testid={"remark-" + idx} role="cell">{t('remarks:'+merknad)}</span></div>)
            }
        });
    }

    if(remarks.length>0){
        return(
            <div role="table" className="detailsBox">
                <h4>{t('opptjening-details-merknader-tittel')}</h4>
                {remarks}
            </div>
        )
    } else {
        return null;
    }
};

export const OpptjeningDetailsPanel = (props) => {
    const { t } = useTranslation(['translation', 'remarks', 'grunnlag']);
    const opptjening = props.data.opptjening;
    const currentYear = props.currentYear;

    const {detailRows, grunnlagTexts} = buildDetails(opptjening, currentYear, t);
    const remarksContainer = getRemarksContainer(opptjening, t);

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
        <Ekspanderbartpanel tittel={detailsTitle(t('opptjening-details-din-okning-ar-for-ar'))} border className="panelWrapper">
            <div role="table" className="detailsBox">
                <div className="yearSelectorContainer">
                    <h4><Label htmlFor="yearSelector" className="label">{t('opptjening-details-vis-pensjonsbeholdningen-for')}</Label></h4>
                    <div className="selectorWrapper">
                        <YearSelector id="yearSelector" years={props.yearArray} onChange={props.onChange} currentYear={currentYear} size="xs"/>
                    </div>
                </div>
                <div key="horizontalLine" className="horizontalLine"/>
                {detailRows}
            </div>
            <div className="detailsBox">
                {grunnlagTexts}
            </div>
            {remarksContainer}
            <div className="linkContainer">
                <Lenke href="https://www.nav.no/no/person/pensjon/alderspensjon/relatert-informasjon/beregning-av-alderspensjon">{t('opptjening-details-les-mer-om-hvordan-vi-beregner-pensjonen')}</Lenke>
            </div>
        </Ekspanderbartpanel>
    )
};
