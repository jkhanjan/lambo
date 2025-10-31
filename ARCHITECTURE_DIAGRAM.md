# Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                           │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐ │
│  │ CameraViewButton │  │  ColorPicker     │  │ ModelSelector │ │
│  └────────┬─────────┘  └────────┬─────────┘  └───────┬───────┘ │
│           │                     │                     │          │
└───────────┼─────────────────────┼─────────────────────┼──────────┘
            │                     │                     │
            └─────────────────────┼─────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │   ZUSTAND STORE         │
                    │  (useAppStore.js)       │
                    │                         │
                    │  • activeModelId        │
                    │  • selectedColor        │
                    │  • cameraView           │
                    │  • isTransitioning      │
                    │  • actions...           │
                    └────────────┬────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
        ┌───────────────────┐    ┌──────────────────────┐
        │  MODEL REGISTRY   │    │   CANVAS COMPONENTS  │
        │ (models.config.js)│    │                      │
        │                   │    │  • ModelRenderer     │
        │  • Lambo          │◄───┤  • CameraController  │
        │  • Ferrari        │    │  • Studio            │
        │  • Porsche        │    │  • Floor             │
        │  • BMW            │    │  • Effects           │
        │  • Properties     │    └──────────────────────┘
        └───────────────────┘
```

---

## Data Flow

### 1. User Interaction Flow

```
User clicks button
       │
       ▼
UI Component (e.g., ModelSelector)
       │
       ▼
Calls store action: setActiveModel("lambo")
       │
       ▼
Zustand Store updates state
       │
       ▼
Components subscribed to activeModelId re-render
       │
       ├──► ModelRenderer (switches 3D model)
       ├──► ColorPicker (updates color palette)
       └──► ModelSelector (updates active button)
```

### 2. Color Change Flow

```
User moves slider
       │
       ▼
ColorPicker component
       │
       ├──► Calculates interpolated color
       │
       ▼
Calls: setSelectedColor("#ff0000")
       │
       ▼
Zustand Store updates selectedColor
       │
       ▼
All model components re-render with new color
       │
       └──► Lambo.jsx, Ferrari.jsx, etc. apply color
```

### 3. Camera View Flow

```
User clicks camera button
       │
       ▼
CameraViewButton calls: nextCameraView()
       │
       ▼
Store cycles to next view & sets isTransitioning=true
       │
       ▼
CameraController detects transition
       │
       ├──► Gets camera preset from model config
       │
       ▼
Smoothly lerps camera to new position
       │
       ▼
After 1s, isTransitioning=false
```

---

## Component Hierarchy

```
App.jsx
│
├── CameraViewButton
│   └── useAppStore (cameraView, nextCameraView)
│
├── Overlay
│   ├── ColorPicker
│   │   └── useAppStore (activeModelId, colorSliderValue, setSelectedColor)
│   │       └── getModelById() → availableColors
│   │
│   └── ModelSelector
│       └── useAppStore (activeModelId, setActiveModel)
│           └── MODELS array → render buttons
│
└── Canvas
    ├── ResponsiveCamera
    ├── Studio
    ├── ModelRenderer
    │   └── useAppStore (activeModelId)
    │       └── getModelById() → component
    │           └── Renders: Lambo | Ferrari | Porsche | BMW
    │               └── useAppStore (selectedColor)
    ├── Floor
    ├── Effects
    ├── CameraController
    │   └── useAppStore (activeModelId, cameraView, isTransitioning)
    │       └── getModelById() → cameraPresets
    │
    └── OrbitControls
```

---

## State Management Pattern

### Zustand Store Structure

```javascript
{
  // STATE
  activeModelId: "lambo",
  selectedColor: "#ffffff",
  colorSliderValue: 0,
  cameraView: "default",
  isTransitioning: false,
  modelOpacity: 1,
  isUIVisible: true,
  isLoading: false,

  // ACTIONS (functions that modify state)
  setActiveModel: (id) => { ... },
  setSelectedColor: (color) => { ... },
  setCameraView: (view) => { ... },
  nextCameraView: () => { ... },
  // ... more actions
}
```

### Component Usage Pattern

```javascript
// ✅ CORRECT - Separate selectors
const activeModelId = useAppStore((state) => state.activeModelId);
const setActiveModel = useAppStore((state) => state.setActiveModel);

