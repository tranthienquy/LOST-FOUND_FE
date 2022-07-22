import { take, call, put, select, takeLatest, delay } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import * as api from 'utils/api';
import axios from 'axios';
// Individual exports for testing
function* login({ value, category }) {
  console.log(value);
  const resp = yield call(
    api.post,
    `users/login`,
    {},
    { username: value.email, password: value.uid },
  );
  const { data, status } = resp;
  console.log(resp, status, category);
  if (status == 200) {
    document.cookie = yield data.token;
    yield localStorage.setItem('token', data.data.token);
    if (category ==="admin"){
      localStorage.setItem('isAdmin', true);
    }
    yield delay(500);
    yield put(actions.loginSuccess(data));
    yield location.replace('/');
  } else if (status == 400 && data === 'User doest not exist' && category!=="admin") {
    
    const registerResp = yield call(
      api.post,
      `users/register`,
      {},
      {
        username: value.email,
        email: value.email,
        password: value.uid,
        avt: value.photoURL,
        name: value.displayName,
      },
    );
    if (registerResp.status === 201) {
      yield put(actions.login({ email: value.email, uid: value.uid }));
    } else yield put(actions.loginFailed());
  } else {
    yield delay(1000);

    yield put(actions.loginFailed());
  }
}
function* getCurrentUser(content) {}
export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(types.LOGIN, login);
}
