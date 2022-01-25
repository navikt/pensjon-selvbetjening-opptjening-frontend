import {all, call, put, takeLatest} from "redux-saga/effects";
import {errorLogging, loggedSuccess, LOGGING_STARTED} from "./loggingActions";
import {RequestMethod, serverRequestWithData} from "../../api/api";

function* loggFrontendToBackend(action) {
    try {
        yield call(serverRequestWithData, RequestMethod.PUT,`${process.env.PUBLIC_URL}/api/logg`, JSON.stringify(action.data));
        yield put(loggedSuccess());
    } catch (error) {
        yield put(errorLogging());
    }
}

export default function* loggFrontend() {
    yield all([takeLatest(LOGGING_STARTED, loggFrontendToBackend)])
}