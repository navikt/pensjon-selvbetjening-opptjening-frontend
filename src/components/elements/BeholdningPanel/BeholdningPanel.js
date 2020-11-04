import React from "react";
import {useTranslation} from "react-i18next";
import {formatAmount} from "../../../common/utils";
import Panel from "nav-frontend-paneler";
import {Systemtittel} from "nav-frontend-typografi";
import "./BeholdningPanel.less"

export const BeholdningPanel = (props) => {
    const { t } = useTranslation();
    const latestPensjonsBeholdning = props.data;
    return(
        <Panel border>
            <div className="beholdningPanel">
                <svg width="4rem" viewBox="0 0 71 89" fill="none" xmlns="http://www.w3.org/2000/svg" className="illustration">
                    <path d="M38 20C43.5228 20 48 15.5228 48 10C48 4.47715 43.5228 0 38 0C32.4772 0 28 4.47715 28 10C28 15.5228 32.4772 20 38 20Z" fill="#FFBD66"/>
                    <path d="M36.5 84C65.8848 84 68 73.2549 68 60.0001C68 46.7454 66.9282 34.0667 37.7891 34.0003C6.28906 33.9285 5 46.7454 5 60.0001C5 73.2549 7.11523 84 36.5 84Z" fill="#C86151"/>
                    <path d="M13 59C14.1046 59 15 57.6569 15 56C15 54.3431 14.1046 53 13 53C11.8954 53 11 54.3431 11 56C11 57.6569 11.8954 59 13 59Z" fill="#3E3832"/>
                    <path d="M2 56H8C9.10457 56 10 56.8954 10 58V68C10 69.1046 9.10457 70 8 70H2C0.89543 70 0 69.1046 0 68V58C0 56.8954 0.89543 56 2 56Z" fill="#C86151"/>
                    <path d="M16.5522 29.7169L26 41H13L13 30.9407C13 29.8689 13.8954 29 15 29C15.6023 29 16.1724 29.2633 16.5522 29.7169Z" fill="#C86151"/>
                    <path d="M17.7957 75L24 78.0646L18.9409 87.5757C18.2637 88.8489 16.7752 89.3551 15.5249 88.7375C14.2746 88.1199 13.6839 86.5867 14.1694 85.2188L17.7957 75Z" fill="#C86151"/>
                    <path d="M13 70C15.7614 70 18 67.7614 18 65C18 62.2386 15.7614 60 13 60C10.2386 60 8 62.2386 8 65C8 67.7614 10.2386 70 13 70Z" fill="#D6897D"/>
                    <path d="M56.2043 75L50 78.0646L55.0591 87.5757C55.7363 88.8489 57.2248 89.3551 58.4751 88.7375C59.7254 88.1199 60.3161 86.5867 59.8306 85.2188L56.2043 75Z" fill="#C86151"/>
                    <path d="M68.5 64C69.8807 64 71 62.2091 71 60C71 57.7909 69.8807 56 68.5 56C67.1193 56 66 57.7909 66 60C66 62.2091 67.1193 64 68.5 64Z" fill="#C86151"/>
                    <path d="M26 41.6712C26 40.7068 26.6955 39.8866 27.6512 39.7577C29.8457 39.4618 33.9229 39 38 39C42.0771 39 46.1543 39.4618 48.3488 39.7577C49.3045 39.8866 50 40.7068 50 41.6712C50 42.8903 48.9059 43.8261 47.6966 43.6723C45.4039 43.3807 41.7019 43 38 43C34.2981 43 30.5961 43.3807 28.3034 43.6723C27.0941 43.8261 26 42.8903 26 41.6712Z" fill="#3E3832"/>
                    <path d="M31.1892 42C29.2272 40.2082 28 37.6517 28 34.814C28 29.3939 32.4772 25 38 25C43.5228 25 48 29.3939 48 34.814C48 37.6517 46.7728 40.2082 44.8108 42C42.5405 41.7892 40.2703 41.6839 38 41.6839C35.7297 41.6839 33.4595 41.7892 31.1892 42Z" fill="#FFBD66"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M28.0494 36C28.5511 30.9467 32.8147 27 38 27C43.1853 27 47.4489 30.9467 47.9506 36C47.9833 35.6711 48 35.3375 48 35C48 29.4772 43.5228 25 38 25C32.4772 25 28 29.4772 28 35C28 35.3375 28.0167 35.6711 28.0494 36Z" fill="#D87F0A"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M28.0494 11C28.5511 5.94668 32.8147 2 38 2C43.1853 2 47.4489 5.94668 47.9506 11C47.9833 10.6711 48 10.3375 48 10C48 4.47715 43.5228 0 38 0C32.4772 0 28 4.47715 28 10C28 10.3375 28.0167 10.6711 28.0494 11Z" fill="#D87F0A"/>
                </svg>
                <div className="content">
                    <Systemtittel id="pensjonsBeholdningTitle">{t('beholdning-din-pensjonsbeholdning-i-folketrygden')}</Systemtittel>
                    <div data-testid="assets" className="typo-sidetittel">{formatAmount(latestPensjonsBeholdning.beholdning)}</div>
                </div>
            </div>
        </Panel>
    )
};
