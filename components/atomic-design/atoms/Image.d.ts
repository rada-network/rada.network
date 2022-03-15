import { FunctionComponent, HTMLAttributes, ImgHTMLAttributes } from "react";

export = Image;

export const ImageType: {
  circle: string;
  square: string;
};

export type ImageType = typeof ImageType[keyof typeof ImageType];

export type ImageProps = ImgHTMLAttributes<HTMLElement> & {
  type: ImageType;
};

declare const Image: FunctionComponent<ImageProps>;
export default Image;
