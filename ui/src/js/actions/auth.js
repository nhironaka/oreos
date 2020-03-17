import ActionTypes from '../constants/auth';

export function init() {
  return {
    type: ActionTypes.INIT,
  };
}

export function logout() {
  return {
    type: ActionTypes.LOG_OUT,
  };
}

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

export function logoutSuccess() {
  return {
    type: ActionTypes.LOG_OUT_SUCCESS,
  };
}

export function signup(form) {
  return {
    type: ActionTypes.SIGN_UP,
    form,
  };
}

export function signupSuccess(user) {
  return {
    type: ActionTypes.SIGN_UP_SUCCESS,
    user,
  };
}
