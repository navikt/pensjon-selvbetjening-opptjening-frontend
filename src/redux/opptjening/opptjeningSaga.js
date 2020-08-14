import { all, put, call, takeLatest } from 'redux-saga/effects';
import {FETCH_OPPTJENING_STARTED, FETCH_OPPTJENING_SUCCESS, FETCH_OPPTJENING_FAILURE} from './opptjeningActions'
import {fetchToJson} from "../../api/api";

function* fetchOpptjening() {
    try {
        const opptjening = yield call(fetchToJson, process.env.PUBLIC_URL + "/api/opptjening");
        yield put({ "type": FETCH_OPPTJENING_SUCCESS, opptjening });
    } catch (error) {
        yield put({ "type": FETCH_OPPTJENING_FAILURE, error });
    }
}

export default function* opptjeningSaga() {
    yield all([
        takeLatest(FETCH_OPPTJENING_STARTED, fetchOpptjening),
    ]);
}
