# Architecture Documentation

## Overview

This 3D car configurator application has been refactored to follow professional software engineering practices with a scalable, maintainable architecture.

## Key Improvements

### 1. **State Management with Zustand**
- Replaced scattered `useState` and Context API with centralized Zustand store
- No prop drilling - components access state directly
- Better performance with selective subscriptions
- Redux DevTools integration for debugging

### 2. **Model Registry Pattern**
- Single source of truth for all car models (`src/config/models.config.js`)
- Each model has extensible properties
- Easy to add new models without touching component code

### 3. **Proper Folder Structure**
```
src/
├── components/
│   ├── canvas/          # Three.js/R3F components
│   │   ├── CameraController.jsx
│   │   ├── Effects.jsx
│   │   ├── Floor.jsx
│   │   ├── ModelRenderer.jsx
│   │   ├── ResponsiveCamera.jsx
│   │   └── Studio.jsx
│   ├── models/          # 3D model components
│   │   ├── Bmw.jsx
│   │   ├── Ferrari.jsx
│   │   ├── Lambo.jsx
│   │   └── Porshe.jsx
│   └── ui/              # UI overlay components
│       ├── CameraViewButton.jsx
│       ├── ColorPicker.jsx
│       ├── ModelSelector.jsx
│       └── Overlay.jsx
├── config/              # Configuration files
│   └── models.config.js
├── stores/              # Zustand stores
│   └── useAppStore.js
├── hooks/               # Custom React hooks (future)
├── utils/               # Utility functions (future)
├── meshTransition/      # Shader materials
└── App.jsx              # Clean main component
```

## How to Add a New Model

Adding a new car model is now a simple 3-step process:

### Step 1: Create the Model Component

Create a new file in `src/components/models/YourModel.jsx`:

```jsx
import React from "react";
import { useGLTF } from "@react-three/drei";
import useAppStore from "../../stores/useAppStore";
import MeshTransitionMaterial from "../../meshTransition/MeshTransitionMaterial";

export default function YourModel(props) {
  const { nodes, materials } = useGLTF("/your-model/scene.gltf");
  const selectedColor = useAppStore((state) => state.selectedColor);
  
  return (
    <group {...props} dispose={null}>
      {/* Your model structure */}
      <mesh geometry={nodes.Body.geometry}>
        <meshStandardMaterial color={selectedColor} />
      </mesh>
    </group>
  );
}
```

### Step 2: Register the Model

Add your model to `src/config/models.config.js`:

```javascript
import YourModel from "../components/models/YourModel";

export const MODELS = [
  // ... existing models
  {
    id: "your-model",
    name: "Your Model Name",
    component: YourModel,
    properties: {
      supportsColorChange: true,
      hasCustomLighting: false,
      hasInterior: false,
      defaultColor: "#ff0000",
      availableColors: [
        "#ff0000", // Red
        "#0000ff", // Blue
        "#00ff00", // Green
        // Add more colors
      ],
      cameraPresets: {
        default: { position: [0, 5, 25], target: [0, 0, 0] },
        sideView: { position: [7, 1, 0], target: [0, 0, 0] },
        topView: { position: [0, 12, 0], target: [0, 0, 0] },
        backView: { position: [0, -2, -16], target: [0, 0, 0] },
      },
    },
  },
];
```

### Step 3: Done!

That's it! Your model will automatically:
- Appear in the model selector UI
- Support color changes (if enabled)
- Use the configured camera presets
- Work with all existing features

## State Management

### Store Structure (`src/stores/useAppStore.js`)

```javascript
{
  // Model State
  activeModelId: string,
  modelOpacity: number,
  
  // Color State
  selectedColor: string,
  colorSliderValue: number,
  
  // Camera State
  cameraView: string,
  isTransitioning: boolean,
  
  // UI State
  isUIVisible: boolean,
  isLoading: boolean,
  
  // Actions
  setActiveModel: (id) => void,
  setSelectedColor: (color) => void,
  setCameraView: (view) => void,
  nextCameraView: () => void,
  // ... more actions
}
```

### Using the Store in Components

```jsx
// Subscribe to specific state
const activeModelId = useAppStore((state) => state.activeModelId);

// Subscribe to multiple values
const { selectedColor, setSelectedColor } = useAppStore((state) => ({
  selectedColor: state.selectedColor,
  setSelectedColor: state.setSelectedColor,
}));

// Call actions
const setActiveModel = useAppStore((state) => state.setActiveModel);
setActiveModel("lambo");
```

