import React, { useState } from "react";
import { useColor } from "./states/ColorContext";

const Overlay = ({ setActiveModel }) => {
  const { setSelectedColor } = useColor();
  const models = ["Model1", "Model2", "Model3", "Model4"];

  const gradientColors = [
    "#ffffff", // White
    "#f0f0f0", // Light Grey
    "#d3d3d3", // Grey
    "#c0c0c0", // Silver
    "#a9a9a9", // Dark Grey
    "#808080", // Grey
    "#6a6969", // Grey
  ];

  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setSliderValue(value);

    const colorIndex = Math.floor((value / 100) * (gradientColors.length - 1));
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

  const handleMouseEnter = (e) => {
    e.target.style.background = "rgba(0, 255, 255, 0.1)";
    e.target.style.transform = "scale(1.05)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.background = "rgba(0, 0, 0, 0.7)";
    e.target.style.transform = "scale(1)";
  };

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
          value={sliderValue}
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
          }}
        />
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {models.map((model, index) => (
          <button
            key={index}
            onClick={() => setActiveModel(model)}
            style={buttonStyles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {model}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Overlay;
