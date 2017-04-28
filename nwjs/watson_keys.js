var fs = require('fs');
var watsonKeysPath = window.nw.App.dataPath + '/wttskeys.json';
var watsonKeys = {username: "", password: ""};
var watsonKeysSet = false;

// load keys on startup
window.document.addEventListener('DOMContentLoaded', function() {
  if (areWatsonAPIkeysSet()) {
    watsonKeys = getWatsonAPIkeys();
  } 
});

//helper funciton 
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
//TODO: add some validation/checks.
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
