import Link from "next/link";
import React, { Fragment } from "react";

export const TextLinkType = {
  primary: "primary",
  primaryWithBorder: "primary-with-border",
  secondary: "secondary",
  secondaryWithBorder: "secondary-with-border",
  success: "success",
  successWithBorder: "success-with-border",
  warning: "warning",
  warningWithBorder: "warning-with-border",
  error: "error",
  errorWithBorder: "error-with-border",
};

const TextLink = ({ children, ...textLinkProps }) => (
  <Fragment>
    <Link {...textLinkProps} passHref>
      <a {...textLinkProps}>{children}</a>
    </Link>
  </Fragment>
);

export default TextLink;
