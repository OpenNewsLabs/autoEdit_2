// twitter keys for tweet-that-clip module behave slightly differnelty, set in process.env
// so for now accomodating for that as a temporary solution while thinking about a refactoring
"use strict";
const fs = require('fs');
const path = require('path');

var TwitterKeysPath  = "";
if(window.ENV_ELECTRON){
  const electron = require('electron');
  const currentWindow = electron.remote.getCurrentWindow();
  TwitterKeysPath = path.join(currentWindow.dataPath , 'twitterkeys.json');
}
if(window.ENV_CEP){
  // https://forums.adobe.com/thread/1956086
  // TwitterKeysPath = path.join(Folder.userData.fsName, 'twitterkeys.json');
  window.__adobe_cep__.evalScript(`$._PPP.get_user_data_path()`, function (adobeDataPath){
    TwitterKeysPath = path.join(adobeDataPath, 'twitterkeys.json');
  })
}

var TwitterKeys = {
    consumerKey: "",
    consumerSecret: "",
    accessToken: "",
    accessTokenSecret: ""
};

// load keys on startup
window.document.addEventListener('DOMContentLoaded', function() {
  if (areTwitterAPIkeysSet()) {
    TwitterKeys = getTwitterAPIkeys();
  } 
});

//helper funciton to check/validate the keys
function keysAreValid(tempKeys){
  //if hte object has the required attributes
    if (tempKeys.consumerKey.length > 0 ) {
      return true;
    }else{
      return false;
    }
}

// get
function getTwitterAPIkeys(){
  if (fs.existsSync(TwitterKeysPath)) {
   TwitterKeys = JSON.parse(fs.readFileSync(TwitterKeysPath).toString());
   // set in process
   // TODO: review this
  //  process.env.TWITTER_CONSUMER_KEY = TwitterKeys.consumerKey;
  //  process.env.TWITTER_CONSUMER_SECRET = TwitterKeys.consumerSecret;
  //  process.env.TWITTER_ACCESS_TOKEN = TwitterKeys.accessToken;
  //  process.env.TWITTER_ACCESS_TOKEN_SECRET = TwitterKeys.accessTokenSecret;
   return TwitterKeys;
 }else{
  // fs.writeFileSync(speechmaticsKeysPath, JSON.strinfigy(getSpeechmaticsAPIkeys,null,2));
  return TwitterKeys;
 }
}

//set
function setTwitterAPIkeys(keys){
    // console.log('setTwitterAPIkeys', keys);
  if(keysAreValid(keys)){
    // console.log('setTwitterAPIkeys', keys);
     fs.writeFileSync(TwitterKeysPath, JSON.stringify(keys,null,2));
    // let TwitterKeys = keys;
    // process.env.TWITTER_CONSUMER_KEY = TwitterKeys.consumerKey;
    // process.env.TWITTER_CONSUMER_SECRET = TwitterKeys.consumerSecret;
    // process.env.TWITTER_ACCESS_TOKEN = TwitterKeys.accessToken;
    // process.env.TWITTER_ACCESS_TOKEN_SECRET = TwitterKeys.accessTokenSecret;
    }else{
    // not setting keys. should add some error handling it, but
    // at the moment validation check is handled in view
   }
}

//check if they are set  
function areTwitterAPIkeysSet(){
   // fs.writeFileSync(speechmaticsKeysPath, JSON.stringify(tempKeys));
   if (fs.existsSync(TwitterKeysPath)) {
    // TODO: add some more validation that values actually make sense
    TwitterKeys = JSON.parse(fs.readFileSync(TwitterKeysPath).toString());
    var result = keysAreValid(TwitterKeys);
    return result;
  } else {
   return false;
 }
}

module.exports = {
  areTwitterAPIkeysSet: areTwitterAPIkeysSet,
  setTwitterAPIkeys: setTwitterAPIkeys,
  getTwitterAPIkeys: getTwitterAPIkeys
};
