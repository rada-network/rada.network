import React, { FunctionComponent, HTMLAttributes } from "react";

export = Modal;

export type ModalProps = HTMLAttributes<HTMLElement> & {
  title: string;
  closeModal: React.MouseEventHandler<HTMLElement>;
};

declare const Modal: FunctionComponent<ModalProps>;
export default Modal;
