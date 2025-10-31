/**
 * Model Selector Component
 * 
 * Displays buttons for selecting different car models.
 * Automatically generates buttons from the model registry.
 */

import React from "react";
import useAppStore from "../../stores/useAppStore";
import { MODELS } from "../../config/models.config";

const ModelSelector = () => {
  // Use separate selectors to avoid creating new objects on every render
  const activeModelId = useAppStore((state) => state.activeModelId);
  const setActiveModel = useAppStore((state) => state.setActiveModel);

  const buttonStyles = {
    padding: "8px 20px",
    background: "rgba(0, 0, 0, 0.7)",
    border: "1px solid #b0cfde",
    color: "#b0cfde",
    fontFamily: "'Arial', sans-serif",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
    clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 0 10px #b0cfde, inset 0 0 10px #b0cfde",
    textShadow: "0 0 5px #b0cfde",
    position: "relative",
    overflow: "hidden",
  };

  const activeButtonStyles = {
    ...buttonStyles,
    background: "rgba(0, 255, 255, 0.2)",
    boxShadow: "0 0 20px #b0cfde, inset 0 0 20px #b0cfde",
  };

  const handleMouseEnter = (e) => {
    e.target.style.background = "rgba(0, 255, 255, 0.1)";
    e.target.style.transform = "scale(1.05)";
  };

  const handleMouseLeave = (e, isActive) => {
    e.target.style.background = isActive
      ? "rgba(0, 255, 255, 0.2)"
      : "rgba(0, 0, 0, 0.7)";
    e.target.style.transform = "scale(1)";
  };

  return (
    <div className="flex justify-center gap-4 mt-4 flex-wrap">
      {MODELS.map((model) => {
        const isActive = activeModelId === model.id;
        return (
          <button
            key={model.id}
            onClick={() => setActiveModel(model.id)}
            style={isActive ? activeButtonStyles : buttonStyles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={(e) => handleMouseLeave(e, isActive)}
          >
            {model.name}
          </button>
        );
      })}
    </div>
  );
};

export default ModelSelector;
