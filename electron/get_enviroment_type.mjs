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
  if(window.process.versions.cep !== undefined) {
    return 'cep';
  }
}

module.exports.isBrowsEnv = function isBrowsEnv(){
  return getCurrentEnviromentType() === 'browser'? true :false;
}

module.exports.isElectronEnv =  function isElectronEnv(){
  return getCurrentEnviromentType() === 'electron'? true :false;
}

module.exports.isAdobePanellEnv = function isAdobePanellEnv(){
  return getCurrentEnviromentType() === 'cep'? true :false;
}

module.exports.isDemoEnv =  function isDemoEnv(){
  return getCurrentEnviromentType() === 'demo'? true :false;
}