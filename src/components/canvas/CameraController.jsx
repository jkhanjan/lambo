/**
 * Camera Controller Component
 * 
 * Handles smooth camera transitions between different views.
 * Uses model-specific camera presets from configuration.
 */

import React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useAppStore from "../../stores/useAppStore";
import { getModelById } from "../../config/models.config";

const CameraController = () => {
  const { camera } = useThree();
  // Use separate selectors to avoid creating new objects on every render
  const activeModelId = useAppStore((state) => state.activeModelId);
  const cameraView = useAppStore((state) => state.cameraView);
  const isTransitioning = useAppStore((state) => state.isTransitioning);

  useFrame(() => {
    if (isTransitioning) {
      // Get camera preset from active model config
      const activeModel = getModelById(activeModelId);
      const preset = activeModel?.properties.cameraPresets?.[cameraView] || {
        position: [0, 5, 25],
        target: [0, 0, 0],
      };
      
      camera.position.lerp(new THREE.Vector3(...preset.position), 0.03);
      const target = new THREE.Vector3(...preset.target);
      camera.lookAt(target);
    }
  });

  return null;
};

export default CameraController;
