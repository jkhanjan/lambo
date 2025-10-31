/**
 * Overlay Component
 * 
 * Main UI overlay containing color picker and model selector.
 * Composed of smaller, reusable components.
 */

import React from "react";
import ColorPicker from "./ColorPicker";
import ModelSelector from "./ModelSelector";

const Overlay = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "12%",
        left: "50%",
        transform: "translate(-50%, 50%)",
      }}
      className="w-fit h-fit p-10 z-10"
    >
      <ColorPicker />
      <ModelSelector />
    </div>
  );
};

export default Overlay;
