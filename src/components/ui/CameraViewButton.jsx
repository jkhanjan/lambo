/**
 * Camera View Button Component
 * 
 * Button to cycle through different camera views.
 */

import React from "react";
import useAppStore from "../../stores/useAppStore";

const CameraViewButton = () => {
  // Use separate selectors to avoid creating new objects on every render
  const cameraView = useAppStore((state) => state.cameraView);
  const viewNames = useAppStore((state) => state.viewNames);
  const nextCameraView = useAppStore((state) => state.nextCameraView);

  const buttonStyle = {
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
  };

  const handleMouseEnter = (e) => {
    e.target.style.background = "rgba(0, 255, 255, 0.1)";
    e.target.style.transform = "scale(1.05)";
    e.target.style.boxShadow = "0 0 20px #b0cfde, inset 0 0 20px #b0cfde";
  };

  const handleMouseLeave = (e) => {
    e.target.style.background = "rgba(0, 0, 0, 0.7)";
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "0 0 10px #b0cfde, inset 0 0 10px #b0cfde";
  };

  return (
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
        onClick={nextCameraView}
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {viewNames[cameraView]}
      </button>
    </div>
  );
};

export default CameraViewButton;
