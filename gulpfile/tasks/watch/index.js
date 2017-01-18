'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const eslintUtil = require('../eslint/util');
const sassPaths = require('../sass/paths');
const paths = require('../../paths');

gulp.task('watch', watchTaskCallback => {
    gutil.log(gutil.colors.green('Starting file watchers...'));

    // JS files
    gulp.watch(paths.allJSFiles, ['eslint']);

    // CSS files
    gulp.watch(sassPaths.publishFiles, ['watch-css-publish']);
    gulp.watch(sassPaths.commonFiles, ['watch-css-common']);

    watchTaskCallback();
});

gulp.task('watch-css-publish', cb => {
    runSequence('sassPublish', 'cssconcatPublish', 'clean-css', cb);
});

gulp.task('watch-css-common', cb => {
    runSequence('sassResetCachedStyles', 'sass', 'cssconcat', 'clean-css', cb);
});
