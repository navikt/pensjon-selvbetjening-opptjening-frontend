import {all, call, put, takeLatest} from "redux-saga/effects";
import {errorLogging, loggedSucces, LOGGING_STARTED} from "./loggingActions";
import {fetchPost} from "../../api/api";

function* loggFrontendToBackend(action) {
    try {
        yield call(fetchPost, `${process.env.PUBLIC_URL}/api/logg`, JSON.stringify(action.data));
        yield put(loggedSucces());
    } catch (error) {
        yield put(errorLogging());
    }
}

export default function* loggFrontend() {
    yield all([takeLatest(LOGGING_STARTED, loggFrontendToBackend)])
}