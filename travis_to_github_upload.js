
// takes file to upload as script param
// knows release name & tag name from ENV var

const packageJson = require('./package.json');

console.log('UPLOADTOOL_SUFFIX ',UPLOADTOOL_SUFFIX);
console.log('process.env.TRAVIS_OS_NAME',process.env.TRAVIS_OS_NAME);

var RELEASE_NAME=`${UPLOADTOOL_SUFFIX}-${TRAVIS_TAG}-${process.env.TRAVIS_OS_NAME}`
var RELEASE_TITLE=`${UPLOADTOOL_SUFFIX} ${TRAVIS_TAG} ${process.env.TRAVIS_OS_NAME}`
var is_prerelease=`${process.env.IS_PRERELEASE}`

console.log('RELEASE_NAME ',RELEASE_NAME);
console.log('RELEASE_TITLE ',RELEASE_TITLE);

// GITHUB: get list of release from githuhb 


    // tag name is not in list of releases

        // GITHUB: create new release
            // with body description?

        // add asset to this release 


    // if the tag name is in the list of releases

        // GITHUB: delete asset

        // GITHUB: upload new asset 

        // GITHUB: edit body description - optional 