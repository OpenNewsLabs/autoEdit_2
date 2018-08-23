"use strict";
const fs = require('fs');
const path = require('path');

var revKeysPath = "";
if(window.ENV_ELECTRON){
  const electron = require('electron');
  const currentWindow = electron.remote.getCurrentWindow();
  revKeysPath = path.join(currentWindow.dataPath , 'revkeys.json');
}
if(window.ENV_CEP){
  // https://forums.adobe.com/thread/1956086
  window.__adobe_cep__.evalScript(`$._PPP.get_user_data_path()`, function (adobeDataPath){
    revKeysPath = path.join(adobeDataPath, 'revkeys.json');
  })
}

// CLIENT_API_KEY  USER_API_KEY
var revKeys = {username: "", password: "", url: ""};
// var speechmaticsKeysSet = false;

// load keys on startup
window.document.addEventListener('DOMContentLoaded', function() {
  if (areRevAPIkeysSet()) {
    revKeys = getRevAPIkeys();
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
function getRevAPIkeys(){
  if (fs.existsSync(revKeysPath)) {
   revKeys = JSON.parse(fs.readFileSync(revKeysPath).toString());
   return revKeys;
 }else{
  // fs.writeFileSync(speechmaticsKeysPath, JSON.strinfigy(getSpeechmaticsAPIkeys,null,2));
  return revKeys;
 }
}

//set
function setRevAPIkeys(keys){
  if(keysAreValid(keys)){
     fs.writeFileSync(revKeysPath, JSON.stringify(keys));
    }else{
    // not setting keys. should add some error handling it, but
    // at the moment validation check is handled in view
   }
}

//check if they are set  
function areRevAPIkeysSet(){
   // fs.writeFileSync(speechmaticsKeysPath, JSON.stringify(tempKeys));
   if (fs.existsSync(revKeysPath)) {
    // TODO: add some more validation that values actually make sense
    revKeys = JSON.parse(fs.readFileSync(revKeysPath).toString());
    var result = keysAreValid(revKeys);
     // speechmaticsKeysSet = true;
    return result;
  } else {
    // speechmaticsKeysSet = false2;
   return false;
 }
}

module.exports = {
  areRevAPIkeysSet: areRevAPIkeysSet,
  setRevAPIkeys: setRevAPIkeys,
  getRevAPIkeys: getRevAPIkeys
};
