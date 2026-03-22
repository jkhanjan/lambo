  import { useGLTF, useTexture } from "@react-three/drei";
  import { useEffect, useRef } from "react";
  import { useFrame } from "@react-three/fiber";
  import * as THREE from "three";
  import PaintShaderMaterial from "../shaders/PaintShaders";


  export default function Ferrari(props) {
    const spoilers = props.parts.spoiler;
    const { scene } = useGLTF("/model/scene-draco.glb");
      const { nodes: spoilerNodes, materials: spoilerMaterials } = useGLTF(
    "./spoiler/spoilers/scene.gltf"
  );

    /* ----------------------------- TEXTURES ----------------------------- */

    const allTextures = useTexture(props.allColors);
    const paintTexture = Array.isArray(allTextures)
      ? allTextures[props.allColors.indexOf(props.color)]
      : allTextures;

    /* ------------------------------- REFS -------------------------------- */

    const headlightRef = useRef(null);
    const paintMaterialsRef = useRef([]);
    const MIX_SPEED = 0.015;

    /* -------------------- TEXTURE CONFIG + NOISE ------------------------- */

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

    /* ------------------------- SCENE TRAVERSE ---------------------------- */

    useEffect(() => {
      if (!scene) return;

      paintMaterialsRef.current = [];

      scene.traverse((child) => {
        if (!child.isMesh) return;

        const matName = child.material?.name;

        /* ---------- Headlights ---------- */
        if (matName === "Stradale.012") {
          child.material.color.set("#eceaea");
          child.material.emissive.set("#333451");
          child.material.emissiveIntensity = 1;
          child.material.toneMapped = false;
          headlightRef.current = child.material;
        }

        /* ---------- Rear Lights ---------- */
        if (matName === "Stradale.017") {
          child.material.color.set("#ff0000");
          child.material.emissive.set("#ff0000");
          child.material.emissiveIntensity = 70;
          child.material.toneMapped = false;
        }

        if (matName === "Stradale.018") {
          child.material.color.set("#bd0c0c");
          child.material.emissive.set("#ff0000");
          child.material.emissiveIntensity = 1;
          child.material.toneMapped = false;
        }

        /* ---------- Paint Material ---------- */
        if (matName === "Stradale.023") {
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
          paintMaterialsRef.current.push(mat)
        }
      });
    }, [scene]);

    /* -------------------- RESET TRANSITION ON COLOR ---------------------- */

    useEffect(() => {
      if (!paintTexture) return
      paintMaterialsRef.current.forEach((mat) => {
        mat.texture2 = paintTexture;
        mat.mixFactor = 0;
      });
    }, [paintTexture]);

    /* -------------------- ROUGHNESS / METALNESS -------------------------- */

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

    /* --------------------------- FRAME LOOP ------------------------------ */

    useFrame(() => {
      /* Headlights */
      if (headlightRef.current) {
        const target = props.parts?.headlights ? 300 : 1;
        headlightRef.current.emissiveIntensity +=
          (target - headlightRef.current.emissiveIntensity) * 0.5;
      }
      paintMaterialsRef.current.forEach((mat) => {
        if (mat.mixFactor < 1) {
          mat.mixFactor += MIX_SPEED;

          if (mat.mixFactor >= 1) {
            mat.texture1 = mat.texture2;
            mat.mixFactor = 1;
          }
        }
      });
    })

    return (
      <group {...props} position={[0, 0, -1.3]} dispose={null}>
       {spoilers && spoilerNodes?.modSpoiler__0 && (
        <group scale={0.006} position={[0., .6, -0.36]}>
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
        <primitive object={scene} />
      </group>
    );
  }

  useGLTF.preload("/model/scene-draco.glb");
