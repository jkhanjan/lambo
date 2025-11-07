import React, { useState, Suspense, useReducer, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import ResponsiveCamera from "./components/utils/ResponsiveCamera.jsx";
import CameraController from "./components/utils/CameraController.jsx";
import { Loader, OrbitControls, Preload } from "@react-three/drei";
import "./App.css";
import Studio from "./components/Effects/Studio.jsx";
import Floor from "./components/Effects/Floor.jsx";
import Effects from "./components/Effects/Effects.jsx";
import Overlay from "./components/UI/Overlay.jsx";
import {
  carReducer,
  initialCarState,
} from "./components/reducer/CarReducer.jsx";
import {
  MODEL_MAP,
  VIEW_NAMES,
  VIEWS,
} from "./components/constants/constanst.js";
import { preloadModels } from "./components/utils/PreloadModels.jsx";

const App = () => {
  const [carState, dispatch] = useReducer(carReducer, initialCarState);
  const [cameraView, setCameraView] = useState("default");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const CurrentModel = MODEL_MAP[carState.modelName];
  useEffect(() => {
    preloadModels();
  },[])

  const handleCameraViewChange = () => {
    const currentIndex = VIEWS.indexOf(cameraView);
    const nextIndex = (currentIndex + 1) % VIEWS.length;
    setCameraView(VIEWS[nextIndex]);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const handleModelChange = (modelName) => {
    setTimeout(() => {
      dispatch({ type: "SET_MODEL", modelName });
    }, 500);
  };

  const handleModelColorChange = (color) => {
    dispatch({ type: "SET_COLOR", color });
  };

  const handleTextureChange = ({ metalness, roughness }) => {
    dispatch({ type: "SET_MATERIAL", metalness, roughness });
  };

  const handleEnvironmentChange = (environment) => {
    dispatch({ type: "SET_ENVIRONMENT", environment });
  };

  const handlePartsChange = (parts) => {
    dispatch({ type: "TOGGLE_PART", partName: parts });
  };

  return (
    <>
      <div className="app">
        <Suspense fallback={<Loader />}>
          <Overlay
            environment={carState.environment}
            setActiveModel={handleModelChange}
            setActiveColor={handleModelColorChange}
            setActiveTexture={handleTextureChange}
            setActiveEnvironment={handleEnvironmentChange}
            setActiveParts={handlePartsChange}
            carState={carState}
          />

          <div className="button-overlay">
            <button onClick={handleCameraViewChange} className="button">
              {VIEW_NAMES[cameraView]}
            </button>
          </div>
          <Canvas className="canvas" shadows>
            <ResponsiveCamera />
            <Studio environment={carState.environment} />
            <CurrentModel
              color={carState.color}
              metalness={carState.metalness}
              roughness={carState.roughness}
              parts={carState.parts}
              accessories={carState.accessories}
            />
            <Floor environment={carState.environment} />
            <Effects environment={carState.environment} />
            <CameraController
              view={cameraView}
              isTransitioning={isTransitioning}
            />
            <OrbitControls
              enableZoom={true}
              enableDamping={true}
              dampingFactor={0.05}
              rotateSpeed={0.7}
              maxDistance={50}
              minDistance={5}
              enabled={!isTransitioning}
            />
            <Preload all />
          </Canvas>
        </Suspense>
      </div>
    </>
  );
};

export default App;
