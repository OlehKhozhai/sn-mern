export default (values: any) => {
  const errors: any = {};

  if (values && !values.name) errors.name = "Name is require";

  if (values && !values.email) errors.email = "Email is require";

  if (values && !values.password) errors.password = "Password is require";

  if (values && !values.confirmPassword)
    errors.confirmPassword = "Confirm Password is require";

  if (values && values.confirmPassword !== values.password)
    errors.confirmPassword = "Confirm Password not equal password";

  return errors;
};
