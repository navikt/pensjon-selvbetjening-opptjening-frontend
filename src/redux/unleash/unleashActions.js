export const FETCH_UNLEASH_STARTED = "FETCH_UNLEASH_STARTED";
export const FETCH_UNLEASH_SUCCESS = "FETCH_UNLEASH_SUCCESS";
export const FETCH_UNLEASH_FAILURE = "FETCH_UNLEASH_FAILURE";

export const fetchUnleashStarted = (toggleNames) => {
    return {
        type: FETCH_UNLEASH_STARTED,
        toggleNames,
    }
};

export const fetchUnleashSuccess = (unleash) => {
    return {
        type: FETCH_UNLEASH_SUCCESS,
        unleash,
    }
};

export const fetchUnleashFailure = (error) => {
    return {
        type: FETCH_UNLEASH_FAILURE,
        error: error
    }
};

