import React, { useState, Suspense, useMemo } from "react";
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
import { GRADIENT_COLOR, MODEL_MAP, VIEW_NAMES, VIEWS } from "./components/constants/constanst.js";
import { useCarContext } from "./components/context/CarContext.jsx";

const App = () => {
  const [cameraView, setCameraView] = useState("default");

const { carState, transitionProgress, isTransitioning } = useCarContext();


  const CurrentModel = useMemo(
    () => MODEL_MAP[carState.modelName],
    [carState.modelName],
  );


  return (
    <div className="app">
      <Suspense fallback={<Loader />}>
      <Overlay />
      <div className="button-overlay">
          </div>
        <Canvas className="canvas" shadows frameloop="always">
          <ResponsiveCamera />
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
          <Effects environment={carState.environment} />
           {/* <TransitionEffect progress={transitionProgress} /> */}
          <CameraController view={cameraView} isTransitioning={isTransitioning} />
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
      </Suspense>
    </div>
  );
};

export default App;