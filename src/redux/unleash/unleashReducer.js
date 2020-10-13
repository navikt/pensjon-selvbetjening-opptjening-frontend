import {initialState} from './unleashSelectors'
import {FETCH_UNLEASH_STARTED, FETCH_UNLEASH_SUCCESS, FETCH_UNLEASH_FAILURE} from './unleashActions'

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_UNLEASH_STARTED:
            return {
                ...state,
                unleashLoading: true,
                unleashError: undefined
            };

        case FETCH_UNLEASH_SUCCESS:
            return {
                ...state,
                unleash: action.unleash,
                unleashLoading: false,
            };

        case FETCH_UNLEASH_FAILURE:
            return {
                ...state,
                unleashLoading: false,
                unleashError: action.error
            };
        default:
            return state
    }
}
