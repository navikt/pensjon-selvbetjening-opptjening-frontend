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
                aria-label={t('spraakvelger-velg-spraak')}
                autoComplete="off"
            >
                <option data-testid="option-default" value="">{t('spraakvelger-velg-spraak')}</option>
                <option data-testid="option-nb-NO" value="nb-NO">{t('spraakvelger-bokmaal')}</option>
                <option data-testid="option-nn-NO" value="nn-NO">{t('spraakvelger-nynorsk')}</option>
                <option data-testid="option-en-GB" value="en-GB">{t('spraakvelger-engelsk')}</option>
            </Select>
        </div>
    );
};
