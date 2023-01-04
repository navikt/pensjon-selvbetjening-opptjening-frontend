import reducer from '../opptjeningReducer';
import * as actions from '../opptjeningActions';
import expect from 'expect';
import {mockBasicSuccessState} from "../../../__mocks__/mockDataGenerator";

const initialState = {
    opptjening: null,
    opptjeningLoading: true,
    opptjeningError: undefined
};

it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        byttBrukerError: undefined,
        byttBrukerLoading: false,
        byttBrukerSuccess: false,
        opptjening: null,
        opptjeningLoading: true,
        opptjeningError: undefined
    });
});

it('should handle FETCH_OPPTJENING_STARTED action', () =>{
    expect(reducer(initialState, actions.fetchOpptjeningStarted())).toEqual({
        opptjening: null,
        opptjeningLoading: true,
        opptjeningError: undefined
    });
});

it('should handle FETCH_OPPTJENING_SUCCESS action', () =>{
    const opptjeningResponse = mockBasicSuccessState(20, 1972)
    expect(reducer(initialState, actions.fetchOpptjeningSuccess(opptjeningResponse))).toEqual({
        opptjening: opptjeningResponse,
        opptjeningLoading: false
    });
});

it('should handle FETCH_OPPTJENING_FAILURE action', () =>{
    const error = {
       msg: "FAILURE"
    };

    expect(reducer(initialState, actions.fetchOpptjeningFailure(error))).toEqual({
        opptjening: null,
        opptjeningLoading: false,
        opptjeningError: error
    });
});
