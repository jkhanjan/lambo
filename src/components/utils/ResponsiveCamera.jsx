import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";

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
      // camera.position.set(0, 5, 1);
      camera.fov = 55;
    }
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
};

export default ResponsiveCamera;
