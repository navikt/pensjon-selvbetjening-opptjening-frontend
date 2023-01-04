import { all, put, call, takeLatest } from 'redux-saga/effects';
import {
    BYTT_BRUKER_STARTED, byttBrukerFailure,
    byttBrukerSuccess,
    FETCH_OPPTJENING_STARTED,
    fetchOpptjeningStarted
} from './opptjeningActions'
import {fetchOpptjeningSuccess, fetchOpptjeningFailure} from './opptjeningActions'

import {fetchPost, fetchToJson} from "../../api/api";
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
            logger.error(`msg=${error.message} status=${error.cause}`);
        yield put(fetchOpptjeningFailure(error));
    }
}

function* byttBruker(action){
    try {
        const byttBrukerResponse = yield call(fetchPost, process.env.PUBLIC_URL + urlHelper.BYTT_BRUKER_ENDPOINT,  JSON.stringify(action.data));
        yield put(byttBrukerSuccess(byttBrukerResponse));
        yield put(fetchOpptjeningStarted());
        if(action.navigateToForside) {
            yield call(action.navigateToForside());
        }
    } catch (error) {
        console.log(error)
        logger.error(`msg=${error.message} status=${error.cause}`);
        yield put(byttBrukerFailure(error));
    }
}

export default function* opptjeningSaga() {
    yield all([
        takeLatest(FETCH_OPPTJENING_STARTED, fetchOpptjening),
        takeLatest(BYTT_BRUKER_STARTED, byttBruker)
    ]);
}
