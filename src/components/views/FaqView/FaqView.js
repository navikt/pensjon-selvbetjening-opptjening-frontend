import React from "react";
import {useTranslation} from 'react-i18next';
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {Normaltekst} from "nav-frontend-typografi";
import './FaqView.less';

export const FaqView = () => {
    const {t} = useTranslation(['faq']);
    const numberOfQuestions = t('faq-number-of-questions');

    let faq = [];
    for(let i=1;i<=numberOfQuestions;i++){
        faq.push(
            <Ekspanderbartpanel key={i} tittel={<Normaltekst>{t('faq-question-'+i)}</Normaltekst>} border className="questionWrapper">
                {t('faq-answer-'+i)}
            </Ekspanderbartpanel>
        )
    }
    return(
        <div data-testid="faqview">
            {faq}
        </div>
    )
};
