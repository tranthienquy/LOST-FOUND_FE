/*
 *
 * CourseFormPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_CONTENT,
  GET_CONTENT_SUCCESS,
  GET_CONTENT_FAILED,
  SUBMIT_CONTENT,
  SUBMIT_CONTENT_FAILED,
  SUBMIT_CONTENT_SUCCESS,
  END_OF_ACTION,
  GET_DURATION_TYPE,
  GET_DURATION_TYPE_FAILED,
  GET_DURATION_TYPE_SUCCESS,
  GET_FEE_TYPE,
  GET_FEE_TYPE_FAILED,
  GET_FEE_TYPE_SUCCESS,
  CHANGE_AVATAR,
  UPLOAD_FILE,
  DELETE_FILE,


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

export const getDurationType = () => {
  return {
    type: GET_DURATION_TYPE,
  };
};
export const getDurationTypeSuccess = data => {
  return {
    type: GET_DURATION_TYPE_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getDurationTypeFailed = () => {
  return {
    type: GET_DURATION_TYPE_FAILED,
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


export const getContent = id => {
  return {
    type: GET_CONTENT,
    id,
  };
};
export const getContentSuccess = data => {
  return {
    type: GET_CONTENT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getContentFailed = error => {
  return {
    type: GET_CONTENT_FAILED,
    error,
  };
};

export const uploadFile = file => {
  return {
    type: UPLOAD_FILE,
    file,
  };
};
export const deleteFile = file => {
  return {
    type: DELETE_FILE,
    file,
  };
};




export const submitContent = value => {
  return {
    type: SUBMIT_CONTENT,
    value,
  };
};
export const submitContentSuccess = data => {
  return {
    type: SUBMIT_CONTENT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const submitContentFailed = error => {
  return {
    type: SUBMIT_CONTENT_FAILED,
    error,
  };
};

export const changeAvatar = image => {
  return {
    type: CHANGE_AVATAR,
    image,
  };
};
