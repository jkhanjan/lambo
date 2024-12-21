import { Circle, MeshReflectorMaterial } from "@react-three/drei";

const Floor = () => {
  return (
    <Circle args={[1, 16]} receiveShadow scale={15} rotation-x={-Math.PI / 2}>
      <MeshReflectorMaterial
        color={`#a8a8a8`}
        envMapIntensity={0}
        blur={[256, 256]}
        mixBlur={0.6}
        mixStrength={5}
        mixContrast={1}
        resolution={512}
        mirror={4}
        depthScale={1}
        minDepthThreshold={0.7}
        maxDepthThreshold={0.1}
        depthToBlurRatioBias={1}
        roughness={1}
      />
    </Circle>
  );
};

export default Floor;