// ❌ WRONG - Creates new object every render
const { activeModelId, setActiveModel } = useAppStore((state) => ({
  activeModelId: state.activeModelId,
  setActiveModel: state.setActiveModel
}));
```

---

## Model Registry Pattern

### Configuration Structure

```javascript
MODELS = [
  {
    id: "lambo",              // Unique identifier
    name: "Lamborghini",      // Display name
    component: Lambo,         // React component
    properties: {             // Extensible properties
      supportsColorChange: true,
      defaultColor: "#ffffff",
      availableColors: [...],
      cameraPresets: {...},
      // Add custom properties here!
    }
  }
]
```

### Usage in Components

```javascript
// Get model by ID
const model = getModelById(activeModelId);

// Access properties
const colors = model.properties.availableColors;
const preset = model.properties.cameraPresets[cameraView];

// Render component
const ModelComponent = model.component;
return <ModelComponent />;
```

---

## Adding a New Model (Visual)

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Create Component                                     │
│                                                               │
│  src/components/models/NewCar.jsx                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ import useAppStore from "../../stores/useAppStore"  │    │
│  │                                                       │    │
│  │ export default function NewCar(props) {             │    │
│  │   const selectedColor = useAppStore(                │    │
│  │     (state) => state.selectedColor                  │    │
│  │   );                                                 │    │
│  │   // ... 3D model code                              │    │
│  │ }                                                    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Register in Config                                   │
│                                                               │
│  src/config/models.config.js                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ import NewCar from "../components/models/NewCar"    │    │
│  │                                                       │    │
│  │ export const MODELS = [                             │    │
│  │   // ... existing models                            │    │
│  │   {                                                  │    │
│  │     id: "new-car",                                  │    │
│  │     name: "New Car",                                │    │
│  │     component: NewCar,                              │    │
│  │     properties: { ... }                             │    │
│  │   }                                                  │    │
│  │ ]                                                    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Done! ✅                                             │
│                                                               │
│  • Automatically appears in UI                               │
│  • Works with color picker                                   │
│  • Works with camera views                                   │
│  • No other files need changes                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Performance Optimization

### Selective Subscriptions

```
Component subscribes only to needed state
              │
              ▼
    ┌─────────────────────┐
    │  Component A        │
    │  subscribes to:     │
    │  • activeModelId    │
    └─────────────────────┘
              │
              │ Only re-renders when
              │ activeModelId changes
              ▼
    ┌─────────────────────┐
    │  Component B        │
    │  subscribes to:     │
    │  • selectedColor    │
    └─────────────────────┘
              │
              │ Only re-renders when
              │ selectedColor changes
              ▼
    No unnecessary re-renders! ✅
```

---

## File Dependencies

```
App.jsx
  ├── imports: UI components
  ├── imports: Canvas components
  └── imports: useAppStore

UI Components
  ├── imports: useAppStore
  └── imports: models.config (for getModelById)

Canvas Components
  ├── imports: useAppStore
  ├── imports: models.config
  └── imports: Three.js/R3F

Model Components
  ├── imports: useAppStore
  └── imports: Three.js/R3F

models.config.js
  └── imports: Model components

useAppStore.js
  └── imports: models.config
```

---

## Key Principles

1. **Single Source of Truth**: Model config
2. **Unidirectional Data Flow**: User → Store → Components
3. **Separation of Concerns**: UI / Canvas / Models
4. **Composition Over Inheritance**: Small, reusable components
5. **Configuration Over Code**: Data-driven model system

---

**This architecture scales from 4 models to 100+ models without structural changes! 🚀**
