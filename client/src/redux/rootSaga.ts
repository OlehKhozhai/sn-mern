import { all } from 'redux-saga/effects';
import { authSaga } from 'redux/auth/authSaga';
import profileSaga from 'redux/profile/profileSagas';

export default function* rootSaga() {
  yield all([authSaga(), profileSaga()]);
}
