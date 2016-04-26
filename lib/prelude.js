'use strict';

const head = xs => xs[0];
const last = xs => xs[xs.length - 1];

exports.fromPairs = function fromPairs(xs) {
    return xs.reduce(function(obj, x) {
        if (x.length) {
            obj[head(x)] = last(x);
        }
        return obj;
    }, {});
};

exports.defaultTo = (defaultValue, value) => value || defaultValue;
