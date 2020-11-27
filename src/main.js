import Comets from './Incidents/Comets';

import {
cometValidationRules
} from "./validation";

export default {
  npm_name: "@kissmybutton/motorcortex-comets", // !! make sure the name of your plugin is identical to the name of your package.json !!
  incidents: [
    {
      exportable: Comets,
      name: "Comets",
      attributesValidationRules: { ...cometValidationRules }
    },
  ],
};