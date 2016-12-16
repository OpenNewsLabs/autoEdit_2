const gulpConcatCss = require('gulp-concat-css');
const gulp = require('gulp');
const path = require('path');
const postcss = require('gulp-postcss');
const util = require('./util');
const configPostcss = require('./postcss.config');

function concatStyles(mode, cb) {
    const srcFiles = util.getSrcFiles(mode);
    const targetPath = util.getTargetPath(mode);
    const targetFileName = `${mode}.css`;

    gulp.src(srcFiles)
        .pipe(gulpConcatCss(targetFileName, {
            rebaseUrls: true,
        }))
        .pipe(postcss(configPostcss.processors))
        .pipe(gulp.dest(targetPath));

    process.emit('nn:fileGenerated', path.join(targetPath, targetFileName));
    cb();
}

gulp.task('cssconcat', ['cssconcatPublish', 'cssconcatAuthor']);

gulp.task('cssconcatPublish', cb => {
    concatStyles('publish', cb);
});

gulp.task('cssconcatAuthor', cb => {
    concatStyles('author', cb);
});
