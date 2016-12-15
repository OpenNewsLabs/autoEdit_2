import gulpConcatCss from 'gulp-concat-css';
import gulp from 'gulp';
import path from 'path';
import postcss from 'gulp-postcss';
import util from './util';
import configPostcss from './postcss.config';

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
