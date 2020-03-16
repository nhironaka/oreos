/**
 * Combined sagas
 */
import { fork } from 'redux-saga/effects';

import app from './app';
import auth from './auth';

export default function* rootSaga() {
  yield fork(app);
  yield fork(auth);
}
