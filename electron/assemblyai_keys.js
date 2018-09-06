"use strict";
const fs = require('fs');
const path = require('path');

var assemblyaiKeysPath = "";
if(window.ENV_ELECTRON){
  const electron = require('electron');
  const currentWindow = electron.remote.getCurrentWindow();
  assemblyaiKeysPath = path.join(currentWindow.dataPath , 'assemblyaikeys.json');
}
if(window.ENV_CEP){
  // https://forums.adobe.com/thread/1956086
  window.__adobe_cep__.evalScript(`$._PPP.get_user_data_path()`, function (adobeDataPath){
    assemblyaiKeysPath = path.join(adobeDataPath, 'assemblyaikeys.json');
  })
}

var assemblyaiKeys = { password: ""};
// var assemblyaiKeysSet = false;

// load keys on startup
window.document.addEventListener('DOMContentLoaded', function() {
  if (areAssemblyaiAPIkeysSet()) {
    assemblyaiKeys = getAssemblyaiAPIkeys();
  } 
});

//helper funciton to check/validate the keys
function keysAreValid(tempKeys){
  //if hte object has the required attributes
    if ( tempKeys.password.length > 0) {
      return true;
    }else{
      return false;
    }
}

// get
function getAssemblyaiAPIkeys(){
  if (fs.existsSync(assemblyaiKeysPath)) {
   assemblyaiKeys = JSON.parse(fs.readFileSync(assemblyaiKeysPath).toString());
   return assemblyaiKeys;
 }else{
  // fs.writeFileSync(assemblyaiKeysPath, JSON.strinfigy(getAssemblyaiAPIkeys,null,2));
  return assemblyaiKeys;
 }
}

//set
function setAssemblyaiAPIkeys(keys){
  if(keysAreValid(keys)){
     fs.writeFileSync(assemblyaiKeysPath, JSON.stringify(keys));
    }else{
    // not setting keys. should add some error handling it, but
    // at the moment validation check is handled in view
   }
}

//check if they are set  
function areAssemblyaiAPIkeysSet(){
   // fs.writeFileSync(assemblyaiKeysPath, JSON.stringify(tempKeys));
   if (fs.existsSync(assemblyaiKeysPath)) {
    // TODO: add some more validation that values actually make sense
    assemblyaiKeys = JSON.parse(fs.readFileSync(assemblyaiKeysPath).toString());
    var result = keysAreValid(assemblyaiKeys);
     // assemblyaiKeysSet = true;
    return result;
  } else {
    // assemblyaiKeysSet = false2;
   return false;
 }
}

module.exports = {
  areAssemblyaiAPIkeysSet: areAssemblyaiAPIkeysSet,
  setAssemblyaiAPIkeys: setAssemblyaiAPIkeys,
  getAssemblyaiAPIkeys: getAssemblyaiAPIkeys
};
