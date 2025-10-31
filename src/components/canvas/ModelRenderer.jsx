/**
 * Model Renderer Component
 * 
 * Dynamically renders the active car model based on store state.
 * Uses the model registry to determine which component to render.
 */

import React from "react";
import useAppStore from "../../stores/useAppStore";
import { getModelById } from "../../config/models.config";

const ModelRenderer = () => {
  // Use separate selectors to avoid creating new objects on every render
  const activeModelId = useAppStore((state) => state.activeModelId);
  const modelOpacity = useAppStore((state) => state.modelOpacity);

  // Get active model from config
  const activeModel = getModelById(activeModelId);

  if (!activeModel) {
    return null;
  }

  const ModelComponent = activeModel.component;

  return (
    <mesh opacity={modelOpacity} transition="opacity 0.5s">
      <ModelComponent />
    </mesh>
  );
};

export default ModelRenderer;
