import { useEffect, useState } from "react";

const visibility = () => {
    const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setIsVisible(true); 
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isVisible
};


export {visibility}