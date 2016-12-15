import paths from './paths';

export default {
    getTargetPath(mode) {
        if (mode === 'publish') {
            return paths.targetPublish;
        }
        return paths.targetAuthor;
    },
    getSrcFiles(mode) {
        if (mode === 'publish') {
            return paths.targetPublishFiles;
        }
        return paths.targetAuthorFiles;
    },
};
