import "./styles/index.scss";

import * as dat from "dat.gui";

// Test import of a JavaScript function, an SVG, and Sass
import Application from "./js/index";

const gui = new dat.GUI();
new Application();
