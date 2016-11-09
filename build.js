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
    './frontEnd/**', './interactive_transcription_generator/**',
    './node_modules/**', './config.js', './package.json'
  ],
  //for now only osx64 as need to recompile ffmpeg for other versions.
  platforms: ['osx64', 'win64'], // ['osx32', 'osx64', 'win32', 'win64', 'linux32', 'linux64']
  // https://github.com/nwjs/nw-builder#optionsmacicns
  macIcns: 'assets/nw.icns',
  version: '0.12.3', // of nwjs to use
  buildDir: buildDir
});

/**
 * Building/deploying the app in build folder.
 */
console.log('About to package the app');

nw.build().then(function () {
  console.log('Finished packaging the app');
  /**
   * packaging app in dmg for os x, and placing it on the Desktop.
   * `npm install appdmg  -g` might require to be installed globally for it to work
   * appdmg appdmg.json ~/Desktop/autoEdit2.dmg
   * seems like this could be the issue https://github.com/LinusU/node-appdmg/issues/63
   */
  ///////////////////////////////////////////////////////
  //// or spawn process
  //// appdmg appdmg.json ~/Desktop/autoEdit2.dmg
  // var spawn = require('child_process').spawn;
  // var appdmg = spawn('appdmg', ['./appdmg.json', '~/Desktop/autoEdit2.dmg']);

  // appdmg.stdout.on('data', function(data) {
  //   console.log("stdout: " +data);
  // });

  // appdmg.stderr.on('data', function(data) {
  //   console.log("stderr:" +data);
  // });

  // appdmg.on('close', function(code)  {
  //   console.log("child process exited with code" +code);
  // });
  ///////////////////////////////////////////////////////
  // var appdmg = require('appdmg');
  // var ee = appdmg({ source: './appdmg.json', target: '~/Desktop/autoEdit2.dmg' });

  // ee.on('progress', function (info) {
  //    console.log("progress")
  //   // console.log(info.current, into.total, info.type)
  //   // info.current is the current step
  //   // info.total is the total number of steps
  //   // info.type is on of 'step-begin', 'step-end'

  //   // 'step-begin'
  //   // info.title is the title of the current step

  //   // 'step-end'
  //   // info.status is one of 'ok', 'skip', 'fail'
  // });

  // ee.on('finish', function () {
  //   // There now is a `test.dmg` file
  //   console.log("check desktop for .dmg file")
  // });

  // ee.on('error', function (err) {
  //   // An error occurred
  //   console.log("error")
  //   console.log(err)
  // });


}).catch(function (error) {
  console.error(error);
});
