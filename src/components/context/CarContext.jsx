import { createContext, useContext, useReducer, useEffect, useRef, useState, useCallback } from "react";
import { preloadModels } from "../utils/PreloadModels";
import { carReducer, initialCarState } from "../reducer/CarReducer";
import { useGLTF } from "@react-three/drei";

const CarContext = createContext(null);

export function CarProvider({ children }) {
  const [carState, dispatch] = useReducer(carReducer, initialCarState);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isTransitioning, setIsTransitioning]       = useState(false);
  const rafRef    = useRef(null);
  const swappedRef = useRef(false);

useEffect(() => {
  const timer = setTimeout(() => {
    useGLTF.preload("/porsche/scene-draco.glb");
    useGLTF.preload("/model2/scene-draco.glb");
    useGLTF.preload("/bmw/scene-resized.glb");
  }, 3000);

  return () => clearTimeout(timer);
}, []);

  const startTransition = useCallback((modelName, duration = 1000) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    swappedRef.current = false;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setTransitionProgress(t);

      if (t >= 0.5 && !swappedRef.current) {
        swappedRef.current = true;
        dispatch({ type: "SET_MODEL", modelName });
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTransitionProgress(0);
        setIsTransitioning(false);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [isTransitioning]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const actions = {
    setModel:       (modelName)               => startTransition(modelName),  
    setColor:       (color)                   => dispatch({ type: "SET_COLOR", color }),
    setMaterial:    ({ metalness, roughness }) => dispatch({ type: "SET_MATERIAL", metalness, roughness }),
    setEnvironment: (environment)             => dispatch({ type: "SET_ENVIRONMENT", environment }),
    togglePart:     (partName)                => dispatch({ type: "TOGGLE_PART", partName }),
  };

  return (
    <CarContext.Provider value={{ carState, transitionProgress, isTransitioning, ...actions }}>
      {children}
    </CarContext.Provider>
  );
}

export function useCarContext() {
  return useContext(CarContext);
}