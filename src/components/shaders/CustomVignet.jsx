import { forwardRef, useMemo } from "react";
import { Effect } from "postprocessing";
import { Uniform } from "three";

const fragmentShader = /* glsl */ `
uniform float offset;
uniform float darkness;

void mainImage(
  const in vec4 inputColor,
  const in vec2 uv,
  out vec4 outputColor
) {
  vec2 center = vec2(0.5, 0.5);

  float dist = distance(uv, center);

  float vignette = smoothstep(offset, offset - darkness, dist);

  vec3 color = inputColor.rgb * vignette;

  outputColor = vec4(color, inputColor.a);
}
`;

class CustomVignetteEffect extends Effect {
  constructor({ offset = 1.0, darkness = 1.0 } = {}) {
    super("CustomVignetteEffect", fragmentShader, {
      uniforms: new Map([
        ["offset", new Uniform(offset)],
        ["darkness", new Uniform(darkness)],
      ]),
    });
  }
}

const CustomVignette = forwardRef((props, ref) => {
  const effect = useMemo(() => new CustomVignetteEffect(props), [props]);

  return <primitive ref={ref} object={effect} />;
});

export default CustomVignette