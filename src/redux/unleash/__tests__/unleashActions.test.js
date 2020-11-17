import * as actions from '../unleashActions'

it('should create an action fetchUnleashStarted', () => {
    const expectedAction = {
        type: actions.FETCH_UNLEASH_STARTED
    };
    expect(actions.fetchUnleashStarted()).toEqual(expectedAction);
});

it('should create an action fetchUnleashSuccess', () => {
    const unleash = "Unleash";
    const expectedAction = {
        type: actions.FETCH_UNLEASH_SUCCESS,
        unleash
    };
    expect(actions.fetchUnleashSuccess(unleash)).toEqual(expectedAction);
});

it('should create an action fetchUnleashFailure', () => {
    const error = "ERROR";
    const expectedAction = {
        type: actions.FETCH_UNLEASH_FAILURE,
        error
    };
    expect(actions.fetchUnleashFailure(error)).toEqual(expectedAction);
});

