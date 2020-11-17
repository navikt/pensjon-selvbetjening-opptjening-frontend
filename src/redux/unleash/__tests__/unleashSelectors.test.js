import * as selectors from '../unleashSelectors'


const mockedState = {
    unleash: {
        unleash: {
            toggles: {
                "toggle1": true,
                "toggle2": false
            }
        },
        unleashLoading: false
    }
};

it('should return selector values for the initial state', () => {
    expect(selectors.getUnleash()).toEqual(null);
    expect(selectors.getUnleashLoading()).toEqual(false);
    expect(selectors.getUnleashError()).toEqual(undefined);
    expect(selectors.getToggleStatus()).toEqual(false);
});

it('should return unleash', () => {
    const unleash = selectors.getUnleash(mockedState);
    const loading = selectors.getUnleashLoading(mockedState);
    const error = selectors.getUnleashError(mockedState);

    expect(loading).toEqual(false);
    expect(error).toEqual(undefined);

    expect(unleash).toHaveProperty("toggles");
    expect(unleash.toggles).toHaveProperty("toggle1");
    expect(unleash.toggles).toHaveProperty("toggle2");
});

it('should return toggle status for specified toggles', () => {
    const toggle1Status = selectors.getToggleStatus(mockedState, "toggle1");
    const toggle2Status = selectors.getToggleStatus(mockedState, "toggle2");

    expect(toggle1Status).toBeTruthy();
    expect(toggle2Status).toBeFalsy();
});







