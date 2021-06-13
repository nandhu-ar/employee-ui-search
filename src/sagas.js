import { call, put, takeLatest } from "redux-saga/effects";
import {validateLogin} from './api';

import { VALIDATE_LOGIN, LoginComplete, SET_LOADING } from "./actions";

function* callValidateLogin(action) {
  try {
    yield put({type: SET_LOADING})
    const {data} = yield call(validateLogin, action.user);
    yield put(LoginComplete(data));
  } catch (e) {
      yield put(LoginComplete(false))
  }
}

export default function* mySaga() {
  yield takeLatest(VALIDATE_LOGIN, callValidateLogin);
}