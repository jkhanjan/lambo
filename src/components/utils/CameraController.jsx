import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const CameraController = ({ view, isTransitioning }) => {
  const { camera } = useThree();
  const cameraViews = {
    default: { position: [0, 5, 25], target: [0, 0, 0] },
    sideView: { position: [7, 1, 0], target: [0, 0, 0] },
    topView: { position: [0, 12, 0], target: [0, 0, 0] },
    backView: { position: [0, -2, -16], target: [0, 0, 0] },
  };

  useFrame(() => {
    if (isTransitioning) {
      const currentView = cameraViews[view] || cameraViews["default"];
      camera.position.lerp(new THREE.Vector3(...currentView.position), 0.03);
      const target = new THREE.Vector3(...currentView.target);
      camera.lookAt(target);
    }
  });

  return null;
};

export default CameraController;
