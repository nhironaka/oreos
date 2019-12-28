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

export function selectProblem(problem) {
  return {
    type: ActionTypes.SELECT_PROBLEM,
    problem,
  };
}

export function updateProblem(problem) {
  return {
    type: ActionTypes.UPDATE_PROBLEM,
    problem,
  };
}

export function updateProblemInput(problem, input) {
  return {
    type: ActionTypes.UPDATE_PROBLEM_INPUT,
    problem,
    input
  };
}
