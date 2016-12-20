const gulp = require('gulp');
const del = require('del');
const paths = require('../../paths');
const path = require('path');

function cleanCss(cb) {

    console.log('DEL');
    console.log(paths.targetPublishCssFiles);
    console.log(paths.targetDeleteTmpCss);

    // NEEDS REVIEW
    // var deleted = del.sync([paths.targetDeleteTmpCss]);

    cb();
}

gulp.task('clean-css', cb => {
    cleanCss(cb);
});
