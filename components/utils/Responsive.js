import { useEffect, useState } from "react";

const SCREENS = ["xs", "sm", "md", "lg", "xl", "2xl"];
const SCREENS_WIDTH = [0, 640, 768, 1023, 1280, 1536];

{
  /* <Screen from="md">xxxx</Screen>
<Screen upto="md">xxxx</Screen> */
}

export const getScreenName = (w) => {
  let i = SCREENS.length - 1;
  while (i > 0 && w < SCREENS_WIDTH[i]) i--;
  return SCREENS[i];
};

export default function Screen({ from, upto, children }) {
  const [screen, setScreen] = useState(3);

  // setup monitor ww
  useEffect(() => {
    const onResize = () => {
      // setWw(window.innerWidth)
      const w = window.innerWidth;
      let i = 0;
      while (i < SCREENS.length - 1 && w > SCREENS_WIDTH[i + 1]) i++;
      setScreen(i);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  let isValid = false;
  if (from && SCREENS.indexOf(from) <= screen) {
    // from this up
    isValid = true;
  }

  if (upto && SCREENS.indexOf(upto) >= screen) {
    // from this down
    isValid = true;
  }

  return isValid ? children : null;
}
