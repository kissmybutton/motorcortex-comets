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
            height: 300px;
           
        }
        
    `,
    host: document.getElementById('clip'),
    containerParams: {
        width: '800px',
        height: '300px'
    }
});

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

const cometMagenta = new MyPlugin.Comets({
    width: 800,
    height: 300,
    cometMaxSize:581,
    cometMinSize:200, 
    meteoriteColors:["#FFFFFF","#FFDC63"],
    auraIner:["#AF4095","#D48E93","#CC9C9F"],
    auraOuter:["#E06D95","#E7B4A7"],
    items: 3,
    repeats:5,
    duration:8000
}, {
    selector: '.comet2',
});

const stars = new MyPlugin.Stars({
    width: 800,
    height: 300,
    starMaxSize:60,
    starMinSize:15, 
    starColor: "#F0F0F0",
    starGlowColor:"0 0 0 0 0.950946003   0 0 0 0 0.81265567   0 0 0 0 0.51528336  0 0 0 1 0",
    items: 15,
    repeats:5,
    duration:8000
}, {
    selector: '.comet2',
});


clip.addIncident(comet, 0);
clip.addIncident(cometMagenta, 0);
clip.addIncident(stars,0)   

const player = new Player({clip});