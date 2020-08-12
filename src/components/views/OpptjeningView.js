import React from "react";
import { useTranslation } from 'react-i18next';
import {shallowEqual, useSelector} from "react-redux";
import {getOpptjening} from "../../redux/opptjening/opptjeningSelectors";
import './OpptjeningView.less';

export const OpptjeningView = () => {
    const opptjening = useSelector(getOpptjening, shallowEqual);
    const { t } = useTranslation();

    let oData = opptjening.opptjeningData;
    return(
        <div>
            <div className="opptjeningBody">
                <h3>{t('opptjening-number-of-years-with-pensjonspoeng')} {opptjening.numberOfYearsWithPensjonspoeng}</h3>
                {oData && Object.keys(oData).map((year, idx) => {
                    return (
                        <p key={idx}>
                            <h3>{t('opptjening-year')}: {oData[year].ar}</h3>
                            <pre id="json">{JSON.stringify(oData[year], null, 4)}</pre>
                        </p>
                    )
                })}
            </div>
        </div>
    )
};
