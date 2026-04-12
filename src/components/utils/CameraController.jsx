import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import useSpaceHold from "./hooks/useSpaceHold";

const CameraController = ({
  dollyProgressRef,
  subjectPosition = new THREE.Vector3(0, 0, 0),
  sceneWidth = 8,
}) => {
  const { camera, clock } = useThree();
  const {isHoldingRef} = useSpaceHold()
  const baseFov = useRef(35);
  const targetFov = 80;

  // Shake strength
  const shakeStrength = 0.01; 

  useFrame(() => {
    if (!camera.isPerspectiveCamera) return;

    const holding = isHoldingRef.current;
    const prev = dollyProgressRef.current;
    const next = holding ? prev + 0.015 : prev - 0.01;
    dollyProgressRef.current = Math.min(Math.max(next, 0), 1);

    const t = dollyProgressRef.current;
    console.log(t)
    // FOV
    const desiredFov = THREE.MathUtils.lerp(baseFov.current, targetFov, t);
    camera.fov = THREE.MathUtils.lerp(camera.fov, desiredFov, 0.2);
    camera.updateProjectionMatrix();

    // Dolly distance math
    const requiredDistance =
      sceneWidth / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));

    const direction = camera.position
      .clone()
      .sub(subjectPosition)
      .normalize();

    const targetPosition = subjectPosition
      .clone()
      .addScaledVector(direction, requiredDistance);

    camera.position.lerp(targetPosition, 0.2);

    // 🎬 Cinematic shake
    if (t > 0) {
      const time = clock.getElapsedTime();

      const shakeAmount = shakeStrength * t;

      camera.position.x += Math.sin(time * 40) * shakeAmount * 1.5;
      camera.position.y += Math.cos(time * 20) * shakeAmount;
      camera.position.z += Math.cos(time * 20) * shakeAmount;

    }

    camera.lookAt(subjectPosition);
  });

  return null;
};

export default CameraController;