import {formatAmount} from "../../../common/utils";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { OppChevron } from 'nav-frontend-chevron';
import 'nav-frontend-tabell-style';
import "./InntektWithMerknadPanel.less"
import Lenke from "nav-frontend-lenker";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";
import {BORN_BEFORE_1943, BORN_BETWEEN_1943_AND_1954} from "../../../common/userGroups";

const getTextParagraph = (text, key) =>{
    return(
        text !== null && <p key={key} data-testid={key} className="typo-normal">{text}</p>
    )
};

const getMerknadListItem = (text, key) =>{
  return(
      <li key={key}>{text}</li>
  )
};

const amountRow = (amount) => {
    return(
        <div className="inntektAmountRow">
            <span className="inntektKrColumn">kr</span>
            <span className="inntektNumberColumn">{amount}</span>
        </div>
    )
};

const amountListItem = (amount) => {
    return(<span>kr {amount}</span>)
};

const getMerknadText = (merknad, t, uforegrad) =>{
    const overforeUrl = process.env.REACT_APP_OVERFORE_OMSORGSOPPTJENING_URL ? process.env.REACT_APP_OVERFORE_OMSORGSOPPTJENING_URL : "";
    let merknadText = t("remarks:" + merknad, {maxUforegrad: uforegrad})
    if(merknad==='OVERFORE_OMSORGSOPPTJENING'){
        merknadText = <Lenke href={overforeUrl}>{merknadText}</Lenke>
    }
    if(merknad==='REFORM'){
        return null
    }
    return merknadText
}

const detailRow = (props) => {
    const {key, year, amount, explanationText, pensjonsPoeng, merknader, userGroup, t, uforegrad} = props;
    const amountTxt = amount != null ? amountRow(amount) : explanationText;
    const merknadArray = [];
    merknader.forEach((m, idx) => {
        merknadArray.push(getTextParagraph(getMerknadText(m, t, uforegrad), "remarkstext-" + idx))
    });

    return(
        <tr data-testid="income-row" key={key} className="row">
            <td data-testid="income-label">{year}</td>
            <td data-testid="income-amount">{amountTxt}</td>
            {userGroup === BORN_BETWEEN_1943_AND_1954 && <td data-testid="pensjonspoeng">{pensjonsPoeng!==null ? pensjonsPoeng.toFixed(2) : null}</td>}
            <td data-testid="remark">{merknadArray}</td>
        </tr>
    )
};

const detailListItem = (props) => {
    const {key, year, amount, explanationText, pensjonsPoeng, merknader, userGroup, t, uforegrad} = props;
    const amountTxt = amount != null ? amountListItem(amount) : explanationText;
    const merknadArray = [];

    merknader.forEach((m, idx) => {
        merknadArray.push(getMerknadListItem(getMerknadText(m, t, uforegrad), "remarkstext-" + idx))
    });

    return(
        <li className="inntektItem" key={key}>
            <ul>
                <li><b>{t('inntekt-aar') + ":"} {year}</b></li>
                <li>{t('inntekt-inntekt') + ":"} {amountTxt}</li>
                {userGroup === BORN_BETWEEN_1943_AND_1954 && <li>{t('inntekt-pensjonspoeng') + ":"} {pensjonsPoeng!==null ? pensjonsPoeng.toFixed(2) : null}</li>}
                {merknadArray.length > 0 && <li className="listItemMerknad">{t('inntekt-merknader') + ":"} <ul>{merknadArray}</ul></li>}
            </ul>
        </li>
    )
}

const buildDetails = (opptjeningData, userGroup, t)  => {
    const detailRows = [];
    const detailListItems = [];
    Object.keys(opptjeningData).forEach((year, idx) => {
        const detailProps = {
            "key": idx,
            "year": year,
            "amount": opptjeningData[year].pensjonsgivendeInntekt!==null ? formatAmount(opptjeningData[year].pensjonsgivendeInntekt) : null,
            "explanationText": t('opptjening-opplysningen-vil-komme-pa-et-senere-tidspunkt'),
            "pensjonsPoeng": opptjeningData[year].pensjonspoeng,
            "merknader": opptjeningData[year].merknader,
            "userGroup": userGroup,
            "t": t,
            "uforegrad":opptjeningData[year].maksUforegrad
        };

        detailRows.push(detailRow(detailProps));
        detailListItems.push(detailListItem(detailProps));
    });

    return {detailRows: detailRows.reverse(), detailListItems: detailListItems.reverse()};
};

const detailsTitle = (title) => {
    return(
        <div role="heading" aria-level="2" className="inntektDetailTitle">
            <svg width="1.3rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" className="illustration">
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

export const InntektWithMerknadPanel = (props) => {
    const [apen, setApen] = useState(false);
    const { t } = useTranslation();
    const { data, userGroup } = props;
    const {detailRows, detailListItems} = buildDetails(data, userGroup, t);
    const title = userGroup === BORN_BETWEEN_1943_AND_1954 || userGroup === BORN_BEFORE_1943 ? 'inntekt-pensjonsgivende-inntekter-og-pensjonspoeng' : 'inntekt-pensjonsgivende-inntekter';

    const toggleOpen = (props) => {
        logToAmplitude({eventType: CLICK_EVENT, name: "Åpne panel", titleKey: title, type: props.type, value: !apen});
        setApen(!apen);
    };

    return(
        <EkspanderbartpanelBase tittel={detailsTitle(t(title))} border className="panelWrapper" apen={apen} onClick={()=>toggleOpen({type: "EkspanderbartPanel"})}>
            <div data-testid="inntektContainer">
                <div className="inntektLinkContainer">
                    <Lenke href="https://www.skatteetaten.no/person/skatt/skattemelding/skattemelding-for-person/">{t('opptjening-inntekt-link-to-skatteetaten')}</Lenke>
                </div>
                <div className="inntektDetailsBox">
                    <table className="tabell inntektTabell">
                        <thead>
                            <tr className="row">
                                <th data-testid="income-header" className="col1">{t('inntekt-aar')}</th>
                                <th data-testid="income-header" className="col2">{t('inntekt-inntekt')}</th>
                                {userGroup === BORN_BETWEEN_1943_AND_1954 && <th data-testid="income-header" className="col3">{t('inntekt-pensjonspoeng')}</th>}
                                <th data-testid="income-header" className="col4">{t('inntekt-merknad')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailRows}
                        </tbody>
                    </table>
                    <ul className="inntektList">
                        {detailListItems}
                    </ul>
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
