import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import {useSelector} from "react-redux";
import {getPensjonsBeholdningArray, getYearArray, getOpptjeningByYear, getLatestPensjonsBeholdning} from "../../redux/opptjening/opptjeningSelectors";
import Panel from 'nav-frontend-paneler';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import {LineChart} from '../elements/LineChart/LineChart';
import './OpptjeningView.less';

const formatAmount = (amount, includeSign=true) => {
    let sign = "+";
    if(amount < 0){
        sign = "-"
    }
    const formattedAmount = new Intl.NumberFormat('no-NB',
        {
            style: 'currency',
            currency: 'NOK' ,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(Math.abs(amount));
    return includeSign ? sign + " " + formattedAmount : formattedAmount;
};

const detailRow = (props) => {
    return(
        <div className="detailRow">
            <span className="detailColumn">{props.label}: </span>
            <span className="detailColumn">{props.amount}</span>
        </div>
    )
};

const buildDetailRows = (opptjening, t)  => {
    const details = [];

    if (opptjening && opptjening.endringOpptjening) {
        opptjening.endringOpptjening.forEach((endring) => {
            let item;
            let year = (new Date(endring.dato)).getFullYear();
            if (endring.arsakType === "INNGAENDE") {
                item = detailRow(
                    {
                        "label": t("opptjening-assets-from") + " " + year,
                        "amount": formatAmount(endring.pensjonsbeholdningBelop)
                    }
                )
            } else if (endring.arsakType === "OPPTJENING") {
                item = detailRow(
                    {
                        "label": t("opptjening-earnings-from") + " " + (year - 2),
                        "amount": formatAmount(endring.endringBelop)
                    }
                )
            } else if (endring.arsakType === "REGULERING") {
                item = detailRow(
                    {
                        "label": t("opptjening-regulation") + " " + year,
                        "amount": formatAmount(endring.endringBelop)
                    }
                )
            } else if (endring.arsakType === "UTTAK") {
                item = detailRow(
                    {
                        "label": t("opptjening-withdrawal") + " " + year,
                        "amount": formatAmount(endring.endringBelop)
                    }
                )
            }
            details.push(item);
        });
    }
    return details;
};

export const OpptjeningView = () => {
    const { t } = useTranslation();
    const yearArray = useSelector(getYearArray);
    const pensjonsBeholdningArray = useSelector(getPensjonsBeholdningArray);
    const latestPensjonsBeholdning = useSelector(getLatestPensjonsBeholdning);

    const [currentYear, setYear] = useState(latestPensjonsBeholdning.year);
    const opptjening = useSelector(state => getOpptjeningByYear(state, currentYear));

    const details = buildDetailRows(opptjening, t);

    return(
        <div className="opptjeningBody">
            <Panel border>
                <div className="beholdningPanel">
                    <div className="content">
                        {t('opptjening-your-pension-assets')}
                        <h1 className="typo-systemtittel">{latestPensjonsBeholdning.beholdning}</h1>
                    </div>
                </div>
            </Panel>
            <LineChart data={{"labels": yearArray, "data":pensjonsBeholdningArray}} onclick={setYear} datasetLabel={t("opptjening-pension-assets")}/>
            <div className="contentCentered">
                <h2>{currentYear}</h2>
            </div>
            <Ekspanderbartpanel tittel={t("opptjening-what-happened-this-year")} border className="panelWrapper">
                <div className="detailsBox">
                    {details}
                    <div className="horizontalLine"/>
                    {
                        detailRow(
                        {
                            "label": t("opptjening-sum"),
                            "amount": formatAmount(opptjening.pensjonsbeholdning, false)
                        })
                    }
                </div>
            </Ekspanderbartpanel>
            <Ekspanderbartpanel tittel="Data" className="panelWrapper">
                <pre id="json">{JSON.stringify(opptjening, null, 4)}</pre>
            </Ekspanderbartpanel>
        </div>
    )
};
