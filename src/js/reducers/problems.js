import ActionTypes from '../constants/problems';
/**
 * Initial Problems state
 */
const initialState = {
  problems: [],
  fetchingProblems: false,
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
    case ActionTypes.FETCH_PROBLEMS_SUCCESS:
      return {
        ...state,
        problems: action.problems,
        fetchingProblems: false,
      };
    default:
      return state;
  }
}
