import { useGLTF } from "@react-three/drei";

export const preloadModels = async () => {
  const start = performance.now();

  console.log("⏳ Starting preload...");
  await Promise.all([
    import("../models/Lambo").then(() => useGLTF.preload("/lambo/scene.gltf")),
    import("../models/Porshe").then(() =>
      useGLTF.preload("/porsche/scene.gltf")
    ),
    import("../models/Ferrari").then(() =>
      useGLTF.preload("/ferrari/scene.gltf")
    ),
    import("../models/BMW").then(() => useGLTF.preload("/bmw/scene.gltf")),
    import("../models/Fire").then(() => useGLTF.preload("/fire/scene.gltf")),
  ]);

  const end = performance.now();
  console.log(`✅ Preload complete in ${(end - start).toFixed(2)} ms`);
};
