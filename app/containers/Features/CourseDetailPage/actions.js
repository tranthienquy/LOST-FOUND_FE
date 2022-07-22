/*
 *
 * CourseDetailPage actions
 *
 */

import {
  COUNT_DOWN,
  DEFAULT_ACTION,
  END_OF_ACTION,
  LOAD_CONTENT,
  LOAD_CONTENT_FAILED,
  LOAD_CONTENT_SUCCESS,
  SHOW_CONFIRM_MODAL,
  CONFIRM,
  CONFIRM_FAILED,
  CONFIRM_SUCCESS,
  REJECT,
  REJECT_FAILED,
  REJECT_SUCCESS,
  APPROVE,
  APPROVE_FAILED,
  APPROVE_SUCCESS,
  CHECK_IS_REGISTER,
CHECK_IS_REGISTER_SUCCESS,
CHECK_IS_REGISTER_FAILED,
GET_PROFILE,
GET_PROFILE_FAILED,
GET_PROFILE_SUCCESS,
CLOSE,
CLOSE_FAILED,
CLOSE_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const loadContent = id => {
  return {
    type: LOAD_CONTENT,
    id,
  };
};
export const loadContentSuccess = data => {
  return {
    type: LOAD_CONTENT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const loadContentFailed = error => {
  return {
    type: LOAD_CONTENT_FAILED,
    error,
  };
};
export const checkIsRegistered = id => {
  return {
    type: CHECK_IS_REGISTER,
    id,
  };
};
export const checkIsRegisteredSuccess = data => {
  return {
    type: CHECK_IS_REGISTER_SUCCESS,
    payload: {
      data,
    },
  };
};
export const checkIsRegisteredFailed = error => {
  return {
    type: CHECK_IS_REGISTER_FAILED,
    error,
  };
};
export const countDown = () => {
  return {
    type: COUNT_DOWN,
  };
};
export const endOfAction = () => {
  return {
    type: END_OF_ACTION,
  };
};
export const showConfirmModal = isShowing => {
  return {
    type: SHOW_CONFIRM_MODAL,
    isShowing,
  };
};


export const confirm = (content) => {
  return {
    type: CONFIRM,
    content
  
  };
};
export const confirmSuccess = data => {
  return {
    type: CONFIRM_SUCCESS,
    payload: {
      data,
    },
  };
};
export const confirmFailed = error => {
  return {
    type: CONFIRM_FAILED,
    error,
  };
};


export const reject = (content) => {
  return {
    type: REJECT,
    content
  
  };
};
export const rejectSuccess = data => {
  return {
    type: REJECT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const rejectFailed = error => {
  return {
    type: REJECT_FAILED,
    error,
  };
};

export const approve = (content) => {
  return {
    type: APPROVE,
    content
  
  };
};
export const approveSuccess = data => {
  return {
    type: APPROVE_SUCCESS,
    payload: {
      data,
    },
  };
};
export const approveFailed = error => {
  return {
    type: APPROVE_FAILED,
    error,
  };
};
export const getProfile = (id) => {
  return {
    type: GET_PROFILE,
    id,
  };
};
export const getProfileSuccess = data => {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getProfileFailed = () => {
  return {
    type: GET_PROFILE_FAILED,
  };
};

export const close = (content) => {
  return {
    type: CLOSE,
    content
  
  };
};
export const closeSuccess = data => {
  return {
    type: CLOSE_SUCCESS,
    payload: {
      data,
    },
  };
};
export const closeFailed = error => {
  return {
    type: CLOSE_FAILED,
    error,
  };
};