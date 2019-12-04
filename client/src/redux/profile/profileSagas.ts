import { getToken } from 'redux/auth/authSelectors';
import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
} from 'redux/profile/profileTypes';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import api, { setAuthHeader } from 'utils/request';

export default function* profileSaga() {
  yield takeLatest(GET_PROFILE, getProfileData);
}

function* getProfileData() {
  try {
    // const token = yield select(getToken);
    //
    // if (!token) return;
    //
    // setAuthHeader(token);

    const { data } = yield call(() => api.get('api/profile/me'));
    console.log('data', data);
    yield put({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: GET_PROFILE_FAIL });
  }
}
