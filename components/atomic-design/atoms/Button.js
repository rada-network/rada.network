import React from "react";

export const BtnType = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  success: "success",
  warning: "warning",
  error: "error",
};

const Button = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export default Button;
