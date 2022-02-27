import React, { Fragment } from "react";

export const BtnType = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  success: "success",
  warning: "warning",
  error: "error",
};

const Button = ({ children, ...props }) => (
  <Fragment>
    <button {...props}>{children}</button>
  </Fragment>
);

export default Button;
