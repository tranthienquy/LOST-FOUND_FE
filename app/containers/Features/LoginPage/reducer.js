/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SHOW_REGISTER_MODAL,
  END_OF_ACTION
} from './constants';

export const initialState = {
  loading: false,
  error: '',
  registerModal: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
        case END_OF_ACTION:
          for (var element in draft) {
            draft[element] = initialState[element];
          }
          break;
      case LOGIN:
        draft.loading = true;
        draft.error = '';
        break;
      case LOGIN_SUCCESS:
        draft.loading = false;
        draft.error = '';

        break;
      case LOGIN_FAILED:
        draft.loading = false;
        draft.error = '404';
        break;
      case SHOW_REGISTER_MODAL:
        draft.registerModal = action.isShowing;
        break;
    }
  });

export default loginPageReducer;
