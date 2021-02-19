import {spatial, timely} from './randomizer.js';

console.log(spatial({
    dimensions: [[0, 10], [0, 10]],
    divisions: [10, 2],
    numberOfElements: 10
}));

console.log(timely({
    duration: 1000,
    numberOfElements: 10
}));