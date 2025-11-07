import React, { useState, memo, useCallback } from "react";
import {
  GRADIENT_COLOR,
  MODELS_NAME,
  ENVIRONMENTS,
} from "../constants/constanst";
import "./Overlay.css";

const OverlayComponent = ({
  setActiveModel,
  setActiveColor,
  setActiveTexture,
  setActiveEnvironment,
  setActiveSpoiler,
  setActiveParts,
  carState,
  environment = "night",
}) => {
  const gradientColors = GRADIENT_COLOR;

  const [sliderValue, setSliderValue] = useState(0);
  const [metalness, setMetalness] = useState(0.5);
  const [roughness, setRoughness] = useState(0.5);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const menuOptions = [
    { id: "color", label: "Color" },
    { id: "paintType", label: "Paint Type" },
    { id: "model", label: "Model" },
    { id: "environment", label: "Environment" },
    { id: "accessories", label: "Accessories" },
  ];

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const interpolateColor = useCallback(
    (start, end, factor) =>
      `#${[0, 1, 2]
        .map((i) =>
          Math.round(
            parseInt(start.slice(1, 7).substr(i * 2, 2), 16) * (1 - factor) +
              parseInt(end.slice(1, 7).substr(i * 2, 2), 16) * factor
          )
            .toString(16)
            .padStart(2, "0")
        )
        .join("")}`,
    []
  );

  const handleSliderChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSliderValue(value);

      const colorIndex = Math.floor(
        (value / 100) * (gradientColors.length - 1)
      );
      const colorStart = gradientColors[colorIndex];
      const colorEnd = gradientColors[colorIndex + 1] || colorStart;

      const mix = (value / 100) * (gradientColors.length - 1) - colorIndex;
      const selectedColor = interpolateColor(colorStart, colorEnd, mix);
      setActiveColor(selectedColor);
    },
    [gradientColors, interpolateColor, setActiveColor]
  );

  const handleMetalnessChange = useCallback(
    (e) => {
      const value = parseFloat(e.target.value);
      setMetalness(value);
      setActiveTexture({ metalness: value, roughness });
    },
    [roughness, setActiveTexture]
  );

  const handleRoughnessChange = useCallback(
    (e) => {
      const value = parseFloat(e.target.value);
      setRoughness(value);
      setActiveTexture({ metalness, roughness: value });
    },
    [metalness, setActiveTexture]
  );

  return (
    <>
      <button
        onClick={toggleNav}
        className="menu-toggle-button fixed top-5 left-6 z-20 p-2 rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <div
        className={`nav-menu fixed left-0 top-0 h-full  py-6 px-2 transition-transform duration-300 ease-in-out z-10 ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="nav-menu-content mt-16 space-y-4">
          {menuOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setActiveMenu(option.id);
                setIsNavOpen(false);
              }}
              className={`nav-menu-button w-full text-left px-4 py-3 rounded-lg ${
                activeMenu === option.id ? "" : ""
              } text-white hover:bg-blue-500 transition-colors`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overlay-container">
        {activeMenu === "environment" && (
          <div className="environment-control-wrapper">
            <h3 className="text-white text-lg mb-4">Choose Environment</h3>
            <div className="environment-options">
              {Object.entries(ENVIRONMENTS).map(([key, env]) => (
                <button
                  key={key}
                  onClick={() => setActiveEnvironment(key)}
                  className={`environment-button ${
                    environment === key ? "active" : ""
                  }`}
                >
                  {env.name}
                </button>
              ))}
            </div>
          </div>
        )}
        {activeMenu === "color" && (
          <div className="color-control-wrapper">
            <h3
              style={{
                color:
                  gradientColors[
                    Math.floor(
                      (sliderValue / 100) * (gradientColors.length - 1)
                    )
                  ],
              }}
              className="text-white text-lg mb-4"
            >
              Choose Color
            </h3>
            <div
              className="color-slider-container"
              style={{
                background: `linear-gradient(to right, ${gradientColors.join(
                  ", "
                )})`,
              }}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
                className="color-slider"
              />
            </div>
          </div>
        )}

        {activeMenu === "paintType" && (
          <div className="texture-controls w-[30rem]">
            <div className="mb-4">
              <label className="block text-[#b8bbbb] text-md mb-2">
                Metalness
              </label>
              <input
                type="range"
                min="0"
                max="1.4"
                step="0.01"
                value={metalness}
                onChange={handleMetalnessChange}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#b8bbbb] text-md mb-2">
                Roughness
              </label>
              <input
                type="range"
                min="0"
                max="1."
                step="0.01"
                value={roughness}
                onChange={handleRoughnessChange}
                className="w-full"
              />
            </div>
          </div>
        )}

        {activeMenu === "model" && (
          <div className="flex justify-center gap-6 mt-4">
            {MODELS_NAME.map((model, index) => (
              <button
                key={index}
                onClick={() => setActiveModel(model)}
                className="model-button"
              >
                {model}
              </button>
            ))}
          </div>
        )}

        {activeMenu === "accessories" && (
          <div className="accessories-control mt-4">
            <h3 className="text-white text-lg mb-4">Accessories</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveParts("spoiler")}
                className={`px-6 py-2.5 bg-gradient-to-br from-[rgba(214,222,226,0.5)] to-[rgba(176,207,222,0.3)] 
              border border-[rgba(176,207,222,0.9)] 
              text-white font-sans uppercase
              rounded-full
              backdrop-blur-sm
              shadow-xl
              text-xl
              transition-all duration-300
              ${carState?.parts?.spoiler ? "text-[#b0cfde]" : "text-[#ffffff]"}
            `}
              >
                Spoiler
              </button>
              <button
                onClick={() => setActiveParts("headlights")}
                className={`px-6 py-2.5 bg-gradient-to-br from-[rgba(214,222,226,0.5)] to-[rgba(176,207,222,0.3)] 
              border border-[rgba(176,207,222,0.9)] 
              text-white font-sans uppercase
              rounded-full
              backdrop-blur-sm
              shadow-xl
              text-xl
              transition-all duration-300
              ${
                carState?.parts?.headlights
                  ? "text-[#b0cfde]"
                  : "text-[#ffffff]"
              }
            `}
              >
                Headlights
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const Overlay = memo(OverlayComponent);

export default Overlay;
