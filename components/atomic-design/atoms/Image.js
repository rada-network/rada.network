import React from "react";

export const ImageType = {
  circle: "circle",
  square: "square",
};

const getProps = (type = ImageType.circle) => {
  switch (type) {
    case ImageType.circle:
      return { className: ImageType.circle };
    case ImageType.square:
      return { className: ImageType.square };
    default:
      return {};
  }
};

const Image = ({ type, ...props }) => <img {...getProps(type)} {...props} />;

export default Image;
