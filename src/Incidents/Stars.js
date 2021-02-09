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
      <svg class="stars-svg stars-svg-${i}" width="${size}px" height="${size}px" style="left: ${left}px; top:${top}px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50.15">
<defs>
  <radialGradient id="radial-gradient" cx="25.98" cy="26.84" r="22.27" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#fff9a6" stop-opacity="0.9"/>
    <stop offset="0.07" stop-color="#fffab3" stop-opacity="0.77"/>
    <stop offset="0.2" stop-color="#fffbc7" stop-opacity="0.57"/>
    <stop offset="0.34" stop-color="#fffcd8" stop-opacity="0.4"/>
    <stop offset="0.47" stop-color="#fffde6" stop-opacity="0.25"/>
    <stop offset="0.6" stop-color="#fffef1" stop-opacity="0.14"/>
    <stop offset="0.74" stop-color="#fffff9" stop-opacity="0.06"/>
    <stop offset="0.87" stop-color="#fffffd" stop-opacity="0.02"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
</defs>
<title>Asset 10</title>
<g id="Layer_2" data-name="Layer 2">
  <g id="Layer_2-2" data-name="Layer 2">
    <g>
      <circle cx="25.98" cy="26.84" r="22.27" fill="url(#radial-gradient)"/>
      <path id="stars-svg-path-1" d="M.15,26.27q13.13-2,18.73-4.52Q24.31,19.32,26,.16h0A.18.18,0,0,1,26.14,0a.19.19,0,0,1,.17.17q.6,17.88,6.81,21.58t16.72,4.62h0a.18.18,0,0,1,.16.2.19.19,0,0,1-.16.16Q38.1,27.86,33.12,32.05T26.49,50h0a.18.18,0,0,1-.36,0Q25.31,36.65,18.88,32T.17,26.62h0A.17.17,0,0,1,0,26.43.18.18,0,0,1,.15,26.27Z" fill="${this.attrs.starColor}" fill-rule="evenodd"/>
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


