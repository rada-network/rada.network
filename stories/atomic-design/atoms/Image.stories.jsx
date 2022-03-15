import Image, { ImageType } from "@components/atomic-design/atoms/Image";
import React from "react";

export default {
  title: "Atomic Design/Atoms/Image",
  component: Image,
};
const Template = (args) => <Image {...args} />;

export const Circle = Template.bind({});
Circle.args = {
  src: "https://picsum.photos/50/50",
  type: ImageType.circle,
};
export const Square = Template.bind({});
Square.args = {
  src: "https://picsum.photos/50/50",
  type: ImageType.square,
};
