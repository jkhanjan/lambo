/**
 * Color Picker Component
 * 
 * Displays a gradient slider for selecting car colors.
 * Automatically uses the available colors from the active model's configuration.
 */

import React from "react";
import useAppStore from "../../stores/useAppStore";
import { getModelById } from "../../config/models.config";

const ColorPicker = () => {
  // Use separate selectors to avoid creating new objects on every render
  const activeModelId = useAppStore((state) => state.activeModelId);
  const colorSliderValue = useAppStore((state) => state.colorSliderValue);
  const setColorSliderValue = useAppStore((state) => state.setColorSliderValue);
  const setSelectedColor = useAppStore((state) => state.setSelectedColor);

  // Compute available colors from active model
  const activeModel = getModelById(activeModelId);
  const gradientColors = activeModel?.properties.availableColors || [];

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setColorSliderValue(value);

    // Calculate interpolated color
    const colorIndex = Math.floor(
      (value / 100) * (gradientColors.length - 1)
    );
    const colorStart = gradientColors[colorIndex];
    const colorEnd = gradientColors[colorIndex + 1] || colorStart;

    const mix = (value / 100) * (gradientColors.length - 1) - colorIndex;
    const interpolateColor = (start, end, factor) =>
      `#${[0, 1, 2]
        .map((i) =>
          Math.round(
            parseInt(start.slice(1, 7).substr(i * 2, 2), 16) * (1 - factor) +
              parseInt(end.slice(1, 7).substr(i * 2, 2), 16) * factor
          )
            .toString(16)
            .padStart(2, "0")
        )
        .join("")}`;

    const selectedColor = interpolateColor(colorStart, colorEnd, mix);
    setSelectedColor(selectedColor);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "50em",
        height: "20px",
        background: `linear-gradient(to right, ${gradientColors.join(", ")})`,
        borderRadius: "10px",
        margin: "20px auto",
      }}
    >
      <input
        type="range"
        min="0"
        max="100"
        value={colorSliderValue}
        onChange={handleSliderChange}
        style={{
          position: "absolute",
          top: "50%",
          left: "0",
          width: "100%",
          height: "100%",
          appearance: "none",
          background: "none",
          pointerEvents: "auto",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default ColorPicker;
