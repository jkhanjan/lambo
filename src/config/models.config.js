/**
 * Model Registry Configuration
 * 
 * This is the single source of truth for all car models in the application.
 * Each model can have its own unique properties that can be enabled/disabled.
 * 
 * To add a new model:
 * 1. Import the model component
 * 2. Add a new entry to the MODELS array
 * 3. Define any custom properties for that model
 */

import Lambo from "../components/models/Lambo";
import Ferrari from "../components/models/Ferrari";
import BMW from "../components/models/Bmw";
import Porshe from "../components/models/Porshe";

/**
 * Model configuration structure:
 * @typedef {Object} ModelConfig
 * @property {string} id - Unique identifier for the model
 * @property {string} name - Display name
 * @property {React.Component} component - The 3D model component
 * @property {Object} properties - Extensible properties for the model
 * @property {boolean} properties.supportsColorChange - Can change body color
 * @property {boolean} properties.hasCustomLighting - Has special lighting effects
 * @property {boolean} properties.hasInterior - Has interior view
 * @property {string} properties.defaultColor - Default color hex
 * @property {Array<string>} properties.availableColors - Available color palette
 * @property {Object} properties.cameraPresets - Custom camera positions
 */

export const MODELS = [
  {
    id: "lambo",
    name: "Lamborghini",
    component: Lambo,
    properties: {
      supportsColorChange: true,
      hasCustomLighting: true,
      hasInterior: false,
      defaultColor: "#ffffff",
      availableColors: [
        "#ffffff", // White
        "#f0f0f0", // Light Grey
        "#d3d3d3", // Grey
        "#c0c0c0", // Silver
        "#a9a9a9", // Dark Grey
        "#808080", // Grey
        "#6a6969", // Dark Grey
      ],
      cameraPresets: {
        default: { position: [0, 5, 25], target: [0, 0, 0] },
        sideView: { position: [7, 1, 0], target: [0, 0, 0] },
        topView: { position: [0, 12, 0], target: [0, 0, 0] },
        backView: { position: [0, -2, -16], target: [0, 0, 0] },
      },
    },
  },
  {
    id: "ferrari",
    name: "Ferrari",
    component: Ferrari,
    properties: {
      supportsColorChange: true,
      hasCustomLighting: true,
      hasInterior: false,
      defaultColor: "#ff0000",
      availableColors: [
        "#ff0000", // Red
        "#8B0000", // Dark Red
        "#ffffff", // White
        "#000000", // Black
        "#FFD700", // Gold
        "#C0C0C0", // Silver
        "#1a1a1a", // Dark Grey
      ],
      cameraPresets: {
        default: { position: [0, 5, 25], target: [0, 0, 0] },
        sideView: { position: [7, 1, 0], target: [0, 0, 0] },
        topView: { position: [0, 12, 0], target: [0, 0, 0] },
        backView: { position: [0, -2, -16], target: [0, 0, 0] },
      },
    },
  },
  {
    id: "porsche",
    name: "Porsche",
    component: Porshe,
    properties: {
      supportsColorChange: true,
      hasCustomLighting: false,
      hasInterior: false,
      defaultColor: "#000000",
      availableColors: [
        "#000000", // Black
        "#ffffff", // White
        "#C0C0C0", // Silver
        "#1a1a1a", // Dark Grey
        "#0066cc", // Blue
        "#006400", // Dark Green
        "#8B0000", // Dark Red
      ],
      cameraPresets: {
        default: { position: [0, 5, 25], target: [0, 0, 0] },
        sideView: { position: [7, 1, 0], target: [0, 0, 0] },
        topView: { position: [0, 12, 0], target: [0, 0, 0] },
        backView: { position: [0, -2, -16], target: [0, 0, 0] },
      },
    },
  },
  {
    id: "bmw",
    name: "BMW",
    component: BMW,
    properties: {
      supportsColorChange: true,
      hasCustomLighting: false,
      hasInterior: false,
      defaultColor: "#0066cc",
      availableColors: [
        "#0066cc", // BMW Blue
        "#000000", // Black
        "#ffffff", // White
        "#C0C0C0", // Silver
        "#8B0000", // Dark Red
        "#1a1a1a", // Dark Grey
        "#FFD700", // Gold
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

/**
 * Get model by ID
 * @param {string} id - Model ID
 * @returns {ModelConfig|undefined}
 */
export const getModelById = (id) => {
  return MODELS.find((model) => model.id === id);
};

/**
 * Get all model IDs
 * @returns {Array<string>}
 */
export const getAllModelIds = () => {
  return MODELS.map((model) => model.id);
};

/**
 * Get all models with a specific property enabled
 * @param {string} propertyName - Property to check
 * @returns {Array<ModelConfig>}
 */
export const getModelsWithProperty = (propertyName) => {
  return MODELS.filter((model) => model.properties[propertyName] === true);
};
