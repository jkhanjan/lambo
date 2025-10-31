/**
 * Main Application Component
 * 
 * Clean, minimal App.jsx using the new architecture:
 * - Zustand for state management (no prop drilling)
 * - Model registry for configuration
 * - Separated UI and Canvas components
 * - Scalable structure for adding new models
 */

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls, Preload } from "@react-three/drei";
import "./App.css";

// Canvas Components
import Studio from "./components/canvas/Studio";
import Floor from "./components/canvas/Floor";
import Effects from "./components/canvas/Effects";
import CameraController from "./components/canvas/CameraController";
import ResponsiveCamera from "./components/canvas/ResponsiveCamera";
import ModelRenderer from "./components/canvas/ModelRenderer";

// UI Components
import Overlay from "./components/ui/Overlay";
import CameraViewButton from "./components/ui/CameraViewButton";

// Store
import useAppStore from "./stores/useAppStore";

const App = () => {
  const isTransitioning = useAppStore((state) => state.isTransitioning);

  return (
    <>
      <CameraViewButton />

      <Suspense fallback={<Loader />}>
        <Overlay />
        <Canvas className="canvas" shadows>
          <ResponsiveCamera />
          <Studio />
          <ModelRenderer />
          <Floor />
          <Effects />
          <CameraController />
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
    </>
  );
};

export default App;
