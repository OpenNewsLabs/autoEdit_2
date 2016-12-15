import env from '../../libs/env';
import git from '../../libs/git';
import paths from './paths';

export default {
    getSrcFiles(mode) {
        let gitStagedFiles;
        let defaultSrcFiles;

        if (mode === 'publish') {
            defaultSrcFiles = paths.publishFiles.concat(paths.commonFiles);
        } else {
            defaultSrcFiles = paths.authorFiles;
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
        return paths.targetAuthor;
    },
};
