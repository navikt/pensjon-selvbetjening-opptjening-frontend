import React from 'react';
import {OpptjeningContainer} from "../../../containers/OpptjeningContainer/OpptjeningContainer";
import {OpptjeningView} from "../../views/OpptjeningView/OpptjeningView";
import {TopBanner} from "../../elements/TopBanner/TopBanner";
import {LanguageSelector} from "../../elements/LanguageSelector/LanguageSelector";
import './HomePage.less';
import Breadcrumbs from "../../elements/Breadcrumbs/Breadcrumbs";

export const HomePage = () => {
    return (
        // Move GRID to separate re-usable template
        <div>
            <div className="contentCentered">
                <LanguageSelector/>
            </div>
            <TopBanner title="opptjening-tittel" text="opptjening-intro-tekst"/>
            <div className="mainBody" id="maincontent" tabIndex="-1">
                <Breadcrumbs/>
                <OpptjeningContainer>
                    <main className="contentWrapper">
                        <OpptjeningView/>
                    </main>
                </OpptjeningContainer>
            </div>
        </div>
    )
};
