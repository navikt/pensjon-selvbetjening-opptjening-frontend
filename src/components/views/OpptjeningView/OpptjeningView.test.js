import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import { OpptjeningView} from './OpptjeningView';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import {axe} from "jest-axe";
import {
    constructOpptjening,
    mockBasicSuccessState,
    mockStateFromOpptjeningData
} from "../../../__mocks__/mockDataGenerator";
import {formatAmount} from "../../../common/utils";
import * as amplitude from "../../../common/amplitude";

const mockedState = mockBasicSuccessState(20, 1972);

it('should not fail any accessibility tests', async () => {
    const mockStore = configureStore();
    let store = mockStore(mockedState);

    const {container} = render(<Provider store={store}><OpptjeningView/></Provider>);
    expect(await axe(container)).toHaveNoViolations();
});

it('should render Opptjening view and display only the headings for the different panels', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedState);

    let view = render(<Provider store={store}><OpptjeningView/></Provider>);

    expect(view.queryAllByRole("heading")[0]).toHaveTextContent("beholdning-din-pensjonsbeholdning-i-folketrygden"); //Beholdning-panel
    expect(view.queryAllByRole("heading")[1]).toHaveTextContent("pensjonsbeholdning-forklart"); //BeholdningForklart-panel
    expect(view.queryAllByRole("heading")[2]).toHaveTextContent("chart-pensjonsbeholdningen-din"); //Chart - Chart-view
    expect(view.queryAllByRole("heading")[3]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar"); //OpptjeningDetails-panel
    expect(view.queryAllByRole("heading")[4]).toHaveTextContent("inntekt-pensjonsgivende-inntekter"); //Inntekter-panel
    expect(view.queryAllByRole("heading")[5]).toHaveTextContent("opptjening-flere-steder-title"); //OpptjeningFlereStederPanel
    expect(view.queryAllByRole("heading")[6]).toHaveTextContent("pensjonskalkulator-lenke-title"); //PensjonskalkulatorLenkePanel
    expect(view.queryAllByRole("heading")[7]).toHaveTextContent("faq-ofte-stilte-sporsmaal"); //FAQ-panel

    expect(view.queryAllByRole("table").length).toBe(1); // Chart tables
});

it('should render Opptjening view and display the headings for the different panels for users born between 1954 and 1962', () => {
    const mockedState = mockBasicSuccessState(20, 1958);
    const mockStore = configureStore();
    let store = mockStore(mockedState);

    let view = render(<Provider store={store}><OpptjeningView/></Provider>);

    expect(view.queryAllByRole("heading")[0]).toHaveTextContent("beholdning-din-pensjonsbeholdning-i-folketrygden"); //Beholdning-panel
    expect(view.queryAllByRole("heading")[1]).toHaveTextContent("beholdning-and-pensjonspoeng-forklart"); //BeholdningAndPensjonspoengForklart-panel
    expect(view.queryAllByRole("heading")[2]).toHaveTextContent("beholdning-and-pensjonspoeng-forklart-pensjonspoeng-title"); //Subtitle in BeholdningAndPensjonspoengForklart Panel
    expect(view.queryAllByRole("heading")[3]).toHaveTextContent("beholdning-and-pensjonspoeng-forklart-pensjonsbeholdning-title"); //Subtitle in BeholdningAndPensjonspoengForklart Panel
    expect(view.queryAllByRole("heading")[4]).toHaveTextContent("chart-pensjonsbeholdningen-og-pensjonspoengene-dine"); //Chart - Chart-view
    expect(view.queryAllByRole("heading")[5]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar"); //OpptjeningDetails-panel
    expect(view.queryAllByRole("heading")[6]).toHaveTextContent("inntekt-pensjonsgivende-inntekter"); //Inntekter-panel
    expect(view.queryAllByRole("heading")[7]).toHaveTextContent("opptjening-flere-steder-title"); //OpptjeningFlereStederPanel
    expect(view.queryAllByRole("heading")[8]).toHaveTextContent("pensjonskalkulator-lenke-title"); //PensjonskalkulatorLenkePanel
    expect(view.queryAllByRole("heading")[9]).toHaveTextContent("faq-ofte-stilte-sporsmaal"); //FAQ-panel

    expect(view.queryAllByRole("table").length).toBe(1); // Chart tables
});

it('should render Opptjening view and display the headings for the different panels for users born before 1954', () => {
    const mockedState = mockBasicSuccessState(20, 1948);
    const mockStore = configureStore();
    let store = mockStore(mockedState);

    let view = render(<Provider store={store}><OpptjeningView/></Provider>);

    expect(view.queryAllByRole("heading")[0]).toHaveTextContent("pensjonspoeng-forklart"); //Pensjonspoeng
    expect(view.queryAllByRole("heading")[1]).toHaveTextContent("inntekt-pensjonsgivende-inntekter-og-pensjonspoeng"); //Inntekter-panel
    expect(view.queryAllByRole("heading")[2]).toHaveTextContent("opptjening-flere-steder-title"); //OpptjeningFlereStederPanel
    expect(view.queryAllByRole("heading")[3]).toHaveTextContent("pensjonskalkulator-lenke-title"); //PensjonskalkulatorLenkePanel
    expect(view.queryAllByRole("heading")[4]).toHaveTextContent("faq-ofte-stilte-sporsmaal"); //FAQ-panel
});

it('should render Opptjening view, open Pensjonsbeholdning forklart-panel and show explanation', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedState);

    let view = render(<Provider store={store}><OpptjeningView/></Provider>);
    fireEvent.click(view.queryAllByRole("heading")[1]);

    expect(view.queryAllByRole("heading")[1]).toHaveTextContent("pensjonsbeholdning-forklart");
});


