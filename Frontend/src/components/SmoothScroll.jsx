import { useEffect } from "react";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Smooth scroll animations removed - kept component structure
    console.log("SmoothScroll component loaded")
  }, []);

  return children;
}