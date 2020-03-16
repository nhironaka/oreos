import { takeLeading, call, put } from 'redux-saga/effects';

import ActionTypes from '../constants/auth';
import apiRequest from '../services/apiRequest';
import { setError } from '../actions/error';
import { loginSuccess } from '../actions/auth';

function* logIn({ username, password }) {
  try {
    const auth = yield call(apiRequest.POST, '/auth/login', {
      username,
      password,
    });

    yield put(loginSuccess(auth));
  } catch (e) {
    yield put(setError(e));
  }
}

export default function* initWatching() {
  yield takeLeading(ActionTypes.LOG_IN, logIn);
}