## Model Properties

Each model can have custom properties that enable/disable features:

### Available Properties

- **`supportsColorChange`**: Enable color picker for this model
- **`hasCustomLighting`**: Model has special lighting effects
- **`hasInterior`**: Model has interior view (future feature)
- **`defaultColor`**: Default color when model is selected
- **`availableColors`**: Array of hex colors for the color picker
- **`cameraPresets`**: Custom camera positions for different views

### Adding Custom Properties

You can add any custom property to a model:

```javascript
{
  id: "special-car",
  name: "Special Car",
  component: SpecialCar,
  properties: {
    // Standard properties
    supportsColorChange: true,
    defaultColor: "#ff0000",
    
    // Your custom properties
    hasNeonLights: true,
    maxSpeed: 300,
    engineSound: "/sounds/v8.mp3",
    specialFeatures: ["spoiler", "underglow", "nitro"],
  },
}
```

Then access them in your component:

```jsx
const getActiveModel = useAppStore((state) => state.getActiveModel);
const model = getActiveModel();

if (model.properties.hasNeonLights) {
  // Enable neon lights
}
```

## Component Patterns

### Canvas Components
Located in `src/components/canvas/`, these are Three.js/R3F components:
- Should not contain UI logic
- Use Zustand for state
- Keep them pure and reusable

### UI Components
Located in `src/components/ui/`, these are React DOM components:
- Handle user interactions
- Update Zustand store
- Should be presentational

### Model Components
Located in `src/components/models/`, these are 3D model loaders:
- Load GLTF models
- Apply materials and colors from store
- Should be self-contained

## Best Practices

### 1. Keep Components Small
Each component should have a single responsibility.

### 2. Use Selective Subscriptions
Only subscribe to the state you need:
```jsx
// Good - only re-renders when selectedColor changes
const selectedColor = useAppStore((state) => state.selectedColor);

// Bad - re-renders on any state change
const store = useAppStore();
```

### 3. Document New Properties
When adding custom properties to models, document them in this file.

### 4. Use TypeScript (Future)
Consider migrating to TypeScript for better type safety:
```typescript
interface ModelConfig {
  id: string;
  name: string;
  component: React.ComponentType;
  properties: ModelProperties;
}
```

## Performance Optimizations

1. **Zustand** - Minimal re-renders with selective subscriptions
2. **React.memo** - Can be added to expensive components
3. **Suspense** - Lazy loading of 3D models
4. **Preload** - R3F preloads all assets

## Future Enhancements

### Potential Features to Add:

1. **Interior View**
   - Add `hasInterior` property support
   - Create interior camera presets
   - Toggle between exterior/interior

2. **Material Customization**
   - Wheel colors
   - Window tint
   - Decals/stickers

3. **Animation System**
   - Door opening
   - Engine animation
   - Wheel rotation

4. **Save/Load Configurations**
   - Save user customizations
   - Share configurations via URL
   - Export as image

5. **Mobile Optimization**
   - Touch gestures
   - Simplified UI for mobile
   - Performance modes

## Debugging

### Redux DevTools
The Zustand store is connected to Redux DevTools in development mode:
1. Install Redux DevTools browser extension
2. Open DevTools
3. Navigate to Redux tab
4. See all state changes and actions

### Console Logging
Enable debug mode in store:
```javascript
// In useAppStore.js
devtools(
  (set, get) => ({ /* store */ }),
  {
    name: "app-store",
    enabled: true, // Always enabled for debugging
  }
)
```

## Migration Notes

### What Changed:

1. **Removed**:
   - `ColorContext.jsx` - Replaced with Zustand
   - `Overlay.jsx` (old) - Split into smaller components
   - Local state in `App.jsx` - Moved to store

2. **Moved**:
   - Model components → `src/components/models/`
   - Canvas components → `src/components/canvas/`
   - UI components → `src/components/ui/`

3. **Added**:
   - `src/stores/useAppStore.js` - Global state
   - `src/config/models.config.js` - Model registry
   - Component documentation

## Questions?

For questions or issues with the architecture:
1. Check this documentation
2. Review the code comments
3. Check Zustand documentation: https://github.com/pmndrs/zustand
4. Check R3F documentation: https://docs.pmnd.rs/react-three-fiber

---

**Last Updated**: 2024
**Architecture Version**: 2.0
