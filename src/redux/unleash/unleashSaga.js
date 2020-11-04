import { all, put, call, takeLatest } from 'redux-saga/effects';
import {FETCH_UNLEASH_STARTED} from './unleashActions'
import {fetchUnleashSuccess, fetchUnleashFailure} from './unleashActions'
import {fetchPost} from "../../api/api";

const toggleNames = require('../../common/toggleNames.json');

export function* fetchUnleash() {
    try {
        const unleash = yield call(fetchPost, process.env.PUBLIC_URL + "/api/unleash", JSON.stringify(toggleNames));
        yield put(fetchUnleashSuccess(unleash));
    } catch (error) {
        yield put(fetchUnleashFailure(error));
    }
}

export default function* unleashSaga() {
    yield all([
        takeLatest(FETCH_UNLEASH_STARTED, fetchUnleash),
    ]);
}
