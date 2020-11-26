import React from 'react';
import {render} from '@testing-library/react';
import {UnleashContainer} from './UnleashContainer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import { useSelector, useDispatch } from 'react-redux';
import * as amplitude from "../../common/amplitude";
import * as api from "../../api/api";

const mockedStateSuccess = {
    unleash: {
        unleash: {
            toggles: {
                "toggle1": true,
                "toggle2": false
            }
        },
        unleashLoading: false
    }
};

const mockedStateFailure = {
    unleash:{
        unleash: undefined,
        unleashLoading: false
    }
};

const mockedStateLoading = {
    unleash:{
        unleash: undefined,
        unleashLoading: true
    }
};




it('Should render loading spinner', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedStateLoading);

    const { getByTestId } = render(
        <Provider store={store}>
            <UnleashContainer/>
        </Provider>
    );

    expect(getByTestId("unleash-loading")).toBeVisible();
});

it('Should not render loading spinner, and render children for success state', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedStateSuccess);

    const { queryByTestId, getByRole } = render(
        <Provider store={store}>
            <UnleashContainer>
                <h1>TEST</h1>
            </UnleashContainer>
        </Provider>
    );

    expect(queryByTestId("unleash-loading")).not.toBeInTheDocument();
    expect(getByRole("heading")).toHaveTextContent("TEST");
});

it('Should not render loading spinner, and render children for failure state', () => {
    const mockStore = configureStore();
    let store = mockStore(mockedStateFailure);

    const { queryByTestId, getByRole } = render(
        <Provider store={store}>
            <UnleashContainer>
                <h1>TEST</h1>
            </UnleashContainer>
        </Provider>
    );

    expect(queryByTestId("unleash-loading")).not.toBeInTheDocument();
    expect(getByRole("heading")).toHaveTextContent("TEST");
});
