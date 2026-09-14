# Building a 3D Car Configurator: How the Pieces Fit

*A high-level design write-up of the `lambo` configurator — what's in the box, how data moves, and why it's shaped this way.*

---

## What it is

A browser-based car configurator. One WebGL canvas, four cars, three environments, six paint finishes, a bolt-on spoiler — and a "hold space" cinematic dolly that turns the whole thing from a product viewer into something closer to a demo reel.

No backend. No build-time model pipeline. Everything is static assets + a single React tree driving a single `<Canvas>`.

## The stack

| Layer | Choice |
|---|---|
| Build | Vite 5 |
| UI | React 18, Tailwind 3, GSAP (entry animations) |
| 3D | three.js 0.170, `@react-three/fiber` 8, `@react-three/drei` 9 |
| Post FX | `@react-three/postprocessing` 2 + hand-written `Effect` subclasses |
| State | React Context + `useReducer` |

The state choice has history. The branch list still shows `feat/zustand-state-handling` and `feat/state-managing-by-self` sitting next to each other — Zustand went in, then came back out. For a config object this small (one flat state, ~8 action types, zero cross-component subscriptions outside the provider) a reducer costs one file and no dependency. It stayed.

---

## Folder structure

```
src/
├── main.jsx                    # CarProvider wraps App — state lives above the Canvas
├── App.jsx                     # scene graph composition root
│
└── components/
    ├── context/CarContext.jsx      # provider + model-swap transition orchestrator
    ├── reducer/CarReducer.jsx      # pure reducer + initial config
    ├── constants/constanst.js      # MODEL_MAP, ENVIRONMENTS, GRADIENT_COLOR
    │
    ├── models/                     # one component per car
    │   ├── Lambo.jsx  Ferrari.jsx  Porshe.jsx  Bmw.jsx
    │
    ├── shaders/                    # raw GLSL, no React
    │   ├── PaintShaders.jsx        # the paint material
    │   ├── MotionBlur.jsx          # radial speed blur Effect
    │   └── CustomVignet.jsx
    │
    ├── Effects/                    # scene dressing + post stack
    │   ├── Studio.jsx              # env map, fog, background, neon tori
    │   ├── Floor.jsx               # reflector + Tron grid material
    │   ├── Effects.jsx             # per-environment EffectComposer
    │   ├── CursorDistortion.jsx        # R3F wrapper
    │   └── CursorDistortionEffect.jsx  # the actual postprocessing Effect
    │
    ├── materials/MeshTransitionMaterial.jsx
    │
    ├── utils/
    │   ├── CameraController.jsx    # the dolly
    │   ├── ResponsiveCamera.jsx    # breakpoint-based framing
    │   ├── PreloadModels.jsx
    │   └── hooks/useSpaceHold.js   # space-bar hold, ref + state
    │
    └── UI/
        ├── Overlay.jsx             # drum dial nav
        └── components/             # Color / Model / Environment / Accessories pickers
```

The split that matters: **`shaders/` holds GLSL that knows nothing about React**, `Effects/` holds the React components that mount it, and `models/` holds per-car wiring. A new car is one file in `models/` plus one line in `MODEL_MAP`. A new post effect is one `Effect` subclass plus a `wrapEffect` call.

---

## Data flow

```
                    user input
                        │
            ┌───────────┴───────────┐
            │                       │
      Overlay pickers          space bar (useSpaceHold)
            │                       │
            ▼                       ▼
      dispatch(action)         isHoldingRef  ──────┐
            │                       │              │
            ▼                       │              │
      ┌──────────────┐              │              │
      │  carReducer  │              │              │
      └──────┬───────┘              │              │
             │ carState             │              │
             ▼                      ▼              ▼
        ┌─────────────────────────────────────────────┐
        │  App.jsx  →  <Canvas>                        │
        │                                              │
        │  MODEL_MAP[modelName] ──► <CurrentModel/>    │
        │  ENVIRONMENTS[env]    ──► <Studio/> <Floor/> │
        │                       ──► <Effects/>         │
        │  dollyProgressRef     ──► <CameraController/>│
        └─────────────────────────────────────────────┘
```

Two deliberately different channels:

- **Config changes** (colour, model, environment, parts) go through the reducer. They're discrete, low-frequency, and should re-render.
- **Per-frame values** (dolly progress, hold state, cursor trail) travel through refs and `useFrame`. `dollyProgressRef` is created in `App.jsx` and handed down to `CameraController` — never state, so a 60fps camera animation costs zero React renders.

`useSpaceHold` returns both: `isHolding` (state, for the UI that fades out) and `isHoldingRef` (ref, for the render loop). Same hook, two consumers with opposite needs.

---

## The interesting parts

### Model swapping is a timed handoff, not a swap

Naively, `setModel("porsche")` unmounts one GLTF and mounts another — you get a frame of nothing. `CarContext` runs its own rAF loop instead:

```
t: 0 ──────────── 0.5 ──────────── 1.0
   │               │                │
   │          dispatch SET_MODEL    │
   └── isTransitioning = true ──────┘
       OrbitControls disabled
```

The dispatch fires at the midpoint of a 1s window, with `isTransitioning` gating orbit controls across the whole thing. The progress value is published as `transitionProgress` for any component that wants to animate against it.

### Paint is a custom material, not a colour swap

