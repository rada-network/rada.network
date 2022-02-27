import { ButtonHTMLAttributes, FunctionComponent } from "react";

export = Button;

export const BtnType: {
  primary: string;
  secondary: string;
  tertiary: string;
  success: string;
  warning: string;
  error: string;
};

export type BtnType = typeof BtnType[keyof typeof BtnType];

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  btnType: BtnType;
};

declare const Button: FunctionComponent<ButtonProps>;
export default Button;
