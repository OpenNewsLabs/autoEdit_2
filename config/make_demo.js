/**
 * Small scrip to make demo app for project page
 * it essentially copies the front end onto the right folder in the github pages project page
*/

var copydir = require('copy-dir');

var destFolder = './project_page/demo';
 
copydir('./electron', destFolder, function(err){
  if(err){
    console.log(err);
  } else {
    console.log('ok, done making demo');
  }
});