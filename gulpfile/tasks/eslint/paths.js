import paths from '../../paths';

const excludedFiles = paths.negateFilePaths(paths.srcAllNonNNJSFiles);
const defaultFiles = paths.srcJSFiles.concat(
    paths.gulpJsFiles,
    excludedFiles
);

export default {
    excludedFiles,
    defaultFiles,
};
