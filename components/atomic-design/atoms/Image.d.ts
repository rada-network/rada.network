import { FunctionComponent, HTMLAttributes } from "react";

export = Image;

export const ImageType: {
  circle: string;
  square: string;
};

export type ImageType = typeof ImageType[keyof typeof ImageType];

export type ImageProps = HTMLAttributes<HTMLElement> & {
  type: ImageType;
};

declare const Image: FunctionComponent<ImageProps>;
export default Image;
