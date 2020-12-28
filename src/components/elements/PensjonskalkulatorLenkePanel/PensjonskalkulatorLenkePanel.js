import React from "react";
import {useTranslation} from "react-i18next";
import {Undertittel} from "nav-frontend-typografi";
import "./PensjonskalkulatorLenkePanel.less"
import {LenkepanelBase} from "nav-frontend-lenkepanel";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";

export const PensjonskalkulatorLenkePanel = () => {
    const logPensjonskalkulatorClickToAmplitude = (props) => {
        logToAmplitude({eventType: CLICK_EVENT, name: "Klikk på lenke", titleKey: "pensjonskalkulator-lenke-title", type: props.type, value: true});
    };

    const { t } = useTranslation();
    return(
        <LenkepanelBase border href={process.env.REACT_APP_PENSJONSKALKULATOR_URL} className="panelWrapper" onClick={() => logPensjonskalkulatorClickToAmplitude({type: "Lenkepanel"})}>
            <div className="pensjonskalkulatorLenkePanel">
                <svg viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="illustration" focusable="false">
                    <rect width="20" height="32" rx="2" fill="#3E3832"/>
                    <rect x="2" y="3" width="16" height="7" fill="#E7E9E9"/>
                    <rect x="12" y="7" width="2" height="1" fill="#3E3832"/>
                    <rect x="15" y="7" width="2" height="1" fill="#3E3832"/>
                    <path d="M4 17C5.10457 17 6 16.1046 6 15C6 13.8954 5.10457 13 4 13C2.89543 13 2 13.8954 2 15C2 16.1046 2.89543 17 4 17Z" fill="#E7E9E9"/>
                    <path d="M4 23C5.10457 23 6 22.1046 6 21C6 19.8954 5.10457 19 4 19C2.89543 19 2 19.8954 2 21C2 22.1046 2.89543 23 4 23Z" fill="#E7E9E9"/>
                    <path d="M4 29C5.10457 29 6 28.1046 6 27C6 25.8954 5.10457 25 4 25C2.89543 25 2 25.8954 2 27C2 28.1046 2.89543 29 4 29Z" fill="#E7E9E9"/>
                    <path d="M10 17C11.1046 17 12 16.1046 12 15C12 13.8954 11.1046 13 10 13C8.89543 13 8 13.8954 8 15C8 16.1046 8.89543 17 10 17Z" fill="#E7E9E9"/>
                    <path d="M10 23C11.1046 23 12 22.1046 12 21C12 19.8954 11.1046 19 10 19C8.89543 19 8 19.8954 8 21C8 22.1046 8.89543 23 10 23Z" fill="#E7E9E9"/>
                    <path d="M16 17C17.1046 17 18 16.1046 18 15C18 13.8954 17.1046 13 16 13C14.8954 13 14 13.8954 14 15C14 16.1046 14.8954 17 16 17Z" fill="#FF9100"/>
                    <path d="M16 23C17.1046 23 18 22.1046 18 21C18 19.8954 17.1046 19 16 19C14.8954 19 14 19.8954 14 21C14 22.1046 14.8954 23 16 23Z" fill="#E7E9E9"/>
                    <rect x="8" y="25" width="10" height="4" rx="2" fill="#E7E9E9"/>
                </svg>
                <div className="content">
                    <Undertittel id="pensjonskalkulatorLenke" className="lenkepanel__heading">{t('pensjonskalkulator-lenke-title')}</Undertittel>
                </div>
            </div>
        </LenkepanelBase>
    )
};
