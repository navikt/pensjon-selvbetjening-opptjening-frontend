import { all, put, call, takeLatest } from 'redux-saga/effects';
import {FETCH_OPPTJENING_STARTED} from './opptjeningActions'
import {fetchOpptjeningSuccess, fetchOpptjeningFailure} from './opptjeningActions'

import {fetchToJson} from "../../api/api";
import {logger} from "../../common/logging";

export function* fetchOpptjening() {
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const fnr = searchParams.get("fnr");
    const fnrQueryParam = fnr ? "%3Ffnr%3D" + fnr : "";

    try {
        const opptjening = yield call(fetchToJson, process.env.PUBLIC_URL + process.env.REACT_APP_OPPTJENING_ENDPOINT + fnrQueryParam);
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
