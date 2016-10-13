/*
* Simple script to automate the deployment of the app.
*/
var fs = require("fs");
var spawn = require('child_process').spawn;
// https://www.npmjs.com/package/nwjs-builder
var NwBuilder = require('nw-builder');

var buildDir = './build';
var packageJsonFile = "./package.json";
// read package.json file 
var packageJson = require(packageJsonFile);

/**
* checks if build dir exists and if it doesn't creates it.
*/
console.log("checking if build folder is present")

if (!fs.existsSync(buildDir)){
	console.log("build folder not present, creating build folder")
    fs.mkdirSync(buildDir);
}else{
	// do nothing, build folder was already there
	console.log("build folder was already present")
}

/**
* Hiding toolbar for deployment
*/
packageJson.window.toolbar = false;
// write file back to system.
fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null,  4))

/**
* Setup deploy code preferences
*/
//
//// Deploying/building app
var nw = new NwBuilder({
  // files: ['./**'], // simple-glob format, would select everything in current folder.
  //chosing files to include, excludes everything else.
  files: ['./frontEnd/**','./interactive_transcription_generator/**','./node_modules/**','./config.js','./package.json' ], 
  // platforms: ['osx32', 'osx64', 'win32', 'win64', 'linux32', 'linux64']
  //for now only osx64 as need to recompile ffmpeg for other versions. 
  platforms: ['osx64','win64'],
  //https://github.com/nwjs/nw-builder#optionsmacicns
  macIcns: "./nw.icns",
  // MAC ONLY: Pass a string containing the path to your own plist file. If a string isn't passed, a plist file will be generated from your package.json. Pass an object to overwrite or add properties to the generated plist file.
  // https://github.com/nwjs/nw-builder#optionsmacplist
  // macPlist: "",
  // nwjs version 
  //MAC ONLY: Use a app.nw folder instead of ZIP file, this significantly improves the startup speed of applications on mac, since no decompressing is needed. Builds on other platforms will still use ZIP files. The default behaviour of node-webkit-builder is to not use ZIP files on the mac platform. In case of the mac platform the option macZip can override the option zip.
  // zip: true,
  version: '0.12.3'
});

/**
* Building/deploying the app in build folder.
*/
console.log("About to package the app")

nw.build().then(function () {
  console.log('Finished packaging the app');
	// on deploy finish, change to show toolbar,for development
	packageJson.window.toolbar = true;
	// write file back down to disk 
	fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null,  4))


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
	//on deploy finish, change to show toolbar,for development use
	packageJson.window.toolbar = true;
	//write file back down to disk 
	fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null,  4))
	
});


