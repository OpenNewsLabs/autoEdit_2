"use strict";
const fs = require('fs');
const electron = require('electron');
const currentWindow = electron.remote.getCurrentWindow();
const path = require('path');

// var speechmaticsKeysPath;

if (window.process !== 'undefined') {
  var BBCKeysPath = path.join(currentWindow.dataPath , 'bbcskeys.json');
}else{
  //not in electron 
  var BBCKeysPath = "";
}

var BBCKeys = {email: ""};
// var speechmaticsKeysSet = false;

// load keys on startup
window.document.addEventListener('DOMContentLoaded', function() {
  if (areBBCAPIkeysSet()) {
    BBCKeys = getBBCAPIkeys();
  } 
});

//helper funciton to check/validate the keys
function keysAreValid(tempKeys){
  //if hte object has the required attributes
    if (tempKeys.email.length > 0 ) {
      return true;
    }else{
      return false;
    }
}

// get
function getBBCAPIkeys(){
  if (fs.existsSync(BBCKeysPath)) {
   BBCKeys = JSON.parse(fs.readFileSync(BBCKeysPath).toString());
   return BBCKeys;
 }else{
  // fs.writeFileSync(speechmaticsKeysPath, JSON.strinfigy(getSpeechmaticsAPIkeys,null,2));
  return BBCKeys;
 }
}

//set
function setBBCAPIkeys(keys){
  if(keysAreValid(keys)){
     fs.writeFileSync(BBCKeysPath, JSON.stringify(keys));
    }else{
    // not setting keys. should add some error handling it, but
    // at the moment validation check is handled in view
   }
}

//check if they are set  
function areBBCAPIkeysSet(){
   // fs.writeFileSync(speechmaticsKeysPath, JSON.stringify(tempKeys));
   if (fs.existsSync(BBCKeysPath)) {
    // TODO: add some more validation that values actually make sense
    BBCKeys = JSON.parse(fs.readFileSync(BBCKeysPath).toString());
    var result = keysAreValid(BBCKeys);
     // speechmaticsKeysSet = true;
    return result;
  } else {
    // speechmaticsKeysSet = false2;
   return false;
 }
}

module.exports = {
  areBBCAPIkeysSet: areBBCAPIkeysSet,
  setBBCAPIkeys: setBBCAPIkeys,
  getBBCAPIkeys: getBBCAPIkeys
};
