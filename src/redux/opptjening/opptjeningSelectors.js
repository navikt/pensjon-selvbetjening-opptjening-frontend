export const initialState = {
    opptjening: null,
    opptjeningLoading: true,
    opptjeningError: undefined
};

export const getOpptjening = (state = initialState) => state.opptjening.opptjening;
export const getOpptjeningLoading = (state = initialState) => state.opptjening.opptjeningLoading;
export const getOpptjeningError = (state = initialState) => state.opptjening.opptjeningError;

export const getPensjonsBeholdningArray = (state = initialState) => {
    const opptjeningData = state.opptjening.opptjening.opptjeningData;
    const pensjonsBeholdningArray = Object.keys(opptjeningData).map((year) => opptjeningData[year].pensjonsbeholdning);

    return pensjonsBeholdningArray;
};

export const getYearArray = (state = initialState) => {
    const opptjeningData = state.opptjening.opptjening.opptjeningData;
    const yearArray = Object.keys(opptjeningData).map((year) => year);

    return yearArray;
};
