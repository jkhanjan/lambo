import React, { useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Loader, OrbitControls, Preload, Text3D } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";
import Studio from "./Studio";
import Floor from "./Floor";
import Effects from "./Effects";
import Overlay from "./Overlay.jsx";
import ColorProvider from "./states/ColorContext.jsx";
import Ferrari from "./Ferrari";
import Lambo from "./Lambo.jsx";
import BMW from "./Bmw.jsx";
import Porshe from "./Porshe.jsx";

const CameraController = ({ view, isTransitioning }) => {
  const { camera } = useThree();
  const cameraViews = {
    default: { position: [0, 5, 25], target: [0, 0, 0] },
    sideView: { position: [7, 1, 0], target: [0, 0, 0] },
    topView: { position: [0, 12, 0], target: [0, 0, 0] },
    backView: { position: [0, -2, -16], target: [0, 0, 0] },
  };

  useFrame(() => {
    if (isTransitioning) {
      const currentView = cameraViews[view] || cameraViews["default"];
      camera.position.lerp(new THREE.Vector3(...currentView.position), 0.03);
      const target = new THREE.Vector3(...currentView.target);
      camera.lookAt(target);
    }
  });

  return null;
};

const ResponsiveCamera = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    if (size.width < 768) {
      camera.position.set(0, 5, 15);
      camera.fov = 50;
    } else if (size.width < 1200) {
      camera.position.set(0, 5, 20);
      camera.fov = 45;
    } else {
      camera.position.set(0, 5, 25);
      camera.fov = 30;
    }
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
};

const App = () => {
  const [activeModel, setActiveModel] = useState("Model1");
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
        <button
          onClick={handleCameraViewChange}
          style={{
            padding: "8px 20px",
            background: "rgba(0, 0, 0, 0.7)",
            border: "1px solid #b0cfde",
            color: "#b0cfde",
            fontFamily: "'Arial', sans-serif",
            fontSize: "15px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
            clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 0 10px #b0cfde, inset 0 0 10px #b0cfde",
            textShadow: "0 0 5px #b0cfde",
            maxWidth: "90%",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(0, 255, 255, 0.1)";
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow =
              "0 0 20px #b0cfde, inset 0 0 20px #b0cfde";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(0, 0, 0, 0.7)";
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow =
              "0 0 10px #b0cfde, inset 0 0 10px #b0cfde";
          }}
        >
          {viewNames[cameraView]}
        </button>
      </div>

      <Suspense fallback={<Loader />}>
        <ColorProvider>
          <Overlay setActiveModel={setActiveModel} />
          <Canvas className="canvas" shadows>
            <ResponsiveCamera />
            <Studio />
            {activeModel === "Model1" && <Lambo />}
            {activeModel === "Model2" && <Ferrari />}
            {activeModel === "Model3" && <Porshe />}
            {activeModel === "Model4" && <BMW />}
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
            {/* <Text3D/> */}
            
          </Canvas>
        </ColorProvider>
      </Suspense>
    </>
  );
};

export default App;
