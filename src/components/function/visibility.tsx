import { useEffect, useState } from "react";

const visibility = () => {
    const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is less than 800px
      if (window.innerWidth > 800) {
        setIsVisible(true); // Ensure it remains visible
      } else {
        setIsVisible(false); // Optionally hide it for larger screens
      }
    };

    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isVisible
};


export {visibility}