import React, { useState, Suspense, useReducer, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import CameraController from "./functionality/CameraController.jsx";
import ResponsiveCamera from "./functionality/ResponsiveCamera.jsx";
import { Loader, OrbitControls, Preload } from "@react-three/drei";
import "./App.css";
import Studio from "./Studio";
import Floor from "./Floor";
import Effects from "./Effects";
import Overlay from "./Overlay.jsx";
import ColorProvider from "./states/ColorContext.jsx";
import { carReducer, initialCarState } from "./reducer/CarReducer.jsx";
import PreloadCars from "./functionality/PreLoadAll.jsx";
import LoadTracker from "./functionality/Loader.jsx";

const App = () => {
  const [carState, dispatch] = useReducer(carReducer, initialCarState);
  const [opacity, setOpacity] = useState(1);
  const [cameraView, setCameraView] = useState("default");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [firstModelLoaded, setFirstModelLoaded] = useState(false);

  const views = ["default", "sideView", "topView", "backView"];
  const viewNames = {
    default: "Default View",
    sideView: "Side View",
    topView: "Top View",
    backView: "Back View",
  };

  const handleCameraViewChange = () => {
    const currentIndex = views.indexOf(cameraView);
    const nextIndex = (currentIndex + 1) % views.length;
    setCameraView(views[nextIndex]);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const handleModelChange = (modelName) => {
    setOpacity(0);
    setTimeout(() => {
      dispatch({ type: "SET_MODEL", model: modelName });
      setOpacity(1);
    }, 500);
  };

  return (
    <>
      <div className="button-overlay">
        <button onClick={handleCameraViewChange} className="button">
          {viewNames[cameraView]}
        </button>
      </div>

      <Suspense fallback={<Loader />}>
        <ColorProvider>
          <Overlay setActiveModel={handleModelChange} />
          <Canvas className="canvas" shadows>
            <ResponsiveCamera />
            <Studio />
            <mesh opacity={opacity}>{carState.model}</mesh>
            <Floor />
            <Effects />
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
          {carState.name === "Model1" && !firstModelLoaded && (
            <LoadTracker
              onComplete={() => {
                setFirstModelLoaded(true);
                console.log("First model loaded, starting background preload");
              }}
            />
          )}
          {firstModelLoaded && <PreloadCars />}
        </ColorProvider>
      </Suspense>
    </>
  );
};

export default App;
