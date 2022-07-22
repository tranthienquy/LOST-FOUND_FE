import { take, call, put, select, takeLatest, delay, all } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import * as api from 'utils/api';
import { notification } from 'antd';
import { push } from 'react-router-redux';


// Individual exports for testing
function* loadContent({ id }) {
  const resp = yield call(
    api.get,
    `post/${id}`,
  );
  const { data, status } = resp;

  if (status == 200 ) {
    console.log(data.data[0].comments)
    yield all(data.data[0].comments.map(item =>call(getProfile,item.user)))
    yield delay(1000);
    yield put(actions.loadContentSuccess(data));

    // yield countDown();
  } else {
    yield put(actions.loadContentFailed());
  }

}
// function* countDown(){

//   while(true){
//     yield put(actions.countDown());
//     yield delay(1000);
//     const { endOfAction } = yield select(state => state.courseDetailPage);
//     if (endOfAction) break;
//   }
// }

function* confirmComment({content}){
  const { id } = yield select(state => state.courseDetailPage);

  const resp = yield call(
    api.post,
    `comment`, {}, {message: content, postId : id}
  );
  const { data, status } = resp;
  if (status == 200 ) {
    yield delay(2000);
    yield put(actions.confirmSuccess(data));
    yield notification.open({
      message: 'Comment successfully',
      type:"success"
    })
    yield put(actions.loadContent(id));
  } else {
    yield put(actions.confirmFailed());
  }
}

function* getProfile (id){
  const resp = yield call(
    api.get,
    `users/${id}`
  );
  const { data, status } = resp;
  if (status == 200 ) {
    yield put(actions.getProfileSuccess(data));
  }
}
function* approve (){
  const { id } = yield select(state => state.courseDetailPage);

  const resp = yield call(
    api.post,
    `post/approve/${id}`
  );
  const { data, status } = resp;
  if (status == 200 ) {
    yield delay(2000);

    yield notification.open({
      message: 'Approve successfully',
      type:"success"
    })
    yield put(actions.approveSuccess(data));
    yield put(actions.loadContent(id));
  }
}
function* reject ({content}){
  const { id } = yield select(state => state.courseDetailPage);
  const resp = yield call(
    api.post,
    `post/reject`, {},{postId: id, reasonRejected: content.reasonRejected}
  );
  const { data, status } = resp;
  if (status == 200 ) {
    yield delay(2000);
    yield notification.open({
      message: 'Reject successfully',
      type:"success"
    })
    yield put(actions.rejectSuccess(data));
    yield put(actions.showConfirmModal(false));
    yield put(actions.loadContent(id));
  }
}
function* close ({content}){
  const { id } = yield select(state => state.courseDetailPage);
  const resp = yield call(
    api.put,
    `post/closedPost`, {},{postId: id}
  );
  const { data, status } = resp;
  if (status == 200 ) {
    yield delay(2000);
    yield notification.open({
      message: 'Close successfully',
      type:"success"
    })
    yield put(actions.rejectSuccess(data));
    yield put(actions.showConfirmModal(false));
    yield put(actions.loadContent(id));
  }
}



export default function* courseDetailPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(types.LOAD_CONTENT, loadContent);

  yield takeLatest(types.CONFIRM, confirmComment);
  yield takeLatest(types.APPROVE, approve);
  yield takeLatest(types.CLOSE, close);
  yield takeLatest(types.REJECT, reject);

}
