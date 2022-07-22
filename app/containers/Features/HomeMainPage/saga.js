import { take, call, put, select, takeLatest, delay } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import * as api from 'utils/api';

function* getContentList() {
//  yield getJobList();
//  yield getCourseList();
const resp = yield call(
  api.post,
  `post/search`,
  {},
  {searchValue:'',status:'Approved', pageSize:8, pageNumber:1},
  
);
  const { data, status } = resp;
  if (status == 200 ) {
    yield delay(2000);
    yield put(actions.getContentListSuccess('items',data));
  } else {
    yield put(actions.getContentListFailed());
  }
}


// Individual exports for testing
export default function* homeMainPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(types.GET_CONTENT, getContentList);

}
