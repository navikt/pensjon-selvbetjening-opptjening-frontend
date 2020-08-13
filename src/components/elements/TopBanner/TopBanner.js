import React from "react";
import {useTranslation} from "react-i18next";
import './TopBanner.less';

export const TopBanner = (props) => {
    const { t } = useTranslation();
    const {title, text} = props;

    return (
        <div className="topBanner">
            <div className="topBannerWrapper">
                <div className="topBannerContent">
                    <div className="topBannerText">
                        <h1 className="typo-sidetittel">{t(title)}</h1>
                        <p className="typo-normal">{t(text)}</p>
                    </div>
                    <div role="presentation" className="topBannerImgContainer">
                        <img src="/pensjon/opptjening/pensjon_illustrasjon_1.png" height="160" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
};
