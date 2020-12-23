import React from 'react';
import { render } from '@testing-library/react';
import {UserGroup} from './UserGroup';
import {
    BORN_AFTER_1962,
    BORN_IN_OR_BETWEEN_1954_AND_1962
} from "../../../common/userGroups";
import {Provider} from "react-redux";
import {mockStateFromOpptjeningData} from "../../../__mocks__/mockDataGenerator";
import configureStore from "redux-mock-store";

const mockStore = configureStore();
const mockState = mockStateFromOpptjeningData(2000, [], 1972);
let store = mockStore(mockState);

it('should render H1 for current usergroup', () => {
    const expectedTitle = "TITLE";
    const { getByRole } = render(
        <Provider store={store}>
            <UserGroup userGroups={[BORN_AFTER_1962]} include={true}>
                <h1>{expectedTitle}</h1>
            </UserGroup>
        </Provider>
    );

    expect(getByRole('heading')).toHaveTextContent(expectedTitle);
});

it('should not render H1 for current usergroup', () => {
    const expectedTitle = "TITLE";
    const { queryByRole } = render(
        <Provider store={store}>
            <UserGroup userGroups={[BORN_IN_OR_BETWEEN_1954_AND_1962]} include={true}>
                <h1>{expectedTitle}</h1>
            </UserGroup>
        </Provider>
    );

    expect(queryByRole('heading')).not.toBeInTheDocument();
});

it('should render H1 for usergroups for all usergroups but BORN_IN_OR_BETWEEN_1954_AND_1962', () => {
    const expectedTitle = "TITLE";
    const { getByRole } = render(
        <Provider store={store}>
            <UserGroup userGroups={[BORN_IN_OR_BETWEEN_1954_AND_1962]} include={false}>
                <h1>{expectedTitle}</h1>
            </UserGroup>
        </Provider>
    );

    expect(getByRole('heading')).toHaveTextContent(expectedTitle);
});
