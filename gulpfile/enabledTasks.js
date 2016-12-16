'use strict';

const _ = require('underscore');
const env = require('./libs/env');

// Grouped by different phases of the build
// and by what can run in parellel
let _beforeCode = [];
let _code = ['sass'];
let _afterCode = [
    ['cssconcat'],
];
let _delayed = [];

// overwrite tasks by environment
if (env.isDevelopment) {
    // set most tasks to _delayed since they should
    // be only executed by watchers
    _beforeCode = [];
    _code = [];
    _afterCode = ['watch'];
    _delayed = ['eslint', 'sass', 'cssconcat'];
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
