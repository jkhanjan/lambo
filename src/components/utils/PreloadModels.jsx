
import { useGLTF } from "@react-three/drei";

export const preloadModels = () => {
  import("../models/Lambo").then(() =>
    useGLTF.preload("/model/scene-draco.glb")
  );
  import("../models/Porshe").then(() =>
    useGLTF.preload("/porsche/scene-draco.glb")
  );
  import("../models/Ferrari").then(() =>
    useGLTF.preload("/model2/scene-draco.glb")
  );
  import("../models/Bmw").then(() => useGLTF.preload("/bmw/scene-resized.glb"));
  import("../models/Fire").then(() => useGLTF.preload("/fire/scene.gltf"));
};
