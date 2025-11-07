import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";
import { Bloom } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import MeshTransitionMaterial from "../materials/MeshTransitionMaterial";

export default function Ferrari(props) {
  console.log('loading')

  const lightref = useRef();
  const headlights = props.parts.headlights;

  useFrame(() => {
    if (!lightref.current) return;

    const target = headlights ? 23 : 1;
    const current = lightref.current.emissiveIntensity;
    const speed = 0.1;
    lightref.current.emissiveIntensity += (target - current) * speed;
  });

  const spoilers = props.parts.spoiler;
  const group = useRef();
  const { nodes, materials } = useGLTF("/model/scene-draco.glb", true);
  const { nodes: spoilerNodes, materials: spoilerMaterials } = useGLTF(
    "./spoiler/spoilers/scene.gltf"
  );
  return (
    <group {...props} dispose={null}>
      <group scale={0.0115} position={[0, 0, -1.3]}>
        {spoilers && (
          <group scale={0.6}>
            <mesh
              castShadow
              receiveShadow
              geometry={spoilerNodes.modSpoiler__0.geometry}
              material={spoilerMaterials["Scene_-_Root"]}
              position={[0, 105, -55]}
              rotation={[0, 0, 0]}
            >
              <meshStandardMaterial
                color="#484242"
                metalness={1.0} // how metallic it looks (0 to 1)
                roughness={0.1} // how smooth or rough the metal is
                envMapIntensity={1}
              />
            </mesh>
          </group>
        )}
        <group
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body001_Stradale023_0.geometry}
            material={materials["Stradale.023"]}
          >
            <MeshTransitionMaterial
              roughness={props.roughness - 0.3 || 0.3} // Slightly reflective, diffused for soft light
              transitionColor={props.color || "#b0c4de"} // Light steel blue or similar to snowy tones
              metalness={props.metalness | -0.1 | 0.2} // Less metallic for softer look
              clearCoat={0.5} // Subtle glossy top layer for icy effect
              clearCoatRoughness={0.4} // Smooth reflection like icy snow
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body001_Stradale023_0_1.geometry}
            material={materials["Stradale.023"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body001_Stradale001_0.geometry}
            material={materials["Stradale.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body001_Stradale002_0.geometry}
            material={materials["Stradale.002"]}
          />
        </group>
        <group
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body002_Stradale003_0.geometry}
            material={materials["Stradale.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body002_Stradale003_0_1.geometry}
            material={materials["Stradale.003"]}
          />
        </group>
        <group
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body019_Stradale020_0.geometry}
            material={materials["Stradale.020"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body019_Stradale021_0.geometry}
            material={materials["Stradale.021"]}
          />
        </group>
        <group
          position={[80.158, 31.031, -0.014]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={[24.772, 25.923, 25.923]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelBkL_Stradale024_0.geometry}
            material={materials["Stradale.024"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelBkL_Stradale003_0.geometry}
            material={materials["Stradale.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelBkL_Stradale025_0.geometry}
            material={materials["Stradale.025"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelBkL_Stradale006_0.geometry}
            material={materials["Stradale.006"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelBkL_Stradale026_0.geometry}
            material={materials["Stradale.026"]}
          />
        </group>
        <group
          position={[-80.158, 31.031, -0.014]}
          rotation={[-1.572, 0, 0]}
          scale={[24.772, 25.923, 25.923]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelBkR_Stradale024_0.geometry}
            material={materials["Stradale.024"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelBkR_Stradale003_0.geometry}
            material={materials["Stradale.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelBkR_Stradale025_0.geometry}
            material={materials["Stradale.025"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelBkR_Stradale006_0.geometry}
            material={materials["Stradale.006"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelBkR_Stradale026_0.geometry}
            material={materials["Stradale.026"]}
          />
        </group>
        <group
          position={[78.614, 29.235, 227.121]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelFtL_Stradale024_0.geometry}
            material={materials["Stradale.024"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelFtL_Stradale003_0.geometry}
            material={materials["Stradale.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelFtL_Stradale025_0.geometry}
            material={materials["Stradale.025"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelFtL_Stradale006_0.geometry}
            material={materials["Stradale.006"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelFtL_Stradale026_0.geometry}
            material={materials["Stradale.026"]}
          />
        </group>
        <group
          position={[-78.614, 29.235, 227.121]}
          rotation={[-1.572, 0, 0]}
          scale={24.295}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelFtR_Stradale024_0.geometry}
            material={materials["Stradale.024"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelFtR_Stradale003_0.geometry}
            material={materials["Stradale.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelFtR_Stradale025_0.geometry}
            material={materials["Stradale.025"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelFtR_Stradale006_0.geometry}
            material={materials["Stradale.006"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelFtR_Stradale026_0.geometry}
            material={materials["Stradale.026"]}
          />
        </group>
        <group
          position={[80.158, 31.031, -0.014]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelbrakeBkL_Stradale027_0.geometry}
            material={materials["Stradale.027"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelbrakeBkL_Stradale003_0.geometry}
            material={materials["Stradale.003"]}
          />
        </group>
        <group
          position={[-80.158, 31.031, -0.014]}
          rotation={[-1.572, 0, Math.PI]}
          scale={[-24.295, 24.295, 24.295]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelbrakeBkR_Stradale027_0.geometry}
            material={materials["Stradale.027"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelbrakeBkR_Stradale003_0.geometry}
            material={materials["Stradale.003"]}
          />
        </group>
        <group
          position={[78.614, 29.235, 227.121]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelbrakeFtL_Stradale027_0.geometry}
            material={materials["Stradale.027"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelbrakeFtL_Stradale003_0.geometry}
            material={materials["Stradale.003"]}
          />
        </group>
        <group
          position={[-78.614, 29.235, 227.121]}
          rotation={[-1.572, 0, Math.PI]}
          scale={[-24.295, 24.295, 24.295]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelbrakeFtR_Stradale027_0.geometry}
            material={materials["Stradale.027"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WheelbrakeFtR_Stradale003_0.geometry}
            material={materials["Stradale.003"]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body003_Stradale004_0.geometry}
          material={materials["Stradale.004"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body004_Stradale005_0.geometry}
          material={materials["Stradale.005"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body005_Stradale006_0.geometry}
          material={materials["Stradale.006"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body006_Stradale007_0.geometry}
          material={materials["Stradale.007"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body007_Stradale008_0.geometry}
          material={materials["Stradale.008"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body008_Stradale009_0.geometry}
          material={materials["Stradale.009"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body009_Stradale010_0.geometry}
          material={materials["Stradale.010"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body010_Stradale011_0.geometry}
          material={materials["Stradale.011"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body011_Stradale012_0.geometry}
          material={materials["Stradale.012"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        >
          <meshStandardMaterial
            ref={lightref}
            color={"#ffffff"}
            emissive={"#b0b2ff"}
            emissiveIntensity={6}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body012_Stradale013_0.geometry}
          material={materials["Stradale.013"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body013_Stradale014_0.geometry}
          material={materials["Stradale.014"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body014_Stradale015_0.geometry}
          material={materials["Stradale.015"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body015_Stradale016_0.geometry}
          material={materials["Stradale.016"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body016_Stradale017_0.geometry}
          material={materials["Stradale.017"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        >
          <meshStandardMaterial
            color={"#ff0000"}
            metalness={0.1}
            roughness={1}
            emissive={"#740707"}
            emissiveIntensity={105}
          />
          <Bloom
            intensity={10}
            luminanceThreshold={1.1} // Reacts to moderately bright areas
            luminanceSmoothing={10.1} // Smooth glow
            mipmapBlur
            radius={10}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body017_Stradale018_0.geometry}
          material={materials["Stradale.018"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body018_Stradale019_0.geometry}
          material={materials["Stradale.019"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body020_Stradale022_0.geometry}
          material={materials["Stradale.022"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body021_Stradale_0.geometry}
          material={materials.Stradale}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body022_Stradale007_0.geometry}
          material={materials["Stradale.007"]}
          position={[0, 0.113, 128.58]}
          rotation={[-1.572, 0, -Math.PI]}
          scale={24.295}
        />
      </group>
    </group>
  );
}

Ferrari.propTypes = {
  color: PropTypes.string,
  metalness: PropTypes.number,
  roughness: PropTypes.number,
  parts: PropTypes.object,
  accessories: PropTypes.object,
};

useGLTF.preload("/model/scene-draco.glb");
