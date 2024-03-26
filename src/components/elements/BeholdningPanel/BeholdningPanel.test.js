import React from 'react';
import { render } from '@testing-library/react';
import {BeholdningPanel} from './BeholdningPanel';
import {formatAmount} from "../../../common/utils";
import configureStore from "redux-mock-store";
import {mockBasicSuccessState} from "../../../__mocks__/mockDataGenerator";
import {Provider} from "react-redux";

const mockStore = configureStore();

it('renders the Beholdning panel with correct heading and correct amount for assets', () => {
    let store = mockStore(mockBasicSuccessState);
    const panel = render(
    <Provider store={store}>
        <BeholdningPanel data={{'beholdning': "1200000"}}/>
    </Provider>);

    expect(panel.getByRole("heading")).toHaveTextContent("beholdning-din-pensjonsbeholdning-i-folketrygden");
    expect(panel.getByTestId("assets").textContent).toEqual("kr " + formatAmount(1200000));
});
