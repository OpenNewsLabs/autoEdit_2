"use strict";
const fs = require('fs');
const path = require('path');

var watsonKeysPath  = "";

if(window.ENV_ELECTRON){
  const electron = require('electron');
  const currentWindow = electron.remote.getCurrentWindow();
  watsonKeysPath = path.join(currentWindow.dataPath , 'wttskeys.json');
}
if(window.ENV_CEP){
  // https://forums.adobe.com/thread/1956086
  window.__adobe_cep__.evalScript(`$._PPP.get_user_data_path()`, function (adobeDataPath){
    watsonKeysPath = path.join(adobeDataPath, 'wttskeys.json');
  })
}


var watsonKeys = {username: "", password: "", url:""};
// var watsonKeysSet = false;

// load keys on startup
window.document.addEventListener('DOMContentLoaded', function() {
  if (areWatsonAPIkeysSet()) {
    watsonKeys = getWatsonAPIkeys();
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
function getWatsonAPIkeys(){
  if (fs.existsSync(watsonKeysPath)) {
   watsonKeys = JSON.parse(fs.readFileSync(watsonKeysPath).toString());
   return watsonKeys;
 }else{
  return watsonKeys;
 }
}

//set
function setWatsonAPIkeys(keys){
  if(keysAreValid(keys)){
     fs.writeFileSync(watsonKeysPath, JSON.stringify(keys));
    }else{
    // not setting keys. should add some error handling it, but
    // at the moment validation check is handled in view
   }
}

//check if they are set  
function areWatsonAPIkeysSet(){
   // fs.writeFileSync(watsonKeysPath, JSON.stringify(tempKeys));
   if (fs.existsSync(watsonKeysPath)) {
    // TODO: add some more validation that values actually make sense
    watsonKeys = JSON.parse(fs.readFileSync(watsonKeysPath).toString());
    var result = keysAreValid(watsonKeys);
     // watsonKeysSet = true;
    return result;
  } else {
    // watsonKeysSet = false2;
   return false;
 }
}

module.exports = {
  areWatsonAPIkeysSet: areWatsonAPIkeysSet,
  setWatsonAPIkeys: setWatsonAPIkeys,
  getWatsonAPIkeys: getWatsonAPIkeys
};
