import Icon from "@components/atomic-design/atoms/Icon";
import React from "react";

export default {
  title: "Atomic Design/Atoms/Icon",
  component: Icon,
};
const Template = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: "fas fa-address-book",
};
