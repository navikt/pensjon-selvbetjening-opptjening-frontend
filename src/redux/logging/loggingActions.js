export const LOGGING_STARTED = "LOGGING_STARTED";
export const LOGGING_SUCCESS = "LOGGING_SUCCESS";
export const LOGGING_ERROR = "LOGGING_ERROR";


export const loggingStarted = (data) => {
    return {
        type: LOGGING_STARTED,
        data
    }
}

export const loggedSucces = () => {
    return {
        type: LOGGING_SUCCESS
    }
}

export const errorLogging = (error) => {
    return {
        type: LOGGING_ERROR,
        error
    }
}