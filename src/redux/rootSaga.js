import { all } from 'redux-saga/effects';
import opptjeningSaga from './opptjening/opptjeningSaga';
import unleashSaga from "./unleash/unleashSaga";
import loggFrontend from "./logging/loggingSaga";

export default function* rootSaga() {
    yield all([opptjeningSaga(), unleashSaga(), loggFrontend()]);
}
