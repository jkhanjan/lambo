import { useEffect, useRef, useState } from "react";

export default function useSpaceHold() {
  const isHoldingRef = useRef(0);
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        isHoldingRef.current = true;
        setIsHolding(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === "Space") {
        isHoldingRef.current = false;
        setIsHolding(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { isHolding, isHoldingRef };
}