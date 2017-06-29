var fs = require('fs');
var electron = require('electron');
var currentWindow = electron.remote.getCurrentWindow();

if (window.process !== 'undefined') {
  var keysPath = currentWindow.dataPath + '/keys.json';
}else{
  //not in nwjs 
  var keysPath = "/";
}

var keys = {username: "", password: ""};
var keysSet = false;

// load keys on startup
window.document.addEventListener('DOMContentLoaded', function() {
  if (areAPIkeysSet()) {
    keys = getAPIkeys();
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
function getAPIkeys(){
  if (fs.existsSync(keysPath)) {
   keys = JSON.parse(fs.readFileSync(keysPath).toString());
   return keys;
 }else{
  return keys;
 }
}

//set
function setWatsonAPIkeys(keys){
  if(keysAreValid(keys)){
     fs.writeFileSync(keysPath, JSON.stringify(keys));
    }else{
    // not setting keys. should add some error handling it, but
    // at the moment validation check is handled in view
   }
}

//check if they are set  
function areAPIkeysSet(){
   // fs.writeFileSync(keysPath, JSON.stringify(tempKeys));
   if (fs.existsSync(keysPath)) {
    // TODO: add some more validation that values actually make sense
    keys = JSON.parse(fs.readFileSync(keysPath).toString());
    var result = keysAreValid(keys);
     // keysSet = true;
    return result;
  } else {
    // keysSet = false2;
   return false;
 }
}

module.exports = {
  areAPIkeysSet: areAPIkeysSet,
  setWatsonAPIkeys: setWatsonAPIkeys,
  getAPIkeys: getAPIkeys
};
