const normalizeMisses = frame => frame.replace(/-/g, "0");
const normalizeSpares = frame => {
    if (frame.indexOf("/") > -1) {
        return frame[0] + (10 - parseInt(frame[0]) + '')
    }
    return frame;
}
const unaryParseInt = str => parseInt(str);
const sum = (x, y) => x + y;

const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)

const calculateFrameScore = (frame) =>
    compose(normalizeMisses, normalizeSpares)(frame).split("").map(unaryParseInt).reduce(sum, 0);

const scoreBowling = (results) => {
    return results
        .map(result => calculateFrameScore(result))
        .reduce(sum, 0)
}

module.exports = scoreBowling
