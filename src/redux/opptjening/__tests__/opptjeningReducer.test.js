import reducer from '../opptjeningReducer';
import * as actions from '../opptjeningActions';
import expect from 'expect';
import mock from '../../../__mocks__/mock'

const initialState = {
    opptjening: null,
    opptjeningLoading: true,
    opptjeningError: undefined
};

it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
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
    const opptjeningResponse = mock;
    expect(reducer(initialState, actions.fetchOpptjeningSuccess(opptjeningResponse))).toEqual({
        opptjening: opptjeningResponse,
        opptjeningLoading: false
    });
});

it('should handle FETCH_OPPTJENING_SUCCESS action', () =>{
    const error = {
       msg: "FAILURE"
    };

    expect(reducer(initialState, actions.fetchOpptjeningFailure(error))).toEqual({
        opptjening: null,
        opptjeningLoading: false,
        opptjeningError: error
    });
});
