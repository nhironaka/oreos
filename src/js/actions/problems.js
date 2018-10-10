import ActionTypes from '../constants/problems';

export function fetchProblemsSuccess(problems) {
  return {
    type: ActionTypes.FETCH_PROBLEMS_SUCCESS,
    problems,
  };
}

export function fetchProblems() {
  return {
    type: ActionTypes.FETCH_PROBLEMS,
  };
}

export function updateProblem(problem) {
  return {
    type: ActionTypes.UPDATE_PROBLEM,
    problem,
  };
}
