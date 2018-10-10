import { takeLatest, call, put } from 'redux-saga/effects';

import ActionTypes from '../constants/problems';
import apiRequest from '../services/apiRequest';
import { setError } from '../reducers/errors';
import { fetchProblemsSuccess } from '../actions/problems';

function* fetchProblems() {
  try {
    const { rows } = yield call(apiRequest.GET, '/problem');

    yield put(fetchProblemsSuccess(rows));
  } catch (error) {
    yield put(setError(error, 'problems'));
  }
}

export default function* initWatching() {
  yield takeLatest(ActionTypes.FETCH_PROBLEMS, fetchProblems);
}
