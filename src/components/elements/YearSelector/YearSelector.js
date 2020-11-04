import React from "react";
import {Select} from "nav-frontend-skjema";
import "./YearSelector.less";
import {useTranslation} from "react-i18next";

const buildYearOptions = (yearArray) => {
    let optionsArray = [];
    yearArray.forEach((year) => {
        optionsArray.push(<option data-testid={"option-" + year} key={year} value={year}>{year}</option>)
    });
    return optionsArray;
};

export const YearSelector = (props) => {
    const { t } = useTranslation();
    const yearOptions = buildYearOptions(props.years);
    return(
        <Select
            data-testid="year-selector"
            onChange={(event) => props.onChange(event.target.value)}
            value={props.currentYear}
            bredde={props.size}
            className="yearSelector"
            aria-label={t('aarvelger-velg-aar')}
        >
            {yearOptions}
        </Select>
    )
};
