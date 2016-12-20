'use strict';

const eslint = require( 'gulp-eslint');
const gulp = require( 'gulp');
const handleErrors = require( '../../libs/error').handle;
const paths = require( '../../paths');
const srcFiles = paths.allJSFiles;

gulp.task('eslint', cb => {
    if (!srcFiles.length) {
        cb();
    } else {
        return gulp.src(srcFiles)
       // .eslintrc files are automatically detected.
       // We may have different ones for different parts of the JS code base
       .pipe(eslint())
       .pipe(eslint.format());
    }
});
