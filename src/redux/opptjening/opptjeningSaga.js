import { all, put, call, takeLatest } from 'redux-saga/effects';
import {FETCH_OPPTJENING_STARTED, FETCH_OPPTJENING_SUCCESS, FETCH_OPPTJENING_FAILURE} from './opptjeningActions'

const DEVELOPMENT = process.env.NODE_ENV === 'development';

export const serverRequest = (method,urlPath) => {
    const OPTIONS = {
        method: method,
        credentials: "include"  //Check isDev or not
    };

    return new Promise((resolve, reject) => {
        fetch(urlPath, OPTIONS)
            .then(res => res.json())
            .then((response) => {
                verifyStatusSuccessOrRedirect(response);
                resolve(response);
            })
            .catch((reason) => reject(reason));
    });
};

function fetchToJson(urlPath, withAccessToken) {
    return serverRequest("GET", urlPath, "", withAccessToken);
}

function verifyStatusSuccessOrRedirect(response) {
    // If we are on localhost just return, no need to check for authentication
    if(DEVELOPMENT){
        return;
    }
    if (response.status === 401) {
        window.location.href = "https://loginservice-q.nav.no/login?redirect=https://www-q0.nav.no/pensjon/opptjening/";
        throw new Error("unauthorized");
    }
    if (response.status >= 200 && response.status < 300) {
        return response.status;
    }
    throw new Error(response.statusText);
}

function* fetchOpptjening() {
    try {
        const response = yield call(fetchToJson, "/pensjon/opptjening/api/opptjening", true);
        const opptjening = response;
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
