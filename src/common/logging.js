import store from "../redux";
import {loggingStarted} from "../redux/logging/loggingActions";
import Bowser from "bowser";

const browser = Bowser.getParser(window.navigator.userAgent);

const defaultContext = {
    url: window.location.href,
    userAgent: window.navigator.userAgent,
    userDeviceInfo: browser.parsedResult,
    appName: "pensjon-selvbetjening-opptjening-frontend"
}

export const logger = {
    info: (text) => {
        store.dispatch(loggingStarted({type: "info", jsonContent: {...defaultContext, text}}));
    },
    error: (text) => {
        store.dispatch(loggingStarted({type: "error", jsonContent: {...defaultContext, text}}))
    }
}


window.onerror = function (message, url, line, column, error) {
    const json = {
        message: message.toString(),
        jsFileUrl: url,
        lineNumber: line,
        column: column,
        messageIndexed: message
    };

    if (error) {
        json.stacktrace = error.stack ? error.stack : error;
        json.pinpoint = {
            message,
            url,
            line,
            column,
            error: error
        };
    }

    logger.error(json);
}