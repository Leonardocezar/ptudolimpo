import { takeLatest, call, put, all } from "redux-saga/effects";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { updateProfileSuccess, updateProfileFailure } from "./actions";

export function* updateProfile({ payload }) {
  try {
    const { name, email, id, ...rest } = payload.data;

    const profile = Object.assign(
      { name, email },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, `users/${id}`, profile);
    toast.success("Perfil atualizado com sucesso");
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    toast.error(error.response.data.error);
    yield put(updateProfileFailure());
  }
}
export default all([takeLatest("@user/UPDATE_PROFILE_REQUEST", updateProfile)]);
