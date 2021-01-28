import {formatAmount} from "../../../common/utils";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { OppChevron } from 'nav-frontend-chevron';
import 'nav-frontend-tabell-style';
import "./InntektPanel.less"
import Lenke from "nav-frontend-lenker";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";
import handMedMynter from "../../../assets/handMedMynter.svg";

const amountRow = (amount) => {
    return(
        <div className="inntektAmountRow">
            <span className="inntektKrColumn">kr</span>
            <span className="inntektNumberColumn">{amount}</span>
        </div>
    )
};

const detailRow = (props) => {
    const {key, label, amount, explanationText} = props;
    const amountTxt = amount != null ? amountRow(amount) : explanationText;
    return(
        <tr data-testid="income-row" key={key} className="row">
            <td data-testid="income-label">{label}</td>
            <td data-testid="income-amount">{amountTxt}</td>
        </tr>
    )
};
const buildDetailRows = (inntekter, t)  => {
    const details = [];
    inntekter.forEach((inntekt, idx) => {
        details.push(detailRow(
            {
                "key": idx,
                "label": inntekt.year,
                "amount": inntekt.pensjonsgivendeInntekt!==null ? formatAmount(inntekt.pensjonsgivendeInntekt) : null,
                "explanationText": t('opptjening-opplysningen-vil-komme-pa-et-senere-tidspunkt')
            }
        ))
    });
    return details.reverse();
};

const detailsTitle = (title) => {
    return(
        <div role="heading" aria-level="2" className="inntektDetailTitle">
            <img src={handMedMynter} className="illustration" alt=""/>
            <div id="inntektTitle" className="title">{title}</div>
        </div>
    )
};

export const InntektPanel = (props) => {
    const toggleOpen = (props) => {
        logToAmplitude({eventType: CLICK_EVENT, name: "Åpne panel", titleKey: "inntekt-pensjonsgivende-inntekter", type: props.type, value: !apen});
        setApen(!apen);
    };

    const [apen, setApen] = useState(false);
    const { t } = useTranslation();
    const inntekter = props.data.inntekter;
    const details = buildDetailRows(inntekter, t);

    return(
        <EkspanderbartpanelBase tittel={detailsTitle(t('inntekt-pensjonsgivende-inntekter'))} border className="panelWrapper" apen={apen} onClick={()=>toggleOpen({type: "EkspanderbartPanel"})}>
            <div data-testid="inntektContainer">
                <div className="inntektLinkContainer">
                    <Lenke href="https://www.skatteetaten.no/person/skatt/skattemelding/skattemelding-for-person/">{t('opptjening-inntekt-link-to-skatteetaten')}</Lenke>
                </div>
                <div className="inntektDetailsBox">
                    <table className="tabell">
                        <thead>
                        <tr className="row">
                            <th data-testid="income-header" className="column1">{t('inntekt-aar')}</th>
                            <th data-testid="income-header" className="column2">{t('inntekt-inntekt')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {details}
                        </tbody>
                    </table>
                </div>
                <button type="button" aria-label={t("inntekt-lukk-panel")} className="closeButton" onClick={() => toggleOpen({type: 'Knapp'})}>
                    <div>
                        <OppChevron/>
                    </div>
                </button>
            </div>
        </EkspanderbartpanelBase>
    )
};
