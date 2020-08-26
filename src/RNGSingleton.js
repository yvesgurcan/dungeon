const RNG = require('./RNG');

let instance = null;

// A simnple wrapper around the RNG class to have a unified random number generator across the app.

class RNGSingleton extends RNG {
    constructor(seed) {
        super();
        if (!instance) {
            this.init(seed);
            instance = this;
            return this;
        } else {
            return instance;
        }
    }
}

module.exports = RNGSingleton;
