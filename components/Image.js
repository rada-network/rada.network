import ImageNext from "next/image";

const Image = (props) => {
  const data = {
    layout: "fixed",
    ...props,
  };

  return <ImageNext {...data} />;
};

export default Image;
