import { take, call, put, select, takeLatest, delay } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import * as api from 'utils/api';

function* getCourseList({ content }) {
  const { current, pageSize } = yield select(state => state.courseMyPostPage);
  console.log(content);

  const resp = yield call(
    api.get,
    `post/myposts`,
    {},
    
  );

  const { data, status } = resp;

  if (status == 200) {
    yield delay(2000);
    yield put(actions.getCourseListSuccess(data));
  } else {
    yield put(actions.getCourseListFailed());
  }
}



export default function* courseMyPostPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(types.GET_CONTENT, getCourseList);
}
