import { Dispatch } from "react";
import { SubmissionError } from "redux-form";

import { SIGN_UP, LOGIN, REFRESH_USER } from "./authTypes";
import { ISignUpValues } from "../../models/signUp";
import { ILoginValues } from "../../models/login";
import request from "../../utils/request";
import { getToken } from "../../utils/tokenManager";

export const signUpAction = (values: ISignUpValues) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const response = await request.post("/api/users", values);
    dispatch({ type: SIGN_UP, payload: response.data });
  } catch ({ response: { data } }) {
    throw new SubmissionError({ _error: data[0].msg });
  }
};

export const loginAction = (values: ILoginValues) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const response = await request.post("/api/auth", values);
    dispatch({ type: LOGIN, payload: response.data });
  } catch ({ response: { data } }) {
    throw new SubmissionError({ _error: data[0].msg });
  }
};

export const refreshUserAction = () => async (dispatch: Dispatch<any>) => {
  const token = getToken();
  try {
    const response = await request.get("/api/auth", {
      headers: { "x-auth-token": token }
    });
    dispatch({ type: REFRESH_USER, payload: { token, ...response.data } });
  } catch ({ response: { data } }) {
    throw new SubmissionError({ _error: data[0].msg });
  }
};
