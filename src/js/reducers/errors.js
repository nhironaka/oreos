import get from 'lodash/get';

import { selectError } from '../selectors/errors';

/**
 * Initial State
 */
const initialState = {
  errors: {},
};

/**
 * Action types
 */
const prefix = 'error';
export const ActionTypes = {
  SET_ERROR: `${prefix}/SET_ERROR`,
};

export function getError(message) {
  if (typeof message === 'string') {
    return message;
  }
  let error = get(message, 'response.data.message', get(message, 'message', message));
  if (typeof error === 'object') {
    error = Object.entries(error).map(([key, value]) => `[${key}] - ${value}`);
  }
  return error;
}

export function setError(message, topic = 'global') {
  return {
    type: ActionTypes.SET_ERROR,
    payload: getError(message),
    topic,
  };
}

export function handleError(func, topic) {
  return (...params) => async (dispatch, getState) => {
    const hasError = selectError(topic)(getState());

    if (hasError) {
      dispatch(setError('', topic));
    }
    try {
      await dispatch(func.apply(this, params));
    } catch (e) {
      dispatch(setError(e, topic));
    }
  };
}

/**
 * Actions
 */

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
