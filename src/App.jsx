import React, { useState, Suspense, useReducer, useEffect } from "react";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import ResponsiveCamera from "./components/utils/ResponsiveCamera.jsx";
import CameraController from "./components/utils/CameraController.jsx";
import { Loader, OrbitControls, Preload } from "@react-three/drei";
import "./App.css";
import Studio from "./components/Effects/Studio.jsx";
import Floor from "./components/Effects/Floor.jsx";
import Effects from "./components/Effects/Effects.jsx";
import Overlay from "./components/UI/Overlay.jsx";
import {
  carReducer,
  initialCarState,
} from "./components/reducer/CarReducer.jsx";
import {
  MODEL_MAP,
  VIEW_NAMES,
  VIEWS,
} from "./components/constants/constanst.js";
import { preloadModels } from "./components/utils/PreloadModels.jsx";

const App = () => {
  const [carState, dispatch] = useReducer(carReducer, initialCarState);
  const [cameraView, setCameraView] = useState("default");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [aiInput, setAiInput] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);

  const CurrentModel = MODEL_MAP[carState.modelName];
  useEffect(() => {
    preloadModels();
  }, []);

  const executeCommand = (cmd) => {
    if (!cmd || cmd.domain === "unknown") return;

    switch (cmd.domain) {
      case "model":
        handleModelChange(cmd.value);
        break;

      case "environment":
        handleEnvironmentChange(cmd.value);
        break;

      case "color":
        handleModelColorChange(cmd.value);
        break;

      case "camera":
        handleCameraViewChange(cmd.value);
        break;

      case "paint":
        handleTextureChange({
          metalness: cmd.value.metalness ?? carState.metalness,
          roughness: cmd.value.roughness ?? carState.roughness,
        });
        break;

      case "accessory":
        handlePartsChange(cmd.value);
        break;

      default:
        console.warn("Unhandled command:", cmd);
    }
  };

  const handleCameraViewChange = () => {
    const currentIndex = VIEWS.indexOf(cameraView);
    const nextIndex = (currentIndex + 1) % VIEWS.length;
    setCameraView(VIEWS[nextIndex]);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const handleModelChange = (modelName) => {
    setTimeout(() => {
      dispatch({ type: "SET_MODEL", modelName });
    }, 500);
  };

  const handleModelColorChange = (color) => {
    dispatch({ type: "SET_COLOR", color });
  };

  const handleTextureChange = ({ metalness, roughness }) => {
    dispatch({ type: "SET_MATERIAL", metalness, roughness });
  };

  const handleEnvironmentChange = (environment) => {
    dispatch({ type: "SET_ENVIRONMENT", environment });
  };

  const handlePartsChange = (parts) => {
    dispatch({ type: "TOGGLE_PART", partName: parts });
  };

  const handleAISubmit = async () => {
    if (!aiInput.trim()) return;

    setIsAILoading(true);

    console.log("User prompt:", aiInput);

    try {
      const { data } = await axios.post("http://localhost:3001/chat", {
        message: aiInput,
      });

      console.log("AI Response:", data);

      if (Array.isArray(data.commands)) {
        data.commands.forEach(executeCommand);
      } else {
        executeCommand(data);
      }
    } catch (err) {
      console.error("Error fetching AI response:", err);
    }

    setAiInput("");
    setIsAILoading(false);
  };

  return (
    <>
      <div className="app">
        <Suspense fallback={<Loader />}>
          <Overlay
            environment={carState.environment}
            setActiveModel={handleModelChange}
            setActiveColor={handleModelColorChange}
            setActiveTexture={handleTextureChange}
            setActiveEnvironment={handleEnvironmentChange}
            setActiveParts={handlePartsChange}
            carState={carState}
          />

          <div className="button-overlay">
            <button onClick={handleCameraViewChange} className="button">
              {VIEW_NAMES[cameraView]}
            </button>
          </div>

          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-20">
            <div
              className="
                flex items-center gap-3
                w-[36rem]
                px-5 py-3
                rounded-full
                backdrop-blur-xl
                bg-gradient-to-br
                from-[rgba(214,222,226,0.18)]
                to-[rgba(176,207,222,0.1)]
                border
                border-[rgba(176,207,222,0.8)]
                shadow-[0_20px_40px_rgba(0,0,0,0.35)]
              "
            >
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAISubmit()}
                placeholder="Ask AI: Make it a red BMW in snow"
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-white
                  text-[15px]
                  placeholder:text-[#b8bbbb]
                "
              />

              <button
                onClick={handleAISubmit}
                disabled={isAILoading}
                className="
                    px-5 py-2
                    rounded-full
                    font-medium
                    text-white
                    border
                    border-[rgba(176,207,222,0.9)]
                    bg-gradient-to-br
                    from-[rgba(214,222,226,0.55)]
                    to-[rgba(176,207,222,0.35)]
                    transition-all
                    duration-300
                    hover:-translate-y-[1px]
                    hover:shadow-[0_10px_28px_rgba(176,207,222,0.45)]
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                  "
              >
                {isAILoading ? "…" : "Send"}
              </button>
            </div>
          </div>

          <Canvas
            className="canvas"
            shadows
            gl={{
              preserveDrawingBuffer: false,
              powerPreference: "high-performance",
            }}
          >
            <ResponsiveCamera />
            <Studio environment={carState.environment} />
            <CurrentModel
              color={carState.color}
              metalness={carState.metalness}
              roughness={carState.roughness}
              parts={carState.parts}
              accessories={carState.accessories}
            />
            <Floor environment={carState.environment} />
            <Effects environment={carState.environment} />
            <CameraController
              view={cameraView}
              isTransitioning={isTransitioning}
            />
            <OrbitControls
              enableZoom={true}
              enableDamping={true}
              dampingFactor={0.05}
              rotateSpeed={0.7}
              maxDistance={50}
              minDistance={5}
              enabled={!isTransitioning}
            />
            <Preload all />
          </Canvas>
        </Suspense>
      </div>
    </>
  );
};

export default App;
