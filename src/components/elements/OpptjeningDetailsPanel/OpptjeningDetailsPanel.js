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
const buildDetailRows = (opptjening, currentYear, t)  => {
    const details = [];
    if (opptjening && opptjening.endringOpptjening) {
        opptjening.endringOpptjening.forEach((endring, idx) => {
            let item;
            if (endring.arsakType === "INNGAENDE") {
                item = detailRow(
                    {
                        "key": "detail-" + idx,
                        "label": t("opptjening-assets", {year: currentYear-1}),
                        "amount": formatAmount(endring.pensjonsbeholdningBelop)
                    }
                )
            } else if (endring.arsakType === "INNGAENDE_2010"){
                item = detailRow(
                    {
                        "key": "detail-" + idx,
                        "label": t("opptjening-okning-reform"),
                        "amount": formatAmount(endring.endringBelop)
                    }
                )
            } else if (endring.arsakType === "OPPTJENING") {
                item = detailRow(
                    {
                        "key": "detail-" + idx,
                        "label": t("opptjening-earnings", {year: currentYear-2}),
                        "amount": formatAmount(endring.endringBelop)
                    }
                )
            } else if (endring.arsakType === "REGULERING") {
                item = detailRow(
                    {
                        "key": "detail-" + idx,
                        "label": t("opptjening-regulation"),
                        "amount": formatAmount(endring.endringBelop)
                    }
                )
            } else if (endring.arsakType === "UTTAK") {
                item = detailRow(
                    {
                        "key": "detail-" + idx,
                        "label": t("opptjening-withdrawal"),
                        "amount": formatAmount(endring.endringBelop)
                    }
                )
            }
            details.push(item);
        });
    }
    return details;
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
                <h4>{t('opptjening-remarks-title')}</h4>
                {remarks}
            </div>
        )
    } else {
        return null;
    }
};

export const OpptjeningDetailsPanel = (props) => {
    const { t } = useTranslation(['translation', 'remarks']);
    const opptjening = props.data.opptjening;
    const opptjeningTwoYearsBack = props.data.opptjeningTwoYearsBack;
    const currentYear = props.currentYear;

    const details = buildDetailRows(opptjening, currentYear, t);
    const remarksContainer = getRemarksContainer(opptjening, t);

    let label = "opptjening-your-pension-assets";
    let key = "opptjening-your-pension-assets";
    if(details.length>0){
        key = "opptjening-sum";
        label = "opptjening-sum";
        details.push(<div key="horizontalLine" className="horizontalLine"/>);
    }
    details.push(
        detailRow(
            {
                "key": key,
                "label": t(label, {currentYear}),
                "amount": formatAmount(opptjening.pensjonsbeholdning)
            })
    );

    return(
        <Ekspanderbartpanel tittel={detailsTitle(t('opptjening-increase-for-year'))} border apen className="panelWrapper">
            <div role="table" className="detailsBox">
                <div className="yearSelectorContainer">
                    <Label htmlFor="yearSelector" className="label">Velg år for å vise økningen</Label>
                    <div className="selectorWrapper">
                        <YearSelector id="yearSelector" years={props.yearArray} onChange={props.onChange} currentYear={currentYear} size="xs"/>
                    </div>
                </div>
                <h4>{t('opptjening-pension-assets-for-year', {currentYear})}</h4>
                <div key="horizontalLine" className="horizontalLine"/>
                {details}
            </div>
            {opptjeningTwoYearsBack && currentYear>=2010 &&
                <div role="table" className="detailsBox">
                    {
                        detailRow(
                            {
                                "key": "incomeBase",
                                "label": t("opptjening-income-base-from", {twoYearsback: (currentYear - 2)}),
                                "amount": formatAmount(opptjeningTwoYearsBack.pensjonsgivendeInntekt)
                            })
                    }
                </div>
            }
            {remarksContainer}
            <div className="linkContainer">
                <Lenke href="https://www.nav.no/no/person/pensjon/alderspensjon/relatert-informasjon/beregning-av-alderspensjon">{t('opptjening-read-about-pension-calculation')}</Lenke>
            </div>
        </Ekspanderbartpanel>
    )
};
