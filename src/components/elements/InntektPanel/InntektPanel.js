import {formatAmount, getLabelByLanguage} from "../../../common/utils";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { OppChevron } from 'nav-frontend-chevron';
import 'nav-frontend-tabell-style';
import "./InntektPanel.less"
import Lenke from "nav-frontend-lenker";
import {amplitudeLogger, CLICK_EVENT} from "../../../common/amplitude";

const detailRow = (props) => {
    return(
        <tr data-testid="income-row" key={props.key} className="row">
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
                "amount": inntekt.pensjonsgivendeInntekt!==null ? formatAmount(inntekt.pensjonsgivendeInntekt) : t('opptjening-opplysningen-vil-komme-pa-et-senere-tidspunkt')
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
    const toggleOpen = (props) => {
        const componentTitle = getLabelByLanguage("nb-NO", "opptjening-pensjonsgivende-inntekter");
        if(props === 'button'){
            amplitudeLogger(CLICK_EVENT, {"component": componentTitle, "type": "Knapp", "name":"Lukk panel", "value": apen});
        } else {
            amplitudeLogger(CLICK_EVENT, {"component": componentTitle, "type": "EkspanderbartPanel", "name": "Åpne panel", "value": !apen});
        }

        setApen(!apen);
    };

    const [apen, setApen] = useState(false);
    const { t } = useTranslation();
    const inntekter = props.data.inntekter;
    const details = buildDetailRows(inntekter, t);

    return(
        <EkspanderbartpanelBase tittel={detailsTitle(t('opptjening-pensjonsgivende-inntekter'))} border className="panelWrapper" apen={apen} onClick={toggleOpen}>
            <div data-testid="inntektContainer">
                <div className="inntektLinkContainer">
                    <Lenke href="https://www.skatteetaten.no/person/skatt/skattemelding/skattemelding-for-person/">{t('opptjening-inntekt-link-to-skatteetaten')}</Lenke>
                </div>
                <div className="inntektDetailsBox">
                    <table className="tabell">
                        <thead>
                            <tr className="row">
                                <th data-testid="income-header" className="column1">{t('opptjening-aar')}</th>
                                <th data-testid="income-header" className="column2">{t('opptjening-inntekt')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details}
                        </tbody>
                    </table>
                </div>
                <button type="button" aria-label={t("inntekt-lukk-panel")} className="closeButton" onClick={() => toggleOpen('button')}>
                    <div>
                        <OppChevron/>
                    </div>
                </button>
            </div>
        </EkspanderbartpanelBase>
    )
};
