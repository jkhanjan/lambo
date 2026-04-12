import { forwardRef, useMemo } from "react";
import { Effect } from "postprocessing";
import { Uniform, Vector2 } from "three";

const fragmentShader = /* glsl */ `
uniform float strength;
uniform vec2 center;

void mainImage(
  const in vec4 inputColor,
  const in vec2 uv,
  out vec4 outputColor
) {
  vec2 dir = uv - center;
  vec4 color = vec4(0.0);

  float samples = 50.0;

  for(float i = 0.0; i < samples; i++) {
    float percent = i / samples;
    color += texture2D(inputBuffer, uv - dir * percent * strength);
  }

  color /= samples;

  outputColor = color;
}
`;

class SpeedBlurEffect extends Effect {
  constructor({ strength = 0.3, center = [0.5, 0.5] } = {}) {
    super("SpeedBlurEffect", fragmentShader, {
      uniforms: new Map([
        ["strength", new Uniform(strength)],
        ["center", new Uniform(new Vector2(...center))]
      ])
    });
  }
}

 const SpeedBlur = forwardRef((props, ref) => {
  const effect = useMemo(() => new SpeedBlurEffect(props), [props]);
  return <primitive ref={ref} object={effect} />;
});

export default SpeedBlur;