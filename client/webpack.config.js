const path = require('path');

module.exports = {
    // Entry point - the file that will be bundled
    entry: './index.js',

    // Output configuration - where to save the bundled file
    output: {
        filename: 'browser.js',  // The name of the output file
        path: path.resolve(__dirname),  // The directory to save the output file
    },

    // Mode configuration - can be 'development', 'production', or 'none'
    mode: 'development',  // 'production' optimizes the bundle; 'development' makes it easier to debug
};