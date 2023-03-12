import { useEffect, useState } from "react";

export const mediaQueryHook = () => {
  const [size, setSize] = useState(null);
  const test = () => {
    setSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", test);
    setSize(window.innerWidth);
  }, [size]);

  return {
    isXs: size < 768,
    isSm: size < 992 && size > 767,
    isMd: size < 1200 && size > 991,
    isLg: size < 1500 && size > 1199,
    isXl: size < 1800 && size > 1499,
    isXXl: size > 1800,

    isLgDown: size < 1500,
    isMdDown: size < 1200,
    isSmDown: size < 992,

    isMdUp: size > 1200,
    isSmUp: size > 992,
  };
};
