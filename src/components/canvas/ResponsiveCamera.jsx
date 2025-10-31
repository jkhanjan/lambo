/**
 * Responsive Camera Component
 * 
 * Adjusts camera position and FOV based on screen size.
 */

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

const ResponsiveCamera = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    if (size.width < 768) {
      camera.position.set(0, 5, 15);
      camera.fov = 50;
    } else if (size.width < 1200) {
      camera.position.set(0, 5, 20);
      camera.fov = 45;
    } else {
      camera.position.set(0, 5, 25);
      camera.fov = 30;
    }
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
};

export default ResponsiveCamera;
