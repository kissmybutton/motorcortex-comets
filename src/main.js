import Comets from './Incidents/Comets';
import Stars from "./Incidents/Stars"

import {
cometValidationRules
} from "./validation";

const pkg = require("../package.json");

export default {
  npm_name: pkg.name,
  version: pkg.version, // !! make sure the name of your plugin is identical to the name of your package.json !!
  incidents: [
    {
      exportable: Comets,
      name: "Comets",
      attributesValidationRules: { ...cometValidationRules }
    },{
      exportable: Stars,
      name: "Stars",
      // attributesValidationRules: { ...cometValidationRules }
    },
  ],
};