it('should render Opptjening view, open OpptjeningDetails-panel and show details tables', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedState);

    let view = render(<Provider store={store}><OpptjeningView/></Provider>);
    fireEvent.click(view.queryAllByRole("heading")[3]); // OpptjeningDetails

    expect(view.queryAllByRole("table").length).toBe(2); // Chart tables + details tables
});

it('should render Opptjening view, open Inntekter-panel and display inntekter table', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedState);

    let view = render(<Provider store={store}><OpptjeningView/></Provider>);
    fireEvent.click(view.queryAllByRole("heading")[4]); // Inntekter
    expect(view.queryAllByRole("table").length).toBe(2); // Chart tables + inntekter table
});

it('should render Opptjening view, open details panel, and show correct beholdning for selected year', () =>{
    const mockStore = configureStore();
    const expectedBeholdning2000 = 1000000;
    const expectedBeholdning2001 = 2000000;
    const expectedBeholdning2002 = 3000000;
    const expectedBeholdning2003 = 4000000;


    const mockState = mockStateFromOpptjeningData(2000, [
        constructOpptjening({pensjonsbeholdning: expectedBeholdning2000}),
        constructOpptjening({pensjonsbeholdning: expectedBeholdning2001}),
        constructOpptjening({pensjonsbeholdning: expectedBeholdning2002}),
        constructOpptjening({pensjonsbeholdning: expectedBeholdning2003})
    ]);
    let store = mockStore(mockState);

    let view = render(<Provider store={store}><OpptjeningView/></Provider>);
    fireEvent.click(view.queryAllByRole("heading")[3]); // OpptjeningDetails
    fireEvent.change(view.getByTestId("year-selector"), {
        target: {
            value: "2002"
        }
    });
    expect(view.getByTestId("amount-opptjening-details-din-pensjonsbeholdning").textContent).toEqual(formatAmount(expectedBeholdning2002));

    fireEvent.change(view.getByTestId("year-selector"), {
        target: {
            value: "2003"
        }
    });
    expect(view.getByTestId("amount-opptjening-details-din-pensjonsbeholdning").textContent).toEqual(formatAmount(expectedBeholdning2003));
});

it('should Opptjening view, open details panel, select year and log two events to Amplitude', () => {
    let spy = jest.spyOn(amplitude, "logToAmplitude");
    const mockStore = configureStore();
    let store = mockStore(mockedState);

    let view = render(<Provider store={store}><OpptjeningView/></Provider>);

    fireEvent.click(view.queryAllByRole("heading")[3]); // OpptjeningDetails
    fireEvent.change(view.getByTestId("year-selector"), {
        target: {
            value: "2000"
        }
    });

    expect(spy).toBeCalledTimes(2)
});
