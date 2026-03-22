import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PaintShaderMaterial from "../shaders/PaintShaders";

export default function BMW(props) {
  const { scene } = useGLTF("/bmw/scene-resized.glb");
  const allTextures = useTexture(props.allColors);
  const paintTexture = Array.isArray(allTextures)
    ? allTextures[props.allColors.indexOf(props.color)]
    : allTextures;

  const headlightRef = useRef(null);
  const paintMaterialsRef = useRef([]);

  const mixSpeed = 0.016;


  useEffect(() => {
    if (!paintTexture) return;

    paintTexture.wrapS = paintTexture.wrapT = THREE.RepeatWrapping;
    paintTexture.repeat.set(1, 1);
    paintTexture.colorSpace = THREE.SRGBColorSpace;
    paintTexture.anisotropy = 1;
    paintTexture.needsUpdate = true;
    const transitionType = Math.floor(Math.random() * 5);
    const noiseType = Math.floor(Math.random() * 4);

    paintMaterialsRef.current.forEach((mat) => {
      mat.uTransitionType = transitionType;
      mat.uNoiseType = noiseType;
    });
  }, [paintTexture]);

  useEffect(() => {
    paintMaterialsRef.current = [];

    scene.traverse((child) => {
      if (!child.isMesh) return;

      const materialName = child.material?.name;

      if (materialName === "whitelight" || child.name === "Object_16") {
        child.material.color.set("#ec0000");
        child.material.emissive.set("#b0b2ff");
        child.material.emissiveIntensity = 0;
        child.material.toneMapped = false;
        headlightRef.current = child.material;
      }

      if (materialName === "redlight" || child.name === "Object_15") {
        child.material.color.set("#ff0000");
        child.material.emissive.set("#740707");
        child.material.emissiveIntensity = 400;
        child.material.toneMapped = false;
      }

      if (
        [
          "Object_39",
          "Object_40",
          "Object_43",
          "Object_44",
          "Object_41",
        ].includes(child.name)
      ) {
        const mat = new PaintShaderMaterial();
        mat.texture1 = paintTexture;
        mat.texture2 = paintTexture;
        mat.mixFactor = 1;

        mat.roughness =
          props.roughness !== undefined
            ? Math.max(0, props.roughness - 0.4)
            : 0.3;

        mat.metalness =
          props.metalness !== undefined
            ? Math.max(0, props.metalness - 0.2)
            : 0.2;

        mat.clearcoat = 0.4;
        mat.clearcoatRoughness = 0.2;
        mat.uNoiseType = Math.floor(Math.random() * 4);

        child.material = mat;
        paintMaterialsRef.current.push(mat);
      }

      if (
        [
          "Object_24",
          "Object_25",
          "Object_27",
          "Object_31",
          "Object_32",
        ].includes(child.name)
      ) {
        child.visible = !!props.parts?.spoiler;
      }
    });
  }, [scene, props.parts?.spoiler]);

  useEffect(() => {
    if (!paintTexture) return;

    paintMaterialsRef.current.forEach((mat) => {
      mat.texture2 = paintTexture;
      mat.mixFactor = 0;
    });
  }, [paintTexture]);

  useEffect(() => {
    paintMaterialsRef.current.forEach((mat) => {
      mat.roughness =
        props.roughness !== undefined
          ? Math.max(0, props.roughness - 0.4)
          : 0.3;

      mat.metalness =
        props.metalness !== undefined
          ? Math.max(0, props.metalness - 0.2)
          : 0.2;
    });
  }, [props.roughness, props.metalness]);

  useFrame(() => {
    if (headlightRef.current) {
      const target = props.parts?.headlights ? 300 : 1;
      headlightRef.current.emissiveIntensity +=
        (target - headlightRef.current.emissiveIntensity) * 0.5;
    }

    paintMaterialsRef.current.forEach((mat) => {
      if (mat.mixFactor < 1) {
        mat.mixFactor += mixSpeed;

        if (mat.mixFactor >= 1) {
          mat.texture1 = mat.texture2;
          mat.mixFactor = 1;
        }
      }
    });
  });

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/bmw/scene-resized.glb");
