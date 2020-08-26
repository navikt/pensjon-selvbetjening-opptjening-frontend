import React from 'react';
import {TopBanner} from "../elements/TopBanner/TopBanner";
import {LanguageSelector} from "../elements/LanguageSelector/LanguageSelector";
import './HomePage.less';

export const FaqPage = () => {
    return (
        // Move GRID to separate re-usable template
        <div>
            <div className="contentCentered">
                <LanguageSelector/>
            </div>
            <TopBanner title="faq-title" text=""/>
            <div className="mainBody">

            </div>
        </div>
    )
};
