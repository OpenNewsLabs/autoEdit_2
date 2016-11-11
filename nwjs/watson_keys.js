var fs = require('fs');

var watsonKeysPath = window.nw.App.dataPath + '/wttskeys.json';
var watsonKeys, callback;

window.document.addEventListener('DOMContentLoaded', function() {
  if (fs.existsSync(watsonKeysPath)) {
    watsonKeys = JSON.parse(fs.readFileSync(watsonKeysPath).toString());
  } else {
    // if it doesn't exists then prompt uset to add keys
    watsonKeys = getWatsonAPIKeysFromUser();
  }

  if (callback) { callback(watsonKeys); }
});

/*
 * Watson IBM Keys helpef functions
 */

/**
 * @function
 * @description Function to set watson API Keys from user input
 */
function getWatsonAPIKeysFromUser() {
  var tempKeys = {
    username: window.prompt('Please enter IBM API Key Username', '') || '',
    password: window.prompt('Please enter IBM API Key Password', '') || ''
  };

  // validation
  if (tempKeys.username.length > 0 && tempKeys.password.length > 0) {
    fs.writeFileSync(watsonKeysPath, JSON.stringify(tempKeys));
    window.alert("Thank you! Saved the keys so you don't have to enter them again.");
    return tempKeys;
  } else {
    window.alert('You must provide API keys to use this application.');
    return getWatsonAPIKeysFromUser();
  }
}

module.exports = function(cb) {
  if (watsonKeys) {
    cb(watsonKeys);
  } else {
    callback = cb;
  }
};
