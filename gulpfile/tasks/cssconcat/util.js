const paths = require('./paths');

module.exports = {
    getTargetPath(mode) {
        if (mode === 'publish') {
            return paths.targetPublish;
        }
        return;
    },
    getSrcFiles(mode) {
        if (mode === 'publish') {
            return paths.targetPublishFiles;
        }
        return;
    },
};
