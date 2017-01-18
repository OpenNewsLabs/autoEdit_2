'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var taskHelper = require('../libs/taskHelper');
var enabledTasks = require('../enabledTasks');

gulp.task('default', cb => {
    const taskSets = [
        enabledTasks.beforeCode,
        enabledTasks.code,
        enabledTasks.afterCode,
    ];
    const sequence = taskHelper.combineTasksSetsToGulpTaskSequence(taskSets);

    if (sequence.length) {
        sequence.push(cb);
        runSequence(...sequence);
    } else {
        cb();
    }
});
