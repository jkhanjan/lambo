import { Environment, OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Bloom, EffectComposer, Glitch } from "@react-three/postprocessing";
import React from "react";

const Studio = () => {
  return (
    <>
      {/* Background Color */}
      <color attach="background" args={["#181717"]} />
      {/* Orbit Controls for Camera Movement */}
      <OrbitControls
        minDistance={6}
        maxDistance={10} // Fixed incorrect maxDistance < minDistance
        autoRotate
        autoRotateSpeed={-0.45}
        target={[0, 0.1, 0]}
        maxPolarAngle={Math.PI / 2.3}
        minPolarAngle={Math.PI / 6}
        enableZoom={false}
        rotateSpeed={0.5}
      />
      

      {/* Environment Map */}
      <Environment files="/snow.hdr" background blur={0} background intensity={1} />
      <fogExp2 attach="fog" color="#b0cfde" density={0.03} />
    </>
  );
};

export default Studio;
