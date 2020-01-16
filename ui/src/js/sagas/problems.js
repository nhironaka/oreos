import { takeLatest, takeLeading, call, put, select, all } from 'redux-saga/effects';

import ActionTypes from '../constants/problems';
import apiRequest from '../services/apiRequest';
import { setError } from '../reducers/errors';
import { fetchProblems as fetchProblemsAction, fetchProblemsSuccess, selectProblem } from '../actions/problems';
import { fetchFilter } from '../actions/filters';
import { selectSelectedProblem, selectProblems } from '../selectors/problems';

function* init() {
  yield all([put(fetchProblemsAction()), put(fetchFilter('problem'))]);
}

function* fetchProblems() {
  try {
    const { rows } = yield call(apiRequest.GET, '/problem');
    const selectedProblem = yield select(selectSelectedProblem);

    yield put(fetchProblemsSuccess(rows));

    if (rows.length && !selectedProblem) {
      yield put(selectProblem(rows[0]));
    }
  } catch (error) {
    yield put(setError(error, 'problem'));
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
    yield put(setError(error, 'problem'));
  }
}

function* addProblem({ problem }) {
  try {
    const { rows } = yield call(apiRequest.POST, `/problem`, problem);
    const problems = yield select(selectProblems);
    problems.push(rows[0]);

    return yield all([put(fetchProblemsSuccess(problems)), put(selectProblem(rows[0]))]);
  } catch (error) {
    yield put(setError(error, 'problems'));
    return null;
  }
}

export default function* initWatching() {
  yield takeLeading(ActionTypes.INIT, init);
  yield takeLatest(ActionTypes.FETCH_PROBLEMS, fetchProblems);
  yield takeLatest(ActionTypes.UPDATE_PROBLEM, updateProblem);
  yield takeLatest(ActionTypes.ADD_PROBLEM, addProblem);
}
