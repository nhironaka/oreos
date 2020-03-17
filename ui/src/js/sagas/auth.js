import { takeLeading, call, put } from 'redux-saga/effects';

import ActionTypes from '../constants/auth';
import apiRequest from '../services/apiRequest';
import { setError } from '../actions/error';
import { loginSuccess, logoutSuccess } from '../actions/auth';

function* init() {
  try {
    const user = yield call(apiRequest.GET, '/auth/login');

    yield put(loginSuccess(user));
  } catch (e) {
    yield put(setError(e));
  }
}

function* logIn({ username, password }) {
  try {
    const user = yield call(apiRequest.POST, '/auth/login', {
      username,
      password,
    });

    yield put(loginSuccess(user));
  } catch (e) {
    yield put(setError(e));
  }
}

function* logOut() {
  try {
    yield call(apiRequest.GET, '/auth/logout');

    yield put(logoutSuccess());
  } catch (e) {
    yield put(setError(e));
  }
}

function* signUp({ form }) {
  try {
    const auth = yield call(apiRequest.POST, '/user', form);

    yield put(loginSuccess(auth));
  } catch (e) {
    yield put(setError(e));
  }
}

export default function* initWatching() {
  yield takeLeading(ActionTypes.INIT, init);
  yield takeLeading(ActionTypes.LOG_IN, logIn);
  yield takeLeading(ActionTypes.LOG_OUT, logOut);
  yield takeLeading(ActionTypes.SIGN_UP, signUp);
}
