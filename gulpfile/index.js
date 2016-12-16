'use strict';

const paths = require('./paths');
const path = require('path');
const _defaultTasks = ['default'];
const allEnabledTasks = require('./enabledTasks').all;

// Setup reference to frontBaseDir
// paths.frontendBaseDir = path.join(__dirname, '..');

// Require all default and enabled task FILES
// and thus setup the gulp tasks
_defaultTasks.concat(allEnabledTasks).forEach(function (task) {
    require('./tasks/' + task);
});
// if no task was configured when gulp was executed,
// the default task (tasks/default.js) is called