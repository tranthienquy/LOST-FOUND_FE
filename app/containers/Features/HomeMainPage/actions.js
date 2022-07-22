/*
 *
 * HomeMainPage actions
 *
 */

import { DEFAULT_ACTION, GET_CONTENT, GET_CONTENT_SUCCESS, GET_CONTENT_FAILED } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const getContentList = () => {
  return {
    type: GET_CONTENT,
  };
};
export const getContentListSuccess = (categoryType,data) => {
  return {
    type: GET_CONTENT_SUCCESS,
    payload: {
      categoryType,
      data,
    },
  };
};
export const getContentListFailed = () => {
  return {
    type: GET_CONTENT_FAILED,
  };
};