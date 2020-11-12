import amplitude from 'amplitude-js';
import {getLabelByLanguage} from "./utils";

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

export const logToAmplitude = (props) => {
    const {eventType, name, titleKey, type, value} = props;
    let componentTitle = getLabelByLanguage("nb-NO", titleKey);
    let eventName = "";

    if(name instanceof Object){
        eventName = getLabelByLanguage(name.lng, name.key, name.ns);
    } else {
        eventName = getLabelByLanguage("nb-NO", name);
    }

    const loggerProps = {"component": componentTitle, type, name: eventName, value};
    //console.log(loggerProps)
    amplitudeLogger(eventType, loggerProps);
};
