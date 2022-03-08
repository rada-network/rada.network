import { LinkProps } from "next/link";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
} from "react";

export = TextLink;

export const TextLinkType: {
  primary: string;
  primaryWithBorder: string;
  secondary: string;
  secondaryWithBorder: string;
  success: string;
  successWithBorder: string;
  warning: string;
  warningWithBorder: string;
  error: string;
  errorWithBorder: string;
};

export type TextLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

declare const TextLink: FunctionComponent<TextLinkProps>;
export default TextLink;
