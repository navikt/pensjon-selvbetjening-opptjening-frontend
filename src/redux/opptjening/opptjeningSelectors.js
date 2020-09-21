import _ from 'lodash';
export const initialState = {
    opptjening: null,
    opptjeningLoading: true,
    opptjeningError: undefined
};

export const getOpptjening = (state = initialState) => state.opptjening ? state.opptjening.opptjening : null;
export const getOpptjeningLoading = (state = initialState) => state.opptjening ? state.opptjening.opptjeningLoading : true;
export const getOpptjeningError = (state = initialState) => state.opptjening ? state.opptjening.opptjeningError : undefined;
export const getOpptjeningData =  (state = initialState) => state.opptjening ? state.opptjening.opptjening.opptjeningData : {};

export const getPensjonsBeholdningArray = (state = initialState) => {
    const opptjeningData = getOpptjeningData(state);
    return Object.keys(opptjeningData).map((year) => opptjeningData[year].pensjonsbeholdning);
};

export const getYearArray = (state = initialState) => {
    const opptjeningData = getOpptjeningData(state);
    return Object.keys(opptjeningData).map((year) => year);
};

export const getOpptjeningByYear = (state = initialState, year) => {
    return state.opptjening ? state.opptjening.opptjening.opptjeningData[year] : null;
};

export const getLatestPensjonsBeholdning = (state = initialState) => {
    const opptjeningData = getOpptjeningData(state);
    const lastYear = _.max(Object.keys(opptjeningData));
    return {
        "year": lastYear,
        "beholdning": !_.isEmpty(opptjeningData) ? opptjeningData[lastYear].pensjonsbeholdning : null,
    };
};

export const getInntekter = (state = initialState) => {
    const opptjeningData = getOpptjeningData(state);
    return Object.keys(opptjeningData).map((year) => {
        return {
            "year": year,
            "pensjonsgivendeInntekt": opptjeningData[year].pensjonsgivendeInntekt
        }
    });
};

