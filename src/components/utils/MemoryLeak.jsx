import React, { useEffect, useRef } from "react";

// Add this utility function to dispose Three.js objects
export const disposeObject = (object) => {
  if (!object) return;

  // Traverse the entire object tree
  object.traverse((child) => {
    // Dispose geometry
    if (child.geometry) {
      child.geometry.dispose();
    }

    // Dispose material(s)
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => disposeMaterial(material));
      } else {
        disposeMaterial(child.material);
      }
    }
  });

  // Clear the object
  if (object.parent) {
    object.parent.remove(object);
  }
};

// Helper function to dispose materials and their textures
const disposeMaterial = (material) => {
  if (!material) return;

  // Dispose all textures
  Object.keys(material).forEach((key) => {
    const value = material[key];
    if (value && typeof value === "object" && "minFilter" in value) {
      // It's a texture
      value.dispose();
    }
  });

  material.dispose();
};

// Updated Model Wrapper Component
export const ModelWrapper = ({ children, modelName }) => {
  const groupRef = useRef();
  const previousModelRef = useRef(modelName);

  useEffect(() => {
    // Cleanup previous model when modelName changes
    if (previousModelRef.current !== modelName && groupRef.current) {
      console.log("Disposing previous model:", previousModelRef.current);
      disposeObject(groupRef.current);
    }
    previousModelRef.current = modelName;

    // Cleanup on unmount
    return () => {
      if (groupRef.current) {
        console.log("Disposing model on unmount");
        disposeObject(groupRef.current);
      }
    };
  }, [modelName]);

  return <group ref={groupRef}>{children}</group>;
};
