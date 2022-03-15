import React from "react";

const Modal = ({ title, children, closeModal, ...props }) => (
  <div {...props}>
    <div>
      <h3>{title}</h3>
      <i className="fa-solid fa-times" onClick={closeModal} />
    </div>
    {children}
  </div>
);

export default Modal;
