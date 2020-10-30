import amplitude from 'amplitude-js';

export const CLICK_PANEL_EVENT = "Klikk på panel";
export const CLICK_BUTTON_EVENT = "Klikk på knapp";
export const SELECT_EVENT = "Valg i dropdown";

export const initAmplitude = () => {
    if (amplitude) {
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
        });
    }
};

export function amplitudeLogger (name, values) {
    amplitude.logEvent(name, values);
}




