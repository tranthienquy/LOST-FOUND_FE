/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, END_OF_ACTION, LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, SHOW_REGISTER_MODAL } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const endOfAction = () => {
  return {
    type: END_OF_ACTION,
  };
};

export const login = (value,category) => {
  return {
    type: LOGIN,
    value,
    category
  };
};
export const loginSuccess = data => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      data,
    },
  };
};
export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error
  };
};
export const showRegisterModal = (isShowing) => {
  return {
    type: SHOW_REGISTER_MODAL,
    isShowing
  };
};