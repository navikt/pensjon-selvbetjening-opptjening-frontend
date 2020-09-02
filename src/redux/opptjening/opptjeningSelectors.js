import _ from 'lodash';
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
    return Object.keys(opptjeningData).map((year) => opptjeningData[year].pensjonsbeholdning);
};

export const getYearArray = (state = initialState) => {
    const opptjeningData = state.opptjening.opptjening.opptjeningData;
    return Object.keys(opptjeningData).map((year) => year);
};

export const getOpptjeningByYear = (state = initialState, year) => {
    return state.opptjening.opptjening.opptjeningData[year];
};

export const getLatestPensjonsBeholdningAndInntekt = (state = initialState) => {
    const oData = state.opptjening.opptjening.opptjeningData;
    const lastYear = _.max(Object.keys(oData), o => oData[o]);
    return {
        "year": lastYear,
        "beholdning": oData[lastYear].pensjonsbeholdning,
        "pensjonsgivendeInntekt": oData[lastYear].pensjonsgivendeInntekt
    };
};
