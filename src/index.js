'use strict';

var pickRandomItem = (ary, options = {}) => {
    var { count = 1, ...pass } = options;
    if (count > 1) {
        var out = [];
        for (var i = 0; i < count; i += 1) {
            out.push(pickOne(ary, pass));
        }
        return out;
    }
    else {
        return pickOne(ary, pass);
    }
}

var pickOne = (ary, options = {}) => {
    var {
        weights,
        count = 1,
        generateRandom = Math.random,
    } = options;
    
    weights = sanitizeItemWeights(weights, ary.length);
    weights = normalizeValues(weights);

    var intervals = createSigmoidIntervals(weights);
    //console.log({ intervals });

    var x = generateRandom();
    //console.log({ x })
    
    var index = intervals.findIndex(({ lower, upper }) => (
        lower <= x && x < upper
    ));

    var item = ary[index];
    //console.log({ item })
    return item;
}

var sanitizeItemWeights = (weights, requiredLength) => {
    var out = [];
    if (weights) {
        for (var ix = 0; ix < requiredLength; ix += 1) {
            out[ix] = (
                weights[ix] === undefined
                ? 0
                : weights[ix]
            );
        }
    }
    else {
        out = new Array(required).fill(1);
    }

    return out;
}

var normalizeValues = (ary) => {
    var total = ary.reduce(
        (acc, it = 0) => (acc + it),
        0
    );
    var aligned = ary.map(
        (it = 0) => it / total
    );

    return aligned;
}

var createSigmoidIntervals = (ary) => {
    var total = 0;
    var out = [];

    for (var it of ary) {
        var lower = total;
        var upper = total = total + it;
        out.push({ lower, upper });
    }
    
    return out;
}

module.exports = pickRandomItem;
