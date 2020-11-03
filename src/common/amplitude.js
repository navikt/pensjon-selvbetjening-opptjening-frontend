import amplitude from 'amplitude-js';

export const CLICK_EVENT = "click";
export const SELECT_EVENT = "select";

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




