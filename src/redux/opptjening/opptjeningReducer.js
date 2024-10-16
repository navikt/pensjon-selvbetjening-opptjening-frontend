import {initialState} from './opptjeningSelectors'
import {
    FETCH_OPPTJENING_STARTED,
    FETCH_OPPTJENING_SUCCESS,
    FETCH_OPPTJENING_FAILURE,
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
        default:
            return state
    }
}

export default reducer;
