'use strict';
// const env = require('../../libs/env');
// const git = require('../../libs/git');
// const paths = require('./paths');

module.exports = {
    getSrcFiles() {
        /* if (!env.isPrecommit) {
            return paths.defaultFiles;
        }

        let gitStagedFiles = git.getStagedFiles({
            extensions: ['.js', '.es6']
        });
        if (!gitStagedFiles.length) {
            return [];
        }
        return gitStagedFiles.concat(paths.excludedFiles); */

        return;
    },
};
