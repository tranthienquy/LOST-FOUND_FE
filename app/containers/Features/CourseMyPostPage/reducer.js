/*
 *
 * CourseMyPostPage reducer
 *
 */
import produce from 'immer';
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
  GET_FEE_TYPE,
  GET_FEE_TYPE_SUCCESS,
  GET_FEE_TYPE_FAILED
} from './constants';

export const initialState = {
  courseList: [],
  locationList: [],
  feeTypeList: [],
  loading: false,
  current: 1,
  pageSize: 10,
  total: 0,
};

/* eslint-disable default-case, no-param-reassign */
const courseMyPostPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case END_OF_ACTION:
        for (var element in draft) {
          draft[element] = initialState[element];
        }
        break;
      case GET_CONTENT:
        draft.loading = true;
        draft.courseList = [];
       
        break;
      case GET_CONTENT_SUCCESS:
        draft.loading = false;
        draft.courseList = action.payload.data.data;

        break;
      case GET_CONTENT_FAILED:
        draft.loading = false;

        break;

    case GET_LOCATION:
      draft.locationList = []
    break;

    case GET_LOCATION_SUCCESS:
      draft.locationList = action.payload.data.value;

    break;

    case GET_LOCATION_FAILED:
    break;
    case GET_FEE_TYPE:
      draft.feeTypeList = []
    break;

    case GET_FEE_TYPE_SUCCESS:
      draft.feeTypeList = action.payload.data.value;

    break;

    case GET_FEE_TYPE_FAILED:
    break;

      case PAGINATION:
        draft.current = action.current;
        draft.pageSize = action.pageSize;
        break;
    }
  });

export default courseMyPostPageReducer;
