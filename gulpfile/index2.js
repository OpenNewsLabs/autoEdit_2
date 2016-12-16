'use strict';
// - Sass compiler DONE
// - Watcher DONE
// - Run Sequence DONE
// - ESLinter DONE
// - Browserify
// - Autoprefixer
// - Babel DONE
// - Minification

const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');

// ======= SOURCE PATH VARS =======
// (these need to be moved elsewhere)
const sassSrcPath = '../lib/sass/**/*.scss';
const sassDestPath = '../nwjs/css';
const jsSrcPath = '../app/**/*.js';

// ======= TASKS =======
// Test
gulp.task('test', () => {
    gutil.log('Gulp is running!');
});

// Default
gulp.task('default', () => {
    gutil.log('Gulp is running!');
});

// Sass
gulp.task('sass', () => {
    gulp.src(sassSrcPath)
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest(sassDestPath));
});

// Watch
gulp.task('watch', () => {
    gutil.log(gutil.colors.green('Starting file watchers...'));

    gulp.watch(sassSrcPath, ['sass']);
});

// ESLint
gulp.task('eslint', () => {
    // .eslintrc files are automatically detected.
    gulp.src(jsSrcPath)
        .pipe(eslint())
        .pipe(eslint.format());
});

// Build
// gulp.task('build', (cb) => {
//     runSequence('', [], cb);
// });
