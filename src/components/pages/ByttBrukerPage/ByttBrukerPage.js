import React from 'react';
import {ByttBrukerView} from "../../views/ByttBrukerView/ByttBrukerView";
import Alertstripe from "nav-frontend-alertstriper";
import "./ByttBrukerPage.css"
import {useSelector} from "react-redux";
import {
    getByttBrukerLoading,
    getEtternavn,
    getFornavn,
    getFullmektigPid
} from "../../../redux/opptjening/opptjeningSelectors";
import {useTranslation} from "react-i18next";
import {TopBanner} from "../../elements/TopBanner/TopBanner";

export const ByttBrukerPage = () => {
    const {t} = useTranslation(['translation', 'remarks']);
    const soknadAlderLoading = useSelector(getByttBrukerLoading);
    const fullmektigPid = useSelector(getFullmektigPid);
    const fornavn = useSelector(getFornavn);
    const etternavn = useSelector(getEtternavn);
    return (
        <div className="byttBrukerPage">
            <TopBanner title="opptjening-tittel"/>
            <div className="byttBrukerContentWrapper">
                {!soknadAlderLoading && fullmektigPid && fullmektigPid !== "" &&
                <div className="paaVegneAvWarning">
                    <Alertstripe type="info">
                        {t("byttbruker:byttbruker-du-er-logget-inn-paa-vegne-av", {"name": fornavn + " " + etternavn})}
                    </Alertstripe>
                </div>}
                <ByttBrukerView/>
            </div>
        </div>
    )
};
