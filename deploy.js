/*
* Simple script to automate the deployment of the app.
*/
var fs = require("fs");
var spawn = require('child_process').spawn;

var buildDir = './build';
var packageJsonFile = "./package.json";
// read package.json file 
var packageJson = require(packageJsonFile);

// checks if build dir exists and if it doesn't creates it.
console.log("checking if build folder is present")

if (!fs.existsSync(buildDir)){
	console.log("build folder not present, creating build folder")
    fs.mkdirSync(buildDir);
}else{
	// do nothing, build folder was already there
	console.log("build folder was already present")
}


//// Hiding toolbar for deployment
// hide toolbar in window preferences
packageJson.window.toolbar = false;
// write file back to system.
fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null,  4))
// deploy code 
//// Deploying/building app
// https://www.npmjs.com/package/nwjs-builder
var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
  // files: ['./**'], // simple-glob format
   files: ['./frontEnd/**','./interactive_transcription_generator/**','./node_modules/**','./config.js','./package.json' ], // simple-glob format
  // platforms: ['osx32', 'osx64', 'win32', 'win64', 'linux32', 'linux64']
  platforms: ['osx64'],
  // nwjs version 
  version: '0.12.3'
});

console.log("About to package the app")

nw.build().then(function () {
  console.log('Finished packaging the app');
  	//// showing toolbar for development
	// on deploy finish 
	// change to show toolbar
	packageJson.window.toolbar = true;
	// write file back down to disk 
	fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null,  4))
	////
}).catch(function (error) {
  console.error(error);
  	//// showing toolbar for development
	//on deploy finish 
	//change to show toolbar
	packageJson.window.toolbar = true;
	//write file back down to disk 
	fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null,  4))
	////
});


