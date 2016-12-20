'use strict';

const env = require('../../libs/env');

module.exports = {
    configFile: 'system.config.js',

    buildOptions: {
        minify: false,
        mangle: false,
        sourceMaps: env.isDevelopment,
    },
};
