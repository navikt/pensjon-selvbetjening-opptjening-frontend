import React from 'react';
import {TopBanner} from "../../elements/TopBanner/TopBanner";
import Breadcrumbs from "../../elements/Breadcrumbs/Breadcrumbs";
import {FaqView} from "../../views/FaqView/FaqView";

export const FaqPage = () => {
    return (
        <div>
            <TopBanner title="faq-title" text="" showIllustration={false} frontpage={false}/>
            <div className="mainBody">
                <Breadcrumbs/>
                <div className="contentWrapper">
                    <FaqView/>
                </div>
            </div>
        </div>
    )
};
