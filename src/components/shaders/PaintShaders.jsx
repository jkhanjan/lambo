import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const PaintShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    texture1: null,
    texture2: null,
    mixFactor: 0.0,
    transitionWidth: 0.35,
    roughness: 0.03,
    metalness: 0.2,
    uNoiseType: 0,
    uTransitionType: 0,
  },

  /* =========================
     Vertex Shader
  ========================= */
  `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;

    vec4 mvPosition = viewMatrix * worldPos;
    vViewPosition = -mvPosition.xyz;

    gl_Position = projectionMatrix * mvPosition;
  }
  `,

  /* =========================
     Fragment Shader
  ========================= */
  `
  precision highp float;

  uniform sampler2D texture1;
  uniform sampler2D texture2;

  uniform float uTime;
  uniform float mixFactor;
  uniform float transitionWidth;
  uniform float roughness;
  uniform float metalness;
  uniform int uNoiseType;
  uniform int uTransitionType;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPos;

  /* ========= Noise Utils ========= */

  float mod289(float x){ return x - floor(x / 289.0) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x / 289.0) * 289.0; }
  vec4 perm(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }

  float noise(vec2 p){
    vec2 a = floor(p);
    vec2 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0,1,0,1);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + d.x;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec2 res = mix(k3.xz, k3.yw, d.y);
    return mix(res.x, res.y, d.y) / 289.0;
  }

  /* ========= Noise Variants ========= */

  float noiseSimple(vec2 p){
    return (sin(p.x * 8.0) + sin(p.y * 8.0)) * 0.25 ;
  }

  float noiseRidge(vec2 p){
    float n = noise(floor(p * 2.0));
    return 1.0 - abs(n * 2.0 - 1.0);
  }

  float noiseWaves(vec2 p){
    vec2 w = vec2(noise(p + 1.0), noise(p + 10.0));
    p += w * 0.3;
    return sin(p.y) * 0.5;
  }

  float noiseCells(vec2 p){
    vec2 gv = fract(p) - 0.5;
    vec2 id = floor(p);
    float d = 10.0;

    for(int y=-1;y<=1;y++){
      for(int x=-1;x<=1;x++){
        vec2 offs = vec2(x,y);
        float n = noise(id + offs);
        vec2 pt = offs + vec2(n, fract(n * 17.0)) - gv;
        d = min(d, length(pt));
      }
    }
    return d;
  }

  float getNoise(vec2 p){
    if(uNoiseType == 0) return noiseRidge(p * 3.0);
    if(uNoiseType == 1) return smoothstep(0.2,0.7,noiseWaves(p * 3.0));
    if(uNoiseType == 2) return pow(noiseSimple(p * 3.0),4.0);
    if(uNoiseType == 3) return abs(noiseCells(p * 3.0) * 2.0 - 1.0);
    return noise(p);
  }

  void main() {

    /* ========= WORLD SPACE COORDS ========= */

    vec3 wp = vWorldPos * 1.;     // 🔑 global scale knob
    vec2 paintUV = wp.yz;          // stable on all cars

    /* ========= TRANSITION ========= */

    float dist = 0.0;
    if(uTransitionType == 0) dist = length(paintUV);
    else if(uTransitionType == 1) dist = paintUV.y;
    else if(uTransitionType == 2) dist = paintUV.x;
    else if(uTransitionType == 3) dist = -paintUV.y;
    else if(uTransitionType == 4) dist = paintUV.x + paintUV.y;

    float n = getNoise(paintUV + uTime * 1.);
    float distortion = n * 0.5;

    float radius = mixFactor * 2.5;
    float edge = clamp(
  (dist - (radius - transitionWidth)) / transitionWidth,
  0.0,
  1.0
);

    /* ========= TEXTURE BLEND (WORLD SPACE) ========= */

    vec2 texUV = paintUV * 0.25;

    vec3 colorA = texture2D(texture1, texUV).rgb;
    vec3 colorB = texture2D(texture2, texUV).rgb;

    vec3 baseColor = mix(colorB, colorA, edge);

    /* ========= LIGHTING ========= */

    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewPosition);

    float ndv = max(dot(N, V), 0.0);
    float specPower = mix(120.0, 4.0, roughness);

    float specular = pow(ndv, specPower);
    float fresnel = pow(1.0 - ndv, 3.0);

    vec3 reflection = vec3(1.0) * specular * metalness;
    vec3 glow = vec3(1.0) * fresnel * metalness * 0.5;

    vec3 diffuse = baseColor * (1.0 - roughness);

    vec3 finalColor = diffuse + reflection + glow;

    gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
  }
  `
);

extend({ PaintShaderMaterial });
export default PaintShaderMaterial;
