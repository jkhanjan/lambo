import React, { useEffect, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PaintShaderMaterial from "../shaders/PaintShaders";

export default function Porshe(props) {
  const { scene } = useGLTF("/porshe/scene-draco.glb");

  /* ---------------- Paint texture ---------------- */
  const allTextures = useTexture(props.allColors);
  const paintTexture = Array.isArray(allTextures)
    ? allTextures[props.allColors.indexOf(props.color)]
    : allTextures;

  /* ---------------- Refs ---------------- */
  const bodyPaintMatsRef = useRef([]);
  const headlightMatsRef = useRef([]);
  const tailLightMatsRef = useRef([]);

  const partsRef = useRef({
    spoiler: [],
  });

  const MIX_SPEED = 0.015;

  /* ---------------- Setup texture ---------------- */
  useEffect(() => {
    if (!paintTexture) return;

    paintTexture.wrapS = paintTexture.wrapT = THREE.RepeatWrapping;
    paintTexture.colorSpace = THREE.SRGBColorSpace;
    paintTexture.anisotropy = 8;
    paintTexture.needsUpdate = true;
  }, [paintTexture]);

  /* ---------------- Traverse scene (setup only) ---------------- */
  useEffect(() => {
    if (!scene) return;

    bodyPaintMatsRef.current = [];
    headlightMatsRef.current = [];
    tailLightMatsRef.current = [];
    partsRef.current.spoiler = [];

    scene.traverse((child) => {
      if (!child.isMesh || !child.material) return;

      const matName = child.material.name;

      /* ---------- BODY PAINT ---------- */
      if (matName === "Gray_Vehicle_Paint") {
        const mat = new PaintShaderMaterial();

        mat.texture1 = paintTexture;
        mat.texture2 = paintTexture;
        mat.mixFactor = 1;

        mat.clearcoat = 0.4;
        mat.clearcoatRoughness = 0.2;
        mat.uNoiseType = Math.floor(Math.random() * 4);

        child.material = mat;
        bodyPaintMatsRef.current.push(mat);
      }

      /* ---------- HEADLIGHTS ---------- */
      if (
        matName === "Main_Headlight" ||
        matName === "Fog_Light_Texture" ||
        matName === "Daylight_Light"
      ) {
        const mat = new THREE.MeshStandardMaterial({
          color: "#ffffff",
          emissive: new THREE.Color("#b0b2ff"),
          emissiveIntensity: 1,
          metalness: 0.1,
          roughness: 0.1,
          toneMapped: false,
        });

        child.material = mat;
        headlightMatsRef.current.push(mat);
      }

      /* ---------- TAIL LIGHTS ---------- */
      if (
        matName === "Rear_Light" ||
        matName === "Brake_Light" ||
        matName === "Bottom_Rear_Brake_Light"
      ) {
        const mat = new THREE.MeshStandardMaterial({
          color: "#ff0000",
          emissive: new THREE.Color("#740707"),
          emissiveIntensity: 60,
          roughness: 1,
          metalness: 0.1,
          toneMapped: false,
        });

        child.material = mat;
        tailLightMatsRef.current.push(mat);
      }

      /* ---------- SPOILER PART ---------- */
      if (["Object_115", "Object_116"].includes(child.name)) {
        partsRef.current.spoiler.push(child);
      }
    });
  }, [scene, paintTexture]);

  /* ---------------- Paint transition ---------------- */
  useEffect(() => {
    if (!paintTexture) return;

    bodyPaintMatsRef.current.forEach((mat) => {
      mat.texture2 = paintTexture;
      mat.mixFactor = 0;
    });
  }, [paintTexture]);

  /* ---------------- Toggle parts (reactive) ---------------- */
  useEffect(() => {
    const visible = !!props.parts?.spoiler;

    partsRef.current.spoiler.forEach((mesh) => {
      mesh.visible = visible;
    });
  }, [props.parts?.spoiler]);

  /* ---------------- Animate ---------------- */
  useFrame(() => {
    const headlightsOn = props.parts?.headlights;

    /* Headlights smooth transition */
    const headlightTarget = headlightsOn ? 35 : 1;
    headlightMatsRef.current.forEach((mat) => {
      mat.emissiveIntensity +=
        (headlightTarget - mat.emissiveIntensity) * 0.15;
    });

    /* Paint blending */
    bodyPaintMatsRef.current.forEach((mat) => {
      if (mat.mixFactor < 1) {
        mat.mixFactor += MIX_SPEED;
        if (mat.mixFactor >= 1) {
          mat.texture1 = mat.texture2;
          mat.mixFactor = 1;
        }
      }
    });
  });

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/porshe/scene-draco.glb");