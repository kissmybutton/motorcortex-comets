import MotorCortex from '@kissmybutton/motorcortex';
import MyPluginDefinition from "../dist/motorcortex-comets.umd";
const MyPlugin = MotorCortex.loadPlugin(MyPluginDefinition);

import Player from "@kissmybutton/motorcortex-player";


const clip = new MotorCortex.HTMLClip({
    html: `
    <div class="container">
        <div class="comet1"> </div>
        <div class="comet2"> </div>
    </div>`,
    css: `
        .container{
            width: 800px;
            height: 500px;
        }
        
    `,
    host: document.getElementById('clip'),
    containerParams: {
        width: '800px',
        height: '500px'
    }
});

const comet = new MyPlugin.Comets({
    width: 800,
    height: 500,
    meteoriteColors:["#FFFFFF","#FFDC63"],
    auraIner:["#57DDBA","#62D8B9","#7CC8B3"],
    auraOuter:["#47F7C5","#87B3C1"],
    cometMaxSize: 600,
    cometMinSize: 300,
    items: 30,
    duration: 10000,
    speed: 0.1,
}, {
    selector: '.comet1',
});

// const cometMagenta = new MyPlugin.Comets({
//     width: 800,
//     height: 500,
//     meteoriteColors:["#FFFFFF","#FFDC63"],
//     auraIner:["#AF4095","#D48E93","#CC9C9F"],
//     auraOuter:["#E06D95","#E7B4A7"],
//     cometMaxSize:581,
//     cometMinSize:200, 
//     items: 30,
//     speed: 0.3,
//     duration:30000
// }, {
//     selector: '.comet2',
// });

// const stars = new MyPlugin.Stars({
//     width: 800,
//     height: 500,
//     starMaxSize:60,
//     starMinSize:15, 
//     starColor: "#F0F0F0",
//     starGlowColor:"0 0 0 0 0.950946003   0 0 0 0 0.81265567   0 0 0 0 0.51528336  0 0 0 1 0",
//     items: 15,
//     duration: 30000,
//     blinkType: "opacity",
// }, {
//     selector: '.comet2',
// });

clip.addIncident(comet, 0);
// clip.addIncident(cometMagenta, 0);
// clip.addIncident(stars,0)   

const player = new Player({clip, timeFormat: "ms", });