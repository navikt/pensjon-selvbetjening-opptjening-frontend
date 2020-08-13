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
                label={t('language-selector-choose-language')}
                onChange={(event) => changeLanguage(event.target.value)}
                value={i18n.language}
                bredde="m"
                className="languageSelector"
            >
                <option value="">{t('language-selector-choose-language')}</option>
                <option value="nb-NO">{t('language-selector-bokmaal')}</option>
                <option value="nn-NO">{t('language-selector-nynorsk')}</option>
                <option value="en-GB">{t('language-selector-english')}</option>
            </Select>
        </div>
    );
};
