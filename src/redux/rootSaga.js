import { all } from 'redux-saga/effects';
import opptjeningSaga from './opptjening/opptjeningSaga';

export default function* rootSaga() {
    yield all([opptjeningSaga()]);
}
