import ActionTypes from '../constants/auth';

/**
 * Initial State
 */
const initialState = {
  user: {},
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case ActionTypes.LOG_OUT_SUCCESS:
      return {
        ...state,
        user: {},
        loading: false,
      };
    case ActionTypes.LOG_IN:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
