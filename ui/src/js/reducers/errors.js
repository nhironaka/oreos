import ActionTypes from '../constants/error';

/**
 * Initial State
 */
const initialState = {
  errors: {},
};

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.topic]: action.payload,
        },
      };
    default:
      return state;
  }
}
