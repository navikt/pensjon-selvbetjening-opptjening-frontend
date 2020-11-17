import React from 'react';
import { render } from '@testing-library/react';
import {LineChart} from './LineChart';
import userEvent from "@testing-library/user-event";

it('should render the Chart with title, buttons, and hidden table', () => {
    const {getByRole, getByTestId, getAllByRole} = render(<LineChart
        data={{"labels": ["2020", "2019"], "data": ["1000", "2000"]}}
        title={"DIN PENSJONSBEHOLDNING"}
        yLabel={"PENSJONSBEHOLDNING"}
        xLabel={"ÅR"}
    />);

    expect(getByRole("heading")).toHaveTextContent("DIN PENSJONSBEHOLDNING");
    expect(getAllByRole("button")).toHaveLength(2);
    expect(getAllByRole("button")[0]).toHaveTextContent("chart-graf");
    expect(getAllByRole("button")[1]).toHaveTextContent("chart-tabell");


    expect(getByTestId("chartContainer")).not.toHaveClass("hidden");
    expect(getByTestId("dataContainer")).toHaveClass("hidden");
});

it('should show the table or chart depending on which button is clicked', () => {
    const {getByTestId, getAllByRole} = render(<LineChart
        data={{"labels": ["2020", "2019"], "data": ["1000", "2000"]}}
        title={"DIN PENSJONSBEHOLDNING"}
        yLabel={"PENSJONSBEHOLDNING"}
        xLabel={"ÅR"}
    />);


    userEvent.click(getAllByRole("button")[1]);
    expect(getByTestId("chartContainer")).toHaveClass("hidden");
    expect(getByTestId("dataContainer")).not.toHaveClass("hidden");

    userEvent.click(getAllByRole("button")[0]);
    expect(getByTestId("chartContainer")).not.toHaveClass("hidden");
    expect(getByTestId("dataContainer")).toHaveClass("hidden");
});


