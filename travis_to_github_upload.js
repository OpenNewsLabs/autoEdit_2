
// Travis tag from package.json
const packageJson = require('./package.json');
var TRAVIS_TAG = packageJson.version;

console.log('TRAVIS_TAG ',TRAVIS_TAG);

var UPLOADTOOL_SUFFIX = packageJson.name;

console.log('UPLOADTOOL_SUFFIX ',UPLOADTOOL_SUFFIX);
console.log('process.env.TRAVIS_OS_NAME',process.env.TRAVIS_OS_NAME);

var RELEASE_NAME=`${UPLOADTOOL_SUFFIX}-${TRAVIS_TAG}-${process.env.TRAVIS_OS_NAME}`
var RELEASE_TITLE=`${UPLOADTOOL_SUFFIX} ${TRAVIS_TAG} ${process.env.TRAVIS_OS_NAME}`
var is_prerelease=`${process.env.IS_PRERELEASE}`