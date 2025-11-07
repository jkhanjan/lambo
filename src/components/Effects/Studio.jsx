import { Environment, OrbitControls, Torus } from "@react-three/drei";
import { ENVIRONMENTS } from "../constants/constanst";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Studio = ({ environment }) => {
  const leftTorusRef = useRef();
  const rightTorusRef = useRef();

  const currentEnv = ENVIRONMENTS[environment];

  useFrame(() => {
    if (leftTorusRef.current && rightTorusRef.current) {
      leftTorusRef.current.rotation.x += 0.01;
      rightTorusRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <color attach="background" args={[currentEnv.background]} />
      <OrbitControls
        minDistance={6}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={-0.45}
        target={[0, 0.1, 0]}
        maxPolarAngle={Math.PI / 2.3}
        minPolarAngle={Math.PI / 6}
        enableZoom={false}
        rotateSpeed={0.5}
      />

      {environment === "night" && (
        <>
          {/* Left Torus */}
          <Torus
            ref={leftTorusRef}
            args={[2.5, 0.01, 30, 50]}
            position={[0, 0.0, 0]}
          >
            <meshStandardMaterial
              emissive="#04D9FF"
              emissiveIntensity={3}
              toneMapped={false}
            />
          </Torus>
          <Torus
            ref={rightTorusRef}
            args={[2.5, 0.01, 30, 50]}
            position={[0, 0.0, 0]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <meshStandardMaterial
              emissive="#04D9FF"
              emissiveIntensity={3}
              toneMapped={false}
            />
          </Torus>

          <Environment preset="city" intensity={1} />
        </>
      )}
      {environment === "snow" && (
        <Environment
          files={currentEnv.file}
          background
          blur={0}
          intensity={1}
        />
      )}
      {environment === "city" && (
        <Environment
          files={currentEnv.file}
          background
          blur={0}
          intensity={1}
        />
      )}

      <fogExp2
        attach="fog"
        color={currentEnv.fogColor}
        density={currentEnv.fogDensity}
      />
    </>
  );
};

export default Studio;
