'use strict';

const gulp = require('gulp');
const Builder = require('systemjs-builder');
const path = require('path');
const config = require('./config');
const paths = require('../../paths');

function bundleJS(bundleEntry, bundleOutputFile, done) {
    const builder = new Builder();

    builder.loadConfig(config.configFile).then(function () {
        builder.config({
            paths: {
                'github:*': path.join(paths.designPackage, 'target/frontend/jspm_packages/github/*'),
                'npm:*': path.join(paths.designPackage, 'target/frontend/jspm_packages/npm/*')
            },
        });

        builder.buildStatic(bundleEntry, bundleOutputFile, config.buildOptions)
            .then(function () {
                done();
            })
            .catch(function (err) {
                done(new Error(err));
            });
    });
}

gulp.task('systemjs-builder', ['systemjs-builder-publish']);

gulp.task('systemjs-builder-publish', function (cb) {
    bundleJS(paths.jsPublishEntry, path.join(paths.targetArtifacts, 'publish/js/publish.js'), cb);
});
