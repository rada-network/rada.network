import NextHead from "next/head";
import { useEffect, useRef, useState } from "react";

let hydrated = false;

const LazyLoadCSS = ({ href }) => {
  const hydratedRef = useRef(false);
  const [, rerender] = useState(false);

  useEffect(() => {
    if (!hydratedRef.current) {
      hydrated = true;
      hydratedRef.current = true;
      rerender(true);
    }
  }, []);

  return (
    <NextHead>
      <link rel="preconnect" href={href} />
      <link rel="preload" as="style" href={href} />
      <link href={href} rel="stylesheet" media={!hydrated ? "print" : "all"} />
    </NextHead>
  );
};

export default LazyLoadCSS;
