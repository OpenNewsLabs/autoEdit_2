'use strict';

const path = require('path');

module.exports = {
    // Properties

    frontendBaseDir: '',

    // Getters
    get designPackage() {
        // return path.join(this.frontendBaseDir, '../..');
        return path.join(this.frontendBaseDir, 'design');
    },
    get gulp() {
        return path.join(this.frontendBaseDir, 'gulpfile.js');
    },
    // Sass Sources
    get sass() {
        return path.join(this.frontendBaseDir, 'design', 'sass');
    },
    get sassCommon() {
        return path.join(this.sass, 'common');
    },
    get sassCommonFiles() {
        return [
            path.join(this.sassCommon, '**/*.scss'),
        ];
    },
    get sassPublishFiles() {
        return [
            path.join(this.sass, 'publish/**/*.scss'),
        ];
    },
    // Sass target
    get target() {
        return path.join(this.frontendBaseDir, 'nwjs');
    },
    get targetArtifacts() {
        return path.join(this.target, 'style');
    },
    get targetPublishCss() {
        return path.join(this.targetArtifacts);
    },
    get targetPublishCssFiles() {
        return [
            path.join(this.targetPublishCss, 'base/**/*.css'),
            path.join(this.targetPublishCss, 'modules/**/*.css'),
            path.join(this.targetPublishCss, 'template/**/*.css'),
        ];
    },
    get targetDeleteTmpCss() {
       return path.join(this.targetPublishCss, '*/**/*.css'); 
    },
    get targetPublishCssFilesForPostProccessing() {
        return path.join(this.targetPublishCss, '*.css');
    },
    // JS source
    get src() {
        return path.join(this.designPackage, 'js');
    },
    get libJS() {
        return path.join(this.src, 'lib');
    },
    get nwjsJS() {
        return path.join(this.src, 'nwjs');
    },
    get allJSFiles() {
        return [
            path.join(this.libJS, '**/*.js'),
            path.join(this.nwjsJS, '**/*.js'),
        ];
    },
    get jsPublishEntry() {
        return path.join(this.libJS, 'main.js');
    },
    get jsPublishFiles() {
        return [
            path.join(this.libJS, '**/*.js'),
        ];
    },
    // get targetPublishFonts() {
    //     return path.join(this.targetArtifacts, 'publish/fonts');
    // },
    // get targetPublishFontsFiles() {
    //     return [
    //         path.join(this.targetPublishFonts, '**/*.*'),
    //     ];
    // },
    get targetJSComponents() {
        return path.join(this.targetPublish, 'js', 'components');
    },
    get targetPublish() {
        return path.join(this.targetArtifacts, 'publish');
    },
    // get assets() {
    //     return path.join(this.main, 'assets');
    // },
    // get svgIcons() {
    //     return path.join(this.assets, 'icons/*.svg');
    // },
    // get targetIconFont() {
    //     return path.join(this.targetPublish, 'fonts');
    // }
};
