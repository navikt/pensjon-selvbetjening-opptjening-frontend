import { runSaga } from 'redux-saga';
import * as api from '../../../api/api';
import {fetchUnleash} from '../unleashSaga';
import {fetchUnleashSuccess, fetchUnleashFailure} from "../unleashActions";

const mock = {
    unleash: {
        toggles:{
            toggle1: true,
            toggle2: false
        }
    }
};

it('should call api and dispatch success action', async () => {
    const fetchPost = jest.spyOn(api, 'fetchPost')
         .mockImplementation(() => Promise.resolve(mock));
    const dispatched = [];
    await runSaga({dispatch: (action) => dispatched.push(action)}, fetchUnleash, {toggleNames: ["toggle1", "toggle2"]});

    expect(fetchPost).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([fetchUnleashSuccess(mock)]);
    fetchPost.mockClear();
});

it('should call api and dispatch error action', async () => {
    const fetchPost = jest.spyOn(api, 'fetchPost')
        .mockImplementation(() => Promise.reject());
    const dispatched = [];
    await runSaga({dispatch: (action) => dispatched.push(action)}, fetchUnleash, {toggleNames: ["toggle1", "toggle2"]});

    expect(fetchPost).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([fetchUnleashFailure()]);
    fetchPost.mockClear();
});
