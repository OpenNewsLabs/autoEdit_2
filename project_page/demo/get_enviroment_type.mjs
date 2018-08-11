/*
* find way to make this as it's own module
*/
module.exports.getCurrentEnviromentType = ffunction getCurrentEnviromentType(){
  // needs setting Window.demo = {} in db.js
  if (window.demo !== undefined) {
    return 'demo';
  }

  // Is browser Eg client side app
  if(window.process === undefined){
    return 'browser';
  }

  // Is electron 
  if(window.process.versions.electron !== undefined){
    return 'electron';
  }

  // if it is chromium -> is adobe premiere panel 
  // could also check for window.cep_node
  if(window.process.versions.chromium !== undefined) {
    return 'adobe-panel';
  }
}

module.exports.isBrowsEnv = function isBrowsEnv(){
  return getCurrentEnviromentType() === 'browser'? true :false;
}

module.exports.isElectronEnv =  function isElectronEnv(){
  return getCurrentEnviromentType() === 'electron'? true :false;
}

module.exports.isAdobePanellEnv = function isAdobePanellEnv(){
  return getCurrentEnviromentType() === 'adobe-panel'? true :false;
}

module.exports.isDemoEnv =  function isDemoEnv(){
  return getCurrentEnviromentType() === 'demo'? true :false;
}