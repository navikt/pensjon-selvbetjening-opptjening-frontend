import { all, put, call, takeLatest } from 'redux-saga/effects';
import {FETCH_OPPTJENING_STARTED} from './opptjeningActions'
import {fetchOpptjeningSuccess, fetchOpptjeningFailure} from './opptjeningActions'

import {fetchToJson} from "../../api/api";
import {logger} from "../../common/logging";

export function* fetchOpptjening() {
    try {
        const opptjening = yield call(fetchToJson, process.env.PUBLIC_URL + "/api/opptjening");
        yield put(fetchOpptjeningSuccess(opptjening));
    } catch (error) {
        logger.error(`Kunne ikke hente opptjening info. ${error.message}`);
        yield put(fetchOpptjeningFailure(error));
    }
}

export default function* opptjeningSaga() {
    yield all([
        takeLatest(FETCH_OPPTJENING_STARTED, fetchOpptjening),
    ]);
}
