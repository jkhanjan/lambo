import Ferrari from "../models/Ferrari";
import Lambo from "../models/Lambo";
import Porshe from "../models/Porshe";
import BMW from "../models/Bmw";
import gray from "/imag4.jpg";
import white from "/gray.jpg";
import green from "../../../public/green.avif";
import blue from "../../../public/bluish.jpg";
import yellow from "../../../public/yellow.avif";
import orange from "../../../public/red.avif";


export const MODEL_MAP = {
  lambo: Lambo,
  porsche: Porshe,
  ferrari: Ferrari,
  bmw: BMW,
};
export const MODELS_NAME = ["lambo", "porsche", "ferrari", "bmw"];

export const VIEW_NAMES = {
  default: "Default View",
  sideView: "Side View",
  topView: "Top View",
  backView: "Back View",
};

export const VIEWS = ["default", "sideView", "topView", "backView"];

export const GRADIENT_COLOR = [
  gray,
  green,
  blue,
  yellow,
  white,
  orange
];

export const ENVIRONMENTS = {
  night: {
    name: "Neon Mode",
    file: "",
    background: "#000510",
    fogColor: "#001a33",
    fogDensity: 0.1,
    floorColor: "#101010",
  },
  snow: {
    name: "Snow Scene",
    file: "/snow.hdr",
    background: "#e6e6e6",
    fogColor: "#e6e6e6",
    fogDensity: 0.03,
    floorColor: "#ffffff",
  },
  city: {
    name: "Dawn Scene",
    file: "/forest.hdr",
    background: "#e6e6e6",
    fogColor: "#e6e6e6",
    fogDensity: 0.0,
    floorColor: "#ffffff",
  },
};
