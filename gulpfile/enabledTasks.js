'use strict';

const _ = require('underscore');
const env = require('./libs/env');

// NODE_ENV needs to be specified in the shell otherwise just edit the value in libs/env.js

// Grouped by different phases of the build
// and by what can run in parallel
let _beforeCode = [];
let _code = ['sass', 'eslint'];
let _afterCode = [
    ['cssconcat', 'clean-css'],
];
let _delayed = [];

// overwrite tasks by environment
if (env.isDevelopment) {
    // set most tasks to _delayed since they should
    // be only executed by watchers
    _beforeCode = [];
    _code = [];
    _afterCode = ['watch'];
    _delayed = ['eslint', 'sass', 'cssconcat', 'clean-css'];
} else if (env.isPrecommit) {
    _beforeCode = [];
    _code = [];
    _afterCode = [];
    _delayed = [];
}

module.exports = {
    all: _.flatten([_beforeCode, _code, _afterCode, _delayed]),
    beforeCode: _beforeCode,
    code: _code,
    afterCode: _afterCode,
    delayed: _delayed
};
