import reducer from '../unleashReducer';
import * as actions from '../unleashActions';
import expect from 'expect';

const initialState = {
    unleash: null,
    unleashLoading: false,
    unleashError: undefined
};

it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        unleash: null,
        unleashLoading: false,
        unleashError: undefined
    });
});

it('should handle FETCH_UNLEASH_STARTED action', () =>{
    expect(reducer(initialState, actions.fetchUnleashStarted())).toEqual({
        unleash: null,
        unleashLoading: true,
        unleashError: undefined
    });
});

it('should handle FETCH_UNLEASH_SUCCESS action', () =>{
    const unleashResponse = {

    };
    expect(reducer(initialState, actions.fetchUnleashSuccess(unleashResponse))).toEqual({
        unleash: unleashResponse,
        unleashLoading: false
    });
});

it('should handle FETCH_UNLEASH_FAILURE action', () =>{
    const error = {
       msg: "FAILURE"
    };

    expect(reducer(initialState, actions.fetchUnleashFailure(error))).toEqual({
        unleash: null,
        unleashLoading: false,
        unleashError: error
    });
});
