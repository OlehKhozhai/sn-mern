import React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormField from '../../_common/FormField/FormField';
import { ISignUpValues } from 'models/signUp';
import { signUpAction } from 'redux/auth/authActions';
import validate from './validate';
import style from './SignUp.module.scss';

const SignUp: React.FC<InjectedFormProps> = ({ handleSubmit, error }: any) => {
  const dispatch: any = useDispatch();

  const onSubmit = (values: ISignUpValues) => dispatch(signUpAction(values));

  return (
    <div className={style.root}>
      <h3 className={style.title}>CREATE ACCOUNT</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
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
          fieldType="password"
        />
        <Field
          component={FormField}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className={style.input}
          fieldType="password"
        />
        <button type="submit" className={style.submitBtn}>
          Sign In
        </button>
        {error && <p className={style.error}>{error}</p>}
      </form>
      <p>
        Have already an account ? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default reduxForm<{}, {}>({ form: 'signUp', validate })(SignUp);
