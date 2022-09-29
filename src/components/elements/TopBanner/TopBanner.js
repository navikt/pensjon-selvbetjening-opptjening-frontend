import React from "react";
import {useTranslation} from "react-i18next";
import './TopBanner.css';
import {Sidetittel, Undertittel} from "nav-frontend-typografi";
import topBannerIllustrasjon from "../../../assets/topBannerIllustrasjon.svg"

export const TopBanner = (props) => {
    const { t } = useTranslation();
    const {frontpage=true, title, text, showIllustration=true} = props;

    return (
        <div className="topBanner">
            <div className="topBannerContent" data-testid="topbanner">
                <div className="topBannerText">
                    {frontpage && <Sidetittel id="opptjeningTitle">{t(title)}</Sidetittel>}
                    {!frontpage && <Undertittel>{t(title)}</Undertittel>}
                    {text && <p className="typo-normal">{t(text)}</p>}
                </div>

                {showIllustration &&
                    <div className="topBannerImgContainer" role="presentation">
                        <img src={topBannerIllustrasjon} className="illustration" alt=""/>
                    </div>
                }
            </div>
        </div>
    )
};
