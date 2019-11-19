import React, { useState } from "react";
import style from "./Password.module.scss";

const Password = (props: any) => {
  const [type, setType] = useState("password");
  return (
    <div className={style.root}>
      <input {...props} type={type} autoComplete="off" />
      <i
        className={`far ${type === "password" ? "fa-eye-slash" : "fa-eye"}`}
        onClick={() =>
          setType(prevType => (prevType === "password" ? "text" : "password"))
        }
      />
    </div>
  );
};

export default Password;
