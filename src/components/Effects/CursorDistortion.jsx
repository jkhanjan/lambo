import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { wrapEffect } from "@react-three/postprocessing";
import { CursorDistortionEffect } from "./CursorDistortionEffect";

const WrappedEffect = wrapEffect(CursorDistortionEffect);

const CursorDistortion = ({ strength, radius}) => {
  const effectRef = useRef();
  const lastPos = useRef({ x: -999, y: -999 }); 

  useFrame(({ pointer }) => {
    if (!effectRef.current) return;

    const x = (pointer.x + 1) / 2;
    const y = (pointer.y + 1) / 2;
    
    const distanceX = Math.abs(x - lastPos.current.x);
    const distanceY = Math.abs(y - lastPos.current.y);

    if (distanceX > 0.001 || distanceY > 0.001) {
      effectRef.current.addPoint(x, y);
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