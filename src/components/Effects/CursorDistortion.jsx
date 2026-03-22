import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// wrapEffect turns a raw postprocessing Effect class into a R3F component
import { wrapEffect } from "@react-three/postprocessing";
import { CursorDistortionEffect } from "./CursorDistortionEffect";

const WrappedEffect = wrapEffect(CursorDistortionEffect);

const CursorDistortion = ({ strength, radius}) => {
  const effectRef = useRef();
  const lastPos = useRef({ x: -999, y: -999 }); 

  useFrame(({ pointer }) => {
    if (!effectRef.current) return;

    // pointer is NDC (-1..1), convert to UV (0..1)
    const x = (pointer.x + 1) / 2;
    const y = (pointer.y + 1) / 2;

    // Calculate how far the mouse moved since the last frame
    const distanceX = Math.abs(x - lastPos.current.x);
    const distanceY = Math.abs(y - lastPos.current.y);

    // Only add a point to the trail if the mouse moved a tiny bit
    if (distanceX > 0.001 || distanceY > 0.001) {
      effectRef.current.addPoint(x, y);
      
      // Update our stored position
      lastPos.current.x = x;
      lastPos.current.y = y;
    }
  });

  return (
    <WrappedEffect
      ref={effectRef}
      strength={strength}
      radius={radius}
    />
  );
};

export default CursorDistortion;