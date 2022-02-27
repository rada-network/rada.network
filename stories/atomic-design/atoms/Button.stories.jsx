import Button, { BtnType } from "@components/atomic-design/atoms/Button";
import React from "react";

export default {
  title: "Atomic Design/Atoms/Button",
  component: Button,
};
const Template = (args) => <Button {...args}>Button</Button>;

export const Primary = Template.bind({});
Primary.args = {
  className: BtnType.primary,
};
export const Secondary = Template.bind({});
Secondary.args = {
  className: BtnType.secondary,
};
export const Tertiary = Template.bind({});
Tertiary.args = {
  className: BtnType.tertiary,
};
export const Success = Template.bind({});
Success.args = {
  className: BtnType.success,
};
export const Warning = Template.bind({});
Warning.args = {
  className: BtnType.warning,
};
export const Error = Template.bind({});
Error.args = {
  className: BtnType.error,
};
