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
        <div role="heading" aria-level="2" className="inntektDetailTitle">
            <svg width="1.3rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="illustration">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.5 13H0.5C0.224 13 0 13.2372 0 13.5294V21.4706C0 21.7628 0.224 22 0.5 22H4.5C4.775 22 5 21.7628 5 21.4706V13.5294C5 13.2372 4.775 13 4.5 13Z" fill="#337C9B"/>
                <path d="M16.5 7C18.43 7 20 5.43 20 3.5C20 1.569 18.43 0 16.5 0C14.57 0 13 1.569 13 3.5C13 5.43 14.57 7 16.5 7Z" fill="#FFA733"/>
                <path d="M16 2.5C16 2.224 16.224 2 16.5 2C16.775 2 17 2.224 17 2.5V4.5C17 4.776 16.775 5 16.5 5C16.224 5 16 4.776 16 4.5V2.5Z" fill="#B26D14"/>
                <path d="M10.5 13C12.43 13 14 11.43 14 9.5C14 7.569 12.43 6 10.5 6C8.57 6 7 7.569 7 9.5C7 11.43 8.57 13 10.5 13Z" fill="#FFA733"/>
                <path d="M10 8.5C10 8.224 10.224 8 10.5 8C10.775 8 11 8.224 11 8.5V10.5C11 10.776 10.775 11 10.5 11C10.224 11 10 10.776 10 10.5V8.5Z" fill="#B26D14"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.6407 18.2523C10.5655 18.3716 10.6012 18.5293 10.7205 18.6046C10.7317 18.6116 10.7433 18.6178 10.7554 18.623L14 20.0252L20 17.8686C21.3608 17.4813 22.6436 16.9469 23.8493 18.1455C23.9653 18.262 24.0187 18.4276 23.9941 18.5901C23.9674 18.7536 23.8647 18.8926 23.7168 18.9661C20.8793 20.3774 18.9721 21.4616 17.5795 22.2536C15.4753 23.4502 14.4678 24 13.2898 24C12.3019 24 11.1938 23.6127 9.21372 22.8963C8.20728 22.5315 6.95435 22.0788 5.35123 21.5464C5.14172 21.4769 5 21.2818 5 21.062V14.507C5 14.2272 5.25493 14 5.56903 14H7.27612C8.82348 14 10.0116 14.4978 10.8312 15H15.5C16.3284 15 17 15.6716 17 16.5C17 17.3284 16.3284 18 15.5 18H11.0982C10.9125 18 10.7398 18.0953 10.6407 18.2523Z" fill="#FFD399"/>
            </svg>
            <div className="title">{title}</div>
        </div>
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
