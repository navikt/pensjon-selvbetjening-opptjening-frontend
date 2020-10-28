import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Breadcrumbs from "./Breadcrumbs";


import {axe} from "jest-axe";

it('should not fail any accessibility tests', async () => {
    const mockStore = configureStore();
    let store = mockStore({});

    const history = createMemoryHistory();
    history.push('/');
    const {container} = render(
        <Provider store={store}>
            <Router history={history}>
                <Breadcrumbs />
            </Router>
        </Provider>
    );

    expect(await axe(container)).toHaveNoViolations();
});

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
