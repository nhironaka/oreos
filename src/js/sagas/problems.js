import { takeLatest, call, put, select, all } from 'redux-saga/effects';

import ActionTypes from '../constants/problems';
import apiRequest from '../services/apiRequest';
import { setError } from '../reducers/errors';
import { fetchProblemsSuccess, selectProblem } from '../actions/problems';
import { selectSelectedProblem, selectProblems } from '../selectors/problems';

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
    const problems = yield select(selectProblems);
    const idx = problems.findIndex(item => item.id === problem.id);
    problems.splice(idx, 1, rows[0]);

    yield all([put(fetchProblemsSuccess(problems)), put(selectProblem(rows[0]))]);
  } catch (error) {
    yield put(setError(error, 'problems'));
  }
}

export default function* initWatching() {
  yield takeLatest(ActionTypes.FETCH_PROBLEMS, fetchProblems);
  yield takeLatest(ActionTypes.UPDATE_PROBLEM, updateProblem);
}
