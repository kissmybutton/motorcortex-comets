import { HTMLClip, loadPlugin, Combo } from "@kissmybutton/motorcortex";
import AnimeDefinition from "@kissmybutton/motorcortex-anime";
const Anime = loadPlugin(AnimeDefinition);
import { spatial, timely } from "../helpers/randomizer";

export default class Stars extends HTMLClip {
  get html() {
    const attrs = spatial({
      dimensions: [
        [0, this.attrs.width],
        [0, this.attrs.height],
        [this.attrs.starMinSize, this.attrs.starMaxSize],
      ],
      divisions: [
        Math.floor(this.attrs.items / 2),
        Math.floor(this.attrs.items / 2),
        this.attrs.items,
      ],
      numberOfElements: this.attrs.items,
    });

    let list = [];
    for (let i = 0; i < this.attrs.items; i++) {
      const size = attrs[i][2];
      const top = attrs[i][1];
      const left = attrs[i][0];
      const comet = ` 
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
              </svg>`;
      list += comet;
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
    function _getAnimatedAttr(value, opacity = false) {
      if (opacity === true) {
        return {
          opacity: value,
        };
      } else {
        return {
          transform: {
            scale: value,
          },
        };
      }
    }

    const timeData = timely({
      duration: this.attrs.duration / this.attrs.repeats,
      divisions: 3,
      numberOfElements: this.attrs.items,
      minDuration: 0.2,
      maxDuration: 1,
    });

    for (let i = 0; i < this.attrs.items; i++) {
      const starScale = new Combo(
        {
          incidents: [
            {
              incidentClass: Anime.Anime,
              attrs: {
                animatedAttrs: _getAnimatedAttr(
                  0,
                  this.attrs.blinkType === "opacity"
                ),
              },
              props: {
                duration: Math.round(timeData[i][1] / 2),
              },
              position: 0,
            },
            {
              incidentClass: Anime.Anime,
              attrs: {
                animatedAttrs: _getAnimatedAttr(
                  1,
                  this.attrs.blinkType === "opacity"
                ),
              },
              props: {
                duration: Math.round(timeData[i][1] / 2),
              },
              position: Math.round(timeData[i][1] / 2),
            },
          ],
        },
        {
          selector: `.stars-svg-${i}`,
          delay: timeData[i][0],
          repeats: this.attrs.repeats,
        }
      );
      this.addIncident(starScale, 0);
    }
  }
}
