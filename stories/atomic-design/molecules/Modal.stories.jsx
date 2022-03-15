import Modal from "@components/atomic-design/molecules/Modal";
import React from "react";

export default {
  title: "Atomic Design/Molecules/Modal",
  component: Modal,
};
const Template = (args) => <Modal {...args}>Hello world modal</Modal>;

export const Default = Template.bind({});
Default.args = {
  title: "Title title",
  closeModal: () => {
    alert("hello from modal");
  },
};
