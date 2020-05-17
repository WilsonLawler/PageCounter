const httpReferer = require('./httpreferer');

module.exports = class {
    // init
    constructor() {
        // store count
        this.counter = {};
    }

    // increase URL counter
    count(req) {
        let hash = httpReferer(req);
        if (!hash) return null;

        // define count default
        this.counter[hash] = this.counter[hash] || 0;

        // return incre
        return ++this.counter[hash];
    }
};