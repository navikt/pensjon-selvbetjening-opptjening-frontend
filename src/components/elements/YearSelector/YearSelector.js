import React from "react";
import {Select} from "nav-frontend-skjema";
import "./YearSelector.less";

const buildYearOptions = (yearArray) => {
    let optionsArray = [];
    yearArray.forEach((year) => {
            optionsArray.push(<option key={year} value={year}>{year}</option>)
        }
    );
    return optionsArray;
};

export const YearSelector = (props) => {
    const yearOptions = buildYearOptions(props.years);
    return(
        <Select
            onChange={(event) => props.onChange(event.target.value)}
            value={props.currentYear}
            bredde={props.size}
            className="yearSelector"
        >
            {yearOptions}
        </Select>
    )
};
