import Button, { BtnType } from "@components/atomic-design/atoms/Button";
import Input from "@components/atomic-design/atoms/Input";
import React from "react";

export default {
  title: "Atomic Design/Atoms/Input",
  component: Input,
};
const Template = (args) => <Input {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
  type: "text",
};
export const EmailInput = Template.bind({});
EmailInput.args = {
  type: "email",
};
export const PasswordInput = Template.bind({});
PasswordInput.args = {
  type: "password",
};
export const TelephoneInput = Template.bind({});
TelephoneInput.args = {
  type: "telephone",
};
export const NumberInput = Template.bind({});
NumberInput.args = {
  type: "number",
};
export const CheckBoxInput = Template.bind({});
CheckBoxInput.args = {
  type: "checkbox",
};
