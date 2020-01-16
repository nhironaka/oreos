/**
 * Combined sagas
 */
import { fork } from 'redux-saga/effects';

import problems from './problems';
import filters from './filters';

export default function* rootSaga() {
  yield fork(problems);
  yield fork(filters);
}
