const MotorCortex = require("@kissmybutton/motorcortex");
const AnimeDefinition = require("@kissmybutton/motorcortex-anime");
const Anime = MotorCortex.loadPlugin(AnimeDefinition);

export default class Stars extends MotorCortex.HTMLClip {
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
      const size = (Math.floor(Math.random() * (+this.attrs.starMaxSize + 1 - +this.attrs.starMinSize)) + +this.attrs.starMinSize)
      const top = Math.floor(Math.random() * (this.attrs.height-size))
     const left = Math.floor(Math.random() * (this.attrs.width-size))
      this.itemData.push({left,top,size})
      console.log({left,top,size})
      const comet =` 
      <svg class="stars-svg stars-svg-${i}" width="${size}px" height="${size}px" style="left: ${left}px; top:${top}px;" viewBox="0 0 688 686" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>Stars</title>
      <desc>Created with Sketch.</desc>
      <defs>
          <path d="M3224.65766,519.984464 C3304.46737,578.560629 3365.76874,616.01721 3408.56175,632.354208 C3450.04134,648.189779 3525.59175,609.92697 3635.21297,517.565778 L3635.21296,517.565762 C3636.05768,516.854043 3637.31943,516.961863 3638.03115,517.806585 C3638.68359,518.580949 3638.65435,519.720753 3637.96308,520.460656 C3546.86776,617.963954 3507.94937,692.818889 3521.20791,745.02546 C3534.47252,797.255965 3566.34651,853.518628 3616.82986,913.813449 L3616.82984,913.813464 C3617.53893,914.660364 3617.42721,915.921742 3616.58031,916.63083 C3615.84168,917.249269 3614.76713,917.253264 3614.02392,916.640336 C3546.16455,860.676516 3488.08066,830.622825 3439.77225,826.479261 C3391.04101,822.299431 3326.22148,852.13216 3245.31367,915.977449 L3245.31368,915.977464 C3244.44656,916.661717 3243.18893,916.513475 3242.50467,915.646357 C3241.90553,914.887087 3241.93555,913.807867 3242.57598,913.083083 C3308.57713,838.389236 3336.7605,771.964212 3327.1261,713.808009 C3317.34518,654.767408 3282.29516,591.138609 3221.97602,522.92161 L3221.97603,522.921602 C3221.24435,522.094128 3221.32202,520.83019 3222.14949,520.098517 C3222.85456,519.475072 3223.89892,519.427583 3224.65766,519.984464 Z" id="stars-svg-path-1"></path>
          <filter x="-31.4%" y="-31.9%" width="162.5%" height="165.1%" filterUnits="objectBoundingBox" id="stars-svg-filter-2">
              <feMorphology radius="0.5" operator="erode" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
              <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
              <feGaussianBlur stdDeviation="45" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
              <feColorMatrix values="${this.attrs.starGlowColor}" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
          </filter>
      </defs>
      <g id="stars-svg-Elements" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="stars-svg-Black-Hole" transform="translate(-3081.000000, -370.000000)">
              <g id="stars-svg-Stars" transform="translate(3430.796957, 716.499508) rotate(-45.000000) translate(-3430.796957, -716.499508) ">
                  <use fill="black" fill-opacity="1" filter="url(#stars-svg-filter-2)" xlink:href="#stars-svg-path-1"></use>
                  <use fill="${this.attrs.starColor}" fill-rule="evenodd" xlink:href="#stars-svg-path-1"></use>
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
    .stars-svg{
      position: absolute;
      z-index: 3;

    }

  `;
  }

  buildTree() {
    
    for(let i = 0; i < this.attrs.items;i++){
      const ran = Math.floor(Math.random() * (1000))
      const duration = (this.attrs.duration/2)*((Math.floor(Math.random() * (100 + 1 - +10)) + +10)/100)
      const starScale =  new MotorCortex.Combo(
        {
          incidents:[
            {
              incidentClass: Anime.Anime,
              attrs:{
                animatedAttrs: {
                  transform:{
                    scale:0
                  },
                }    
              },
              props:{
                duration:duration,
              },
              position: 0
            },
            {
              incidentClass: Anime.Anime,
              attrs:{
                animatedAttrs: {
                  transform:{
                    scale:1
                  },
                }
              },
              props:{
                duration:duration,
                
              },
              position:duration+ran
            }
          ]
        },
        {
          selector: `.stars-svg-${i}`,
          repeats:this.attrs.repeats
        }
      )
      this.addIncident(starScale,ran)
    }

  }
}


