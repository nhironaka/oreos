import ActionTypes from '../constants/problems';
import FilterActionTypes from '../constants/filters';

/**
 * Initial Problems state
 */
const initialState = {
  problems: [],
  filters: [],
  inputs: {},
  fetchingProblems: false,
  selectedProblem: null,
};

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_PROBLEMS:
      return {
        ...state,
        fetchingProblems: true,
      };
    case ActionTypes.SELECT_PROBLEM:
      return {
        ...state,
        selectedProblem: action.problem,
      };
    case ActionTypes.FETCH_PROBLEMS_SUCCESS:
      return {
        ...state,
        problems: action.problems,
        fetchingProblems: false,
      };
    case ActionTypes.UPDATE_PROBLEM_INPUT:
      return {
        ...state,
        inputs: { ...state.inputs, [action.problem]: action.input },
      };
    case FilterActionTypes.FETCH_FILTER_SUCCESS:
      console.log(action.filters)
      return {
        ...state,
        filters: action.filterType === 'problem' ? action.filters : state.filters,
      };
    default:
      return state;
  }
}
