import React from "react";
import {useTranslation} from "react-i18next";
import { Select } from 'nav-frontend-skjema';
import "./LanguageSelector.less"

export const LanguageSelector = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    return(
        <div className="languageSelectorWrapper">
            <Select
                data-testid="language-selector"
                onChange={(event) => changeLanguage(event.target.value)}
                value={i18n.language}
                bredde="m"
                className="languageSelector"
                aria-label={t('language-selector-choose-language')}
            >
                <option data-testid="option-default" value="">{t('language-selector-choose-language')}</option>
                <option data-testid="option-nb-NO" value="nb-NO">{t('language-selector-bokmaal')}</option>
                <option data-testid="option-nn-NO" value="nn-NO">{t('language-selector-nynorsk')}</option>
                <option data-testid="option-en-GB" value="en-GB">{t('language-selector-english')}</option>
            </Select>
        </div>
    );
};
