//TODO: can remove, replaced by make_client.js
/**
 * Small scrip to make demo app for project page
 * it essentially copies the front end onto the right folder in the github pages project page
*/
const fs = require('fs');
const path = require('path');
var copydir = require('copy-dir');

var destFolder = './project_page/demo';

// const pakcageJson = require('../pakcage.json')
// console.log(pakcageJson)
// const pakcageJson = require(path.join(process.cwd(),'enviroment_config.json'))
// console.log(pakcageJson)


// pakcageJson.isDemo = false;

// fs.writeFileSync(path.join(process.cwd(),'enviroment_config.json'), JSON.stringify(pakcageJson, null,2) )

copydir('./electron', destFolder, function(err){
  if(err){
    console.log(err);
  } else {
    console.log('ok, done making demo');
  }
});