'use strict';
const _ = require('underscore');
const path = require('path');
const env = require('./env');
const paths = require('../paths');
const _defaultOptions = {
    extensions: [], // e.g. 'scss', 'js'
    excludes: [],
};

module.exports = {
    getStagedFiles(options) {
        const filePaths = env.getVar('git-staged-files').split('\n');
        const opt = _.extendOwn({}, _defaultOptions, options);
        let filePathsWithExtension;

        if (opt.extensions.constructor !== Array) {
            opt.extensions = [opt.extensions];
        }

        filePathsWithExtension = filePaths.filter(filePath => {
            // check for file extension
            if (opt.extensions.includes(path.extname(filePath))) {
                const absolutefilePath = path.join(paths.repositoryRoot, filePath);
                // check if the file is within the design package
                // as the files outside of it are not of interest for us
                if (absolutefilePath.includes(paths.designPackage)) {
                    return true;
                }
            }
            return false;
        });
        return filePathsWithExtension.map(filePath => path.join(paths.repositoryRoot, filePath));
    },
};
