import _ from 'lodash';
import {BORN_BEFORE_1943, BORN_AFTER_1963, BORN_BETWEEN_1943_AND_1954, BORN_BETWEEN_1954_AND_1963} from "../../common/userGroups";

export const initialState = {
    opptjening: null,
    opptjeningLoading: true,
    opptjeningError: undefined
};

export const getOpptjening = (state = initialState) => state.opptjening ? state.opptjening.opptjening : null;
export const getOpptjeningLoading = (state = initialState) => state.opptjening ? state.opptjening.opptjeningLoading : true;
export const getOpptjeningError = (state = initialState) => state.opptjening ? state.opptjening.opptjeningError : undefined;
export const getOpptjeningData =  (state = initialState) => state.opptjening ? state.opptjening.opptjening.opptjeningData : {};
export const getFodselsAar = (state = initialState) => state.opptjening ? state.opptjening.opptjening.fodselsaar : null;

export const getOpptjeningDataWithoutNullYears =  (state = initialState) => {
    //Make a copy of opptjeningData before filtering
    const opptjeningData = {...getOpptjeningData(state)};
    let prev = null;
    Object.keys(opptjeningData).every((year) => {
        prev = opptjeningData[year].pensjonsbeholdning;
        if(prev !== null) return false;
        if(opptjeningData[year].pensjonsbeholdning === null){
            delete opptjeningData[year];
        }
        return true;
    });
    return opptjeningData
};


export const getPensjonsBeholdningArray = (state = initialState) => {
    const opptjeningData = getOpptjeningDataWithoutNullYears(state);
    return Object.keys(opptjeningData).map((year) => opptjeningData[year].pensjonsbeholdning);
};

export const getYearArray = (state = initialState) => {
    const opptjeningData = getOpptjeningDataWithoutNullYears(state);
    return Object.keys(opptjeningData).map((year) => year);
};

export const getOpptjeningByYear = (state = initialState, year) => {
    return state.opptjening ? state.opptjening.opptjening.opptjeningData[year] : null;
};

export const getLatestPensjonsBeholdning = (state = initialState) => {
    const opptjeningData = getOpptjeningDataWithoutNullYears(state);
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

export const getInntekterPoengAndMerknader = (state = initialState) => {
    const opptjeningData = getOpptjeningData(state);
    let returnObject = {};
    Object.keys(opptjeningData).map((year) => {
        return returnObject[year] = {
            "pensjonsgivendeInntekt": opptjeningData[year].pensjonsgivendeInntekt,
            "merknader": opptjeningData[year].merknader,
            "pensjonsPoeng": opptjeningData[year].pensjonspoeng
        }
    });
    return returnObject;
};

export const getUserGroup = (state = initialState) => {
    const fodselsAar = getFodselsAar(state);
    if(fodselsAar >= 1943 && fodselsAar<1954){
        return BORN_BETWEEN_1943_AND_1954;
    } else if (fodselsAar >= 1954 && fodselsAar < 1963) {
        return BORN_BETWEEN_1954_AND_1963
    } else if (fodselsAar > 1962){
        return BORN_AFTER_1963
    } else {
        return BORN_BEFORE_1943;
    }
};
