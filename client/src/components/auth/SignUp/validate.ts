import { ISignUpValues } from "../../../models/signUp";

export default (values: ISignUpValues) => {
  const errors: Partial<ISignUpValues> = {};
  console.log("values", values);
  if (!values.name) errors.name = "Name is require";

  if (!values.email) errors.email = "Email is require";

  if (!values.password) errors.password = "Password is require";

  if (!values.confirmPassword)
    errors.confirmPassword = "Confirm Password is require";

  if (values.confirmPassword !== values.password)
    errors.confirmPassword = "Confirm Password not equal password";

  return errors;
};
