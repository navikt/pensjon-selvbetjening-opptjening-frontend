import {formatAmount} from "../../../common/utils";
import React from "react";
import {useTranslation} from "react-i18next";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {Undertittel} from "nav-frontend-typografi";
import "./OpptjeningDetailsPanel.less"

const detailRow = (props) => {
    return(
        <div role="row" data-testid={props.key} key={props.key} className="detailRow">
            <span role="cell" data-testid={"label-"+ props.key} className="labelColumn">{props.label}</span>
            <span role="cell" data-testid={"amount-"+ props.key} className="numberColumn">{props.amount}</span>
            <span role="cell" className="numberColumn">&nbsp;</span>
        </div>
    )
};
const buildDetailRows = (opptjening, t)  => {
    const details = [];
    let inngaende;
    if (opptjening && opptjening.endringOpptjening) {
        opptjening.endringOpptjening.forEach((endring, idx) => {
            let item;
            if (endring.arsakType === "INNGAENDE") {
                inngaende = endring.pensjonsbeholdningBelop;
                item = detailRow(
                    {
                        "key": "detail-" + idx,
                        "label": t("opptjening-assets"),
                        "amount": formatAmount(endring.pensjonsbeholdningBelop)
                    }
                )
            } else if (endring.arsakType === "INNGAENDE_2010"){
                item = detailRow(
                    {
                        "key": "detail-" + idx,
                        "label": t("opptjening-okning-reform"),
                        "amount": formatAmount(endring.pensjonsbeholdningBelop-inngaende)
                    }
                )
            } else if (endring.arsakType === "OPPTJENING") {
                item = detailRow(
                    {
                        "key": "detail-" + idx,
                        "label": t("opptjening-earnings"),
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
        <div role="heading" aria-level="2" className="detailTitle">{title + "?"}</div>
    )
};

const getRemarksContainer = (opptjening, t)  => {
    let remarks = [];
    if (opptjening && opptjening.merknader) {
        opptjening.merknader.forEach((merknad, idx) => {
            remarks.push(<div role="row" data-testid={"remark-row-" + idx} key={idx}><span data-testid={"remark-" + idx} role="cell">{t('remarks:'+merknad)}</span></div>)
        });
    }

    if(remarks.length>0){
        return(
            <div role="table" className="detailsBox">
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
                "label": t(label),
                "amount": formatAmount(opptjening.pensjonsbeholdning)
            })
    );

    return(
        <Ekspanderbartpanel tittel={detailsTitle(t('opptjening-what-happened-this-year', {currentYear: currentYear}))} border apen
                            className="panelWrapper">
            <div role="table" className="detailsBox">
                {details}
            </div>
            {opptjeningTwoYearsBack && currentYear>=2010 &&
                <div role="table" className="detailsBox">
                    {
                        detailRow(
                            {
                                "key": "incomeBase",
                                "label": t("opptjening-income-base-from", {currentYear: currentYear, twoYearsback: (currentYear - 2)}),
                                "amount": formatAmount(opptjeningTwoYearsBack.pensjonsgivendeInntekt)
                            })
                    }
                </div>
            }
            {remarksContainer}
        </Ekspanderbartpanel>
    )
};
