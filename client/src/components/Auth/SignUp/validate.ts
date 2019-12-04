import { ISignUpValues } from "../../../models/signUp";

export default (values: ISignUpValues) => {
  const errors: Partial<ISignUpValues> = {};

  if (!values.name) errors.name = "Name is require";
  if (values.name && values.name.length < 3)
    errors.name = "Name length minimum 3 charters";

  if (!values.email) errors.email = "Email is require";
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = "Invalid email address";

  if (!values.password) errors.password = "Password is require";
  if (values.password && values.password.length < 6)
    errors.password = "Password length minimum 6 symbols";

  if (!values.confirmPassword)
    errors.confirmPassword = "Confirm Password is require";

  if (values.confirmPassword !== values.password)
    errors.confirmPassword = "Confirm Password not equal password";

  return errors;
};
