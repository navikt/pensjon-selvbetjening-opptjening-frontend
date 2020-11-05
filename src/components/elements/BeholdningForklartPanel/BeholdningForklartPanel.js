import {useTranslation} from "react-i18next";
import React from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Tekstomrade from "nav-frontend-tekstomrade";
import "./BeholdningForklartPanel.less";

const detailsTitle = (title) => {
    return(
        <div role="heading" aria-level="2" className="beholdningForklartTitle">
            <svg width="1.2rem" viewBox="0 0 26 43" fill="none" xmlns="http://www.w3.org/2000/svg" className="illustration">
                <path d="M20 6C21.6569 6 23 4.65685 23 3C23 1.34315 21.6569 0 20 0C18.3431 0 17 1.34315 17 3C17 4.65685 18.3431 6 20 6Z" fill="#E7E9E9"/>
                <path d="M17 11C19.2091 11 21 9.20914 21 7C21 4.79086 19.2091 3 17 3C14.7909 3 13 4.79086 13 7C13 9.20914 14.7909 11 17 11Z" fill="#FFD399"/>
                <path d="M13 42.9998C20.1797 42.9998 26 43.0906 26 35.7498C26 28.409 20.1797 20.0415 13 20.0415C5.8203 20.0415 0 28.409 0 35.7498C0 43.0906 5.8203 42.9998 13 42.9998Z" fill="#D87F0A"/>
                <path d="M13.0009 14.3028C15.6117 14.3028 18.91 13.0445 18.91 15.6578C18.91 18.2712 15.6117 21.25 13.0009 21.25C10.3901 21.25 7.0918 18.2712 7.0918 15.6578C7.0918 13.0445 10.3901 14.3028 13.0009 14.3028Z" fill="#D87F0A"/>
                <path d="M9.45526 18.8335H16.5462C17.1989 18.8335 17.728 19.3745 17.728 20.0418C17.728 20.7092 17.1989 21.2502 16.5462 21.2502H9.45526C8.80256 21.2502 8.27344 20.7092 8.27344 20.0418C8.27344 19.3745 8.80256 18.8335 9.45526 18.8335Z" fill="#3E3832"/>
                <path d="M13.1598 19.8665C12.9575 19.6786 12.9457 19.3622 13.1335 19.1598C13.3214 18.9575 13.6378 18.9457 13.8402 19.1335C15.3732 20.5565 16.4165 21.9476 16.9641 23.314C17.4981 24.6464 17.8425 26.0241 17.997 27.4459C18.0269 27.7205 17.8285 27.9672 17.554 27.997C17.2795 28.0269 17.0327 27.8285 17.0029 27.554C16.8582 26.2229 16.536 24.9339 16.0359 23.686C15.5493 22.472 14.5926 21.1964 13.1598 19.8665Z" fill="#3E3832"/>
                <path d="M12.8402 19.8665C13.0425 19.6786 13.0543 19.3622 12.8665 19.1598C12.6786 18.9575 12.3622 18.9457 12.1598 19.1335C10.6268 20.5565 9.58355 21.9476 9.03592 23.314C8.5019 24.6464 8.15747 26.0241 8.00297 27.4459C7.97314 27.7205 8.1715 27.9672 8.44602 27.997C8.72055 28.0269 8.96728 27.8285 8.99711 27.554C9.14176 26.2229 9.46399 24.9339 9.96414 23.686C10.4507 22.472 11.4074 21.1964 12.8402 19.8665Z" fill="#3E3832"/>
            </svg>
            <div className="title">{title}</div>
        </div>
    )
};
export const BeholdningForklartPanel = (props) => {
    const { t } = useTranslation();
    return(
        <Ekspanderbartpanel tittel={detailsTitle(t('pensjonsbeholdning-forklart'))} border className="panelWrapper">
            <Tekstomrade className="explanationText">
                {t('pensjonsbeholdning-forklart-tekst', {joinArrays: "\n\n"})}
            </Tekstomrade>
        </Ekspanderbartpanel>
    )
};
