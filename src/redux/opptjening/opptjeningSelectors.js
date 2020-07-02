export const initialState = {
    opptjening: null,
    opptjeningLoading: true,
    opptjeningError: undefined
};

export const getOpptjening = (state = initialState) => state.opptjening.opptjening;
export const getOpptjeningLoading = (state = initialState) => state.opptjening.opptjeningLoading;
export const getOpptjeningError = (state = initialState) => state.opptjening.opptjeningError;
