import cache from 'gulp-cached';
import gulp from 'gulp';
import sass from 'gulp-sass';
import config from './config';
import util from './util';
import {handle as handleErrors} from '../../libs/error';

function compileSASS(gulpSrcFiles, targetFolder) {
    return gulp.src(gulpSrcFiles)
        .pipe(cache('sass'))
        .pipe(
            sass(config)
            .on('error', sass.logError)
            .on('error', errors => {
                handleErrors(errors, {
                    task: 'sass',
                });
            })
        )
        .pipe(gulp.dest(targetFolder));
}

gulp.task('sass', ['sassPublish', 'sassAuthor']);

gulp.task('sassPublish', cb => {
    const srcFiles = util.getSrcFiles('publish');
    const targetPath = util.getTargetPath('publish');

    if (!srcFiles.length) {
        cb();
    } else {
        return compileSASS(srcFiles, targetPath);
    }
});

gulp.task('sassAuthor', cb => {
    const srcFiles = util.getSrcFiles('author');
    const targetPath = util.getTargetPath('author');

    if (!srcFiles.length) {
        cb();
    } else {
        return compileSASS(srcFiles, targetPath);
    }
});

gulp.task('sassResetCachedStyles', cb => {
    delete cache.caches.sass; // reset the cache
    cb();
});
