/*
 *
 * HomeMainPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_CONTENT, GET_CONTENT_SUCCESS, GET_CONTENT_FAILED } from './constants';

export const initialState = {
  items: [],
  loading: {
    items: true,
  }
};

/* eslint-disable default-case, no-param-reassign */
const homeMainPageReducer = (state = initialState, action) =>
  produce(state,  draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

        case GET_CONTENT:
          
          break;
        case GET_CONTENT_SUCCESS:
          draft.loading[action.payload.categoryType]= false;
          draft[action.payload.categoryType]= action.payload.data.data.data;


          break;
        case GET_CONTENT_FAILED:
          draft.loading= false;

          break;

    }
  });

export default homeMainPageReducer;
