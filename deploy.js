/*
* Simple script to automate the deployment of the app.
*/
var fs = require("fs");
var spawn = require('child_process').spawn;

// console.log("checking if build folder is present")

// if (fs.existsSync("./build")) {
//     // Do something
//     console.log("build folder present... deleting it")
//      spawn('rm', ['-rf', './build']);

// }


var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
  files: ['./**'], // simple-glob format
  // platforms: ['osx32', 'osx64', 'win32', 'win64', 'linux32', 'linux64']
  platforms: ['osx64'],
  version: '0.12.3'
});

nw.build().then(function () {
  console.log('Finished packaging the app');
}).catch(function (error) {
  console.error(error);
});
