import {formatAmount} from "../../../common/utils";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { OppChevron } from 'nav-frontend-chevron';
import 'nav-frontend-tabell-style';
import "./InntektWithMerknadPanel.less"
import Lenke from "nav-frontend-lenker";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";
import {BORN_BEFORE_1943, BORN_IN_OR_BETWEEN_1943_AND_1953} from "../../../common/userGroups";
import {SKATTEETATEN} from "../../../common/externalUrls";
import handMedMynter from "../../../assets/handMedMynter.svg";
import {PanelTitle} from "../PanelTitle/PanelTitle";
import ReactMarkdown from "react-markdown";

const getTextParagraph = (text, key) =>{
    return(
        text !== null && <p key={key} data-testid={key} className="typo-normal">{text}</p>
    )
};

const getMerknadListItem = (text, key) =>{
  return(
      text!==null && <li key={key}>{text}</li>
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
    const amountTxt = amount != null ? amount : explanationText;
    const merknadArray = [];
    merknader.forEach((m, idx) => {
        merknadArray.push(getTextParagraph(getMerknadText(m, t, uforegrad), "remarkstext-" + idx))
    });

    return(
        <tr data-testid="income-row" key={key} className="row">
            <td data-testid="income-label">{year}</td>
            <td data-testid="income-amount">{amountTxt}</td>
            {userGroup === BORN_IN_OR_BETWEEN_1943_AND_1953 && <td data-testid="pensjonspoeng">{pensjonsPoeng!==null ? pensjonsPoeng.toFixed(2) : null}</td>}
            <td data-testid="remark">{merknadArray}</td>
        </tr>
    )
};

const detailListItem = (props) => {
    const {key, year, amount, explanationText, pensjonsPoeng, merknader, userGroup, t, uforegrad} = props;
    const amountTxt = amount != null ? amountListItem(amount) : explanationText;
    const merknadArray = [];

    merknader.forEach((m, idx) => {
        const merknadListItem = getMerknadListItem(getMerknadText(m, t, uforegrad), "remarkstext-" + idx);
        if(merknadListItem) {
            merknadArray.push(merknadListItem);
        }
    });

    return(
        <li className="inntektItem" key={key}>
            <ul>
                <li><b>{t('inntekt-aar') + ":"} {year}</b></li>
                <li>{t('inntekt-inntekt') + ":"} {amountTxt}</li>
                {userGroup === BORN_IN_OR_BETWEEN_1943_AND_1953 && <li>{t('inntekt-pensjonspoeng') + ":"} {pensjonsPoeng!==null ? pensjonsPoeng.toFixed(2) : null}</li>}
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

export const InntektWithMerknadPanel = (props) => {
    const [apen, setApen] = useState(false);
    const { t } = useTranslation();
    const { data, userGroup } = props;
    const {detailRows, detailListItems} = buildDetails(data, userGroup, t);
    const title = userGroup === BORN_IN_OR_BETWEEN_1943_AND_1953 || userGroup === BORN_BEFORE_1943 ? 'inntekt-pensjonsgivende-inntekter-og-pensjonspoeng' : 'inntekt-pensjonsgivende-inntekter';

    const toggleOpen = (props) => {
        logToAmplitude({eventType: CLICK_EVENT, name: "Åpne panel", titleKey: title, type: props.type, value: !apen});
        setApen(!apen);
    };

    const topOfPanel = (props) => {
        logToAmplitude({eventType: CLICK_EVENT, name: "Til toppen av panel", titleKey: title, type: props.type, value: true});
        window.location.href = "#inntektPanelTop";
    };

    const panelTitle = <PanelTitle titleString={t(title)} illustrationClass="inntektDetailIllustration" illustration={handMedMynter}/>

    return(
        <div>
            <a href="#" name="inntektPanelTop"/>
            <EkspanderbartpanelBase tittel={panelTitle} border className="panelWrapper" apen={apen} onClick={()=>toggleOpen({type: "EkspanderbartPanel"})}>
                <div data-testid="inntektContainer">
                    <div className="inntektLinkContainer">
                        <ReactMarkdown linkTarget="blank">
                            {t('inntekt-tekst', {skatteetatenLink: SKATTEETATEN})}
                        </ReactMarkdown>
                    </div>
                    <div className="inntektDetailsBox">
                        <table className="tabell inntektTabell">
                            <thead>
                                <tr className="row">
                                    <th data-testid="income-header" className="col1">{t('inntekt-aar')}</th>
                                    <th data-testid="income-header" className="col2">{t('inntekt-inntekt-kr')}</th>
                                    {userGroup === BORN_IN_OR_BETWEEN_1943_AND_1953 && <th data-testid="income-header" className="col3">{t('inntekt-pensjonspoeng')}</th>}
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
                    <button type="button" aria-label={t("inntekt-til-toppen")} className="closeButton" onClick={() => topOfPanel({type: 'Knapp'})}>
                        <div>
                            <OppChevron/>
                        </div>
                    </button>
                </div>
            </EkspanderbartpanelBase>
        </div>
    )
};
