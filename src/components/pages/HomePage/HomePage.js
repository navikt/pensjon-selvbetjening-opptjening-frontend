import React from 'react';
import {OpptjeningContainer} from "../../../containers/OpptjeningContainer/OpptjeningContainer";
import {OpptjeningView} from "../../views/OpptjeningView/OpptjeningView";
import {TopBanner} from "../../elements/TopBanner/TopBanner";
import {LanguageSelector} from "../../elements/LanguageSelector/LanguageSelector";
import './HomePage.less';
import Breadcrumbs from "../../elements/Breadcrumbs/Breadcrumbs";
import {useTranslation} from "react-i18next";

export const HomePage = () => {
    const { t } = useTranslation();
    return (
        // Move GRID to separate re-usable template
        <div>
            <Breadcrumbs brodsmuler={[ { url: '/', title: t('opptjening-tittel'), handleInApp: true }]}>
            </Breadcrumbs>
            <div className="contentCentered">
                <LanguageSelector/>
            </div>
            <TopBanner title="opptjening-tittel" text="opptjening-intro-tekst"/>
            <div className="mainBody" id="maincontent" tabIndex="-1">
                <OpptjeningContainer>
                    <main className="contentWrapper">
                        <OpptjeningView/>
                    </main>
                </OpptjeningContainer>
            </div>
        </div>
    )
};
