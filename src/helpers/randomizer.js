const defaultDivisions = 4;
const maxDurationDefault = 0.6;
const minDurationDefault = 0.2;

function _shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
params: {
    from,
    to,
    numberOfElements,
    divisions
}
*/
export function _addDimension(params, points) {
  if (points === null) {
    points = [];
    for (let i = 0; i < params.numberOfElements; i++) {
      points.push([]);
    }
  }
  const divisions = params.divisions || defaultDivisions;
  const lastRowElements = params.numberOfElements % divisions;
  const fullRows = (params.numberOfElements - lastRowElements) / divisions;
  const step = (params.to - params.from) / divisions;

  const divisionsByElement = [];
  for (let row = 0; row < fullRows; row++) {
    for (let i = 0; i < divisions; i++) {
      // for each division
      const limits = {
        from: params.from + step * i,
        to: params.from + step * (i + 1),
      };
      divisionsByElement.push(limits);
    }
  }

  if (lastRowElements !== 0) {
    const lastRowStep = (params.to - params.from) / lastRowElements;
    for (let i = 0; i < lastRowElements; i++) {
      const limits = {
        from: params.from + lastRowStep * i,
        to: params.from + lastRowStep * (i + 1),
      };
      divisionsByElement.push(limits);
    }
  }

  for (let i = 0; i < divisionsByElement.length; i++) {
    points[i].push(
      Math.random() * (divisionsByElement[i].to - divisionsByElement[i].from) +
        divisionsByElement[i].from
    );
  }

  return _shuffle(points);
}

/*
params: {
    dimensions: [[from, to], [from, to], ...],
    
    //the divisions per dimension. Each dimension is going to produce random 
    positions but all of these positions are going to equally be splitted into 
    a specific number of divisions. //
    
    divisions: [<integer>, <integer>, ...], 
    nunmberOfElements: <integer>  
}
*/
export function spatial(params) {
  if (!params.divisions) {
    params.divisions = [];
  }
  let points = null;
  for (let i = 0; i < params.dimensions.length; i++) {
    const limits = params.dimensions[i];
    const divisions = params.divisions[i] || defaultDivisions;
    points = _addDimension(
      {
        from: limits[0],
        to: limits[1],
        numberOfElements: params.numberOfElements,
        divisions: divisions,
      },
      points
    );
  }
  return points;
}

/*
params: {
    duration: <integer>,
    divisions: <integer>, 
    numberOfElements: <integer>,
    maxDuration: <float from 0 to 1>, // default: 0.5
    minDuration: <float from 0 to 1> // default: 0.1
}
return array,
0: duration
1: position
*/
export function timely(params) {
  // first we spread the starting point of our elements
  let startAndDuration = _addDimension(
    {
      numberOfElements: params.numberOfElements,
      from: (params.minDuration || minDurationDefault) * params.duration,
      to: (params.maxDuration || maxDurationDefault) * params.duration,
      divisions: params.divisions || defaultDivisions,
    },
    null
  );

  startAndDuration = _addDimension(
    {
      numberOfElements: params.numberOfElements,
      from: 0.3,
      to: 1,
      divisions: params.divisions || defaultDivisions,
    },
    startAndDuration
  );

  // now we are going to calculate the exact duration of each element
  // and replace the fraction that we have produced on the previous step

  // a variable to be used for making sure we make the last element's duration equal the number needed
  // so the full sequence has the desired duration
  let closestToEnd = {
    ms: 0,
    reference: null,
  };

  for (let i = 0; i < startAndDuration.length; i++) {
    const element = startAndDuration[i];
    element[0] = Math.round(element[0]);
    if (closestToEnd.ms < element[0]) {
      closestToEnd = {
        ms: element[0],
        reference: element,
      };
    }
    element[1] = Math.floor(
      params.duration - element[0] <
        params.duration * (params.maxDuration || maxDurationDefault)
        ? (params.duration - element[0]) * element[1]
        : (params.maxDuration || maxDurationDefault) *
            params.duration *
            element[1]
    );
  }
  closestToEnd.reference[1] = params.duration - closestToEnd.reference[0];

  return startAndDuration;
}
