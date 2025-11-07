import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Glitch,
  Noise,
  DepthOfField,
  HueSaturation,
  Scanline,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const FloatingParticles = () => {
  const pointsRef = useRef();
  const count = 1000; 

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001; 
    }
  });

  // Generate particle positions with a wider range
  const particles = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    particles[i * 3 + 0] = (Math.random() - 0.5) * 20; 
    particles[i * 3 + 1] = (Math.random() - 0.5) * 20; 
    particles[i * 3 + 2] = (Math.random() - 0.5) * 20; 
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        attach="material"
        vertexShader={`
          uniform float uTime;
          void main() {
            vec3 pos = position;
            pos.y += sin(uTime + pos.x) * 0.5;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = 2.0;
          }
        `}
        fragmentShader={`
          void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // White particles
          }
        `}
        uniforms={{
          uTime: { value: 0 },
        }}
      />
    </points>
  );
};

const Effects = ({ environment }) => {
  return (
    <>
      {/* Postprocessing Effects */}
      {environment === "night" && (
      <>
      <FloatingParticles />

          <EffectComposer>

        {/* Vignette for cinematic focus */}
        <Vignette
          eskil={true}
          offset={1.2}
          darkness={1}
          blendFunction={BlendFunction.NORMAL}
        />
        <Glitch
          active
          delay={[4, 6]} // Delay before glitch effect starts
          duration={[0.1, 0.2]} // Duration of glitch effect
          strength={[0.3, 0.5]} // Strength of glitch effect
        />
        <Bloom
          intensity={2}
          luminanceThreshold={1} // Reacts to dimly lit areas
          luminanceSmoothing={2} // Smooth bloom transitions
          mipmapBlur
          layers={[1]} // Apply bloom only to layer 1
        />
        <ChromaticAberration offset={[0.001, 0.002]} />
      </EffectComposer></>
      )}
      {environment === "snow" && (
            <>
      <FloatingParticles />

          <EffectComposer>

        {/* Vignette for cinematic focus */}
        <Vignette
          eskil={true}
          offset={1.2}
          darkness={1}
          blendFunction={BlendFunction.NORMAL}
        />
        <Glitch
          active
          delay={[4, 6]} // Delay before glitch effect starts
          duration={[0.1, 0.2]} // Duration of glitch effect
          strength={[0.3, 0.5]} // Strength of glitch effect
        />
        <Bloom
          intensity={2}
          luminanceThreshold={1} // Reacts to dimly lit areas
          luminanceSmoothing={2} // Smooth bloom transitions
          mipmapBlur
          layers={[1]} // Apply bloom only to layer 1
        />
        <ChromaticAberration offset={[0.001, 0.002]} />
      </EffectComposer></>
      )}

      {environment === "city" && (
    <EffectComposer>
      <DepthOfField focusDistance={0.03} focalLength={.5} bokehScale={2.5} />
      <Bloom intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={.8} />
      <ToneMapping adaptive averageLuminance={.5} middleGrey={0.6} />
      <Vignette offset={0.2} darkness={1.0} />
    </EffectComposer>

      )}
    </>
  );
};

export default Effects;
