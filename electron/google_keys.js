var fs = require('fs');
var electron = require('electron');
var currentWindow = electron.remote.getCurrentWindow();

if (window.process !== 'undefined') {
  var googleKeysPath = currentWindow.dataPath + '/gckeys.json';
}else{
  //not in nwjs 
  var googleKeysPath = "/";
}

var googleKeys = {
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}

var googleKeysSet = false;

// load keys on startup
window.document.addEventListener('DOMContentLoaded', function() {
  if (areGoogleAPIkeysSet()) {
    googleKeys = getGoogleAPIkeys();
  } 
});

//helper funciton to check/validate the keys
function keysAreValid(tempKeys){
  console.log('tempKeys',tempKeys);
  //if hte object has the required attributes
    // if (tempKeys.username.length > 0 && tempKeys.password.length > 0) {
      return true;
    // }else{
    //   return false;
    // }
}

// get
function getGoogleAPIkeys(){
  if (fs.existsSync(googleKeysPath)) {
   googleKeys = JSON.parse(fs.readFileSync(googleKeysPath).toString());
   return googleKeys;
 }else{
  return googleKeys;
 }
}

function getGoogleAPIKeysPath(){
  return googleKeysPath;
}

//set
function setGoogleAPIkeys(keys){
  // then assuming is a file path 
  if(typeof keys == 'string'){
    //TODO change to read.
    const fs = require('fs');
        keys = JSON.parse(fs.readFileSync(keys, 'utf8'));
    // keys = require('keys');
  }
  if(keysAreValid(keys)){
     fs.writeFileSync(googleKeysPath, JSON.stringify(keys));
    }else{
    // not setting keys. should add some error handling it, but
    // at the moment validation check is handled in view
   }
}

//check if they are set  
function areGoogleAPIkeysSet(){
   // fs.writeFileSync(googleKeysPath, JSON.stringify(tempKeys));
   if (fs.existsSync(googleKeysPath)) {
    // TODO: add some more validation that values actually make sense
    googleKeys = JSON.parse(fs.readFileSync(googleKeysPath).toString());
    var result = keysAreValid(googleKeys);
     // googleKeysSet = true;
    return result;
  } else {
    // googleKeysSet = false2;
   return false;
 }
}

module.exports = {
  areGoogleAPIkeysSet: areGoogleAPIkeysSet,
  setGoogleAPIkeys: setGoogleAPIkeys,
  getGoogleAPIkeys: getGoogleAPIkeys,
  getGoogleAPIKeysPath: getGoogleAPIKeysPath
};
