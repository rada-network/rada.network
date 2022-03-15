import { FunctionComponent, HTMLAttributes } from "react";

export = Alert;

export const AlertType: {
  success: string;
  warning: string;
  danger: string;
  neutral: string;
};

export type AlertType = typeof AlertType[keyof typeof AlertType];

export type AlertProps = HTMLAttributes<HTMLElement> & {
  type: AlertType;
};

declare const Alert: FunctionComponent<AlertProps>;
export default Alert;
