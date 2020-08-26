import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import {useSelector} from "react-redux";
import {getPensjonsBeholdningArray, getYearArray, getOpptjeningByYear, getLatestPensjonsBeholdning} from "../../redux/opptjening/opptjeningSelectors";
import Panel from 'nav-frontend-paneler';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenkepanel from 'nav-frontend-lenkepanel';
import {LenkepanelBase} from 'nav-frontend-lenkepanel';
import { Select } from 'nav-frontend-skjema';
import {LineChart} from '../elements/LineChart/LineChart';
import './OpptjeningView.less';
import {Systemtittel, Undertittel} from "nav-frontend-typografi";
import {isDev} from "../../api/api";

const formatAmount = (amount) => {
    return Intl.NumberFormat('nb-NO',
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,

        }).format(Math.abs(amount));
};

const detailRow = (props) => {
    return(
        <div className="detailRow">
            <span className="labelColumn">{props.label}: </span>
            <span className="numberColumn">{props.amount}</span>
            <span className="numberColumn">&nbsp;</span>
        </div>
    )
};

const buildDetailRows = (opptjening, t)  => {
    const details = [];

    if (opptjening && opptjening.endringOpptjening) {
        opptjening.endringOpptjening.forEach((endring) => {
            let item;
            let year = (new Date(endring.dato)).getFullYear();
            if (endring.arsakType === "INNGAENDE" || endring.arsakType === "INNGAENDE_2010") {
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

const buildYearOptions = (yearArray) => {
    let optionsArray = [];
    yearArray.forEach((year) => {
            optionsArray.push(<option value={year}>{year}</option>)
        }
    );
    return optionsArray;
};

const getRemarksContainer = (opptjening, t)  => {
    let remarks = [];
    opptjening.merknader.forEach((merknad) => {
        remarks.push(<div>{t('remarks:'+merknad)}</div>)
    });

    if(remarks.length>0){
        return(
            <div>
                <div className="spacer"/>
                <div className="detailsBox">
                    <Undertittel>{t('opptjening-remarks-title')}</Undertittel>
                    {remarks}
                </div>
            </div>
        )
    } else {
        return null;
    }
};

const detailsTitle = (title, t) => {
    return(
        <div className="detailTitle">{t(title)}</div>
    )
};

export const OpptjeningView = () => {
    const { t } = useTranslation(['translation', 'remarks']);
    const yearArray = useSelector(getYearArray);
    const pensjonsBeholdningArray = useSelector(getPensjonsBeholdningArray);
    const latestPensjonsBeholdning = useSelector(getLatestPensjonsBeholdning);

    const [currentYear, setYear] = useState(latestPensjonsBeholdning.year);
    const opptjening = useSelector(state => getOpptjeningByYear(state, currentYear));
    const opptjeningTwoYearsBack = useSelector(state => getOpptjeningByYear(state, currentYear-2));

    const details = buildDetailRows(opptjening, t);
    const yearOptions = buildYearOptions(yearArray);
    const remarksContainer = getRemarksContainer(opptjening, t);

    if(details.length>0){
        details.push(<div className="horizontalLine"/>)
        details.push(
            detailRow(
                {
                    "label": t("opptjening-sum"),
                    "amount": formatAmount(opptjening.pensjonsbeholdning)
                })
        )
    } else {
        details.push(
            detailRow(
                {
                    "label": t('opptjening-your-pension-assets'),
                    "amount": formatAmount(opptjening.pensjonsbeholdning)
                })
        )

    }
    return(
        <div className="opptjeningBody">
            <Panel border>
                <div className="beholdningPanel">
                    <div className="content">
                        <div className="typo-systemtittel">{t('opptjening-your-pension-assets')}</div>
                        <div className="typo-sidetittel">{formatAmount(latestPensjonsBeholdning.beholdning)}</div>
                    </div>
                </div>
            </Panel>
            <LineChart data={{"labels": yearArray, "data":pensjonsBeholdningArray}} onclick={setYear} datasetLabel={t("opptjening-pension-assets")}/>
            <div className="contentCentered">
                <Select
                    onChange={(event) => setYear(event.target.value)}
                    value={currentYear}
                    bredde="xs"
                    className="yearSelector"
                >
                    {yearOptions}
                </Select>
            </div>
            <Ekspanderbartpanel tittel={detailsTitle("opptjening-what-happened-this-year", t)} border className="panelWrapper">
                <div className="detailsBox">
                    {details}
                </div>
                <div className="spacer"/>
                <div className="detailsBox">
                    {
                        detailRow(
                            {
                                "label": t("opptjening-income-base-from") + " " + (currentYear-2) ,
                                "amount": formatAmount(opptjeningTwoYearsBack.pensjonsgivendeInntekt)
                            })
                    }
                </div>
                {remarksContainer}
            </Ekspanderbartpanel>
            <LenkepanelBase href={process.env.PUBLIC_URL + "/faq"} border className="panelWrapper">
                <div className="faqTitle">
                    <Undertittel className="lenkepanel__heading">{t('opptjening-frequently-asked-questions')}</Undertittel>
                </div>
            </LenkepanelBase>
            {isDev() &&
                <Ekspanderbartpanel tittel="Data" className="panelWrapper">
                    <pre id="json">{JSON.stringify(opptjening, null, 4)}</pre>
                </Ekspanderbartpanel>
            }
        </div>
    )
};
