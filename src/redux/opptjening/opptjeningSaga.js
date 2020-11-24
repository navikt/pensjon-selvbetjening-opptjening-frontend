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
        if(error === "error-status-401")
            logger.info("You are not authorized");
        else if(error === "error-status-403")
            logger.info("A technical problem occurred. Please try to log in again later. We are sorry for the inconvenience.");
        else
            logger.error(error);
        yield put(fetchOpptjeningFailure(error));
    }
}

export default function* opptjeningSaga() {
    yield all([
        takeLatest(FETCH_OPPTJENING_STARTED, fetchOpptjening),
    ]);
}
