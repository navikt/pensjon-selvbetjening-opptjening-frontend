import React, {useState} from "react";
import ReactMarkdown from 'react-markdown'
import Panel from 'nav-frontend-paneler';
import {Normaltekst, Undertittel} from "nav-frontend-typografi";
import {useTranslation} from "react-i18next";
import "./FAQPanel.less";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {amplitudeLogger, CLICK_EVENT} from "../../../common/amplitude";
import {getLabelByLanguage} from "../../../common/utils";

export const FAQPanel = () => {
    const { t } = useTranslation(['translation', 'faq']);
    const numberOfQuestions = t('faq:faq-number-of-questions');

    const toggleOpen = (index) => {
        const name = getLabelByLanguage("nb-NO", "faq:faq-question-"+index);
        amplitudeLogger(CLICK_EVENT, {"component": "FAQ", "type": "EkspanderbartPanel", "name": name, "value": !apen["faq-question-" + index]});
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
                    <Undertittel id="faqTitle" className="lenkepanel__heading">{t('faq-ofte-stilte-sporsmaal')}</Undertittel>
                </div>
            </div>
            <div data-testid="faqview">
                {faq}
            </div>
        </Panel>
    );
};
