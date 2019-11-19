export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAIL = "SIGN_UP_FAIL";

export interface ISignUpSuccessActions {
  type: typeof SIGN_UP_SUCCESS;
  payload: string;
}

export interface ISignUpFailActions {
  type: typeof SIGN_UP_FAIL;
  payload: string;
}

export type TSignUpActionsType = ISignUpSuccessActions | ISignUpFailActions;
