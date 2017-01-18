'use strict';
const env = require('../../libs/env');
const git = require('../../libs/git');
const paths = require('./paths');

module.exports = {
    getSrcFiles(mode) {
        let gitStagedFiles;
        let defaultSrcFiles;

        if (mode === 'publish') {
            defaultSrcFiles = paths.publishFiles.concat(paths.commonFiles);
        }

        if (!env.isPrecommit) {
            return defaultSrcFiles;
        }
        gitStagedFiles = git.getStagedFiles({
            extensions: ['.scss'],
        });

        if (!gitStagedFiles.length) {
            return [];
        }
        return defaultSrcFiles;
    },
    getTargetPath(mode) {
        if (mode === 'publish') {
            return paths.targetPublish;
        }
    }
};
