import React, {useState} from "react";
import ReactMarkdown from 'react-markdown'
import Panel from 'nav-frontend-paneler';
import {Normaltekst, Undertittel} from "nav-frontend-typografi";
import {useTranslation} from "react-i18next";
import "./FAQPanel.less";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";
import {BORN_BEFORE_1943, BORN_IN_OR_BETWEEN_1943_AND_1953} from "../../../common/userGroups";
import sporsmalstegn from "../../../assets/sporsmalstegn.svg";


export const FAQPanel = (props) => {
    const {userGroup} = props;
    let faqNamespace = "faq_" + userGroup.toLowerCase();
    if(userGroup===BORN_BEFORE_1943){
        faqNamespace = "faq_" + BORN_IN_OR_BETWEEN_1943_AND_1953.toLowerCase();
    }
    const { t } = useTranslation(['translation', 'faq', faqNamespace]);
    const numberOfSpecialQuestions = t(faqNamespace + ':faq-number-of-questions');
    const numberOfCommonQuestions = t('faq:faq-number-of-questions');

    const toggleOpen = (index, type) => {
        const nameProps = {
            lng: "nb",
            key: "faq-question-"+index,
            ns: type==="special" ? faqNamespace : "faq"
        };

        logToAmplitude({eventType: CLICK_EVENT, name: nameProps, titleKey: "FAQ", type: "EkspanderbartPanel", value: !apen["faq-"+type+"-question-" + index]});
        apen["faq-"+type+"-question-" + index] = !apen["faq-"+type+"-question-" + index];
        setApen(apen);
    };

    let faq = [];
    let apenDefaultState = {};
    for(let i=1;i<=numberOfSpecialQuestions;i++){
        apenDefaultState["faq-special-question-"+i] = false;
        faq.push(
            <Ekspanderbartpanel key={"special" + i} tittel={<Normaltekst>{t(faqNamespace + ':faq-question-'+i)}</Normaltekst>} border className="questionWrapper" onClick={() => toggleOpen(i, 'special')}>
                <div key="horizontalLine" className="faqHorizontalLine"/>
                <ReactMarkdown>{t(faqNamespace + ':faq-answer-'+i, {joinArrays: "\n\n"})}</ReactMarkdown>
            </Ekspanderbartpanel>
        )
    }
    for(let i=1;i<=numberOfCommonQuestions;i++){
        apenDefaultState["faq-common-question-"+i] = false;
        faq.push(
            <Ekspanderbartpanel key={"common" + i} tittel={<Normaltekst>{t('faq:faq-question-'+i)}</Normaltekst>} border className="questionWrapper" onClick={() => toggleOpen(i, 'common')}>
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
                    <img src={sporsmalstegn} className="illustration" alt=""/>
                    <Undertittel id="faqTitle" className="lenkepanel__heading title">{t('faq-ofte-stilte-sporsmaal')}</Undertittel>
                </div>
            </div>
            <div data-testid="faqview">
                {faq}
            </div>
        </Panel>
    );
};
