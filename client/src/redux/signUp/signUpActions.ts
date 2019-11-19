import { Dispatch } from "react";
import { SIGN_UP_SUCCESS, SIGN_UP_FAIL } from "./signUpTypes";
import { ISignUpValues } from "../../models/signUp";
import request from "../../utils/request";

export const signUpAction = (values: ISignUpValues) => (
  dispatch: Dispatch<any>
) => {
  request.post("/api/users", values).then(({ data }) => console.log("data", data));
  // console.log("signUpAction---", values);
};
