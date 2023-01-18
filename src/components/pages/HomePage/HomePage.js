import React from 'react';
import {OpptjeningContainer} from "../../../containers/OpptjeningContainer/OpptjeningContainer";
import {OpptjeningView} from "../../views/OpptjeningView/OpptjeningView";
import {TopBanner} from "../../elements/TopBanner/TopBanner";
import './HomePage.css';
import Breadcrumbs from "../../elements/Breadcrumbs/Breadcrumbs";
import {LanguageSelector} from "../../elements/LanguageSelector/LanguageSelector";
import {BrowserCheck} from "../../../BrowserCheck";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {
    getByttBrukerLoading,
    getEtternavn,
    getFornavn,
    getFullmektigPid
} from "../../../redux/opptjening/opptjeningSelectors";
import Alertstripe from "nav-frontend-alertstriper";

export const HomePage = () => {
    const { t } = useTranslation(['translation', 'remarks']);
    const soknadAlderLoading = useSelector(getByttBrukerLoading);
    const fullmektigPid = useSelector(getFullmektigPid);
    const fornavn = useSelector(getFornavn);
    const etternavn = useSelector(getEtternavn);
    return (
        // Move GRID to separate re-usable template
        <div>
            <Breadcrumbs/>
            <LanguageSelector/>
            <TopBanner title="opptjening-tittel"/>
            <BrowserCheck />
            <div className="mainBody" id="maincontent" tabIndex="-1">
                {!soknadAlderLoading && fullmektigPid && fullmektigPid !== "" &&
                <div className="paaVegneAvWarning">
                    <Alertstripe type="info">
                        {t("byttbruker:byttbruker-du-er-logget-inn-paa-vegne-av", {"name": fornavn + " " + etternavn})}
                    </Alertstripe>
                </div>}
                <OpptjeningContainer>
                    <main className="contentWrapper">
                        <OpptjeningView/>
                    </main>
                </OpptjeningContainer>
            </div>
        </div>
    )
};
