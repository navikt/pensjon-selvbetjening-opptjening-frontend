import React from 'react';
import {OpptjeningContainer} from "../../containers/OpptjeningContainer";
import {OpptjeningView} from "../views/OpptjeningView";
import {TopBanner} from "../elements/TopBanner/TopBanner";
import {LanguageSelector} from "../elements/LanguageSelector/LanguageSelector";
import './HomePage.less';

export const HomePage = () => {
    return (
        // Move GRID to separate re-usable template
        <div>
            <div className="contentCentered">
                <LanguageSelector/>
            </div>
            <TopBanner title="opptjening-title" text="opptjening-intro-text"/>
            <div className="mainBody">
                <OpptjeningContainer>
                    <div className="contentWrapper">
                        <OpptjeningView/>
                    </div>
                </OpptjeningContainer>
            </div>
        </div>
    )
};
