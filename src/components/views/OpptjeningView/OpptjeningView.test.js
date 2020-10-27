import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { OpptjeningView} from './OpptjeningView';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import mock from '../../../__mocks__/mock'

const mockedState = {
    opptjening:{
        ...mock,
        opptjeningLoading: false
    }
};

it('should render Opptjening view and display only the headings for the different panels', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedState);

    let view = render(<Provider store={store}><OpptjeningView/></Provider>);

    expect(view.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-your-pension-assets-in-folketrygden"); //Beholdning-panel
    expect(view.queryAllByRole("heading")[1]).toHaveTextContent("pensjonsbeholdning-forklart"); //BeholdningForklart-panel
    expect(view.queryAllByRole("heading")[2]).toHaveTextContent("chart-pensjonsbeholdningen-din"); //Chart - Chart-view
    expect(view.queryAllByRole("heading")[3]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar"); //OpptjeningDetails-panel
    expect(view.queryAllByRole("heading")[4]).toHaveTextContent("opptjening-pensjonsgivende-inntekter"); //Inntekter-panel
    expect(view.queryAllByRole("heading")[5]).toHaveTextContent("faq-ofte-stilte-sporsmaal"); //FAQ-panel

    expect(view.queryAllByRole("table").length).toBe(2); // Chart tables
});

it('should render Opptjening view, open OpptjeningDetails-panel and show details tables', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedState);

    let view = render(<Provider store={store}><OpptjeningView/></Provider>);
    fireEvent.click(view.queryAllByRole("heading")[3]); // OpptjeningDetails

    expect(view.queryAllByRole("table").length).toBe(3); // Chart tables + details tables
});

it('should render Opptjening view, open Inntekter-panel and display inntekter table', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedState);

    let view = render(<Provider store={store}><OpptjeningView/></Provider>);
    fireEvent.click(view.queryAllByRole("heading")[4]); // Inntekter
    expect(view.queryAllByRole("table").length).toBe(3); // Chart tables + inntekter table
});
