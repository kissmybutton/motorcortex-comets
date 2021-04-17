import Comets from "./Incidents/Comets";
import Stars from "./Incidents/Stars";
import { cometValidationRules } from "./validation";
import { name, version } from "../package.json";

export default {
  npm_name: name,
  version: version, // !! make sure the name of your plugin is identical to the name of your package.json !!
  incidents: [
    {
      exportable: Comets,
      name: "Comets",
      attributesValidationRules: { ...cometValidationRules },
    },
    {
      exportable: Stars,
      name: "Stars",
      // attributesValidationRules: { ...cometValidationRules }
    },
  ],
};
