import TextLink, {
  TextLinkType,
} from "@components/atomic-design/atoms/TextLink";
import React from "react";

export default {
  title: "Atomic Design/Atoms/TextLink",
  component: TextLink,
};
const Template = (args) => <TextLink {...args}>hello world</TextLink>;

export const Primary = Template.bind({});
Primary.args = {
  className: TextLinkType.primary,
  href: "#",
};
export const PrimaryWithBorder = Template.bind({});
PrimaryWithBorder.args = {
  className: TextLinkType.primaryWithBorder,
  href: "#",
};
export const Secondary = Template.bind({});
Secondary.args = {
  className: TextLinkType.secondary,
  href: "#",
};
export const SecondaryWithBorder = Template.bind({});
SecondaryWithBorder.args = {
  className: TextLinkType.secondaryWithBorder,
  href: "#",
};
export const Success = Template.bind({});
Success.args = {
  className: TextLinkType.success,
  href: "#",
};
export const SuccessWithBorder = Template.bind({});
SuccessWithBorder.args = {
  className: TextLinkType.successWithBorder,
  href: "#",
};
export const Warning = Template.bind({});
Warning.args = {
  className: TextLinkType.warning,
  href: "#",
};
export const WarningWithBorder = Template.bind({});
WarningWithBorder.args = {
  className: TextLinkType.warningWithBorder,
  href: "#",
};
export const Error = Template.bind({});
Error.args = {
  className: TextLinkType.error,
  href: "#",
};
export const ErrorWithBorder = Template.bind({});
ErrorWithBorder.args = {
  className: TextLinkType.errorWithBorder,
  href: "#",
};
