import { take, call, put, select, takeLatest, delay } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import * as api from 'utils/api';

function* getCourseList({ content }) {
  const { current, pageSize } = yield select(state => state.coursePage);
  console.log(content);

  const resp = yield call(
    api.post,
    `post/search`,
    {},
    {searchValue:content && content.searchValue,status:content.status, pageSize, pageNumber:current},
    
  );

  const { data, status } = resp;

  if (status == 200) {
    yield delay(2000);
    yield put(actions.getCourseListSuccess(data));
  } else {
    yield put(actions.getCourseListFailed());
  }
}



export default function* coursePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(types.GET_CONTENT, getCourseList);
}
