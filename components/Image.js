import ImageNext from "next/image";
import { useState, useEffect } from "react";

const Image = (props) => {
  // Fix  Avoid Hydration Mismatch #https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const data = {
    layout: "fixed",
    ...props,
  };

  return <ImageNext {...data} />;
};

export default Image;
