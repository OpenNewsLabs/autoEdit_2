import gulp from 'gulp';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';
import eslintUtil from '../eslint/util';
import sassPaths from '../sass/paths';
import paths from '../../paths';

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

gulp.task('watch-js-publish', cb => {
    runSequence('systemjs-builder-publish', 'ng-annotate', cb);
});

gulp.task('watch-css-publish', cb => {
    runSequence('sassPublish', 'cssconcatPublish', cb);
});

gulp.task('watch-css-author', cb => {
    runSequence('sassAuthor', 'cssconcatAuthor', cb);
});

gulp.task('watch-css-common', cb => {
    runSequence('sassResetCachedStyles', 'sass', 'cssconcat', cb);
});
