export const FETCH_OPPTJENING_STARTED = "FETCH_OPPTJENING_STARTED";
export const FETCH_OPPTJENING_SUCCESS = "FETCH_OPPTJENING_SUCCESS";
export const FETCH_OPPTJENING_FAILURE = "FETCH_OPPTJENING_FAILURE";

export const fetchOpptjeningStarted = () => {
    return {
        type: FETCH_OPPTJENING_STARTED
    }
};

export const fetchOpptjeningSuccess = (opptjening) => {
    return {
        type: FETCH_OPPTJENING_SUCCESS,
        opptjening,
    }
};

export const fetchOpptjeningFailure = (error) => {
    return {
        type: FETCH_OPPTJENING_FAILURE,
        error: error
    }
};
