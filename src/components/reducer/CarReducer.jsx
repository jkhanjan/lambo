// carReducer.js
export const initialCarState = {
  modelName: "lambo",
  color: "#ebfc7b",
  metalness: 0.5,
  roughness: 0.8,
  environment: "snow",
  parts: {
    spoiler: false,
    mirrors: "standard",
    wheels: "sport", 
    exhaust: true,
    headlights: true,
    fog_lights: false,
  },
  accessories: {
    stripes: false,
    decals: [],
    tint: 0,
  }
};

export const carReducer = (state, action) => {
  switch (action.type) {
    case "SET_MODEL":
      return {
        ...state,
        modelName: action.modelName,
      };

    case "SET_COLOR":
      return {
        ...state,
        color: action.color,
      };

    case "SET_MATERIAL":
      return {
        ...state,
        metalness: action.metalness ?? state.metalness,
        roughness: action.roughness ?? state.roughness,
      };

    case "SET_ENVIRONMENT":
      return {
        ...state,
        environment: action.environment,
      }

    case "TOGGLE_PART":
      return {
        ...state,
        parts: {
          ...state.parts,
          [action.partName]: !state.parts[action.partName],
        },
      };

    case "UPDATE_PART":
      return {
        ...state,
        parts: {
          ...state.parts,
          [action.partName]: action.value,
        },
      };

    case "UPDATE_ACCESSORY":
      return {
        ...state,
        accessories: {
          ...state.accessories,
          [action.accessoryName]: action.value,
        },
      };

    case "RESET":
      return initialCarState;

    case "LOAD_CONFIG":
      return {
        ...state,
        ...action.config,
      };

    default:
      return state;
  }
};