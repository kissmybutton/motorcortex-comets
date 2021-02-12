const MotorCortex = require("@kissmybutton/motorcortex");
const AnimeDefinition = require("@kissmybutton/motorcortex-anime");
const Anime = MotorCortex.loadPlugin(AnimeDefinition);

export default class Comets extends MotorCortex.HTMLClip {
  
  get html() {
    let list =[]
    this.itemData= []
    for(let i = 0; i < this.attrs.items;i++){
      const size = (Math.trunc(Math.random() * (this.attrs.cometMaxSize + 1 - this.attrs.cometMinSize)) +this.attrs.cometMinSize)
      const A = 59*Math.PI/180;
      const B = 31*Math.PI/180;
      const C = 90*Math.PI/180;
      
      const c = size; 
      const width = (c * Math.sin(A))/Math.sin(C);
      const top = (c * Math.sin(B))/Math.sin(C);
      const left= (Math.trunc(Math.random() * (+this.attrs.width + width + 1 - + 0)) + 0)
      this.itemData.push({left, top: -top, width: width, size})
      const comet =` 
      <svg class="comet-svg comet-svg-${i}" style="left: ${left}px; top: -${top}px; width: ${width}px; height: ${top}px;" xmlns="http://www.w3.org/2000/svg" class="comet-green-svg" data-name="Layer 1" viewBox="0 0 450 270.44">
      <defs>
        <linearGradient id="b" x1="-56.99" x2="-56.74" y1="394.68" y2="394.93" gradientTransform="matrix(1363.47 0 0 -819.42 77776.05 323638.12)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="${this.attrs.auraOuter[0]}" stop-opacity=".59"/>
          <stop offset="1" stop-color="${this.attrs.auraOuter[1]}" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="d" x1="-56.97" x2="-56.79" y1="394.95" y2="395.11" gradientTransform="matrix(900.62 0 0 -542.55 51377.26 214502.16)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="${this.attrs.auraIner[0]}"/>
          <stop offset=".31" stop-color="${this.attrs.auraIner[1]}" stop-opacity=".97"/>
          <stop offset="1" stop-color="${this.attrs.auraIner[2]}" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="f" x1="-56.81" x2="-56.49" y1="399.49" y2="399.76" gradientTransform="matrix(116.79 0 0 -75.59 6649.18 30453.64)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="${this.attrs.meteoriteColors[0]}"/>
          <stop offset="1" stop-color="${this.attrs.meteoriteColors[1]}"/>
        </linearGradient>
        <mask id="a" width="450" height="270.44" x="0" y="0" maskUnits="userSpaceOnUse">
          <path fill="#fff" fill-rule="evenodd" d="M11.33 230a21.52 21.52 0 0020.31 38L450 38 429.7 0 11.33 230z"/>
        </mask>
        <mask id="c" width="297.24" height="179.06" x="7.51" y="84.83" maskUnits="userSpaceOnUse">
          <path fill="#fff" fill-rule="evenodd" d="M14.65 238.41a13.55 13.55 0 0012.78 23.89l277.32-153.58L292 84.83 14.65 238.41z"/>
        </mask>
        <mask id="e" width="38.55" height="24.95" x="12.81" y="234.29" maskUnits="userSpaceOnUse">
          <path fill="#fff" fill-rule="evenodd" d="M17.69 241.85a9.24 9.24 0 008.73 16.29c4.5-2.41 24.94-23.85 24.94-23.85s-29.17 5.15-33.67 7.56"/>
        </mask>
      </defs>
      <g mask="url(#a)">
        <path fill="url(#b)" fill-rule="evenodd" d="M11.33 230a21.52 21.52 0 0020.31 38L450 38 429.7 0 11.33 230z"/>
      </g>
      <g mask="url(#c)">
        <path fill="url(#d)" fill-rule="evenodd" d="M14.65 238.41a13.55 13.55 0 0012.78 23.89l277.32-153.58L292 84.83 14.65 238.41z"/>
      </g>
      <g mask="url(#e)">
        <path fill="url(#f)" fill-rule="evenodd" d="M17.69 241.85a9.24 9.24 0 008.73 16.29c4.5-2.41 24.94-23.85 24.94-23.85s-29.17 5.15-33.67 7.56"/>
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
    // Speed and Duration, and Sectioning MAXIMUM CONTROL
    const sectionDensity = 2;
    const sectionNum = Math.ceil(this.attrs.items * (1 / sectionDensity));
    this.sectionParams = {};

    // Angle of drop
    const angle = -29 * Math.PI / 180;

    // Section data generation
    for (let s = 0; s < sectionNum; s++) {
      let sectionComets = [];

      for (let c = 0; c < sectionDensity; c++) {
        let index = (s * sectionDensity) + c;

        if (this.itemData[index]) {
          this.itemData[index].i = index;
          this.itemData[index].durationRate = this.getCometDurFactor(this.itemData[index].size);
          this.itemData[index].positionRate = Math.random();
          sectionComets.push((this.itemData[index]));
        }
      }
      
      this.sectionParams[`section${s}`] = {
        index: s, 
        divComets: sectionComets,
      }
    }

    // Calibration and Incident expansion to trim empty timeSection
    let maxExtension = 0;
    for (let section in this.sectionParams) {
      for (let comet of this.sectionParams[section].divComets) {
        let endpoint = comet.positionRate + this.sectionParams[section].index + comet.durationRate;
        let extension = endpoint - sectionNum; 
        maxExtension = (maxExtension < extension) ? extension : maxExtension;
      }
    }
    
    const bufferDur = maxExtension * this.attrs.duration;
    const sectionFullDur = this.attrs.duration - bufferDur;
    const sectionDur = sectionFullDur / sectionNum;

    console.log("CALIBRATED NUMBERS DURATIONS")
    console.log("Section Num: ", sectionNum)
    console.log("BufferDur: ", bufferDur)
    console.log("SectionDur: ", sectionDur)
    console.log("SectionFullDUr: ", sectionFullDur)
    console.log("Duration: ", this.attrs.duration)
    console.log("Calculated Duration: ", sectionDur * sectionNum + bufferDur)

    // Section Combo generation
    let sectionGroup = new MotorCortex.Group({name: "sectionGroup"});

    for (let section in this.sectionParams) {
      let sectionIncidents = [];
      for (let comet of this.sectionParams[section].divComets) {
        sectionIncidents.push(
          {
            incidentClass: Anime.Anime,
            attrs: {
              animatedAttrs: {
                left:`-${comet.width}px`,
                top: `${Math.tan(angle) * (-1 * (comet.width + comet.left)) + comet.top}px`
              }
            },
            props: {
              selector: `.comet-svg-${comet.i}`,
              duration: Math.trunc(100),
              duration: Math.trunc(comet.durationRate * sectionFullDur),
            },
            position: Math.trunc(comet.positionRate * sectionDur),
          }
        );
        
        console.log(`COMET ${comet.i} | ${section} POSITION RATE: ${comet.positionRate}`);
        console.log(`COMET ${comet.i} | ${section} DURATION RATE: ${comet.durationRate}`);
        console.log(`COMET ${comet.i} | ${section} ACTUAL DURATION: ${comet.durationRate * sectionFullDur}`);
      }
      console.log(sectionIncidents)
      let sectionCombo = new MotorCortex.Combo(
        { incidents: sectionIncidents },
        { selector: ".wrapper" }
      );
      sectionGroup.addIncident(
        sectionCombo, 
        Math.trunc(this.sectionParams[section].index * sectionDur)
      );
    }


    //!!! THIS STATEMENT PRODUCES THE MC ERROR
    // console.log(sectionGroup.resize(this.attrs.duration));
    
    this.addIncident(sectionGroup, 0);

    //!!! THIS STATEMENT PRODUCES THE RUNTIME ERROR
    // console.log(sectionGroup.resize(this.attrs.duration));



    // Duration control for FULL DURATION
    // this.addIncident(
    //   new Anime.Anime(
    //     { animatedAttrs: {} },
    //     {
    //       selector: `.wrapper`,
    //       duration: this.attrs.duration
    //     }
    //   ),
    //   0
    // );
  }

  getCometDurFactor(cometSize) {
    // FUNCTION INPUT: DURATION AND SPEED
    let baseDuration = 1 - this.attrs.speed; 
    // CALCULATE SIZE FACTOR
    let sizeFactor = 0.2 + (1 - (cometSize / this.attrs.cometMaxSize)); 
    // FACTOR SIZE OF COMET IN DURATION
    let sizedDuration = baseDuration * sizeFactor; 

    return sizedDuration;
  }
}


