import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";
import { Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import MeshTransitionMaterial from "../materials/MeshTransitionMaterial";

export default function BMW(props) {
  console.log('loading')
  const spoilers = props.parts.spoiler;
  const lightref = useRef();
  const headlights = props.parts.headlights;
  useFrame(() => {
    if (!lightref.current) return;

    const target = headlights ? 55 : 1;
    const current = lightref.current.emissiveIntensity;
    const speed = 0.1;
    lightref.current.emissiveIntensity += (target - current) * speed;
  });
  const { nodes, materials } = useGLTF("/bmw/scene-resized.glb", true);
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.BMW_M8RewardRecycled_2020BadgeB_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={
            materials.BMW_M8RewardRecycled_2020LicensePlateDefaultA_Material
          }
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.BMW_M8RewardRecycled_2020LightA_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.BMW_M8RewardRecycled_2020Base_Material}
        />
        <lineSegments
          geometry={nodes.Object_6.geometry}
          material={materials.BMW_M8RewardRecycled_2020Carbon1_Material}
        />
        <lineSegments
          geometry={nodes.Object_7.geometry}
          material={materials.BMW_M8RewardRecycled_2020Coloured_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials.BMW_M8RewardRecycled_2020Grille3A_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_9.geometry}
          material={materials.BMW_M8RewardRecycled_2020Grille4A_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials.BMW_M8RewardRecycled_2020Grille5A_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_11.geometry}
          material={materials.BMW_M8RewardRecycled_2020Grille6A_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_12.geometry}
          material={materials.BMW_M8RewardRecycled_2020SeatBelt_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_13.geometry}
          material={materials.BMW_M8RewardRecycled_2020WindowInside_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_14.geometry}
          material={
            materials.BMW_M8RewardRecycled_2020InteriorColourZoneA_Material
          }
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_15.geometry}
          material={materials.redlight}
        >
          {" "}
          <meshStandardMaterial
            color={"#ff0000"}
            metalness={0.1}
            roughness={1}
            emissive={"#740707"}
            emissiveIntensity={1005}
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
          geometry={nodes.Object_16.geometry}
          material={materials.whitelight}
        >
          {" "}
          <meshStandardMaterial
            ref={lightref}
            color={"#ffffff"}
            emissive={"#b0b2ff"}
            emissiveIntensity={0}
          />
        </mesh>
        <lineSegments
          geometry={nodes.Object_17.geometry}
          material={materials.BMW_M8RewardRecycled_2020Base_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_18.geometry}
          material={materials.BMW_M8RewardRecycled_2020Base_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_19.geometry}
          material={materials.BMW_M8RewardRecycled_2020Carbon1_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_20.geometry}
          material={materials.BMW_M8RewardRecycled_2020Carbon1_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_21.geometry}
          material={materials.BMW_M8RewardRecycled_2020Carbon1_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_22.geometry}
          material={materials.BMW_M8RewardRecycled_2020Carbon1_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_23.geometry}
          material={materials.BMW_M8RewardRecycled_2020Carbon1_Material}
        />
        {spoilers && (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_24.geometry}
              material={materials.BMW_M8RewardRecycled_2020Carbon1_Material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_25.geometry}
              material={materials.BMW_M8RewardRecycled_2020Carbon1_Material}
            />
          </>
        )}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_26.geometry}
          material={materials.BMW_M8RewardRecycled_2020Coloured_Material}
        />
        {spoilers && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_27.geometry}
            material={materials.BMW_M8RewardRecycled_2020Coloured_Material}
          />
        )}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_28.geometry}
          material={materials.BMW_M8RewardRecycled_2020Coloured_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_29.geometry}
          material={materials.BMW_M8RewardRecycled_2020Coloured_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_30.geometry}
          material={materials.BMW_M8RewardRecycled_2020Coloured_Material}
        />
        {spoilers && (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_31.geometry}
              material={materials.BMW_M8RewardRecycled_2020Coloured_Material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_32.geometry}
              material={materials.BMW_M8RewardRecycled_2020Coloured_Material}
            />
          </>
        )}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_33.geometry}
          material={materials.BMW_M8RewardRecycled_2020EngineA_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_34.geometry}
          material={materials.BMW_M8RewardRecycled_2020EngineA_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_35.geometry}
          material={materials.BMW_M8RewardRecycled_2020Grille2A_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_36.geometry}
          material={materials.BMW_M8RewardRecycled_2020InteriorA_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_37.geometry}
          material={materials.BMW_M8RewardRecycled_2020InteriorA_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_38.geometry}
          material={
            materials.BMW_M8RewardRecycled_2020InteriorTillingColourZoneA_Material
          }
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_39.geometry}
          material={materials.BMW_M8RewardRecycled_2020Paint_Material}
        >
          <MeshTransitionMaterial
            roughness={props.roughness - 0.4 || 0.3} // Slightly reflective, diffused for soft light
            transitionColor={props.color || "#b0c4de"} // Light steel blue or similar to snowy tones
            metalness={props.metalness - 0.2 || 0.2} // Less metallic for softer look
            clearCoat={0.4} // Subtle glossy top layer for icy effect
            clearCoatRoughness={0.22} // Smooth reflection like icy snow
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_40.geometry}
          material={materials.BMW_M8RewardRecycled_2020Paint_Material}
        >
          {" "}
          <MeshTransitionMaterial
            roughness={props.roughness - 0.4 || 0.3} // Slightly reflective, diffused for soft light
            transitionColor={props.color || "#b0c4de"} // Light steel blue or similar to snowy tones
            metalness={props.metalness - 0.2 || 0.2} // Less metallic for softer look
            clearCoat={0.4} // Subtle glossy top layer for icy effect
            clearCoatRoughness={0.2} // Smooth reflection like icy snow
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_41.geometry}
          material={materials.BMW_M8RewardRecycled_2020Paint_Material}
        >
          {" "}
          <MeshTransitionMaterial
            roughness={props.roughness - 0.4 || 0.3} // Slightly reflective, diffused for soft light
            transitionColor={props.color || "#b0c4de"} // Light steel blue or similar to snowy tones
            metalness={props.metalness - 0.2 || 0.2} // Less metallic for softer look
            clearCoat={0.4} // Subtle glossy top layer for icy effect
            clearCoatRoughness={0.2} // Smooth reflection like icy snow
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_42.geometry}
          material={materials.BMW_M8RewardRecycled_2020Paint_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_43.geometry}
          material={materials.BMW_M8RewardRecycled_2020Paint_Material}
        >
          <MeshTransitionMaterial
            roughness={props.roughness - 0.4 || 0.3} // Slightly reflective, diffused for soft light
            transitionColor={props.color || "#b0c4de"} // Light steel blue or similar to snowy tones
            metalness={props.metalness - 0.2 || 0.2} // Less metallic for softer look
            clearCoat={0.4} // Subtle glossy top layer for icy effect
            clearCoatRoughness={0.2} // Smooth reflection like icy snow
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_44.geometry}
          material={materials.BMW_M8RewardRecycled_2020Paint_Material}
        >
          {" "}
          <MeshTransitionMaterial
            roughness={props.roughness - 0.4 || 0.3} // Slightly reflective, diffused for soft light
            transitionColor={props.color || "#b0c4de"} // Light steel blue or similar to snowy tones
            metalness={props.metalness - 0.2 || 0.2} // Less metallic for softer look
            clearCoat={0.4} // Subtle glossy top layer for icy effect
            clearCoatRoughness={0.2} // Smooth reflection like icy snow
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_45.geometry}
          material={materials.BMW_M8RewardRecycled_2020Window_Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_46.geometry}
          material={materials["badge.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_47.geometry}
          material={materials.col2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_48.geometry}
          material={materials["rim.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_49.geometry}
          material={materials["rim.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_50.geometry}
          material={materials["rim.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_51.geometry}
          material={materials["rim.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_52.geometry}
          material={materials["rim.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_53.geometry}
          material={materials["rim.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_54.geometry}
          material={materials["rim.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_55.geometry}
          material={materials["rim.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_56.geometry}
          material={materials.rotor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_57.geometry}
          material={materials["tire.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/bmw/scene-resized.glb");
