import React from "react";
import { reduxForm, Field } from "redux-form";
import FormField from "../../_common/FormField/FormField";
import validate from "./validate";
import style from "./SignUp.module.scss";
import { Link } from "react-router-dom";

const SignUp: React.FC = ({ handleSubmit }: any) => {
  const onSubmit = (values: any) => {
    console.log("---", values);
  };

  return (
    <div className={style.root}>
      <h3 className={style.title}>CREATE ACCOUNT</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          component={FormField}
          name="name"
          placeholder="Your Name"
          className={style.input}
        />

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
          fieldType='password'
        />
        <Field
          component={FormField}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className={style.input}
          fieldType='password'

        />
        <button type="submit" className={style.submitBtn}>
          Sign In
        </button>
      </form>
      <p>
        Have already an account ? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default reduxForm({ form: "signUp", validate })(SignUp);
