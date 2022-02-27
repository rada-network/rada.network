import { LinkProps } from "next/link";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  InputHTMLAttributes,
  RefObject,
} from "react";

export = Input;

type InputTypeType =
  | "text"
  | "email"
  | "password"
  | "telephone"
  | "number"
  | "checkbox"
  | "radio";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  innerRef?: RefObject<HTMLInputElement>;
  type?: InputTypeType;
};

declare const Input: FunctionComponent<InputProps>;
export default Input;
