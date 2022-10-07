import React from "react";
import {Select} from "nav-frontend-skjema";
import "./YearSelector.css";

const buildYearOptions = (yearArray) => {
    let optionsArray = [];
    yearArray.forEach((year) => {
        optionsArray.push(<option data-testid={"option-" + year} key={year} value={year}>{year}</option>)
    });
    return optionsArray;
};

export const YearSelector = (props) => {
    const yearOptions = buildYearOptions(props.years);
    return(
        <Select
            data-testid="year-selector"
            id="yearSelector"
            onChange={(event) => props.onChange(event.target.value)}
            value={props.currentYear}
            bredde={props.size}
            className="yearSelector"
            autoComplete="off"
        >
            {yearOptions}
        </Select>
    )
};
