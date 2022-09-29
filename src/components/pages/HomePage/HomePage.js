import React from 'react';
import {OpptjeningContainer} from "../../../containers/OpptjeningContainer/OpptjeningContainer";
import {OpptjeningView} from "../../views/OpptjeningView/OpptjeningView";
import {TopBanner} from "../../elements/TopBanner/TopBanner";
import './HomePage.css';
import Breadcrumbs from "../../elements/Breadcrumbs/Breadcrumbs";
import {LanguageSelector} from "../../elements/LanguageSelector/LanguageSelector";
import {BrowserCheck} from "../../../BrowserCheck";

export const HomePage = () => {
    return (
        // Move GRID to separate re-usable template
        <div>
            <Breadcrumbs/>
            <LanguageSelector/>
            <TopBanner title="opptjening-tittel"/>
            <BrowserCheck />
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
