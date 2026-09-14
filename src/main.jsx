import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CarProvider } from "./components/context/CarContext";
import { SceneRuntimeProvider } from "./components/context/SceneRuntimeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <CarProvider>
      <SceneRuntimeProvider>
        <App />
      </SceneRuntimeProvider>
    </CarProvider>
);