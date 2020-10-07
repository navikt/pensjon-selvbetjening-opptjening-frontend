import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import mock from '../../../__mocks__/mock'
import {HomePage} from "./HomePage";
import {BrowserRouter as Router} from "react-router-dom";

const mockedStateSuccess = {
    opptjening:{
        ...mock,
        opptjeningLoading: false
    }
};

const mockedStateLoading = {
    opptjening:{
        opptjeningLoading: true
    }
};

const mockedStateError = {
    opptjening:{
        opptjeningLoading: false,
        opptjeningError: {
            message: "ERROR"
        }
    }
};

const mockStore = configureStore();

it('should render homepage with languageSelector, topBanner, breadcrumbs and body', () => {
    let store = mockStore(mockedStateSuccess);
    let page = render(<Provider store={store}><Router><HomePage/></Router></Provider>);

    expect(page.getByTestId("language-selector")).toBeVisible();
    expect(page.getByTestId("topbanner")).toBeVisible();
    expect(page.getByTestId("breadcrumbs")).toBeVisible();
    expect(page.getByTestId("opptjeningview")).toBeVisible();
});

it('should render homepage with languageSelector, topBanner, breadcrumbs and loading spinner', () => {
    let store = mockStore(mockedStateLoading);
    let page = render(<Provider store={store}><Router><HomePage/></Router></Provider>);

    expect(page.getByTestId("language-selector")).toBeVisible();
    expect(page.getByTestId("topbanner")).toBeVisible();
    expect(page.getByTestId("breadcrumbs")).toBeVisible();
    expect(page.queryByTestId("opptjeningview")).not.toBeInTheDocument();
    expect(page.getByTestId("opptjening-loading")).toBeVisible();
});

it('should render homepage with languageSelector, topBanner, breadcrumbs and error-message', () => {
    let store = mockStore(mockedStateError);
    let page = render(<Provider store={store}><Router><HomePage/></Router></Provider>);

    expect(page.getByTestId("language-selector")).toBeVisible();
    expect(page.getByTestId("topbanner")).toBeVisible();
    expect(page.getByTestId("breadcrumbs")).toBeVisible();
    expect(page.queryByTestId("opptjeningview")).not.toBeInTheDocument();
    expect(page.getByTestId("opptjening-error")).toBeVisible();
});






