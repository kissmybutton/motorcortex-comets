const MotorCortex = require("@kissmybutton/motorcortex");
const AnimeDefinition = require("@kissmybutton/motorcortex-anime");
const Anime = MotorCortex.loadPlugin(AnimeDefinition);

export default class Comets extends MotorCortex.HTMLClip {
  get font() {
    return [
      {
        type: `google-font`,
        src: `https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,400;0,500;0,800;1,700;1,800;1,900&display=swap`
      }
    ];
  }

  get html() {

    
    //  width: ${a}px;
    //   height: ${b}px;
    let list =[]
    this.itemData= []
    for(let i = 0; i < this.attrs.items;i++){
      const size = (Math.floor(Math.random() * (+this.attrs.cometMaxSize + 1 - +this.attrs.cometMinSize)) + +this.attrs.cometMinSize)
      const A = 59*Math.PI/180;
      const B = 31*Math.PI/180;
      const C = 90*Math.PI/180;
      
      const c = size; 
      const a = (c * Math.sin(A))/Math.sin(C);
      const b = (c * Math.sin(B))/Math.sin(C);
      const left= (Math.floor(Math.random() * (+this.attrs.width+a + 1 - +0)) + +0)
      this.itemData.push({left,top:-b,width:a,size})
      const comet =` 
        <svg class="comet-svg comet-svg-${i}" style="left: ${left}px; top: -${b}px; width: ${a}px; height: ${b}px;" width="1299px" height="783px" viewBox="0 0 1299 783" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>Comet Green</title>
          <desc>Created with Sketch.</desc>
          <defs>
              <path d="M34.6937425,696.977317 C3.09857171,713.918422 -8.89072024,753.630085 8.02974729,785.263791 C24.9502148,816.885601 64.6135017,828.901413 96.2086725,811.960308 L1363.81785,115.209777 L1302.30292,0.226785891 L34.6937425,696.977317 Z" id="comet-svg-path-1"></path>
              <linearGradient x1="14.4225092%" y1="83.2477137%" x2="92.7219121%" y2="10.390881%" id="comet-svg-linearGradient-3">
                  <stop stop-color="${this.attrs.auraOuter[0]}" stop-opacity="0.592362998" offset="0%"></stop>
                  <stop stop-color="${this.attrs.auraOuter[1]}" stop-opacity="0" offset="100%"></stop>
              </linearGradient>
              <path d="M21.7328197,465.583389 C1.85361792,476.251773 -5.70356816,501.251711 4.94303361,521.161272 C15.5896354,541.070832 40.5782554,548.635038 60.4693395,537.966653 L900.730996,72.6371712 L862.006359,0.253906563 L21.7328197,465.583389 Z" id="comet-svg-path-4"></path>
              <linearGradient x1="21.542652%" y1="76.0806342%" x2="75.202337%" y2="27.5208464%" id="comet-svg-linearGradient-6">
                  <stop stop-color="${this.attrs.auraIner[0]}" offset="0%"></stop>
                  <stop stop-color="${this.attrs.auraIner[1]}" stop-opacity="0.969861438" offset="30.642612%"></stop>
                  <stop stop-color="${this.attrs.auraIner[2]}" stop-opacity="0" offset="100%"></stop>
              </linearGradient>
              <path d="M14.9632653,23.0042914 C1.34112245,30.3140443 -3.8044898,47.2745821 3.49010204,60.9266206 C10.7966327,74.5547711 27.7735714,79.7026526 41.4076531,72.3809557 C55.0297959,65.0831468 116.968163,0.119509448 116.968163,0.119509448 C116.968163,0.119509448 28.5854082,15.7064826 14.9632653,23.0042914" id="comet-svg-path-7"></path>
              <linearGradient x1="2.84763913%" y1="80.4317761%" x2="100.004664%" y2="0.00394213434%" id="comet-svg-linearGradient-9">
                  <stop stop-color="${this.attrs.meteoriteColors[0]}" offset="0%"></stop>
                  <stop stop-color="${this.attrs.meteoriteColors[1]}" offset="100%"></stop>
              </linearGradient>
          </defs>
          <g id="comet-svg-Elements" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="comet-svg-Black-Hole" transform="translate(-1113.000000, -1940.000000)">
                  <g id="comet-svg-Comet-Green" transform="translate(1113.000000, 1903.000000)">
                      <g id="comet-svg-Group-3">
                          <mask id="comet-svg-mask-2" fill="white">
                              <use xlink:href="#comet-svg-path-1"></use>
                          </mask>
                          <g id="comet-svg-Clip-2"></g>
                          <path d="M34.6937425,696.977317 C3.09857171,713.918422 -8.89072024,753.630085 8.02974729,785.263791 C24.9502148,816.885601 64.6135017,828.901413 96.2086725,811.960308 L1363.81785,115.209777 L1302.30292,0.226785891 L34.6937425,696.977317 Z" id="comet-svg-Fill-1" fill="url(#comet-svg-linearGradient-3)" mask="url(#comet-svg-mask-2)"></path>
                      </g>
                      <g id="comet-svg-Group-6" transform="translate(23.000000, 257.000000)">
                          <mask id="comet-svg-mask-5" fill="white">
                              <use xlink:href="#comet-svg-path-4"></use>
                          </mask>
                          <g id="comet-svg-Clip-5"></g>
                          <path d="M21.7328197,465.583389 C1.85361792,476.251773 -5.70356816,501.251711 4.94303361,521.161272 C15.5896354,541.070832 40.5782554,548.635038 60.4693395,537.966653 L900.730996,72.6371712 L862.006359,0.253906563 L21.7328197,465.583389 Z" id="comet-svg-Fill-4" fill="url(#comet-svg-linearGradient-6)" mask="url(#comet-svg-mask-5)"></path>
                      </g>
                      <g id="comet-svg-Group-9" transform="translate(39.000000, 710.000000)">
                          <mask id="comet-svg-mask-8" fill="white">
                              <use xlink:href="#comet-svg-path-7"></use>
                          </mask>
                          <g id="comet-svg-Clip-8"></g>
                          <path d="M14.9632653,23.0042914 C1.34112245,30.3140443 -3.8044898,47.2745821 3.49010204,60.9266206 C10.7966327,74.5547711 27.7735714,79.7026526 41.4076531,72.3809557 C55.0297959,65.0831468 116.968163,0.119509448 116.968163,0.119509448 C116.968163,0.119509448 28.5854082,15.7064826 14.9632653,23.0042914" id="comet-svg-Fill-7" fill="url(#comet-svg-linearGradient-9)" mask="url(#comet-svg-mask-8)"></path>
                      </g>
                  </g>
              </g>
          </g>
      </svg>`

      list+=comet
  }
  

    return `
    <div class="wrapper">
      ${list}
    </div>
    

    `;
  }

  get css() {
    return `
    .wrapper{
      width: ${this.attrs.width}px;
      height:${this.attrs.height}px;
    }
    .comet-svg{
      position: absolute;
      z-index: 3;
    }

  `;
  }

  buildTree() {
    

    for(let i = 0; i < this.attrs.items;i++){
      // console.log(Math.tan(angle)*(-this.itemData[i].width -this.itemData[i].left)+ this.itemData[i].top)
      const angle = -29*Math.PI/180;
      const moveMagentComet = new Anime.Anime(
        {
          animatedAttrs: {
            left:`-${this.itemData[i].width}px`,
            top: `${Math.tan(angle)*(-this.itemData[i].width -this.itemData[i].left)+ this.itemData[i].top}px`
          },
        },
        {
          selector: `.comet-svg-${i}`,
          duration: Math.floor(this.attrs.duration*(1-(this.itemData[i].size)/this.attrs.cometMaxSize)),
          repeats:this.attrs.repeats 
        }
      );
      this.addIncident(moveMagentComet,0);
    }
  }
}


