import React from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { ILoginValues } from "../../../models/login";
import FormField from "../../_common/FormField/FormField";
import validate from "./validate";
import style from "./Login.module.scss";

const Login: React.FC<InjectedFormProps> = ({ handleSubmit }: any) => {
  const onSubmit = (values: ILoginValues) => {
    console.log("---", values);
  };

  return (
    <div className={style.root}>
      <h3 className={style.title}>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          component={FormField}
          name="email"
          type="email"
          placeholder="Your Email"
          className={style.input}
        />
        <Field
          component={FormField}
          name="password"
          type="password"
          placeholder="Your Password"
          className={style.input}
        />

        <button type="submit" className={style.submitBtn}>
          Sign Up
        </button>
      </form>
      <p>
        Don't have account? <Link to="/sign-up">Sign up here</Link>
      </p>
    </div>
  );
};

export default reduxForm<{}, {}>({ form: "login", validate })(Login);
