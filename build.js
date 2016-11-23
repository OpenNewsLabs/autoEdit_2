/*
 * @file Simple script to automate the deployment of the app.
 */
var fs = require('fs');
var NwBuilder = require('nw-builder');

var buildDir = './build';

/**
 * checks if build dir exists and if it doesn't creates it.
 */
if ( !fs.existsSync(buildDir) ) { fs.mkdirSync(buildDir); }

/**
 * Setup deploy code preferences
 */
var nw = new NwBuilder({
  //chosing files to include, excludes everything else.
  files: [
    './nwjs/**', './lib/**', './node_modules/**', './config.js', './package.json'
  ],
  //for now only osx64 as need to recompile ffmpeg for other versions.
  platforms: ['osx64'], // ['osx32', 'osx64', 'win32', 'win64', 'linux32', 'linux64']
  // https://github.com/nwjs/nw-builder#optionsmacicns
  macIcns: 'assets/nw.icns',
  // version of nwjs to use
  version: '0.12.3', 
  buildDir: buildDir
});

/**
 * Building/deploying the app in build folder.
 */
console.log('About to package the app');

nw.build().then(function () {
  console.log('Finished packaging the app');
}).catch(function (error) {
  console.error(error);
});
