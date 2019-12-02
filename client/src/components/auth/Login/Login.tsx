import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { ILoginValues } from 'models/login';
import FormField from '../../_common/FormField/FormField';
import { loginAction } from 'redux/auth/authActions';
import validate from './validate';
import style from './Login.module.scss';

const Login: React.FC<InjectedFormProps> = ({ handleSubmit, error }: any) => {
  const dispatch: any = useDispatch();

  const onSubmit = (values: ILoginValues): void =>
    dispatch(loginAction(values));

  return (
    <div className={style.root}>
      <h3 className={style.title}>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
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
        {error && <p className={style.error}>{error}</p>}
      </form>
      <p>
        Don't have account? <Link to="/sign-up">Sign up here</Link>
      </p>
    </div>
  );
};

export default reduxForm<{}, {}>({ form: 'login', validate })(Login);
