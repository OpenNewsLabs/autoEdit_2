"use strict";
const fs = require('fs');
const electron = require('electron');
const currentWindow = electron.remote.getCurrentWindow();
const path = require('path');

// var speechmaticsKeysPath;

if (window.process !== 'undefined') {
  var speechmaticsKeysPath = path.join(currentWindow.dataPath , 'speechmaticskeys.json');
}else{
  //not in electron 
  var speechmaticsKeysPath = "";
}

var speechmaticsKeys = {username: "", password: ""};
// var speechmaticsKeysSet = false;

// load keys on startup
window.document.addEventListener('DOMContentLoaded', function() {
  if (areSpeechmaticsAPIkeysSet()) {
    speechmaticsKeys = getSpeechmaticsAPIkeys();
  } 
});

//helper funciton to check/validate the keys
function keysAreValid(tempKeys){
  //if hte object has the required attributes
    if (tempKeys.username.length > 0 && tempKeys.password.length > 0) {
      return true;
    }else{
      return false;
    }
}

// get
function getSpeechmaticsAPIkeys(){
  if (fs.existsSync(speechmaticsKeysPath)) {
   speechmaticsKeys = JSON.parse(fs.readFileSync(speechmaticsKeysPath).toString());
   return speechmaticsKeys;
 }else{
  // fs.writeFileSync(speechmaticsKeysPath, JSON.strinfigy(getSpeechmaticsAPIkeys,null,2));
  return speechmaticsKeys;
 }
}

//set
function setSpeechmaticsAPIkeys(keys){
  if(keysAreValid(keys)){
     fs.writeFileSync(speechmaticsKeysPath, JSON.stringify(keys));
    }else{
    // not setting keys. should add some error handling it, but
    // at the moment validation check is handled in view
   }
}

//check if they are set  
function areSpeechmaticsAPIkeysSet(){
   // fs.writeFileSync(speechmaticsKeysPath, JSON.stringify(tempKeys));
   if (fs.existsSync(speechmaticsKeysPath)) {
    // TODO: add some more validation that values actually make sense
    speechmaticsKeys = JSON.parse(fs.readFileSync(speechmaticsKeysPath).toString());
    var result = keysAreValid(speechmaticsKeys);
     // speechmaticsKeysSet = true;
    return result;
  } else {
    // speechmaticsKeysSet = false2;
   return false;
 }
}

module.exports = {
  areSpeechmaticsAPIkeysSet: areSpeechmaticsAPIkeysSet,
  setSpeechmaticsAPIkeys: setSpeechmaticsAPIkeys,
  getSpeechmaticsAPIkeys: getSpeechmaticsAPIkeys
};
