import React from "react";

export const ToastType = {
  success: "success",
  warning: "warning",
  error: "error",
  neutral: "neutral",
};

const getProps = (type = ToastType.success) => {
  switch (type) {
    case ToastType.success:
      return { className: ToastType.success };
    case ToastType.warning:
      return { className: ToastType.warning };
    case ToastType.error:
      return { className: ToastType.error };
    case ToastType.neutral:
      return { className: ToastType.neutral };
    default:
      return {};
  }
};

const Toast = ({ type, children, ...props }) => (
  <div {...getProps(type)} {...props}>
    {children}
    <i className="fa-solid fa-times" />
  </div>
);

export default Toast;
