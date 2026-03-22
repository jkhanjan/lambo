// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CarProvider } from "./components/context/CarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CarProvider>
      <App />
    </CarProvider>
  </React.StrictMode>
);