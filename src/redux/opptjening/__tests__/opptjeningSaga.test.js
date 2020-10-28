import { runSaga } from 'redux-saga';
import * as api from '../../../api/api';
import { fetchOpptjeningSuccess, fetchOpptjeningFailure } from '../opptjeningActions';
import {fetchOpptjening} from '../opptjeningSaga';
import {mockBasicSuccessState} from "../../../__mocks__/mockDataGenerator";

const mock = mockBasicSuccessState(20, 1972)

it('should call api and dispatch success action', async () => {
    const fetchToJson = jest.spyOn(api, 'fetchToJson')
        .mockImplementation(() => Promise.resolve(mock));
    const dispatched = [];
    await runSaga({dispatch: (action) => dispatched.push(action)}, fetchOpptjening);

    expect(fetchToJson).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([fetchOpptjeningSuccess(mock)]);
    fetchToJson.mockClear();
});

it('should call api and dispatch error action', async () => {
    const fetchToJson = jest.spyOn(api, 'fetchToJson')
        .mockImplementation(() => Promise.reject());
    const dispatched = [];
    await runSaga({dispatch: (action) => dispatched.push(action)}, fetchOpptjening);

    expect(fetchToJson).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([fetchOpptjeningFailure()]);
    fetchToJson.mockClear();
});
