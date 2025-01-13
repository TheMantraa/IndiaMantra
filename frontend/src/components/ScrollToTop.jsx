import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get the current path

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page whenever the path changes
  }, [pathname]);

  return null; // This component doesn't render anything visually
};

export default ScrollToTop;
