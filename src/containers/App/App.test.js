import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { App } from './App'
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mockBasicSuccessState } from "../../__mocks__/mockDataGenerator";

const mockedStateSuccess = mockBasicSuccessState(20, 1972)

it('renders the frontpage and renders the opptjening-tittel in the banner', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedStateSuccess);

    const history = createMemoryHistory();
    history.push('/nb/');
    const {getAllByText} = render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );
    expect(getAllByText("opptjening-tittel")[0]).toBeInTheDocument();
});

it('navigates to 404-page and renders the 404-title in the banner', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedStateSuccess);

    const history = createMemoryHistory();
    history.push('/nb/404');
    const {getAllByText} = render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );
    expect(getAllByText("404-title")[0]).toBeInTheDocument();
});




