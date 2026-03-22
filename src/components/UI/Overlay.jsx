// Overlay.jsx
import { useState, memo } from "react";
import { EnvironmentPicker } from "./components/EnvironmentPicker";
import { ColorPicker } from "./components/ColorPicker";
import { ModelPicker } from "./components/ModelPicker";
import { AccessoriesPicker } from "./components/AccessoriesPicker";
import "./Overlay.css";

const menuOptions = [
  { id: "color",       label: "Color" },
  { id: "model",       label: "Model" },
  { id: "environment", label: "Environment" },
  { id: "accessories", label: "Accessories" },
];

const OverlayComponent = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isNavOpen, setIsNavOpen]   = useState(false);

  return (
    <>
      <button onClick={() => setIsNavOpen(o => !o)} className="menu-toggle-button fixed top-5 left-6 z-20 p-2 rounded-lg">
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
        className={`nav-menu fixed h-full py-6 px-2 transition-transform duration-300 ease-in-out z-10 ${
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
        {activeMenu === "environment" && <EnvironmentPicker />}
        {activeMenu === "color"       && <ColorPicker />}
        {activeMenu === "model"       && <ModelPicker />}
        {activeMenu === "accessories" && <AccessoriesPicker />}
      </div>
    </>
  );
};

export const Overlay = memo(OverlayComponent);