import ActionTypes from '../constants/auth';

export function login(username, password) {
  return {
    type: ActionTypes.LOG_IN,
    username,
    password,
  };
}

export function loginSuccess(user) {
  return {
    type: ActionTypes.LOG_IN_SUCCESS,
    user,
  };
}
