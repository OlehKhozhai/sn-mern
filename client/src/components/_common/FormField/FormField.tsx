import React from "react";
import Input from "./Input/Input";
import style from "./FormField.module.scss";
import Password from "./Password/Password";

const field = ({ fieldType, ...props }: any) => {
  switch (fieldType) {

    case "password": {
      return <Password {...props} />;
    }

    default: {
      return <Input {...props} />;
    }
  }
};
const FormField = ({ input, meta, ...props }: any) => {

  return (
    <div className={style.root}>
      {field({ ...props, ...input })}
      {meta.touched && meta.invalid && <div className={style.error}>{meta.error}</div>}
    </div>
  );
};
export default FormField;
