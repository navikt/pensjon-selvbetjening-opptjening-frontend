import { all, put, call, takeLatest } from 'redux-saga/effects';
import {FETCH_OPPTJENING_STARTED} from './opptjeningActions'
import {fetchOpptjeningSuccess, fetchOpptjeningFailure} from './opptjeningActions'

import {fetchToJson} from "../../api/api";
import {logger} from "../../common/logging";
import * as urlHelper from "../../common/urlHelper";

export function* fetchOpptjening() {
    try {
        const opptjening = yield call(fetchToJson, process.env.PUBLIC_URL + urlHelper.OPPTJENING_ENDPOINT);
        yield put(fetchOpptjeningSuccess(opptjening));
    } catch (error) {
        if(error === "error-status-401")
            logger.info("You are not authorized");
        else if(error === "error-status-403")
            logger.info("Access to the requested resource is forbidden");
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
