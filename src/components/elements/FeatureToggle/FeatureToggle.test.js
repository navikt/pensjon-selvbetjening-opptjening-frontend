import React from 'react';
import { render } from '@testing-library/react';
import {FeatureToggle} from './FeatureToggle';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
const mockStore = configureStore();

const mockedState = {
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

it('should render the children of FeatureToggle tag', () => {
    let store = mockStore(mockedState);
    const expectedTitle = "FEATURE ENABLED";
    const { getByRole } = render(
        <Provider store={store}>
            <FeatureToggle featureName="toggle1" enabled={true}>
                <h1>{expectedTitle}</h1>
            </FeatureToggle>
        </Provider>);
    expect(getByRole('heading')).toHaveTextContent(expectedTitle);
});

it('should render the children of FeatureToggle tag', () => {
    let store = mockStore(mockedState);
    const expectedTitle = "FEATURE DISABLED";
    const { getByRole } = render(
        <Provider store={store}>
            <FeatureToggle featureName="toggle2" enabled={false}>
                <h1>{expectedTitle}</h1>
            </FeatureToggle>
        </Provider>);
    expect(getByRole('heading')).toHaveTextContent(expectedTitle);
});

it('should not render the children of FeatureToggle tag', () => {
    let store = mockStore(mockedState);
    const expectedTitle = "TITLE";
    const { queryByRole } = render(
        <Provider store={store}>
            <FeatureToggle featureName="toggle1" enabled={false}>
                <h1>{expectedTitle}</h1>
            </FeatureToggle>
        </Provider>);
    expect(queryByRole('heading')).not.toBeInTheDocument();
});




