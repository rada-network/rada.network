import Alert, { AlertType } from "@components/atomic-design/molecules/Alert";
import React from "react";

export default {
  title: "Atomic Design/Molecules/Alert",
  component: Alert,
};
const Template = (args) => <Alert {...args}>Alert</Alert>;

export const Success = Template.bind({});
Success.args = {
  type: AlertType.success,
};
export const Warning = Template.bind({});
Warning.args = {
  type: AlertType.warning,
};
export const Danger = Template.bind({});
Danger.args = {
  type: AlertType.danger,
};
export const Neutral = Template.bind({});
Neutral.args = {
  type: AlertType.neutral,
};
