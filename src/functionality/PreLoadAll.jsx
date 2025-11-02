import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

const MODEL_PATHS = {
  Model1: "/model/scene-draco.glb",
  Model2: "/porshe/scene-draco.glb",
  Model3: "/model2/scene-draco.glb", // Ferrari
  Model4: "/bmw/scene-draco.glb", // BMW
};

export default function PreloadCars() {
  useEffect(() => {
    const paths = Object.values(MODEL_PATHS);

    paths.forEach((path, index) => {
      setTimeout(() => {
        console.log(`🚗 Preloading: ${path}`);
        useGLTF.preload(path);
      }, index * 1000);
    });
    return () => {
      console.log("🧹 Stopped preloading (component unmounted)");
    };
  }, []);

  return null;
}
