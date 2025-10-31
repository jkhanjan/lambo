# Quick Guide: How to Add a New Car Model

## 3 Simple Steps

### Step 1: Create Model Component

Create `src/components/models/YourCar.jsx`:

```jsx
import React from "react";
import { useGLTF } from "@react-three/drei";
import useAppStore from "../../stores/useAppStore";
import MeshTransitionMaterial from "../../meshTransition/MeshTransitionMaterial";

export default function YourCar(props) {
  const { nodes, materials } = useGLTF("/your-car/scene.gltf");
  const selectedColor = useAppStore((state) => state.selectedColor);
  
  return (
    <group {...props} dispose={null}>
      {/* Add your 3D model structure here */}
      <mesh geometry={nodes.CarBody.geometry}>
        <meshStandardMaterial color={selectedColor} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
```

### Step 2: Register in Config

Edit `src/config/models.config.js`:

```javascript
// 1. Import your component at the top
import YourCar from "../components/models/YourCar";

// 2. Add to MODELS array
export const MODELS = [
  // ... existing models ...
  {
    id: "your-car",           // Unique ID
    name: "Your Car",         // Display name
    component: YourCar,       // Component reference
    properties: {
      supportsColorChange: true,
      hasCustomLighting: false,
      hasInterior: false,
      defaultColor: "#ff0000",
      availableColors: [
        "#ff0000",  // Red
        "#0000ff",  // Blue
        "#ffffff",  // White
        "#000000",  // Black
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

### Step 3: Done! 🎉

Your model will automatically:
- ✅ Appear in the UI selector
- ✅ Support color changes
- ✅ Work with camera views
- ✅ Integrate with all features

## Property Options

### Required Properties
- `id` - Unique identifier (lowercase, no spaces)
- `name` - Display name shown in UI
- `component` - React component reference
- `properties` - Configuration object

### Standard Properties
- `supportsColorChange` - Enable/disable color picker
- `hasCustomLighting` - Has special lighting effects
- `hasInterior` - Has interior view (future)
- `defaultColor` - Hex color when model loads
- `availableColors` - Array of hex colors for picker
- `cameraPresets` - Camera positions for each view

### Custom Properties (Optional)

Add any custom properties you need:

```javascript
properties: {
  // Standard
  supportsColorChange: true,
  defaultColor: "#ff0000",
  
  // Custom
  hasNeonLights: true,
  hasSpoiler: true,
  wheelType: "sport",
  engineSound: "/sounds/v8.mp3",
  topSpeed: 320,
  features: ["turbo", "nitro", "underglow"],
}
```

Access them in your component:

```jsx
const getActiveModel = useAppStore((state) => state.getActiveModel);
const model = getActiveModel();

if (model.properties.hasNeonLights) {
  // Add neon lights
}
```

## Tips

### 1. Model File Location
Place your GLTF model in `/public/your-car/scene.gltf`

### 2. Color Application
Apply the `selectedColor` to the main body mesh:

```jsx
<mesh geometry={nodes.Body.geometry}>
  <meshStandardMaterial 
    color={selectedColor} 
    metalness={0.8} 
    roughness={0.2} 
  />
</mesh>
```

### 3. Camera Presets
Adjust camera positions to fit your model:
- `position` - Camera XYZ coordinates
- `target` - Where camera looks (usually [0, 0, 0])

Test different positions to find the best angles.

### 4. Multiple Colors
For models with multiple color zones:

```jsx
const selectedColor = useAppStore((state) => state.selectedColor);
const secondaryColor = useAppStore((state) => state.secondaryColor); // Add to store

<mesh geometry={nodes.Body.geometry}>
  <meshStandardMaterial color={selectedColor} />
</mesh>
<mesh geometry={nodes.Trim.geometry}>
  <meshStandardMaterial color={secondaryColor} />
</mesh>
```

## Common Issues

### Model Not Showing
- Check GLTF path is correct
- Verify model is in `/public` folder
- Check browser console for errors

### Wrong Size/Position
Adjust scale and position in your component:

```jsx
<group {...props} scale={2.0} position={[0, -1, 0]}>
  {/* model */}
</group>
```

### Color Not Applying
Make sure you're using `selectedColor` from store:

```jsx
const selectedColor = useAppStore((state) => state.selectedColor);
```

And applying it to the material:

```jsx
<meshStandardMaterial color={selectedColor} />
```

## Example: Complete Model

```jsx
import React from "react";
import { useGLTF } from "@react-three/drei";
import useAppStore from "../../stores/useAppStore";
import MeshTransitionMaterial from "../../meshTransition/MeshTransitionMaterial";

export default function SportsCar(props) {
  const { nodes, materials } = useGLTF("/sports-car/scene.gltf");
  const selectedColor = useAppStore((state) => state.selectedColor);
  
  return (
    <group {...props} dispose={null} scale={1.5} position={[0, -0.5, 0]}>
      {/* Car Body - applies selected color */}
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.Body.geometry}
      >
        <meshStandardMaterial 
          color={selectedColor}
          metalness={0.9}
          roughness={0.1}
        />
        <MeshTransitionMaterial intensity={0.1} radius={1.5} />
      </mesh>
      
      {/* Windows - always transparent */}
      <mesh geometry={nodes.Windows.geometry}>
        <meshPhysicalMaterial 
          color="#000000"
          transparent
          opacity={0.3}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      
      {/* Wheels - always black */}
      <mesh geometry={nodes.Wheels.geometry} material={materials.Rubber} />
      
      {/* Headlights */}
      <mesh geometry={nodes.Headlights.geometry}>
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}
```

## Need Help?

Check `ARCHITECTURE.md` for detailed documentation.
