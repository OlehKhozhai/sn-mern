export interface ISignUpValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface ISignUpValuesSaga {
  values: ISignUpValues;
  type: string;
}
