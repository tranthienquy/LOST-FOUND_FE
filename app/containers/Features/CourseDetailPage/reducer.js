/*
 *
 * CourseDetailPage reducer
 *
 */
import produce from 'immer';
import {
  COUNT_DOWN,
  DEFAULT_ACTION,
  LOAD_CONTENT,
  LOAD_CONTENT_SUCCESS,
  END_OF_ACTION,
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

  GET_PROFILE,
  GET_PROFILE_FAILED,
  GET_PROFILE_SUCCESS,

  CLOSE,
  CLOSE_FAILED,
  CLOSE_SUCCESS,
} from './constants';

export const initialState = {
  id: '',
  content: {},
  isRegistered: false,
  profile: [],

  loading: {
    getContent: false,
    isRegistered: true,
    confirm: false,
    profile: true,
approve: false,
reject: false,close: false,
  },
  countDown: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  isRegister:true,
  isExpired: false,
  endOfAction: false,
  confirmModal: false,
};

/* eslint-disable default-case, no-param-reassign */
const courseDetailPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_CONTENT:
        draft.loading.getContent = true;
        draft.id = action.id;
        draft.endOfAction= false;
        break;
      case LOAD_CONTENT_SUCCESS:
        if (action.payload.data) {
          draft.content = action.payload.data.data[0];
        }
        draft.loading.getContent = false;

        break;

     

        case END_OF_ACTION:
           for (var element in draft){
             draft[element]= initialState[element];
           }
           draft.endOfAction=true;
          break;
          case SHOW_CONFIRM_MODAL:
        draft.confirmModal = action.isShowing;
        break;
        case CONFIRM:
          draft.loading.confirm = true;
          break;
        case CONFIRM_SUCCESS:
          draft.loading.confirm = false;

          break;
        case CONFIRM_FAILED:
          draft.loading.confirm = true;

          break;
        case REJECT:
          draft.loading.reject = true;
          break;
        case REJECT_SUCCESS:
          draft.loading.reject = false;

          break;
        case REJECT_FAILED:
          draft.loading.reject = true;

          break;
        case APPROVE:
          draft.loading.approve = true;
          break;
        case APPROVE_SUCCESS:
          draft.loading.approve = false;
          break;
        case APPROVE_FAILED:
          draft.loading.approve = true;
          break;
        case CLOSE:
          draft.loading.close = true;
          break;
        case CLOSE_SUCCESS:
          draft.loading.close = false;
          break;
        case CLOSE_FAILED:
          draft.loading.close = true;
          break;
          case GET_PROFILE:
            draft.loading.profile =  true;
            draft.profile = [];
            break;

            case GET_PROFILE_SUCCESS:
              draft.loading.profile =  false;
              draft.profile.push(action.payload.data.data[0]);
              break;
              case GET_PROFILE_FAILED:
                
                break;
    }
  });

export default courseDetailPageReducer;
