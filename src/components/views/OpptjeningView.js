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
                <h3>Antall år med pensjonspoeng: {opptjening.numberOfYearsWithPensjonspoeng}</h3>
                <h3>Opptjeningsdata:</h3>
                {oData && Object.keys(oData).map((year, idx) => {
                    return (
                        <p key={idx}>
                            {t('opptjening-year')}: {oData[year].ar}<br/>
                            {t('opptjening-average-g')}: {oData[year].gjennomsnittligG}<br/>
                            Hjelpmerknad: {oData[year].hjelpMerknad}<br/>
                            Maks uføregrad: {oData[year].maksUforegrad}<br/>
                            Omsorgspoeng: {oData[year].omsorgspoeng}<br/>
                            Omsorgspoengtype: {oData[year].omsorgspoengType}<br/>
                            Pensjonsbeholdning: {oData[year].pensjonsbeholdning}<br/>
                            Pensjonsgivende inntekt: {oData[year].pensjonsgivendeInntekt}<br/>
                            Pensjonspoeng: {oData[year].pensjonspoeng}<br/>
                            Regoistrerte pensjonspoeng: {oData[year].registrertePensjonspoeng}<br/>
                            Restpensjon: {oData[year].restpensjon}
                        </p>
                    )
                })}
            </div>
        </div>
    )
};
