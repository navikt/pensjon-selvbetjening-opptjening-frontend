import React from 'react';
import {OpptjeningContainer} from "../../../containers/OpptjeningContainer/OpptjeningContainer";
import {OpptjeningView} from "../../views/OpptjeningView/OpptjeningView";
import {TopBanner} from "../../elements/TopBanner/TopBanner";
import './HomePage.less';
import Breadcrumbs from "../../elements/Breadcrumbs/Breadcrumbs";
//import {LanguageSelector} from "../../elements/LanguageSelector/LanguageSelector";

export const HomePage = () => {
    return (
        // Move GRID to separate re-usable template
        <div>
            <Breadcrumbs/>
            {/*<LanguageSelector/>*/}
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
