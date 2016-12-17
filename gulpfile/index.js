'use strict';

const paths = require('./paths');
const path = require('path');
const gutil = require('gulp-util');
const _defaultTasks = ['default'];
const allEnabledTasks = require('./enabledTasks').all;

// Setup reference to frontBaseDir
paths.frontendBaseDir = path.join(__dirname, '..');

// LIST OF ALL THE PATHS PROVIDED
console.log(gutil.colors.red('===== PATHS CONFIGURATION OUTPUT ====='));
console.log(gutil.colors.green('frontendBaseDir'), paths.frontendBaseDir);
console.log(gutil.colors.green('designPackage'), paths.designPackage);
console.log(gutil.colors.green('gulp'), paths.gulp);
console.log(gutil.colors.blue('----- SASS SRCS -----'));
console.log(gutil.colors.green('sass'), paths.sass);
console.log(gutil.colors.green('sassCommon'), paths.sassCommon);
console.log(gutil.colors.green('sassCommonFiles'), paths.sassCommonFiles);
console.log(gutil.colors.green('sassPublishFiles'), paths.sassPublishFiles);
console.log(gutil.colors.green('targetPublishCss'), paths.targetPublishCss);
console.log(gutil.colors.green('targetPublishCssFiles'), paths.targetPublishCssFiles);
console.log(gutil.colors.green('targetPublishCssFilesForPostProccessing'), paths.targetPublishCssFilesForPostProccessing);
console.log(gutil.colors.blue('----- JS SRCS -----'));
console.log(gutil.colors.green('src'), paths.src);
console.log(gutil.colors.green('libJS'), paths.libJS);
console.log(gutil.colors.green('nwjsJS'), paths.nwjsJS);
console.log(gutil.colors.green('allJSFiles'), paths.allJSFiles);
console.log(gutil.colors.green('jsPublishEntry'), paths.jsPublishEntry);
console.log(gutil.colors.green('jsPublishFiles'), paths.jsPublishFiles);
console.log(gutil.colors.green('target'), paths.target);
console.log(gutil.colors.green('targetArtifacts'), paths.targetArtifacts);
// console.log(gutil.colors.green('targetPublishFonts'), paths.targetPublishFonts);
// console.log(gutil.colors.green('targetPublishFontsFiles'), paths.targetPublishFontsFiles);
console.log(gutil.colors.green('targetJSComponents'), paths.targetJSComponents);
console.log(gutil.colors.green('targetPublish'), paths.targetPublish);
// console.log(gutil.colors.green('assets'), paths.assets);
// console.log(gutil.colors.green('svgIcons'), paths.svgIcons);
// console.log(gutil.colors.green('targetIconFont'), paths.targetIconFont);
console.log(gutil.colors.red('==========================='));

// Require all default and enabled task FILES
// and thus setup the gulp tasks
_defaultTasks.concat(allEnabledTasks).forEach(function (task) {
    require('./tasks/' + task);
});
// if no task was configured when gulp was executed,
// the default task (tasks/default.js) is called