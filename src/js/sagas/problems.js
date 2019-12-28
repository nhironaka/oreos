import { takeLatest, call, put, select } from 'redux-saga/effects';

import ActionTypes from '../constants/problems';
import apiRequest from '../services/apiRequest';
import { setError } from '../reducers/errors';
import { fetchProblemsSuccess, selectProblem, updateProblemSuccess } from '../actions/problems';
import { selectSelectedProblem } from '../selectors/problems';

function* fetchProblems() {
  try {
    const { rows } = yield call(apiRequest.GET, '/problem');
    const selectedProblem = yield select(selectSelectedProblem);

    yield put(fetchProblemsSuccess(rows));
    if (rows.length && !selectedProblem) {
      yield put(selectProblem(rows[0]));
    }
  } catch (error) {
    yield put(setError(error, 'problems'));
  }
}

function* updateProblem({ problem }) {
  try {
    const { rows } = yield call(apiRequest.POST, `/problem/${problem.id}`, problem);

    yield put(updateProblemSuccess(rows));
  } catch (error) {
    yield put(setError(error, 'problems'));
  }
}

export default function* initWatching() {
  yield takeLatest(ActionTypes.FETCH_PROBLEMS, fetchProblems);
  yield takeLatest(ActionTypes.UPDATE_PROBLEM, updateProblem);
}
