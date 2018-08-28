/**
 * script to package client of app, either as demo or as front end
 * it essentially copies the front end onto the right folder in the github pages project page
 */
const fs = require('fs');
const path = require('path');
var copydir = require('copy-dir');
const { exec } = require('child_process');

const destFolderDemo = './project_page/demo';
const destFolderClient = './webapp/client';
var destFolder;

// Update demo settings 
const pakcageJson = require(path.join(process.cwd(),'enviroment_config.json'));
console.log(pakcageJson)

// node ./config/make_client.js --demo false
  if(process.argv[3] === 'true'){
    pakcageJson.isDemo = true;
    destFolder = destFolderDemo;
  }
  
  if(process.argv[3] === 'false'){
    pakcageJson.isDemo = false;
    destFolder = destFolderClient;
  }
  
fs.writeFileSync(path.join(process.cwd(),'enviroment_config.json'), JSON.stringify(pakcageJson, null,2) )

console.log('bundle with browserify')
// Make Js bundle with browserify
// browserify lib/app/app.js > electron/app.js
var browserify = require('browserify');
var b = browserify();

// using browserify programmatically
// https://github.com/browserify/browserify#api-example
// https://github.com/browserify/browserify/issues/1487
b.add('./lib/app/app.js')
    .bundle()
    .pipe(fs.createWriteStream('./electron/app.js'))
    .on('finish',  ()=>{
        console.log('copying dir to :: ', destFolder)
        copydir.sync('./electron', destFolder)
    });



