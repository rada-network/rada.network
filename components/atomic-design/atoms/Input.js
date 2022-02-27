import React from "react";

const getProps = (type = "text") => {
  switch (type) {
    case "text":
      return { type: "text" };
    case "email":
      return {
        type: "email",
        maxLength: 255,
        inputMode: "email",
      };
    case "password":
      return {
        type: "password",
        maxLength: 100,
      };
    case "telephone":
      return {
        type: "tel",
        maxLength: 13,
      };
    case "number":
      return {
        type: "number",
      };
    case "checkbox":
      return {
        type: "checkbox",
      };
    case "radio":
      return {
        type: "radio",
      };
    default:
      return {};
  }
};

const Input = ({ innerRef, type, ...props }) => (
  <input {...getProps(type)} {...props} ref={innerRef} />
);

export default Input;
