import { ILoginValues } from "../../../models/login";

export default (values: ILoginValues) => {
  const errors: Partial<ILoginValues> = {};

  if (!values.password) errors.password = "Password is require";
  if (values.password && values.password.length < 6)
    errors.password = "Password length minimum 6 symbols";

  if (!values.email) errors.email = "Email is require";
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = "Invalid email address";

  return errors;
};
