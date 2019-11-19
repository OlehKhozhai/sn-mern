import { ILoginValues } from "../../../models/login";

export default (values: ILoginValues) => {
  const errors: Partial<ILoginValues> = {};

  if (!values.email) errors.email = "Email is require";
  if (!values.password) errors.password = "Password is require";

  return errors;
};
