import React, { createContext, useState, useContext } from "react";

const ColorContext = createContext();

const ColorProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>
      {children}
    </ColorContext.Provider>
  );
};

// Custom hook to access the ColorContext
export const useColor = () => useContext(ColorContext);

// ColorContextComponent will now be used as a JSX component to wrap other components
export default ColorProvider;
