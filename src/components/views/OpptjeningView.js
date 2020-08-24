import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import {useSelector} from "react-redux";
import {getPensjonsBeholdningArray, getYearArray, getOpptjeningByYear, getLatestPensjonsBeholdning} from "../../redux/opptjening/opptjeningSelectors";
import Panel from 'nav-frontend-paneler';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import {LineChart} from '../elements/LineChart/LineChart';
import './OpptjeningView.less';

const detailRow = (props) => {
    const amount = new Intl.NumberFormat('no-NB',
        {
            style: 'currency',
            currency: 'NOK' ,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(props.belop);

    return(
        <div>{props.label} {props.year}: {amount}</div>
    )
};

export const OpptjeningView = () => {
    const { t } = useTranslation();
    const yearArray = useSelector(getYearArray);
    const pensjonsBeholdningArray = useSelector(getPensjonsBeholdningArray);
    const latestPensjonsBeholdning = useSelector(getLatestPensjonsBeholdning);

    const [currentYear, setYear] = useState(latestPensjonsBeholdning.year);
    const opptjening = useSelector(state => getOpptjeningByYear(state, currentYear));

    const details = [];

    if(opptjening && opptjening.endringOpptjening){
        opptjening.endringOpptjening.forEach((endring) => {
            let item;
            if(endring.arsakType === "INNGAENDE"){
                item = detailRow(
                    {
                        "label": "Beholdning fra",
                        "year": (new Date(endring.dato)).getFullYear(),
                        "belop": endring.pensjonsbeholdningBelop
                    }
                )
            } else if(endring.arsakType === "OPPTJENING"){
                item = detailRow(
                    {
                        "label": "Opptjening fra",
                        "year": (new Date(endring.dato)).getFullYear() - 2,
                        "belop": endring.endringBelop
                    }
                )
            } else if(endring.arsakType === "REGULERING"){
                item = detailRow(
                    {
                        "label": "Regulering",
                        "year": (new Date(endring.dato)).getFullYear(),
                        "belop": endring.endringBelop
                    }
                )
            } else if(endring.arsakType === "UTTAK"){
                item = detailRow(
                    {
                        "label": "Uttak",
                        "year": (new Date(endring.dato)).getFullYear(),
                        "belop": endring.endringBelop
                    }
                )
            }
            details.push(item);
        });
    }


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
                </div>
            </Ekspanderbartpanel>
            <Ekspanderbartpanel tittel="Data" className="panelWrapper">
                <pre id="json">{JSON.stringify(opptjening, null, 4)}</pre>
            </Ekspanderbartpanel>
        </div>
    )
};
