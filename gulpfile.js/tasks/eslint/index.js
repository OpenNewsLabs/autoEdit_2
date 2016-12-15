import eslint from 'gulp-eslint';
import gulp from 'gulp';
import {handle as handleErrors} from '../../libs/error';
import paths from '../../paths';
const srcFiles = paths.allJSFiles;

gulp.task('eslint', cb => {
    if (!srcFiles.length) {
        cb();
    } else {
        return gulp.src(srcFiles)
       // .eslintrc files are automatically detected.
       // We have different ones for different parts of the JS code base
       .pipe(eslint())
       .pipe(eslint.format());
       // fail on errors in configured environments
       /*.pipe(eslint.failAfterError().on('error', function (errors) {
           handleErrors(errors, {
               notify: false,
               task: 'eslint',
           });
       }));*/
    }
});
