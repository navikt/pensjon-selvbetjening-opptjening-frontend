import React from 'react'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { App } from './App'
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import mock from "../../__mocks__/mock";

const mockedStateSuccess = {
    opptjening:{
        ...mock,
        opptjeningLoading: false
    }
};

it('renders the frontpage and renders the opptjening-title in the banner and the breadcumb', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedStateSuccess);

    const history = createMemoryHistory();
    history.push('/');
    const {getByText, getAllByText} = render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );
    expect(getByText("dinpensjon-title")).toBeInTheDocument(); // Breadbrumb
    expect(getAllByText("opptjening-title")[0]).toBeInTheDocument();
    expect(getAllByText("opptjening-title")[1]).toBeInTheDocument();

});

it('navigates to 404-page and renders the 404-title in the banner and the breadcrumb', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedStateSuccess);

    const history = createMemoryHistory();
    history.push('/404');
    const {getByText, getAllByText} = render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );
    expect(getByText("dinpensjon-title")).toBeInTheDocument();
    expect(getAllByText("opptjening-title")[0]).toBeInTheDocument();
    expect(getAllByText("404-title")[0]).toBeInTheDocument();
    expect(getAllByText("404-title")[1]).toBeInTheDocument();
});




