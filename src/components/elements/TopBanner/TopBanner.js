import React from "react";
import {useTranslation} from "react-i18next";
import './TopBanner.less';
import illustration from '../../../assets/pensjon_illustrasjon_1.png'
import {Sidetittel, Undertittel} from "nav-frontend-typografi";

export const TopBanner = (props) => {
    const { t } = useTranslation();
    const {frontpage=true, title, text, showIllustration=true} = props;

    return (
        <div className="topBanner">
            <div className="topBannerContent">
                <div className="topBannerText">
                    {frontpage && <Sidetittel role="title">{t(title)}</Sidetittel>}
                    {!frontpage && <Undertittel role="title">{t(title)}</Undertittel>}
                    {text && <p className="typo-normal">{t(text)}</p>}
                </div>
                {showIllustration &&
                    <div role="presentation" className="topBannerImgContainer">
                        <img src={illustration} height="160" alt=""/>
                    </div>
                }
            </div>
        </div>
    )
};
