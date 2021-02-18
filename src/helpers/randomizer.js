function _shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
function _addDimension(params, points) {
    if(points !== null){
        points = _shuffle(points);
    } else{
        points = [];
        for(let i=0; i<params.numberOfElements; i++){
            points.push([]);
        }
    }
    
    const lastRowElements = params.numberOfElements % params.divisions;
    const fullRows = (params.numberOfElements - lastRowElements) / params.divisions;
    const step = (params.to - params.from) / params.divisions;

    const divisionsByElement = [];
    for (let row = 0; row < fullRows; row++) {
        for (let i = 0; i < params.divisions; i++) { // for each division
            const limits = {
                from: params.from + step * i,
                to: params.from + step * (i + 1)
            }
            divisionsByElement.push(limits);
        }
    }

    if (lastRowElements !== 0) {
        const lastRowStep = params.to - params.from / lastRowElements;
        for (let i = 0; i < lastRowElements; i++) {
            const limits = {
                from: params.from + lastRowStep * i,
                to: params.from + lastRowStep * (i + 1)
            }
            divisionsByElement.push(limits);
        }
    }

    for (let i = 0; i < divisionsByElement.length; i++) {
        points[i].push(Math.random() * (divisionsByElement[i].to - divisionsByElement[i].from) + divisionsByElement[i].from);
    }

    return points;
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
    let points = null;
    for (let i = 0; i < params.dimensions.length; i++) {
        const limits = params.dimensions[i];
        const divisions = params.divisions[i] || 4;
        points = _addDimension(
            {
                from: limits[0],
                to: limits[1],
                numberOfElements: params.numberOfElements,
                divisions: divisions
            }, 
            points
        );
    }
    return points;
}

export function timely(params) {

}