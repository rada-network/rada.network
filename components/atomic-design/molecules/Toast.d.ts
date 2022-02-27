import { FunctionComponent, HTMLAttributes } from "react";

export = Toast;

export const ToastType: {
  success: string;
  warning: string;
  error: string;
  neutral: string;
};

export type ToastType = typeof ToastType[keyof typeof ToastType];

export type ToastProps = HTMLAttributes<HTMLElement> & {
  type: ToastType;
};

declare const Toast: FunctionComponent<ToastProps>;
export default Toast;
