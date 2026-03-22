import { Effect } from "postprocessing";
import { Uniform, Vector2 } from "three";

const fragmentShader = /* glsl */ `
  const int MAX_POINTS = 16;

  uniform vec2 uTrailPositions[MAX_POINTS];
  uniform float uTrailAges[MAX_POINTS];
  uniform float uAspect;
  uniform float uStrength;
  uniform float uRadius;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 totalDistortion = vec2(0.0);

    // Aspect correct the UVs so ripples are perfect circles, not ovals
    vec2 aspectCorrectedUV = uv;
    aspectCorrectedUV.x *= uAspect;

    for(int i = 0; i < MAX_POINTS; i++) {
      float age = uTrailAges[i];
      
      // If the point is fully faded out (age >= 1.0), skip it to save performance
      if(age >= 1.0) continue; 

      vec2 pos = uTrailPositions[i];

      vec2 aspectCorrectedPos = pos;
      aspectCorrectedPos.x *= uAspect;

      // Distance and Direction
      vec2 delta = aspectCorrectedUV - aspectCorrectedPos;
      float dist = length(delta);
      
      // Normalize direction (safely avoid dividing by zero)
      vec2 dir = dist > 0.0001 ? delta / dist : vec2(0.0);

      // 1. Falloff: Limit the ripple to uRadius
      float falloff = 1. - smoothstep(0.0, uRadius, dist);

      // 2. Wave: Expanding sine wave based on distance and age
      // Higher multiplier on dist = more rings. Higher multiplier on age = faster expansion
      float wave = sin(dist * 50.0 - age * 10.0);

      // 3. Fade: Older points fade out smoothly
      float fade = 1.0 - smoothstep(0.0, 1.0, age);

      totalDistortion += dir * wave * uStrength * falloff * fade;
    }

    vec2 distortedUV = uv + totalDistortion * 0.1;
    outputColor = texture2D(inputBuffer, distortedUV);
  }
`;

export class CursorDistortionEffect extends Effect {
  constructor({ strength = 0.04, radius = 0.55 } = {}) {
    // 1. Initialize our history arrays
    const maxPoints = 16;
    const trailPositions = [];
    const trailAges = [];
    
    // Fill with default "dead" points (age = 1.0)
    for (let i = 0; i < maxPoints; i++) {
      trailPositions.push(new Vector2(0, 0));
      trailAges.push(.2); 
    }

    super("CursorDistortionEffect", fragmentShader, {
      uniforms: new Map([
        ["uTrailPositions", new Uniform(trailPositions)],
        ["uTrailAges", new Uniform(trailAges)],
        ["uAspect", new Uniform(window.innerWidth / window.innerHeight)],
        ["uStrength", new Uniform(strength)],
        ["uRadius", new Uniform(radius)],
      ]),
    });

    this.maxPoints = maxPoints;
    this.trailPositions = trailPositions;
    this.trailAges = trailAges;
    
    // Keep aspect ratio updated on resize
    window.addEventListener("resize", () => {
      this.uniforms.get("uAspect").value = window.innerWidth / window.innerHeight;
    });
  }

  addPoint(x, y) {
    let oldestIndex = 0;
    let oldestAge = -1;
    
    for (let i = 0; i < this.maxPoints; i++) {
      if (this.trailAges[i] > oldestAge) {
        oldestAge = this.trailAges[i];
        oldestIndex = i;
      }
    }

    this.trailPositions[oldestIndex].set(x, y);
    this.trailAges[oldestIndex] = 0.0;
  }

  update(renderer, inputBuffer, deltaTime) {
    for (let i = 0; i < this.maxPoints; i++) {
      if (this.trailAges[i] < 1.0) {
        this.trailAges[i] += deltaTime * 1.; 
      }
    }
  }
}