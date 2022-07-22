/*
 *
 * UnAuthorizedPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, END_OF_ACTION } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const unAuthorizedPageReducer = (state = initialState, action) =>
  produce(state, draft  => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case END_OF_ACTION:
        for (var element in draft) {
          draft[element] = initialState[element];
        }
        break;
    }
  });

export default unAuthorizedPageReducer;
