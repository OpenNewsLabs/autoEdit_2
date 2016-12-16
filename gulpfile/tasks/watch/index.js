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

    gulp.watch(paths.jsPublishFiles, ['watch-js-publish']);

    // CSS files
    gulp.watch(sassPaths.publishFiles, ['watch-css-publish']);
    gulp.watch(sassPaths.authorFiles, ['watch-css-author']);
    gulp.watch(sassPaths.commonFiles, ['watch-css-common']);

    watchTaskCallback();
});

// gulp.task('watch-js-publish', cb => {
//     runSequence('systemjs-builder-publish', 'ng-annotate', cb);
// });

// gulp.task('watch-css-publish', cb => {
//     runSequence('sassPublish', 'cssconcatPublish', cb);
// });

// gulp.task('watch-css-author', cb => {
//     runSequence('sassAuthor', 'cssconcatAuthor', cb);
// });

// gulp.task('watch-css-common', cb => {
//     runSequence('sassResetCachedStyles', 'sass', 'cssconcat', cb);
// });
