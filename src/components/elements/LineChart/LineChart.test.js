import React from 'react';
import {render} from '@testing-library/react';
import {LineChart} from './LineChart';
import userEvent from "@testing-library/user-event";
import {BORN_AFTER_1962, BORN_IN_OR_BETWEEN_1954_AND_1962} from "../../../common/userGroups";
import {formatAmount} from "../../../common/utils";

it('should render the Chart with title, buttons, and hidden table', () => {
    const {getByRole, getByTestId, getAllByRole} = render(<LineChart userGroup={BORN_AFTER_1962}/>);

    expect(getByRole("heading")).toHaveTextContent("chart-pensjonsbeholdningen-din");
    expect(getAllByRole("button")).toHaveLength(2);
    expect(getAllByRole("button")[0]).toHaveTextContent("chart-graf");
    expect(getAllByRole("button")[1]).toHaveTextContent("chart-tabell");


    expect(getByTestId("chartContainer")).not.toHaveClass("hidden");
    expect(getByTestId("dataContainer")).toHaveClass("hidden");
});

it('should show the table or chart depending on which button is clicked', () => {
    const {getByTestId, getAllByRole} = render(<LineChart userGroup={BORN_AFTER_1962}/>);


    userEvent.click(getAllByRole("button")[1]);
    expect(getByTestId("chartContainer")).toHaveClass("hidden");
    expect(getByTestId("dataContainer")).not.toHaveClass("hidden");

    userEvent.click(getAllByRole("button")[0]);
    expect(getByTestId("chartContainer")).not.toHaveClass("hidden");
    expect(getByTestId("dataContainer")).toHaveClass("hidden");
});

it('should not show pensjonspoeng for usergroup BORN_AFTER_1962', () => {
    const expectedBeholdning = 20000;
    const {getByTestId, queryByTestId} = render(<LineChart
        data={
            {
                2000:{
                    pensjonspoeng: null,
                    pensjonsbeholdning: expectedBeholdning
                }
            }
        }
        userGroup={BORN_AFTER_1962}/>);

    expect(getByTestId("tableHeaderYear")).toHaveTextContent("chart-aar");
    expect(getByTestId("tableHeaderPensjonsbeholdning")).toHaveTextContent("chart-pensjonsbeholdning");
    expect(queryByTestId("tableHeaderPensjonspoeng")).not.toBeInTheDocument();
    expect(getByTestId("tableDataYear")).toHaveTextContent(2000);
    expect(getByTestId("tableDataPensjonsbeholdning").textContent).toEqual("kr" + formatAmount(expectedBeholdning));

});

it('should show pensjonspoeng for usergroup BORN_IN_OR_BETWEEN_1954_AND_1962', () => {
    const expectedBeholdning = 30000;
    const expectedPensjonspoeng = 3.0;
    const {getByTestId} = render(<LineChart
        data={
            {
                2000:{
                    pensjonspoeng: expectedPensjonspoeng,
                    pensjonsbeholdning: expectedBeholdning
                }
            }
        }
        userGroup={BORN_IN_OR_BETWEEN_1954_AND_1962}/>);

    expect(getByTestId("tableHeaderYear")).toHaveTextContent("chart-aar");
    expect(getByTestId("tableHeaderPensjonsbeholdning")).toHaveTextContent("chart-pensjonsbeholdning");
    expect(getByTestId("tableHeaderPensjonspoeng")).toHaveTextContent("chart-pensjonspoeng");
    expect(getByTestId("tableDataYear")).toHaveTextContent(2000);
    expect(getByTestId("tableDataPensjonsbeholdning").textContent).toEqual("kr" + formatAmount(expectedBeholdning));
    expect(getByTestId("tableDataPensjonspoeng")).toHaveTextContent(expectedPensjonspoeng);

});



