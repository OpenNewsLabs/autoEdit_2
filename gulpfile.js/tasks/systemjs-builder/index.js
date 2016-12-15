import gulp from 'gulp';
import Builder from 'systemjs-builder';
import path from 'path';
import config from './config';
import paths from '../../paths';

function bundleJS(bundleEntry, bundleOutputFile, done) {
    const builder = new Builder();

    builder.loadConfig(config.configFile).then(() => {
        builder.config({
            paths: {
                'github:*': path.join(paths.designPackage, 'target/frontend/jspm_packages/github/*'),
                'npm:*': path.join(paths.designPackage, 'target/frontend/jspm_packages/npm/*')
            },
        });

        builder.buildStatic(bundleEntry, bundleOutputFile, config.buildOptions)
            .then(() => {
                done();
            })
            .catch(err => {
                done(new Error(err));
            });
    });
}

gulp.task('systemjs-builder', ['systemjs-builder-publish']);

gulp.task('systemjs-builder-publish', cb => {
    bundleJS(paths.jsPublishEntry, path.join(paths.targetArtifacts, 'publish/js/publish.js'), cb);
});
