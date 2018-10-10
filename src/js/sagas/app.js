/**
 * Combined sagas
 */
import { fork } from 'redux-saga/effects';

import problems from './problems';

export default function* rootSaga() {
  yield fork(problems);
}
