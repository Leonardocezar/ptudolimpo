import { takeLatest, call, put, all } from "redux-saga/effects";
import api from "~/services/api";
import history from "~/services/history";
import { signInSuccess, signFailure } from "./actions";
import { toast } from "react-toastify";

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, "auth", {
      email,
      password,
    });

    const { token, user } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    if (response.data.user.module === "admin") {
      yield put(signInSuccess(token, user));
      history.push("/administracao/dashboard");
    } else if (response.data.user.module === "automotive") {
      yield put(signInSuccess(token, user));
      history.push("/estetica/dashboard");
    } else if (response.data.user.module === "cleaning") {
      yield put(signInSuccess(token, user));
      history.push("/higienizacao/dashboard");
    } else if (response.data.user.module === "dedetization") {
      yield put(signInSuccess(token, user));
      history.push("/dedetizacao/dashboard");
    }
  } catch (error) {
    toast.error(error.response.data.error);
    yield put(signFailure());
  }
}

export function signOut() {
  history.push("/");
}
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}
export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_OUT", signOut),
]);
