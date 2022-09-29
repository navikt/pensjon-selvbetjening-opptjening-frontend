import React from 'react';
import {render, screen} from '@testing-library/react';
import {LineChart} from './LineChart';
import userEvent from "@testing-library/user-event";
import {BORN_AFTER_1962, BORN_IN_OR_BETWEEN_1954_AND_1962} from "../../../common/userGroups";
import {formatAmount} from "../../../common/utils";

it('should render the Chart with title, buttons, and hidden table', () => {
    const {getByRole, getByTestId, getAllByRole} = render(<LineChart data={{}} userGroup={BORN_AFTER_1962}/>);

    expect(getByRole("heading")).toHaveTextContent("chart-pensjonsbeholdningen-din");
    expect(getAllByRole("button")).toHaveLength(2);
    expect(getAllByRole("button")[0]).toHaveTextContent("chart-graf");
    expect(getAllByRole("button")[1]).toHaveTextContent("chart-tabell");


    expect(getByTestId("chartContainer")).not.toHaveClass("concealed");
    expect(getByTestId("dataContainer")).toHaveClass("concealed");
});

it('should render the Chart with title chart-pensjonsbeholdningen-og-pensjonspoengene-dine when BORN_IN_OR_BETWEEN_1954_AND_1962', () => {
    const {getByRole} = render(<LineChart data={{}} userGroup={BORN_IN_OR_BETWEEN_1954_AND_1962}/>);
    expect(getByRole("heading")).toHaveTextContent("chart-pensjonsbeholdningen-og-pensjonspoengene-dine");
});

it('should show the table or chart depending on which button is clicked', () => {
    const {getByTestId, getAllByRole} = render(<LineChart data={{}} userGroup={BORN_AFTER_1962}/>);


    userEvent.click(getAllByRole("button")[1]);
    expect(getByTestId("chartContainer")).toHaveClass("concealed");
    expect(getByTestId("dataContainer")).not.toHaveClass("concealed");

    userEvent.click(getAllByRole("button")[0]);
    expect(getByTestId("chartContainer")).not.toHaveClass("concealed");
    expect(getByTestId("dataContainer")).toHaveClass("concealed");
});

it('should not show pensjonspoeng for usergroup BORN_AFTER_1962', () => {
    const expectedBeholdning = 20000;
    const {getByTestId, queryByTestId} = render(<LineChart
        data={
            {
                2000:{
                    pensjonspoeng: null,
                    pensjonsbeholdning: expectedBeholdning,
                    uttak: []
                }
            }
        }
        userGroup={BORN_AFTER_1962}/>);

    expect(getByTestId("tableHeaderYear")).toHaveTextContent("chart-aar");
    expect(getByTestId("tableHeaderPensjonsbeholdning")).toHaveTextContent("chart-pensjonsbeholdning-kr");
    expect(queryByTestId("tableHeaderPensjonspoeng")).not.toBeInTheDocument();
    expect(getByTestId("tableDataYear")).toHaveTextContent(2000);
    expect(getByTestId("tableDataPensjonsbeholdning").textContent).toEqual(formatAmount(expectedBeholdning));

});

it('should show pensjonspoeng for usergroup BORN_IN_OR_BETWEEN_1954_AND_1962', () => {
    const expectedBeholdning = 30000;
    const expectedPensjonspoeng = 3.0;
    const {getByTestId} = render(<LineChart
        data={
            {
                2000:{
                    pensjonspoeng: expectedPensjonspoeng,
                    pensjonsbeholdning: expectedBeholdning,
                    uttak: []
                }
            }
        }
        userGroup={BORN_IN_OR_BETWEEN_1954_AND_1962}/>);

    expect(getByTestId("tableHeaderYear")).toHaveTextContent("chart-aar");
    expect(getByTestId("tableHeaderPensjonsbeholdning")).toHaveTextContent("chart-pensjonsbeholdning-kr");
    expect(getByTestId("tableHeaderPensjonspoeng")).toHaveTextContent("chart-pensjonspoeng");
    expect(getByTestId("tableDataYear")).toHaveTextContent(2000);
    expect(getByTestId("tableDataPensjonsbeholdning").textContent).toEqual(formatAmount(expectedBeholdning));
    expect(getByTestId("tableDataPensjonspoeng")).toHaveTextContent(expectedPensjonspoeng);

});

it('should show antall år med pensjonspoeng for usergroup BORN_IN_OR_BETWEEN_1954_AND_1962', () => {
    const expectedAntallAarMedPensjonsPoeng = 44;
    render(<LineChart data={{}} userGroup={BORN_IN_OR_BETWEEN_1954_AND_1962} antallAarPensjonsPoeng={expectedAntallAarMedPensjonsPoeng}/>);

    expect(screen.getByText("chart-antall-aar-med-pensjonspoeng")).toBeInTheDocument();
});

it('should show not antall år med pensjonspoeng for usergroup BORN_AFTER_1962', () => {
    const expectedAntallAarMedPensjonsPoeng = 44;
    render(<LineChart data={{}} userGroup={BORN_AFTER_1962} antallAarPensjonsPoeng={expectedAntallAarMedPensjonsPoeng}/>);

    expect(screen.queryByText("chart-antall-aar-med-pensjonspoeng")).not.toBeInTheDocument();
});
