import _ from 'lodash';
import {BORN_BEFORE_1943, BORN_AFTER_1962, BORN_IN_OR_BETWEEN_1943_AND_1953, BORN_IN_OR_BETWEEN_1954_AND_1962} from "../../common/userGroups";

export const initialState = {
    opptjening: null,
    opptjeningLoading: true,
    opptjeningError: undefined,
    byttBrukerLoading: false,
    byttBrukerSuccess: false,
    byttBrukerError: undefined
};

export const getOpptjening = (state = initialState) => state.opptjening ? state.opptjening.opptjening : null;
export const getOpptjeningLoading = (state = initialState) => state.opptjening ? state.opptjening.opptjeningLoading : true;
export const getOpptjeningError = (state = initialState) => state.opptjening ? state.opptjening.opptjeningError : undefined;
export const getOpptjeningData =  (state = initialState) => state.opptjening && state.opptjening.opptjening.opptjeningData ? state.opptjening.opptjening.opptjeningData : {};
export const getFodselsAar = (state = initialState) => state.opptjening ? state.opptjening.opptjening.fodselsaar : null;
export const getPid = (state = initialState) => state.opptjening ? state.opptjening.opptjening.pid : null;
export const getFullmektigPid = (state = initialState) => state.opptjening && state.opptjening.opptjening ? state.opptjening.opptjening.fullmektigPid : "";
export const getFornavn = (state = initialState) => state.opptjening && state.opptjening.opptjening && state.opptjening.opptjening.fornavn ? state.opptjening.opptjening.fornavn : null;
export const getMellomnavn = (state = initialState) => state.opptjening && state.opptjening.opptjening && state.opptjening.opptjening.mellomnavn? state.opptjening.opptjening.mellomnavn : null;
export const getEtternavn = (state = initialState) => state.opptjening && state.opptjening.opptjening && state.opptjening.opptjening.etternavn? state.opptjening.opptjening.etternavn : null;
export const getAndelPensjonBasertPaBeholdning = (state = initialState) => state.opptjening ? state.opptjening.opptjening.andelPensjonBasertPaBeholdning : null;
export const getAntallAarPensjonsPoeng = (state = initialState) => state.opptjening ? state.opptjening.opptjening.numberOfYearsWithPensjonspoeng : null;

export const getOmsorgsOpptjeningMap = (state = initialState) => {
    const opptjeningData = getOpptjeningData(state);
    let omsorgsOpptjeningMap ={};
    Object.keys(opptjeningData).forEach((year) => {
        omsorgsOpptjeningMap[year] = {
            hasOmsorgsOpptjening: opptjeningData[year].merknader.includes("OMSORGSOPPTJENING") || opptjeningData[year].merknader.includes("OVERFORE_OMSORGSOPPTJENING")
        }
    });

    return omsorgsOpptjeningMap;
};

export const hasOverforeOmsorgsOpptjeningLink = (state = initialState) => {
    const opptjeningData = getOpptjeningData(state);
    for (let year of Object.keys(opptjeningData)) {
        if(opptjeningData[year].merknader.includes("OVERFORE_OMSORGSOPPTJENING")) return true;
    }
    return false;
};

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

export const getUttakForYear = (state = initialState, year) => {
    const opptjeningData = getOpptjeningData(state);
    const endringOpptjening = opptjeningData[year].endringOpptjening;
    let previousUttak;
    return endringOpptjening ?
        endringOpptjening.filter((endring) => {
            return endring.arsakType === "UTTAK";
        }).map((uttak) => {
            if(uttak.uttaksgrad !== previousUttak){
                previousUttak = uttak.uttaksgrad;
                return {
                    dato: uttak.dato,
                    uttaksgrad: uttak.uttaksgrad
                }
            }
            return null;
        }).filter((uttak) =>{
            return uttak;
        })
        : [];
};


export const harDelvisUttak = (state = initialState) => {
    const opptjeningData = getOpptjeningDataWithoutNullYears(state);
    console.log(opptjeningData)
    const lastYear = _.max(Object.keys(opptjeningData));
    return !_.isEmpty(opptjeningData) ? opptjeningData[lastYear].uttaksgrad > 0 && opptjeningData[lastYear].uttaksgrad < 100: 0
}

export const getPensjonsbeholdningAndPensjonspoeng = (state = initialState) => {
    const opptjeningData = getOpptjeningData(state);
    let opptjeningMap ={};
    Object.keys(opptjeningData).forEach((year) => {
        opptjeningMap[year] = {
            pensjonspoeng: opptjeningData[year].pensjonspoeng,
            pensjonsbeholdning: opptjeningData[year].pensjonsbeholdning,
            uttak: getUttakForYear(state, year)
        }
    });

    return opptjeningMap;
};

export const getPensjonsBeholdningArray = (state = initialState) => {
    const opptjeningData = getOpptjeningDataWithoutNullYears(state);
    return Object.keys(opptjeningData).map((year) => opptjeningData[year].pensjonsbeholdning);
};

export const getYearArray = (state = initialState) => {
    const opptjeningData = getOpptjeningData(state);
    return Object.keys(opptjeningData).map((year) => year);
};

export const getOpptjeningByYear = (state = initialState, year) => {
    return state.opptjening && state.opptjening.opptjening.opptjeningData ? state.opptjening.opptjening.opptjeningData[year] : null;
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

export const getUserGroup = (state = initialState) => {
    const fodselsAar = getFodselsAar(state);
    if(fodselsAar >= 1943 && fodselsAar<=1953){
        return BORN_IN_OR_BETWEEN_1943_AND_1953;
    } else if (fodselsAar >= 1954 && fodselsAar <= 1962) {
        return BORN_IN_OR_BETWEEN_1954_AND_1962
    } else if (fodselsAar > 1962){
        return BORN_AFTER_1962
    } else {
        return BORN_BEFORE_1943;
    }
};

export const getName = (state = initialState) => {
    let name = "";
    name = getFornavn(state) !== null ? getFornavn(state) : name;
    name = getMellomnavn(state) !== null ? name + " " + getMellomnavn(state) : name;
    name = getEtternavn(state) !== null ? name + " " + getEtternavn(state) : name;

    return name !== "" ? name.trim() : null;
};

export const hasOpptjeningData = (state = initialState) => {
    const opptjeningData = getOpptjeningData(state);
    return Object.entries(opptjeningData).length > 0;
};

export const getByttBrukerSuccess = (state = initialState) => state.opptjening ? state.opptjening.byttBrukerSuccess : false;
export const getByttBrukerError = (state = initialState) => state.opptjening ? state.opptjening.byttBrukerError : null;
export const getByttBrukerLoading = (state = initialState) => state.opptjening ? state.opptjening.byttBrukerLoading : null;
