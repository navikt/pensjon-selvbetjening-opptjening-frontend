import * as actions from '../opptjeningActions'

it('should create an action fetchOpptjeningStarted', () => {
    const expectedAction = {
        type: actions.FETCH_OPPTJENING_STARTED,
    };
    expect(actions.fetchOpptjeningStarted()).toEqual(expectedAction);
});

it('should create an action fetchOpptjeningSuccess', () => {
    const opptjening = "Opptjening";
    const expectedAction = {
        type: actions.FETCH_OPPTJENING_SUCCESS,
        opptjening
    };
    expect(actions.fetchOpptjeningSuccess(opptjening)).toEqual(expectedAction);
});

it('should create an action fetchOpptjeningFailure', () => {
    const error = "ERROR";
    const expectedAction = {
        type: actions.FETCH_OPPTJENING_FAILURE,
        error
    };
    expect(actions.fetchOpptjeningFailure(error)).toEqual(expectedAction);
});

