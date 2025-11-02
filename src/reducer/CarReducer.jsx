import BMW from "../models/Bmw";
import Ferrari from "../models/Ferrari";
import Lambo from "../models/Lambo";
import Porshe from "../models/Porshe";

export const carReducer = (state, action) => {
  switch (action.type) {
    case "SET_MODEL": {
      switch (action.model) {
        case "Model1":
          return {
            name: "Model1",
            model: <Lambo />,
          };
        case "Model2":
          return {
            name: "Model2",
            model: <Porshe />,
          };
        case "Model3":
          return {
            name: "Model3",
            model: <Ferrari />,
          };
        case "Model4":
          return {
            name: "Model4",
            model: <BMW />,
          };
        default:
          return state;
      }
    }
    default:
      return state;
  }
};

export const initialCarState = {
  model: <Lambo />,
  name: "Model1",
};
