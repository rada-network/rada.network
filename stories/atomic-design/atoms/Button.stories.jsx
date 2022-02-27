import Button, { BtnType } from "@components/atomic-design/atoms/Button";
import React from "react";

export default {
  title: "Atomic Design/Atoms/Button",
  component: Button,
};
const Template = (args) => <Button {...args}>Button</Button>;

export const Primary = Template.bind({});
Primary.args = {
  btnType: BtnType.primary,
};
export const Secondary = Template.bind({});
Secondary.args = {
  btnType: BtnType.secondary,
};
export const Tertiary = Template.bind({});
Tertiary.args = {
  btnType: BtnType.tertiary,
};
export const Success = Template.bind({});
Success.args = {
  btnType: BtnType.success,
};
export const Warning = Template.bind({});
Warning.args = {
  btnType: BtnType.warning,
};
export const Error = Template.bind({});
Error.args = {
  btnType: BtnType.error,
};
