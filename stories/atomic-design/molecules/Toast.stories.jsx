import Toast, { ToastType } from "@components/atomic-design/molecules/Toast";
import React from "react";

export default {
  title: "Atomic Design/Molecules/Toast",
  component: Toast,
};
const Template = (args) => <Toast {...args}>Toast toast toast</Toast>;

export const Success = Template.bind({});
Success.args = {
  type: ToastType.success,
};
export const Warning = Template.bind({});
Warning.args = {
  type: ToastType.warning,
};
export const Error = Template.bind({});
Error.args = {
  type: ToastType.error,
};
export const Neutral = Template.bind({});
Neutral.args = {
  type: ToastType.neutral,
};
