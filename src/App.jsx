import React, { useState, Suspense, useMemo, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls, Preload } from "@react-three/drei";
import "./App.css";
import './index.css';

import ResponsiveCamera from "./components/utils/ResponsiveCamera.jsx";
import CameraController from "./components/utils/CameraController.jsx";
import Studio from "./components/Effects/Studio.jsx";
import Floor from "./components/Effects/Floor.jsx";
import Effects from "./components/Effects/Effects.jsx";
import { Overlay } from "./components/UI/Overlay.jsx";
import { GRADIENT_COLOR, MODEL_MAP } from "./components/constants/constanst.js";
import { useCarContext } from "./components/context/CarContext.jsx";

const App = () => {
  const dollyProgressRef = useRef(0);
  const { carState, isTransitioning } = useCarContext();
  const CurrentModel = useMemo(
    () => MODEL_MAP[carState.modelName],
    [carState.modelName],
  );


  return (
     <div className="app">
      <Overlay />
      <Canvas className="canvas " shadows frameloop="always" >
          <ResponsiveCamera />
          <Suspense fallback={null}>
          <Studio environment={carState.environment} />
          <CurrentModel
              color={carState.color}
              allColors={GRADIENT_COLOR}
              metalness={carState.metalness}
              roughness={carState.roughness}
              parts={carState.parts}
              accessories={carState.accessories}
            />
          <Floor environment={carState.environment} />
          </Suspense>
          <Effects environment={carState.environment} />
            <CameraController
              dollyProgressRef={dollyProgressRef}
            />
              <OrbitControls
                enableZoom
                enableDamping
                dampingFactor={0.05}
                rotateSpeed={0.7}
                maxDistance={100}
                minDistance={5}
                enabled={!isTransitioning}
              />
            <Preload all />
        </Canvas>
        <Loader /> 
      </div>
  );
};

export default App;