/*
 *
 * CourseFormPage reducer
 *
 */
import produce from 'immer';
import { getBase64 } from '../../../utils/imageUtil';
import * as types from './constants';
import moment from 'moment';
import _ from 'lodash';

export const initialState = {
  id: null,
  content: null,
  feeTypeList : [],
  durationTypeList : [],
  isRegistered: false,
  loading: {
    feeType: true,
    isRegistered: true,
    durationType: true,
    content: false,
    submit: false,

  },
  image: null,
  imageURL:null,
  fileList: [],
  removeFileList:[]
};

/* eslint-disable default-case, no-param-reassign */
const courseFormPageReducer = (state = initialState, action) =>
  produce(state, draft => {

    switch (action.type) {
      case types.DEFAULT_ACTION:
        break;
      case types.END_OF_ACTION:
        for (var element in draft) {
          draft[element] = initialState[element];
        }
        break;
case types.CHANGE_AVATAR:
  draft.imagePreview=action.image ? getBase64(action.image.originFileObj) : null
  draft.image=action.image;
  break;

        case types.GET_CONTENT:
          draft.id = action.id;
          draft.loading.content = true;
          break;
        case types.GET_CONTENT_SUCCESS:
          draft.loading.content = false;
          const {
            lost, image, statusDate
          } = action.payload.data.data[0];
          draft.content = {
            ...action.payload.data.data[0],
            type: lost==="yes"? "Losting":"Found",
            statusDate: moment(statusDate)  
          };
          draft.imageURL= image;
          break;
          case types.GET_CONTENT_FAILED:
            break;

           
            case types.SUBMIT_CONTENT:
              draft.loading.submit = true;
              break;
            case types.SUBMIT_CONTENT_SUCCESS:
              draft.loading.submit = false;
      
              break;
            case types.SUBMIT_CONTENT_FAILED:
              draft.loading.submit = false;
              break;
        
      case types.GET_FEE_TYPE:
        draft.loading.feeType = true ;
        draft.feeTypeList = [];
        break;
      case types.GET_FEE_TYPE_SUCCESS:
        draft.loading.feeType = false;
        draft.feeTypeList = action.payload.data.value;
        break;
      case types.GET_DURATION_TYPE:
        draft.loading.durationType = true ;
        draft.durationTypeList = [];
        break;
      case types.GET_DURATION_TYPE_SUCCESS:
        draft.loading.durationType = false;
        draft.durationTypeList = action.payload.data.value;
        break;
      case types.UPLOAD_FILE:
        draft.fileList.push(action.file);
        break;
      case types.DELETE_FILE:
        _.remove(draft.fileList, el=>(action.file.Id && el.Id===action.file.Id) || (action.file.originFileObj && action.file.originFileObj === el.originFileObj));
       if (action.file.Id){
        draft.removeFileList.push(action.file);
       }
       
        break;
    }
  });

export default courseFormPageReducer;
