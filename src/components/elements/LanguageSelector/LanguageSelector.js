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
                label={t('languageSelector.choose_language')}
                onChange={(event) => changeLanguage(event.target.value)}
                value={i18n.language}
                bredde="m"
            >
                <option value="">{t('languageSelector.choose_language')}</option>
                <option value="nb">{t('languageSelector.bokmaal')}</option>
                <option value="nn">{t('languageSelector.nynorsk')}</option>
                <option value="en">{t('languageSelector.english')}</option>
            </Select>
        </div>
    );
};
