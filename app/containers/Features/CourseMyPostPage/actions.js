/*
 *
 * CourseMyPostPage actions
 *
 */

import {
  DEFAULT_ACTION,
  END_OF_ACTION,
  GET_CONTENT,
  GET_CONTENT_FAILED,
  GET_CONTENT_SUCCESS,
  PAGINATION,
  GET_LOCATION,
  GET_LOCATION_FAILED,
  GET_LOCATION_SUCCESS,
  SHOW_MODAL_CONFIRM,
  GET_FEE_TYPE,
  GET_FEE_TYPE_SUCCESS,
  GET_FEE_TYPE_FAILED
} from './constants';

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
export const getCourseList = (content = null) => {
  return {
    type: GET_CONTENT,
    content,
  };
};
export const getCourseListSuccess = data => {
  return {
    type: GET_CONTENT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getCourseListFailed = () => {
  return {
    type: GET_CONTENT_FAILED,
  };
};
export const pagination = (current, pageSize) => {
  return {
    type: PAGINATION,
    current,
    pageSize,
  };
};

export const getLocationList = () => {
  return {
    type: GET_LOCATION,
  };
};
export const getLocationListSuccess = data => {
  return {
    type: GET_LOCATION_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getLocationListFailed = () => {
  return {
    type: GET_LOCATION_FAILED,
  };
};

export const getFeeType = () => {
  return {
    type: GET_FEE_TYPE,
  };
};
export const getFeeTypeSuccess = data => {
  return {
    type: GET_FEE_TYPE_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getFeeTypeFailed = () => {
  return {
    type: GET_FEE_TYPE_FAILED,
  };
};
export const showModalConfirm = (isShowing) => {
  return {
    type: SHOW_MODAL_CONFIRM,
    isShowing
  };
};
