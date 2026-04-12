// Overlay.jsx
import { useState, memo, useEffect } from "react";
import { EnvironmentPicker } from "./components/EnvironmentPicker";
import { ColorPicker } from "./components/ColorPicker";
import { ModelPicker } from "./components/ModelPicker";
import { AccessoriesPicker } from "./components/AccessoriesPicker";
import "./Overlay.css";
import useSpaceHold from "../utils/hooks/useSpaceHold";

const menuOptions = [
  { id: "color", label: "Color" },
  { id: "model", label: "Model" },
  { id: "environment", label: "Environment" },
  { id: "accessories", label: "Accessories" },
];

const OverlayComponent = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const {isHolding} = useSpaceHold()
  return (
    <>
      <button
        onClick={() => setIsNavOpen((o) => !o)}
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
            d={
              isNavOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>
        
      <div
        className={`
        fixed left-0 w-full h-[12vh] z-50 top-0
        bg-gradient-to-b from-black via-black/80 to-transparent
        backdrop-blur-md
        transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isHolding ? "translate-y-0" : "-translate-y-full"}
        `}
      />

      <div
        className={`
        fixed left-0 w-full h-[12vh] z-50 bottom-0
        bg-gradient-to-t from-black via-black/80 to-transparent
        backdrop-blur-md
        transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isHolding ? "translate-y-0" : "translate-y-full"}
        `}
      />

      <p
        className={`absolute font-serif top-5 left-1/2 -translate-x-1/2 z-10 text-xl tracking-[5px] border rounded-2xl px-6
        transition-all duration-300 
        ${
          isHolding
            ? "text-cyan-300 scale-105 drop-shadow-[0_0_12px_rgba(8, 84, 236, 0.8)]"
            : "text-cyan-100 "
        }`}
      >
        {isHolding ? ">> HOLDING..." : "---HOLD SPACE BAR---"}
      </p>
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
              className={`nav-menu-button w-full text-left px-4 py-3 rounded-lg text-white hover:bg-blue-500 transition-colors`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {!isHolding && (
        <div className="overlay-container">
        {activeMenu === "environment" && <EnvironmentPicker />}
        {activeMenu === "color" && <ColorPicker />}
        {activeMenu === "model" && <ModelPicker />}
        {activeMenu === "accessories" && <AccessoriesPicker />}
      </div>
      )}
    </>
  );
};

export const Overlay = memo(OverlayComponent);