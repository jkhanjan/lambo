import { createContext, useContext, useEffect, useRef, useState } from "react";

// Home for per-frame / input-driven values that the render loop reads every
// frame — the dolly progress and the space-bar hold state. These aren't
// config (they don't belong in CarContext/carReducer), and they're consumed
// in more than one place (CameraController, Effects, Overlay), so they live
// here once instead of each consumer re-deriving its own copy.
const SceneRuntimeContext = createContext(null);

export function SceneRuntimeProvider({ children }) {
  const isHoldingRef = useRef(false);
  const [isHolding, setIsHolding] = useState(false);
  const dollyProgressRef = useRef(0);

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

  return (
    <SceneRuntimeContext.Provider value={{ isHolding, isHoldingRef, dollyProgressRef }}>
      {children}
    </SceneRuntimeContext.Provider>
  );
}

export function useSceneRuntime() {
  return useContext(SceneRuntimeContext);
}
