const queryParams = window.location.search;

export const OPPTJENING_ENDPOINT = process.env.REACT_APP_OPPTJENING_ENDPOINT + queryParams;
export const BYTT_BRUKER_ENDPOINT = "/api/byttbruker";
export const DINPENSJON_URL = process.env.REACT_APP_DINPENSJON_URL + queryParams;
export const PENSJONSKALKULATOR_URL = process.env.REACT_APP_PENSJONSKALKULATOR_URL + queryParams;
export const OVERFORE_OMSORGSOPPTJENING_URL = process.env.REACT_APP_OVERFORE_OMSORGSOPPTJENING_URL + queryParams;