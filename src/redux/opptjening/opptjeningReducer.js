import {initialState} from './opptjeningSelectors'
import {
    FETCH_OPPTJENING_STARTED,
    FETCH_OPPTJENING_SUCCESS,
    FETCH_OPPTJENING_FAILURE,
    BYTT_BRUKER_STARTED, BYTT_BRUKER_SUCCESS, BYTT_BRUKER_FAILURE, RESET_BYTT_BRUKER
} from './opptjeningActions'

const reducer =  (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OPPTJENING_STARTED:
            return {
                ...state,
                opptjeningLoading: true,
                opptjeningError: undefined
            };

        case FETCH_OPPTJENING_SUCCESS:
            return {
                ...state,
                opptjening: action.opptjening,
                opptjeningLoading: false,
            };

        case FETCH_OPPTJENING_FAILURE:
            return {
                ...state,
                opptjeningLoading: false,
                opptjeningError: action.error
            };
        case BYTT_BRUKER_STARTED:
            return {
                ...state,
                byttBrukerLoading: true,
                byttBrukerSuccess: false,
                byttBrukerError: null,
                authentication: null
            };

        case BYTT_BRUKER_SUCCESS:
            return {
                ...state,
                byttBrukerLoading: false,
                byttBrukerSuccess: true,
                byttBrukerError: null,
                authentication: {
                    authenticated: true,
                    loggedOut: null
                }
            };

        case BYTT_BRUKER_FAILURE:
            return {
                ...state,
                byttBrukerLoading: false,
                byttBrukerSuccess: false,
                byttBrukerError: action.error,
                authentication: {
                    authenticated: action.error.message !== "error-status-401",
                    loggedOut: action.error.message === "error-status-401" ? true : null
                }
            };

        case RESET_BYTT_BRUKER:
            return {
                ...state,
                byttBrukerLoading: false,
                byttBrukerSuccess: false,
                byttBrukerError: null,
            }
        default:
            return state
    }
}

export default reducer;
