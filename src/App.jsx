import React, { useState, Suspense, useEffect } from "react";
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
import Lambo from "./models/Lambo.jsx";
import BMW from "./models/Bmw.jsx";
import Ferrari from "./models/Ferrari.jsx";
import Porshe from "./models/Porshe.jsx";

const App = () => {
  const [activeModel, setActiveModel] = useState("Model1");
  const [opacity, setOpacity] = useState(1);
  const [cameraView, setCameraView] = useState("default");
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  useEffect(() => {
    if (!activeModel) {
      setOpacity(0);
      setTimeout(() => {
        setActiveModel(activeModel);
        setOpacity(1);
      }, 500);
    }
  }, [activeModel]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <button onClick={handleCameraViewChange} className="button">
          {viewNames[cameraView]}
        </button>
      </div>

      <Suspense fallback={<Loader />}>
        <ColorProvider>
          <Overlay setActiveModel={setActiveModel} />
          <Canvas className="canvas" shadows>
            <ResponsiveCamera />
            <Studio />
            <mesh opacity={opacity}>
              {activeModel === "Model1" && <Lambo />}
              {activeModel === "Model2" && <Ferrari />}
              {activeModel === "Model3" && <Porshe />}
              {activeModel === "Model4" && <BMW />}
            </mesh>
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
        </ColorProvider>
      </Suspense>
    </>
  );
};

export default App;
