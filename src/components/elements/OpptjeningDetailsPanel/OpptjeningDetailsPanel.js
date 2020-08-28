import {formatAmount} from "../../../common/utils";
import React from "react";
import {useTranslation} from "react-i18next";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {Undertittel} from "nav-frontend-typografi";
import "./OpptjeningDetailsPanel.less"

const detailRow = (props) => {
    return(
        <div key={props.key} className="detailRow">
            <span className="labelColumn">{props.label}: </span>
            <span className="numberColumn">{props.amount}</span>
            <span className="numberColumn">&nbsp;</span>
        </div>
    )
};
const buildDetailRows = (opptjening, t)  => {
    const details = [];

    if (opptjening && opptjening.endringOpptjening) {
        opptjening.endringOpptjening.forEach((endring, idx) => {
            let item;
            let year = (new Date(endring.dato)).getFullYear();
            if (endring.arsakType === "INNGAENDE" || endring.arsakType === "INNGAENDE_2010") {
                item = detailRow(
                    {
                        "key":idx,
                        "label": t("opptjening-assets-from") + " " + year,
                        "amount": formatAmount(endring.pensjonsbeholdningBelop)
                    }
                )
            } else if (endring.arsakType === "OPPTJENING") {
                item = detailRow(
                    {
                        "key":idx,
                        "label": t("opptjening-earnings-from") + " " + (year - 2),
                        "amount": formatAmount(endring.endringBelop)
                    }
                )
            } else if (endring.arsakType === "REGULERING") {
                item = detailRow(
                    {
                        "key":idx,
                        "label": t("opptjening-regulation") + " " + year,
                        "amount": formatAmount(endring.endringBelop)
                    }
                )
            } else if (endring.arsakType === "UTTAK") {
                item = detailRow(
                    {
                        "key":idx,
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

const detailsTitle = (title, t) => {
    return(
        <div className="detailTitle">{t(title)}</div>
    )
};

const getRemarksContainer = (opptjening, t)  => {
    let remarks = [];
    opptjening.merknader.forEach((merknad, idx) => {
        remarks.push(<div key={idx}>{t('remarks:'+merknad)}</div>)
    });

    if(remarks.length>0){
        return(
            <div className="detailsBox">
                <Undertittel>{t('opptjening-remarks-title')}</Undertittel>
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

    const details = buildDetailRows(opptjening, t);

    const remarksContainer = getRemarksContainer(opptjening, t);

    let label = "opptjening-your-pension-assets";
    if(details.length>0){
        label = "opptjening-sum";
        details.push(<div key="horizontalLine" className="horizontalLine"/>);
    }
    details.push(
        detailRow(
            {
                "key": details.length+1,
                "label": t(label),
                "amount": formatAmount(opptjening.pensjonsbeholdning)
            })
    );

    return(
        <Ekspanderbartpanel tittel={detailsTitle("opptjening-what-happened-this-year", t)} border
                            className="panelWrapper">
            <div className="detailsBox">
                {details}
            </div>
            {opptjeningTwoYearsBack &&
                <div className="detailsBox">
                    {
                        detailRow(
                            {
                                "label": t("opptjening-income-base-from") + " " + (currentYear - 2),
                                "amount": formatAmount(opptjeningTwoYearsBack.pensjonsgivendeInntekt)
                            })
                    }
                </div>
            }
            {remarksContainer}
        </Ekspanderbartpanel>
    )
};
