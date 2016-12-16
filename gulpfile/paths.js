const path = require('path');

module.exports = {
    // Properties
    frontendBaseDir: '',

    // Getters
    // Sass
    get designPackage() {
        return path.join(this.frontendBaseDir, '../..');
    },
    get gulp() {
        return path.join(this.frontendBaseDir, 'gulpfile.js');
    },
    get sass() {
        return path.join(this.src, 'main', 'sass');
    },
    get sassAuthorFiles() {
        return [path.join(this.sass, 'author/**/*.scss')];
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
    get src() {
        return path.join(this.designPackage, 'src');
    },
    get main() {
        return path.join(this.src, 'main');
    },
    // JavaScript
    get mainJS() {
        return path.join(this.main, 'js');
    },
    get test() {
        return path.join(this.src, 'test');
    },
    get testJS() {
        return path.join(this.test, 'js');
    },
    get allJSFiles() {
        return [
            path.join(this.mainJS, '**/*.js'),
            path.join(this.testJS, '**/*.js'),
        ];
    },
    get jsPublishEntry() {
        return path.join(this.mainJS, 'publish/main.js');
    },
    get jsPublishFiles() {
        return [
            path.join(this.mainJS, 'publish/**/*.js'),
        ];
    },
    get jsAuthorEntry() {
        return path.join(this.mainJS, 'author/main.js');
    },
    get target() {
        return path.join(this.designPackage, 'target');
    },
    get targetArtifacts() {
        return path.join(this.target, 'package/jcr_root/etc/designs/nc/website');
    },
    get targetAuthorCss() {
        return path.join(this.targetArtifacts, 'author/css');
    },
    get targetAuthorCssFiles() {
        return [
            path.join(this.targetAuthorCss, 'base/**/*.css'),
            path.join(this.targetAuthorCss, 'components/**/*.css'),
        ];
    },
    get targetAuthorCssFilesForPostProccessing() {
        return path.join(this.targetAuthorCss, '*.css');
    },
    get targetPublishCss() {
        return path.join(this.targetArtifacts, 'publish/css');
    },
    get targetPublishCssFiles() {
        return [
            path.join(this.targetPublishCss, 'base/**/*.css'),
            path.join(this.targetPublishCss, 'components/**/*.css'),
            path.join(this.targetPublishCss, 'template/**/*.css'),
        ];
    },
    get targetPublishFonts() {
        return path.join(this.targetArtifacts, 'publish/fonts');
    },
    get targetPublishFontsFiles() {
        return [
            path.join(this.targetPublishFonts, '**/*.*'),
        ];
    },
    get targetPublishCssFilesForPostProccessing() {
        return path.join(this.targetPublishCss, '*.css');
    },

    get targetJcrRoot() {
        return path.join(this.target, 'package/jcr_root');
    },
    get targetJSComponents() {
        return path.join(this.targetPublish, 'js', 'components');
    },
    get targetPublish() {
        return path.join(this.targetArtifacts, 'publish');
    },

    get assets() {
        return path.join(this.main, 'assets');
    },
    get svgIcons() {
        return path.join(this.assets, 'icons/*.svg');
    },
    get targetIconFont() {
        return path.join(this.targetPublish, 'fonts');
    }
}