`PaintShaders.jsx` is a `shaderMaterial` holding two textures and a `mixFactor`. Picking a new colour doesn't replace the material — it sets `texture2` to the new swatch and resets `mixFactor` to 0. The model's `useFrame` walks `mixFactor` up by `0.015`/frame, and when it hits 1, `texture1 = texture2` and the material settles.

The wipe itself is world-space, not UV-space:

```glsl
vec2 paintUV = vWorldPos.yz;     // sample in world coords, not mesh UVs
float dist   = /* one of 5 sweep directions */;
float radius = mixFactor * 2.5;
float edge   = clamp((dist - (radius - transitionWidth)) / transitionWidth, 0.0, 1.0);
```

Because it's world-space, the colour wipe reads as a single wave crossing the whole car instead of four disjointed wipes across four body meshes with four different UV layouts. Sweep direction and noise function (`ridge`, `waves`, `simple`, `cells`) are both re-rolled randomly per colour change, so the same click never looks quite the same twice.

The lighting is a hand-rolled Fresnel + spec approximation, not three.js's PBR chain. Cheaper, fully controllable — and the tradeoff is that this material doesn't participate in the scene's env map, so it lives or dies on how well those hand-tuned constants sell it.

### Environments are config, not code

`ENVIRONMENTS` in `constanst.js` is the single switch. Each entry carries `file` (HDR), `background`, `fogColor`, `fogDensity`, `floorColor`. `Studio`, `Floor`, and `Effects` all key off the same `environment` string:

| | night | snow | city |
|---|---|---|---|
| Lighting | `city` preset + neon tori | `snow.hdr` | `forest.hdr` |
| Floor | reflector + Tron grid | reflector | soft reflector |
| Post | vignette, glitch, bloom, CA | same | DoF, bloom, adaptive tone map |

So "add an environment" means: add an entry, add an HDR, add a post block. No new component.

### Two hand-written post effects

Both subclass `postprocessing`'s `Effect` directly rather than composing library passes.

**`CursorDistortionEffect`** keeps a fixed 16-slot ring buffer of cursor positions with per-point ages. Each frame `update()` ages every point; `addPoint()` overwrites the oldest slot. The shader loops all 16, and each contributes a `sin(dist * 50 - age * 10)` ripple weighted by radial falloff and age fade. Fixed array, no allocation, no GC — the whole trail is 16 vec2s and 16 floats that never resize.

**`SpeedBlur`** is a 50-tap radial blur toward screen centre, mounted only while space is held. 50 texture fetches per pixel is not free, which is exactly why it's gated behind a transient input instead of running always.

### The dolly

`CameraController` is where the hold gesture pays off. On hold, `dollyProgressRef` climbs by `0.015`/frame; on release it falls by `0.01` — asymmetric, so it snaps in and eases out. That `t` drives three things at once:

1. **FOV** lerps 35° → 80°
2. **Distance** recomputes to keep the car the same on-screen size: `sceneWidth / (2 * tan(fov/2))`
3. **Shake** scales with `t` — sine on X at 40Hz, cosine on Y/Z at 20Hz

Step 2 is the whole trick. Widening FOV alone just zooms out; widening FOV *while pulling in to hold framing* is a dolly zoom. The car stays put, the world stretches around it. Meanwhile the UI hides, the speed blur mounts, the vignette closes in, and letterbox bars slide in from the Overlay.

---

## Asset strategy

Models are Draco-compressed GLB. Paint swatches are AVIF where the encoder cooperated, JPG where it didn't. Environments are HDR.

Loading is staged rather than eager: `<Suspense>` holds the scene while drei's `<Loader />` covers the gap, `<Preload all />` warms GPU uploads for what's mounted, and `CarContext` fires a `setTimeout(3000)` to preload the *other* three models once the first car is interactive. First paint stays cheap; switching cars later feels instant.

That said, the asset budget is the biggest open problem here: `public/bmw` is 37MB and `public/porshe` is 20MB against Lambo's 2.8MB. The staged preload hides it, it doesn't fix it. Re-decimating those two is the highest-leverage perf work left.

---

## Known rough edges

Writing this down because an HLD that only describes the happy path isn't much of an HLD.

- **Two `OrbitControls`.** `App.jsx` mounts one; `Studio.jsx` mounts another with different limits and autorotate. They fight.
- **`useSpaceHold` is called in four places.** Each call registers its own `keydown`/`keyup` listeners and its own state. It works, but it's four listeners doing one listener's job — a context or an external store would collapse them.
- **`PreloadModels.jsx` is dead.** `CarContext` inlines its own preload instead, and the two disagree on which GLB the Lambo actually uses.
- **`constanst.js` imports through `../../../public/`.** Mixed with root-absolute (`/gray.jpg`) imports for the same class of asset. Pick one.
- **`LLM-server/` is an empty scaffold.** There's a `feat/LLM-addition` branch; nothing has landed on main.

---

## The shape of it

The architecture holds up because of one decision made early: **state lives above the Canvas, and per-frame values never touch it.** Everything else follows. Config is a reducer. Scene variation is a lookup table. Per-frame animation is refs and `useFrame`. The renderer never re-renders for a camera move.

Adding a car is a file and a map entry. Adding an environment is a config object and a post-stack block. That's the property worth protecting.
