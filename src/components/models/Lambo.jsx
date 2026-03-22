import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import PaintShaderMaterial from "../shaders/PaintShaders";

const Lambo = (props) => {
  const spoilers = props.parts.spoiler;
  const { scene } = useGLTF("/model2/scene-draco.glb");
    const { nodes: spoilerNodes, materials: spoilerMaterials } = useGLTF(
    "./spoiler/spoilers/scene.gltf"
  );

  const allTextures = useTexture(props.allColors);
  const paintTexture = Array.isArray(allTextures)
    ? allTextures[props.allColors.indexOf(props.color)]
    : allTextures;

  const headlightMatsRef = useRef([]);
  const paintMaterialsRef = useRef([]);

  const MIX_SPEED = 0.015;

  /* ---------------- Paint texture setup ---------------- */
  useEffect(() => {
    if (!paintTexture) return;

    paintTexture.wrapS = paintTexture.wrapT = THREE.RepeatWrapping;
    paintTexture.repeat.set(1, 1);
    paintTexture.colorSpace = THREE.SRGBColorSpace;
    paintTexture.anisotropy = 8;
    paintTexture.needsUpdate = true;

    const transitionType = Math.floor(Math.random() * 5);
    const noiseType = Math.floor(Math.random() * 4);

    paintMaterialsRef.current.forEach((mat) => {
      mat.uTransitionType = transitionType;
      mat.uNoiseType = noiseType;
    });
  }, [paintTexture]);

  /* ---------------- Scene traversal ---------------- */
  useEffect(() => {
if (!scene || !paintTexture) return;

    paintMaterialsRef.current = [];
    headlightMatsRef.current = [];

    scene.traverse((child) => {
      if (!child.isMesh || !child.material) return;

      const matName = child.material.name;

      /* ---------- Headlights (FRONT + DAYLIGHT) ---------- */
      if (matName === "Headlight_light" || matName === "Light") {
        child.material.color.set("#eceaea");
        child.material.emissive.set("#333451");
        child.material.emissiveIntensity = 5;
        child.material.toneMapped = false;

        headlightMatsRef.current.push(child.material);
      }

      /* ---------- Rear lights ---------- */
      if (matName === "Tail_light") {
        child.material.color.set("#b22929");
        child.material.emissive.set("#ff0505");
        child.material.emissiveIntensity = 100;
        child.material.toneMapped = false;
      }

      /* ---------- Paint material ---------- */
      if (matName === "Body") {
        const mat = new PaintShaderMaterial();

        mat.texture1 = paintTexture;
        mat.texture2 = paintTexture;
        mat.mixFactor = 1;
        mat.clearcoat = 0.4;
        mat.clearcoatRoughness = 0.2;
        mat.uNoiseType = Math.floor(Math.random() * 4);

        child.material = mat;
        paintMaterialsRef.current.push(mat);
      }
    });
  }, [scene]);

  /* ---------------- Trigger paint transition ---------------- */
  useEffect(() => {
    if (!paintTexture) return;

    paintMaterialsRef.current.forEach((mat) => {
      mat.texture2 = paintTexture;
      mat.mixFactor = 0;
    });
  }, [paintTexture]);

  /* ---------------- Animations ---------------- */
  useFrame(() => {
    /* Headlights */
    const target = props.parts?.headlights ? 300 : 1;

    headlightMatsRef.current.forEach((mat) => {
      mat.emissiveIntensity +=
        (target - mat.emissiveIntensity) * 0.5;
    });

    /* Paint transition */
    paintMaterialsRef.current.forEach((mat) => {
      if (mat.mixFactor < 1) {
        mat.mixFactor += MIX_SPEED;

        if (mat.mixFactor >= 1) {
          mat.texture1 = mat.texture2;
          mat.mixFactor = 1;
        }
      }
    });
  });

  return( 
  <group>
    {spoilers && spoilerNodes?.modSpoiler__0 && (
        <group scale={0.0067} position={[0., .7, -1.6]}>
          <mesh
            castShadow
            receiveShadow
            geometry={spoilerNodes.modSpoiler__0.geometry}
          >
            <meshStandardMaterial
              color="#484242"
              metalness={1}
              roughness={0.1}
              envMapIntensity={1}
            />
          </mesh>
        </group>

      )}
      <primitive object={scene} scale={1} />;
    </group>
  )
};

export default Lambo;
