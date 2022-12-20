export const FETCH_OPPTJENING_STARTED = "FETCH_OPPTJENING_STARTED";
export const FETCH_OPPTJENING_SUCCESS = "FETCH_OPPTJENING_SUCCESS";
export const FETCH_OPPTJENING_FAILURE = "FETCH_OPPTJENING_FAILURE";
export const BYTT_BRUKER_STARTED = "BYTT_BRUKER_STARTED";
export const BYTT_BRUKER_SUCCESS = "BYTT_BRUKER_SUCCESS";
export const BYTT_BRUKER_FAILURE = "BYTT_BRUKER_FAILURE";
export const RESET_BYTT_BRUKER = "RESET_BYTT_BRUKER";

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

export const byttBrukerStarted = (data, navigateToForside) => {
    return {
        type: BYTT_BRUKER_STARTED,
        data,
        navigateToForside
    }
};

export const byttBrukerSuccess = () => {
    return {
        type: BYTT_BRUKER_SUCCESS,
    }
};

export const byttBrukerFailure = (error) => {
    return {
        type: BYTT_BRUKER_FAILURE,
        error: error
    }
};

export const resetByttBruker = () => {
    return {
        type: RESET_BYTT_BRUKER
    }
};

