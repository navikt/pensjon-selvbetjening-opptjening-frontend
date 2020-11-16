import React, {useState} from "react";
import ReactMarkdown from 'react-markdown'
import Panel from 'nav-frontend-paneler';
import {Normaltekst, Undertittel} from "nav-frontend-typografi";
import {useTranslation} from "react-i18next";
import "./FAQPanel.less";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";

export const FAQPanel = () => {
    const { t } = useTranslation(['translation', 'faq']);
    const numberOfQuestions = t('faq:faq-number-of-questions');

    const toggleOpen = (index) => {
        const nameProps = {
            lng: "nb-NO",
            key: "faq-question-"+index,
            ns: "faq"
        };

        logToAmplitude({eventType: CLICK_EVENT, name: nameProps, titleKey: "FAQ", type: "EkspanderbartPanel", value: !apen["faq-question-" + index]});
        apen["faq-question-" + index] = !apen["faq-question-" + index];
        setApen(apen);
    };

    let faq = [];
    let apenDefaultState = {};
    for(let i=1;i<=numberOfQuestions;i++){
        apenDefaultState["faq-question-"+i] = false;
        faq.push(
            <Ekspanderbartpanel key={i} tittel={<Normaltekst>{t('faq:faq-question-'+i)}</Normaltekst>} border className="questionWrapper" onClick={() => toggleOpen(i)}>
                <div key="horizontalLine" className="faqHorizontalLine"/>
                <ReactMarkdown>{t('faq:faq-answer-'+i, {joinArrays: "\n\n"})}</ReactMarkdown>
            </Ekspanderbartpanel>
        )
    }
    const [apen, setApen] = useState(apenDefaultState);

    return(
        <Panel border className="panelWrapper">
            <div className="faqTitleContainer">
                <div className="faqTitle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" viewBox="0 0 62 80" id="ark-hjelp" focusable="false"  className="illustration">
                        <g fill="none" fillRule="evenodd">
                            <path fill="#E4E4DB" d="M0 13.322v62.635A4.036 4.036 0 0 0 4.029 80h53.944A4.035 4.035 0 0 0 62 75.957V4.043A4.035 4.035 0 0 0 57.973 0H14.021L0 13.322z"></path>
                            <path fill="#C9C9C9" d="M14.149 0v9.285c0 2.235-1.82 4.046-4.066 4.046H0L14.149 0z"></path>
                            <path fill="#669DB4" d="M27.15 47.262c-.204-1.452-.153-2.784.153-3.994.305-1.21.753-2.32 1.344-3.329a18.648 18.648 0 0 1 2.017-2.814c.754-.867 1.467-1.714 2.139-2.541a16.988 16.988 0 0 0 1.68-2.451 5.275 5.275 0 0 0 .673-2.603c0-1.452-.438-2.622-1.314-3.51-.876-.887-2.088-1.331-3.636-1.331-1.263 0-2.404.282-3.423.847-1.018.565-1.976 1.331-2.872 2.3L20 24.266a16.88 16.88 0 0 1 4.797-3.783C26.651 19.494 28.74 19 31.061 19c1.589 0 3.056.212 4.4.635 1.345.424 2.495 1.06 3.453 1.907.957.847 1.711 1.896 2.261 3.147.55 1.25.825 2.703.825 4.357 0 1.291-.234 2.451-.703 3.48a15.947 15.947 0 0 1-1.741 2.935 30.988 30.988 0 0 1-2.231 2.663 21.928 21.928 0 0 0-2.139 2.663 13.651 13.651 0 0 0-1.528 2.965c-.387 1.05-.499 2.22-.336 3.51H27.15zM30.267 61c-1.304 0-2.384-.444-3.24-1.331-.855-.888-1.283-2.018-1.283-3.39 0-1.371.428-2.5 1.284-3.389.855-.887 1.935-1.33 3.239-1.33 1.303 0 2.393.443 3.27 1.33.875.888 1.313 2.018 1.313 3.39 0 1.371-.438 2.501-1.314 3.389-.876.887-1.966 1.331-3.27 1.331z"></path>
                        </g>
                    </svg>
                    <Undertittel id="faqTitle" className="lenkepanel__heading title">{t('faq-ofte-stilte-sporsmaal')}</Undertittel>
                </div>
            </div>
            <div data-testid="faqview">
                {faq}
            </div>
        </Panel>
    );
};
