import { all, put, call, takeLatest } from 'redux-saga/effects';
import {FETCH_UNLEASH_STARTED} from './unleashActions'
import {fetchUnleashSuccess, fetchUnleashFailure} from './unleashActions'
import {fetchPost} from "../../api/api";
import {logger} from "../../common/logging";

export function* fetchUnleash(action) {
    try {
        const unleash = yield call(fetchPost, process.env.PUBLIC_URL + "/api/unleash", JSON.stringify(action.toggleNames));
        yield put(fetchUnleashSuccess(unleash));
    } catch (error) {
        if(error === "error-status-401")
            logger.info("You are not authorized");
        else if(error === "error-status-403")
            logger.info("Access to the requested resource is forbidden");
        else
            logger.error(error);
        yield put(fetchUnleashFailure(error));
    }
}

export default function* unleashSaga() {
    yield all([
        takeLatest(FETCH_UNLEASH_STARTED, fetchUnleash),
    ]);
}
