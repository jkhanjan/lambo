import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useColor } from "../states/ColorContext";
import MeshTransitionMaterial from "../meshTransition/MeshTransitionMaterial";
import { Bloom } from "@react-three/postprocessing";

export default function Porshe(props) {
  const { nodes, materials } = useGLTF("/porshe/scene.gltf");

  const { selectedColor } = useColor();
  return (
    <group {...props} dispose={null}>
      <group position={[0.193, 0, -0.477]} scale={2.995}>
        <group position={[0, 0.208, 0.083]} scale={[0.345, 0.231, 0.782]}>
          <group
            position={[0.067, -0.22, -0.141]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_8.geometry}
              material={materials.Dark_01}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_9.geometry}
              material={materials.Interior_Diffuse}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_10.geometry}
              material={materials.Badge_Diffuse}
              args={[undefined, undefined, materials.Badge_Diffuse]}
              envMap={props.envMap}
              envMapIntensity={1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_11.geometry}
              material={materials.Black_Plate}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_12.geometry}
              material={materials["gt4_logo_d.001"]}
            />
          </group>
          <group
            position={[0.046, 0.11, -0.004]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_20.geometry}
              material={materials.Interior_Diffuse}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_21.geometry}
              material={materials["vehicle_generic_smallspecmap__PAINT_2_.001"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_22.geometry}
              material={materials.Dark_01}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_23.geometry}
              material={materials.Black_Plate}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_24.geometry}
              material={materials.Dark_Silver}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_25.geometry}
              material={materials.Dark_Main_Interior_Base_Color}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_26.geometry}
              material={materials.Leather}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_27.geometry}
              material={materials.Carbon_F}
            />
          </group>
          <group
            position={[-0.657, 0.308, 0.276]}
            scale={[0.967, 1.443, 0.427]}
          >
            <group
              position={[0.683, -0.269, -0.667]}
              rotation={[Math.PI / 2, 0, -Math.PI]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_38.geometry}
                material={materials.Gray_Vehicle_Paint}
              >
                <MeshTransitionMaterial
                  roughness={0.1} // Slightly reflective, diffused for soft light
                  transitionColor={selectedColor || "#b0c4de"} // Light steel blue or similar to snowy tones
                  metalness={1.1} // Less metallic for softer look
                  clearCoat={1} // Subtle glossy top layer for icy effect
                  clearCoatRoughness={10} // Smooth reflection like icy snow
                />
              </mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_39.geometry}
                material={materials.Interior_Diffuse}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_40.geometry}
                material={materials.Badge_Diffuse}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_41.geometry}
                material={materials.Black_Plate}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_42.geometry}
                material={materials.Dark_01}
              />
            </group>
          </group>
          <group
            position={[-0.836, -0.044, 0.642]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_44.geometry}
              material={materials.Dark_Glass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_45.geometry}
              material={materials.Right_Signal_Light}
            />
          </group>
          <group
            position={[0.005, -0.087, 0.038]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_49.geometry}
              material={materials.Black_Plate}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_50.geometry}
              material={materials.Dark_Silver}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_51.geometry}
              material={materials["ceinture_s.001"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_52.geometry}
              material={materials.Dark_Main_Interior_Base_Color}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_53.geometry}
              material={materials.Dark_01}
            ></mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_54.geometry}
              material={materials.Carbon_F}
            />
          </group>
          <group
            position={[-0.002, 0.073, 0.104]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_56.geometry}
              material={materials.Grille_3_Texture}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_57.geometry}
              material={materials.Grille_2_Texture}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_58.geometry}
              material={materials.Grille_1_Texture}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_59.geometry}
              material={materials.Dark_01}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_60.geometry}
              material={materials.Black_Plate}
            />
          </group>
          <group
            position={[0.798, 0.108, 0.249]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.427, 1.443, 0.967]}
          >
            <group
              position={[0.533, -0.112, -0.058]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_65.geometry}
                material={materials.Dark_01}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_66.geometry}
                material={materials.Gray_Vehicle_Paint}
              >
                {" "}
                <MeshTransitionMaterial
                  roughness={0.1} // Slightly reflective, diffused for soft light
                  transitionColor={selectedColor || "#b0c4de"} // Light steel blue or similar to snowy tones
                  metalness={1.1} // Less metallic for softer look
                  clearCoat={1} // Subtle glossy top layer for icy effect
                  clearCoatRoughness={10} // Smooth reflection like icy snow
                />
              </mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_67.geometry}
                material={materials.Interior_Diffuse}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_68.geometry}
                material={materials.Grille_2_Texture}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_69.geometry}
                material={
                  materials["vehicle_generic_smallspecmap__PAINT_2_.001"]
                }
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_70.geometry}
                material={materials.Black_Plate}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_71.geometry}
                material={materials["ceinture_s.001"]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_72.geometry}
                material={materials.Dark_Main_Interior_Base_Color}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_73.geometry}
                material={materials.Leather}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_74.geometry}
                material={materials.Bottom_Rear_Brake_Light}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_75.geometry}
                material={materials.Carbon_F}
              />
            </group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_77.geometry}
              material={materials.Dark_Glass}
              position={[0.774, 0.297, -0.149]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            />
          </group>
          <group
            position={[0.594, -0.291, 0.847]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_79.geometry}
              material={materials.Fog_Light_Texture}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_80.geometry}
              material={materials.Dark_Glass}
            >
              <meshStandardMaterial
                color={"#e1dcdc"}
                metalness={0.9}
                roughness={0.1}
                emissive={"#f7f2f2"}
                emissiveIntensity={10}
              />
              <Bloom
                intensity={10}
                luminanceThreshold={1.1} // Reacts to moderately bright areas
                luminanceSmoothing={10.1} // Smooth glow
                mipmapBlur
                radius={10}
              />
            </mesh>
          </group>
          <group
            position={[0.843, -0.044, 0.642]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_82.geometry}
              material={materials.Left_Signal_Light}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_83.geometry}
              material={materials.Dark_Glass}
            />
          </group>
          <group
            position={[0.754, -0.422, 0.498]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.427, 1.443, 0.967]}
          >
            <group rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_86.geometry}
                material={materials.Tyre_Rim_Texture}
              >
                <meshStandardMaterial
                  color={"#000000"}
                  metalness={0.1}
                  roughness={0.1}
                />
              </mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_87.geometry}
                material={materials.Tyre_Texture}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_88.geometry}
                material={materials.Dark_01}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_89.geometry}
                material={materials.Brake_Disk_Texture}
              >
                <meshStandardMaterial
                  color={"#000000"}
                  metalness={0.1}
                  roughness={1.9}
                />
              </mesh>
            </group>
            <group
              position={[0.167, -0.009, 0.006]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_91.geometry}
                material={
                  materials["vehicle_generic_smallspecmap__PAINT_2_.001"]
                }
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_92.geometry}
                material={materials.Brake_Secondary_Color}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_93.geometry}
                material={materials.Calliper_Badge}
              />
            </group>
          </group>
          <group
            position={[0.667, 0.098, 0.721]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_95.geometry}
              material={materials.Main_Headlight}
            >
              <meshStandardMaterial
                color={"#e1dcdc"}
                metalness={0.1}
                roughness={0.1}
                emissive={"#f7f2f2"}
                emissiveIntensity={20}
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
              geometry={nodes.Object_96.geometry}
              material={materials.Dark_Glass}
            ></mesh>
          </group>
          <group
            position={[0.754, -0.422, -0.558]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.427, 1.443, 0.967]}
          >
            <group rotation={[Math.PI / 2, -0.262, -Math.PI / 2]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_101.geometry}
                material={materials.Tyre_Rim_Texture}
              >
                <meshStandardMaterial
                  color="#000000"
                  metalness={0.1}
                  roughness={0.1}
                />
              </mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_102.geometry}
                material={materials.Tyre_Texture}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_103.geometry}
                material={materials.Dark_01}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_104.geometry}
                material={materials.Brake_Disk_Texture}
              >
                <meshStandardMaterial
                  color="#000000"
                  metalness={0.1}
                  roughness={1.9}
                />
              </mesh>
            </group>
            <group
              position={[-0.162, 0.045, -0.029]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_106.geometry}
                material={
                  materials["vehicle_generic_smallspecmap__PAINT_2_.001"]
                }
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_107.geometry}
                material={materials.Brake_Secondary_Color}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_108.geometry}
                material={materials.Calliper_Badge}
              />
            </group>
          </group>
          <group
            position={[0.003, 0.757, -0.376]}
            scale={[0.967, 1.443, 0.427]}
          >
            <group
              position={[0, -0.58, 0.861]}
              rotation={[Math.PI / 2, 0, -Math.PI]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_115.geometry}
                material={materials.Gray_Vehicle_Paint}
              >
                {" "}
                <MeshTransitionMaterial
                  roughness={0.1} // Slightly reflective, diffused for soft light
                  transitionColor={selectedColor || "#b0c4de"} // Light steel blue or similar to snowy tones
                  metalness={1.1} // Less metallic for softer look
                  clearCoat={1} // Subtle glossy top layer for icy effect
                  clearCoatRoughness={10} // Smooth reflection like icy snow
                />
              </mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_116.geometry}
                material={materials.Dark_01}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_117.geometry}
                material={materials.Badge_Diffuse}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_118.geometry}
                material={materials.Black_Plate}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_119.geometry}
                material={materials.Dark_Silver}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_120.geometry}
                material={materials.Dark_Main_Interior_Base_Color}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_122.geometry}
                material={materials.Dark_01}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_123.geometry}
                material={materials.Dark_Glass}
              />
            </group>
          </group>
          <group
            position={[0.681, 0.17, -0.79]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_125.geometry}
              material={materials.Dark_Glass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_126.geometry}
              material={materials.Rear_Light}
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
          </group>
          <group
            position={[-0.675, 0.17, -0.79]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_128.geometry}
              material={materials.Dark_Glass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_129.geometry}
              material={materials.Rear_Light}
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
          </group>
          <group
            position={[0.003, -0.287, -0.853]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_131.geometry}
              material={materials.Bottom_Rear_Brake_Light}
            >
              <meshStandardMaterial
                color={"#ff0000"}
                metalness={0.1}
                roughness={1}
                emissive={"#740707"}
                emissiveIntensity={45}
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
              geometry={nodes.Object_132.geometry}
              material={materials.Dark_Glass}
            />
          </group>
          <group
            position={[-0.791, 0.108, 0.249]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.427, 1.443, 0.967]}
          >
            <group
              position={[0.533, -0.112, 0.058]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_141.geometry}
                material={materials.Gray_Vehicle_Paint}
              >
                {" "}
                <MeshTransitionMaterial
                  roughness={0.1} // Slightly reflective, diffused for soft light
                  transitionColor={selectedColor || "#b0c4de"} // Light steel blue or similar to snowy tones
                  metalness={1.1} // Less metallic for softer look
                  clearCoat={1} // Subtle glossy top layer for icy effect
                  clearCoatRoughness={10} // Smooth reflection like icy snow
                />
              </mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_142.geometry}
                material={materials.Interior_Diffuse}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_143.geometry}
                material={materials.Grille_2_Texture}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_144.geometry}
                material={
                  materials["vehicle_generic_smallspecmap__PAINT_2_.001"]
                }
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_145.geometry}
                material={materials.Dark_01}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_146.geometry}
                material={materials.Black_Plate}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_147.geometry}
                material={materials["ceinture_s.001"]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_148.geometry}
                material={materials.Dark_Main_Interior_Base_Color}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_149.geometry}
                material={materials.Leather}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_150.geometry}
                material={materials.Bottom_Rear_Brake_Light}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_151.geometry}
                material={materials.Carbon_F}
              />
            </group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_153.geometry}
              material={materials.Dark_Glass}
              position={[0.774, 0.297, 0.149]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            />
          </group>
          <group
            position={[-0.588, -0.291, 0.847]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_155.geometry}
              material={materials.Fog_Light_Texture}
            >
              {" "}
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_156.geometry}
              material={materials.Dark_Glass}
            >
              {" "}
              <meshStandardMaterial
                color={"#e1dcdc"}
                metalness={0.1}
                roughness={0.1}
                emissive={"#f7f2f2"}
                emissiveIntensity={10}
              />
              <Bloom
                intensity={10}
                luminanceThreshold={1.1} // Reacts to moderately bright areas
                luminanceSmoothing={10.1} // Smooth glow
                mipmapBlur
                radius={10}
              />
            </mesh>
          </group>
          <group
            position={[-0.747, -0.422, 0.498]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.427, 1.443, 0.967]}
          >
            <group rotation={[-Math.PI / 2, -0.865, -Math.PI / 2]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_159.geometry}
                material={materials.Tyre_Rim_Texture}
              >
                {" "}
                <meshStandardMaterial
                  color="#000000"
                  metalness={0.1}
                  roughness={0.1}
                />
              </mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_160.geometry}
                material={materials.Tyre_Texture}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_161.geometry}
                material={materials.Dark_01}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_162.geometry}
                material={materials.Brake_Disk_Texture}
              >
                {" "}
                <meshStandardMaterial
                  color="#000000"
                  metalness={0.1}
                  roughness={1.9}
                />
              </mesh>
            </group>
            <group
              position={[0.167, -0.009, -0.006]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_164.geometry}
                material={
                  materials["vehicle_generic_smallspecmap__PAINT_2_.001"]
                }
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_165.geometry}
                material={materials.Brake_Secondary_Color}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_166.geometry}
                material={materials.Calliper_Badge}
              />
            </group>
          </group>
          <group
            position={[-0.665, 0.096, 0.722]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_168.geometry}
              material={materials.Dark_Glass}
            >
              {" "}
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_169.geometry}
              material={materials.Main_Headlight}
            >
              {" "}
              <meshStandardMaterial
                color={"#e1dcdc"}
                metalness={0.1}
                roughness={0.1}
                emissive={"#f7f2f2"}
                emissiveIntensity={20}
              />
              <Bloom
                intensity={10}
                luminanceThreshold={1.1} // Reacts to moderately bright areas
                luminanceSmoothing={10.1} // Smooth glow
                mipmapBlur
                radius={10}
              />
            </mesh>
          </group>
          <group
            position={[-0.747, -0.422, -0.558]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.427, 1.443, 0.967]}
          >
            <group rotation={[-Math.PI / 2, -0.262, -Math.PI / 2]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_172.geometry}
                material={materials.Tyre_Rim_Texture}
              >
                {" "}
                <meshStandardMaterial
                  color="#000000"
                  metalness={0.1}
                  roughness={0.1}
                />
              </mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_173.geometry}
                material={materials.Tyre_Texture}
              ></mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_174.geometry}
                material={materials.Dark_01}
              ></mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_175.geometry}
                material={materials.Brake_Disk_Texture}
              >
                {" "}
                <meshStandardMaterial
                  color="#000000"
                  metalness={0.1}
                  roughness={1.9}
                />
              </mesh>
            </group>
            <group
              position={[-0.162, 0.045, 0.029]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_177.geometry}
                material={
                  materials["vehicle_generic_smallspecmap__PAINT_2_.001"]
                }
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_178.geometry}
                material={materials.Brake_Secondary_Color}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_179.geometry}
                material={materials.Calliper_Badge}
              />
            </group>
          </group>
          <group
            position={[-0.006, 0.451, -0.335]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_181.geometry}
              material={materials.Dark_Silver}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_182.geometry}
              material={materials.Dark_01}
            />
          </group>
          <group
            position={[0.329, 0.186, 0.073]}
            rotation={[0.396, 0, 0]}
            scale={[0.202, 0.292, 0.116]}
          >
            <group rotation={[1.309, 0, -Math.PI]} scale={4.791}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_185.geometry}
                material={materials.Interior_Diffuse}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_186.geometry}
                material={
                  materials["vehicle_generic_smallspecmap__PAINT_2_.001"]
                }
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_187.geometry}
                material={materials.Badge_Diffuse}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_188.geometry}
                material={materials.Dark_Main_Interior_Base_Color}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_189.geometry}
                material={materials.Leather}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_190.geometry}
                material={materials.Dark_01}
              />
            </group>
          </group>
          <group
            position={[0.003, 0.572, 0.206]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_192.geometry}
              material={materials.Dark_01}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_193.geometry}
              material={materials.Dark_Glass}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_14.geometry}
            material={materials.Interior_Diffuse}
            position={[0.166, 0.174, 0.087]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_16.geometry}
            material={materials.Gray_Vehicle_Paint}
            position={[0, -0.028, -0.106]}
            scale={[0.967, 1.443, 0.427]}
          >
            {" "}
            <MeshTransitionMaterial
              roughness={0.1} // Slightly reflective, diffused for soft light
              transitionColor={selectedColor || "#b0c4de"} // Light steel blue or similar to snowy tones
              metalness={1.1} // Less metallic for softer look
              clearCoat={0.8} // Subtle glossy top layer for icy effect
              clearCoatRoughness={10} // Smooth reflection like icy snow
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_18.geometry}
            material={materials.Screen_Interior}
            position={[0.002, 0.147, 0.146]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_29.geometry}
            material={materials["script_rt_dials_banshee.001"]}
            position={[0.323, 0.271, 0.175]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_31.geometry}
            material={materials.Interior_Emissive}
            position={[0.323, 0.27, 0.179]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_33.geometry}
            material={materials.Light_Emissive_Texture}
            position={[0.057, 0.106, 0.683]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_35.geometry}
            material={materials.Dark_01}
            position={[0.004, -0.579, -0.899]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_47.geometry}
            material={materials.Right_Signal_Light}
            position={[-0.649, 0.159, -0.796]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_62.geometry}
            material={materials.Brake_Light}
            position={[0.654, 0.159, -0.797]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <meshStandardMaterial
              color={"#ff0000"}
              metalness={0.1}
              roughness={1}
              emissive={"#e20606"}
              emissiveIntensity={100}
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
            geometry={nodes.Object_98.geometry}
            material={materials.Left_Signal_Light}
            position={[0.656, 0.159, -0.796]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            <meshStandardMaterial
              color={"#ff0000"}
              metalness={0.1}
              roughness={1}
              emissive={"#fe1414"}
              emissiveIntensity={10}
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
            geometry={nodes.Object_110.geometry}
            material={materials["Material.001"]}
            position={[0.003, -0.176, -0.92]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_112.geometry}
            material={materials.Brake_Light}
            position={[0.003, -0.081, -0.009]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_134.geometry}
            material={materials.Reverse_Light}
            position={[0.64, 0.143, -0.802]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_136.geometry}
            material={materials.Reverse_Light}
            position={[-0.633, 0.143, -0.802]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_138.geometry}
            material={materials.Brake_Light}
            position={[-0.647, 0.159, -0.797]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          >
            {" "}
            <meshStandardMaterial
              color={"#ff0000"}
              metalness={0.1}
              roughness={1}
              emissive={"#e20606"}
              emissiveIntensity={100}
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
            geometry={nodes.Object_195.geometry}
            material={materials.Dark_Glass}
            position={[0.622, 0.532, -0.33]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_197.geometry}
            material={materials.Dark_Glass}
            position={[-0.615, 0.532, -0.33]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.967, 0.427, 1.443]}
          />
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.Bronze_Antique_Aged}
        position={[0.35, 0.473, -2.397]}
        rotation={[1.898, -0.004, -3.1]}
        scale={0.073}
      />
    </group>
  );
}

useGLTF.preload("/porshe/scene.gltf");
