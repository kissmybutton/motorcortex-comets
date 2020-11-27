# motorcortex-banners

## Demo
[Check it out here](https://kissmybutton.github.io/motorcortex-comets/demo/index.html)

## Installation

```bash
$ npm install --save @kissmybutton/motorcortex-comets
# OR
$ yarn add @kissmybutton/motorcortex-comets
```

## Loading

```javascript
const MotorCortex = require("@kissmybutton/motorcortex/");
const cometsDefinition = require("@kissmybutton/motorcortex-comets");
const Plugin = MotorCortex.loadPlugin(BannersDefinition);
```

# Create incident

## Comets

```javascript
const comet = new MyPlugin.Comets({
    width: 800,
    height: 300,
    cometMaxSize:581,
    cometMinSize:200,
    meteoriteColors:["#FFFFFF","#FFDC63"],
    auraIner:["#57DDBA","#62D8B9","#7CC8B3"],
    auraOuter:["#47F7C5","#87B3C1"],
    items: 3,
    repeats:5,
    duration:8000
}, {
    selector: '.comet1',
});
```

### Comets Attrs

| Name        | Are           | Values  |
| ------------- |:-------------:| -----:|
| width     | width of incident  | num |
| height     | height of incident  | num |
| cometMaxSize   | the maximum size of comets  | num |
| cometMinSize     | the minimum size of comets  | num |
| meteoriteColors     | The list of colors of meteorite  | array of colors |
| auraIner  | The list of colors for the iner aura | array of colors |
| auraOuter  | The list of colors for the iner aura | array of colors |
| items     | how meny commet will fall  | num |
| repeats     | how meny times clip wiil loop  | num |
|duration  | max duration of one comet fall | num |