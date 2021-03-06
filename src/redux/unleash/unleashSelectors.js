
export const initialState = {
    unleash: null,
    unleashLoading: false,
    unleashError: undefined,
};

export const getUnleash = (state = initialState) => state.unleash ? state.unleash.unleash : null;
export const getUnleashLoading = (state = initialState) => state.unleash ? state.unleash.unleashLoading : false;
export const getUnleashError = (state = initialState) => state.unleash ? state.unleash.unleashError : undefined;
export const getToggleStatus = (state = initialState, toggle) => state.unleash && state.unleash.unleash ? state.unleash.unleash.toggles[toggle] : false;



