import {formatAmount} from "../../../common/utils";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { OppChevron } from 'nav-frontend-chevron';
import 'nav-frontend-tabell-style';
import "./InntektPanel.less"

const detailRow = (props) => {
    return(
        <tr data-testid="income-row" key={props.key}>
            <td data-testid="income-label">{props.label}</td>
            <td data-testid="income-amount">{props.amount}</td>
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
                "amount": inntekt.pensjonsgivendeInntekt!==null ? formatAmount(inntekt.pensjonsgivendeInntekt) : t('opptjening-ikke-tilgjengelig-enda')
            }
        ))
    });
    return details.reverse();
};

const detailsTitle = (title) => {
    return(
        <div role="heading" aria-level="2" className="inntektDetailTitle">{title}</div>
    )
};

export const InntektPanel = (props) => {
    const toggleOpen = (apen) =>{
        setApen(!apen);
    };

    const [apen, setApen] = useState(false);
    const { t } = useTranslation();
    const inntekter = props.data.inntekter;
    const details = buildDetailRows(inntekter, t);

    return(
        <EkspanderbartpanelBase tittel={detailsTitle(t('opptjening-pensjonsgivende-inntekter'))} border className="panelWrapper" apen={apen} onClick={() => toggleOpen(apen)}>
            <div className="inntektDetailsBox">
                <table className="tabell">
                    <thead>
                        <tr>
                            <th data-testid="income-header">{t('opptjening-year')}</th>
                            <th data-testid="income-header">{t('opptjening-income')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details}
                    </tbody>
                </table>
            </div>
            <button type="button" aria-label={t("button-close")} className="closeButton" onClick={() => setApen(false)}>
                <div>
                    <OppChevron/>
                </div>
            </button>
        </EkspanderbartpanelBase>
    )
};
