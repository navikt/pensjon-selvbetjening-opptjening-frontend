import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mockBasicSuccessState, mockErrorState, mockLoadingState } from "../../../__mocks__/mockDataGenerator";
import { HomePage } from "./HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import { axe } from "jest-axe";

const mockedStateSuccess = mockBasicSuccessState(20, 1972)
const mockedStateLoading = mockLoadingState()
const mockedStateError = mockErrorState()
const mockStore = configureStore();


it('should not fail any accessibility tests', async () => {
    let store = mockStore(mockedStateSuccess);
    const { container } = render(<Provider store={store}><Router><HomePage/></Router></Provider>);
    expect(await axe(container)).toHaveNoViolations();
});

it('should render homepage with languageSelector, topBanner, breadcrumbs and body', () => {
    let store = mockStore(mockedStateSuccess);
    let page = render(<Provider store={store}><Router><HomePage/></Router></Provider>);

    expect(page.getByTestId("topbanner")).toBeVisible();
    expect(page.getByTestId("opptjeningview")).toBeVisible();
});

it('should render homepage with languageSelector, topBanner, breadcrumbs and loading spinner', () => {
    let store = mockStore(mockedStateLoading);
    let page = render(<Provider store={store}><Router><HomePage/></Router></Provider>);

    expect(page.getByTestId("topbanner")).toBeVisible();
    expect(page.queryByTestId("opptjeningview")).not.toBeInTheDocument();
    expect(page.getByTestId("opptjening-loading")).toBeVisible();
});

it('should render homepage with languageSelector, topBanner, breadcrumbs and error-message', () => {
    let store = mockStore(mockedStateError);
    let page = render(<Provider store={store}><Router><HomePage/></Router></Provider>);

    expect(page.getByTestId("topbanner")).toBeVisible();
    expect(page.queryByTestId("opptjeningview")).not.toBeInTheDocument();
    expect(page.getByTestId("opptjening-error")).toBeVisible();
});






