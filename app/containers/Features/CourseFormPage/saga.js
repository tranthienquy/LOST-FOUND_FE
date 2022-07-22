import {
  take,
  call,
  put,
  select,
  takeLatest,
  delay,
  fork,
  takeEvery,
} from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import * as api from 'utils/api';
import { notification } from 'antd';
import { push } from 'react-router-redux';
import moment from 'moment';

function* getContent({ id }) {
  yield delay(1000);
  const resp = yield call(api.get, `post/${id}`);
  const { data, status } = resp;

  if (status == 200) {
    yield put(actions.getContentSuccess({ ...data }));
  } else {
    yield put(actions.getContentFailed());
  }
}

function* submitContent({ value }) {
  const { image, id } = yield select(state => state.courseFormPage);
  let requestData = {
    ...value,
    lost: value.type === 'Losting' ? 'yes' : '',
    found: value.type === 'Found' ? 'yes' : '',
    statusDate:  moment(value.statusDate).toDate(),
  };
  if (id) {
    let imageResp;
    if (image) {
      let dataImage = yield new FormData();
      yield dataImage.append('recfile', image.originFileObj);
      imageResp = yield call(api.post, `uploadImage`, {}, dataImage, {
        'Content-Type': 'multipart/form-data',
      });
    }
    if (imageResp && imageResp.data.url){
      yield  requestData.image = imageResp.data.url
    }
    const resp = yield call(
      api.put,
      `post/${id}`,
      {},
      { ...requestData },
    );
    const { data, status } = resp;

    if (status == 200) {
      yield delay(2000);
      yield put(actions.submitContentSuccess(data));
      yield notification.open({
        message: 'Update item successfully',
        type: 'success',
      });

      yield put(push(`/item/${id}`));
    } else {
      yield put(actions.submitContentFailed());
    }
  } else {
    let imageResp;
    if (image) {
      let dataImage = yield new FormData();
      yield dataImage.append('recfile', image.originFileObj);
      imageResp = yield call(api.post, `uploadImage`, {}, dataImage, {
        'Content-Type': 'multipart/form-data',
      });
    }
    if (imageResp && imageResp.data.url){
      yield  requestData.image = imageResp.data.url
    }
    const resp = yield call(
      api.post,
      `post`,
      {},
      { ...requestData },
    );
    const { data, status } = resp;

    if (status == 200) {
      yield delay(2000);
      yield put(actions.submitContentSuccess(data));
      yield notification.open({
        message: 'Create item successfully',
        type: 'success',
      });

      yield put(push(`/item/${data.data._id}`));
    } else {
      yield put(actions.submitContentFailed());
    }
  }
}





export default function* courseFormPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(types.GET_CONTENT, getContent);

  yield takeLatest(types.SUBMIT_CONTENT, submitContent);
}
