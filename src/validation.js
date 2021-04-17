exports.cometValidationRules = {
  width: { optional: false, type: "number" },
  height: { optional: false, type: "number" },
  cometMaxSize: { optional: false, type: "number" },
  cometMinSize: { optional: false, type: "number" },
  meteoriteColors: {
    optional: true,
    type: "array",
    min: 2,
    items: {
      optional: true,
      type: "color",
    },
  },
  auraIner: {
    optional: true,
    type: "array",
    min: 3,
    items: {
      optional: true,
      type: "color",
    },
  },
  auraOuter: {
    optional: true,
    type: "array",
    min: 2,
    items: {
      optional: true,
      type: "color",
    },
  },
  items: { optional: false, type: "number" },
  repeats: { optional: false, type: "number" },
  duration: { optional: false, type: "number" },
};
