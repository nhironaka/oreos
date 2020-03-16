import get from 'lodash/get';
import ActionTypes from '../constants/error';

export function getError(message) {
  if (typeof message === 'string') {
    return message;
  }
  let error = get(
    message,
    'response.data.message',
    get(message, 'message', message)
  );
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
