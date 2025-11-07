import { Circle, MeshReflectorMaterial, Reflector } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { ShaderMaterial } from "three";
// Custom Tron Grid Shader
class TronGridMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          float circle = 1. - smoothstep(0.1, 0.18, dist);
          vec2 grid = abs(fract(vUv * 15.0 - 0.5) - .5) / fwidth(vUv * 20.0) + circle ;
          float line = min(grid.x, grid.y);
          float pulse = sin(time * 1.0) * 0.3 + 0.7;
          vec3 color = vec3(0.0, 0.8, 1.2) * (1. - min(line, 1.0)) ;
          color *= 1.0 - smoothstep(.8, 1.0, dist);
          gl_FragColor = vec4(color, 1.0 - min(line, 1.0) * .8);
        }
      `,
      uniforms: {
        time: { value: 0.1 },
      },
      transparent: true,
    });
  }
}

extend({ TronGridMaterial });

const Floor = ({ environment  }) => {

  return (
    <group>
      {/* Reflective base */}
       {environment !== "city" && <Circle args={[1, 16]} receiveShadow scale={15} rotation-x={-Math.PI / 2}>
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
      </Circle>}

      {environment === "night" && (
        <>
        <Circle
          args={[1, 64]}
          scale={15}
          rotation-x={-Math.PI / 2}
          position={[0, 0.01, 0]}
        >
          <tronGridMaterial key={TronGridMaterial.key} />
        </Circle></>
      )}
      

        {environment === "city" && (
                <Circle
                  args={[1, 34]}
                  scale={10}
                  rotation-x={-Math.PI / 2}
                  position={[0, 0.01, 0]}
                >
                   <MeshReflectorMaterial
          color={`#a8a8a8`}
          envMapIntensity={0}
          blur={[256, 256]}
          mixBlur={0.9}
          mixStrength={4}
          mixContrast={1}
          resolution={512}
          mirror={1}
          depthScale={1}
          minDepthThreshold={-10}
          maxDepthThreshold={0.1}
          depthToBlurRatioBias={-1}
          roughness={.9}
        />
                </Circle>
              )}
    </group>
  );
};

export default Floor;
