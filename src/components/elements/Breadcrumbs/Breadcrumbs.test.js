import React from 'react'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'

import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Breadcrumbs from "./Breadcrumbs";

it('renders the breadcrumb for frontpage', () => {
    const mockStore = configureStore();
    let store = mockStore({});

    const history = createMemoryHistory();
    history.push('/');
    const breadcrumb = render(
        <Provider store={store}>
            <Router history={history}>
                <Breadcrumbs />
            </Router>
        </Provider>
    );

    expect(breadcrumb.getByText("dinpensjon-title")).toBeInTheDocument();
    expect(breadcrumb.getByText("opptjening-title")).toBeInTheDocument();
});


it('renders the breadcrumb for the FAQ page', () => {
    const mockStore = configureStore();
    let store = mockStore({});

    const history = createMemoryHistory();
    history.push('/faq');
    const breadcrumb = render(
        <Provider store={store}>
            <Router history={history}>
                <Breadcrumbs />
            </Router>
        </Provider>
    );

    expect(breadcrumb.getByText("dinpensjon-title")).toBeInTheDocument();
    expect(breadcrumb.getByText("opptjening-title")).toBeInTheDocument();
    expect(breadcrumb.getByText("faq-title")).toBeInTheDocument();
});

it('renders the breadcrumb for the 404 page', () => {
    const mockStore = configureStore();
    let store = mockStore({});

    const history = createMemoryHistory();
    history.push('/404');
    const breadcrumb = render(
        <Provider store={store}>
            <Router history={history}>
                <Breadcrumbs />
            </Router>
        </Provider>
    );

    expect(breadcrumb.getByText("dinpensjon-title")).toBeInTheDocument();
    expect(breadcrumb.getByText("opptjening-title")).toBeInTheDocument();
    expect(breadcrumb.getByText("404-title")).toBeInTheDocument();
});
