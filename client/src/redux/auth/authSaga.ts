import { ISignUpValuesSaga } from 'models/signUp';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import { stopSubmit } from 'redux-form';
import { loginAction } from 'redux/auth/authActions';
import { getToken } from 'redux/auth/authSelectors';
import api, { clearAuthHeader, setAuthHeader } from 'utils/request';
import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REFRESH_USER,
  REFRESH_USER_FAIL,
  REFRESH_USER_SUCCESS,
  SIGN_UP,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
} from 'redux/auth/authTypes';

export function* authSaga() {
  yield takeLatest(LOGIN, loginUser);
  yield takeLatest(SIGN_UP, signUpUser);
  yield takeLatest(REFRESH_USER, refreshUser);
}

function* loginUser({ values }: ReturnType<typeof loginAction>) {
  try {
    const { data } = yield call(() => api.post('/api/auth', values));
    yield put({ type: LOGIN_SUCCESS, payload: data });
  } catch ({ response: { data } }) {
    yield put({ type: LOGIN_FAIL });
    yield put(stopSubmit('login', { _error: data[0].msg }));
  }
}

function* signUpUser({ values }: ISignUpValuesSaga) {
  try {
    const { data } = yield call(() => api.post('/api/users', values));
    yield put({ type: SIGN_UP_SUCCESS, payload: data });
  } catch ({ response: { data } }) {
    yield put({ type: SIGN_UP_FAIL });
    yield put(stopSubmit('signUp', { _error: data[0].msg }));
  }
}

function* refreshUser() {
  const token = yield select(getToken);

  if (!token) return;

  setAuthHeader(token);

  try {
    const { data } = yield call(() => api.get('/api/auth'));
    yield put({ type: REFRESH_USER_SUCCESS, payload: data });
  } catch ({ response: { data } }) {
    clearAuthHeader();
    yield put({ type: REFRESH_USER_FAIL });
  }
}
