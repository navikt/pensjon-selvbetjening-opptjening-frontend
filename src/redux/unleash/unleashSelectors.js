
export const initialState = {
    unleash: null,
    unleashLoading: true,
    unleashError: undefined
};

export const getUnleash = (state = initialState) => state.unleash ? state.unleash.unleash : null;
export const getUnleashLoading = (state = initialState) => state.unleash ? state.unleash.unleashLoading : true;
export const getUnleashError = (state = initialState) => state.unleash ? state.unleash.unleashError : undefined;
export const getToggleStatus = (toggle, state = initialState) => state.unleash ? state.unleash.unleash['unleash'][toggle] : false;


