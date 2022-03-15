import React from "react";

export const AlertType = {
  success: "success",
  warning: "warning",
  danger: "danger",
  neutral: "neutral",
};

const getProps = (type = AlertType.success) => {
  switch (type) {
    case AlertType.success:
      return { className: AlertType.success };
    case AlertType.warning:
      return { className: AlertType.warning };
    case AlertType.danger:
      return { className: AlertType.danger };
    case AlertType.neutral:
      return { className: AlertType.neutral };
    default:
      return {};
  }
};

const Alert = ({ type, children, ...props }) => (
  <div {...getProps(type)} {...props}>
    {children}
    <i className="fa-solid fa-times" />
  </div>
);

export default Alert;
