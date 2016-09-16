// autoEdit2API.js

/**
* db
*/
// var LinvoDB = require("linvodb3");
// LinvoDB.defaults.store = { db: require("level-js") };
// var modelName = "transcription";
// var modelName = "transcription";
// var schema = { }; // Non-strict always, can be left empty
// var options = { };
// var Transcription = new LinvoDB(modelName, schema, options); // New model; Doc is the constructor
// LinvoDB.dbPath = process.cwd()

/**
* API 
*/

var autoEdit2API = function(){

}


/**
* Create 
*/
autoEdit2API.prototype.create = function(model, success, error){
	return "path_to_video"
}

/**
* Read - Find all   
*/
autoEdit2API.prototype.findAll = function(model, success, error){

}

/**
* Read - Find One - NOT in use    
*/
autoEdit2API.find = function(model, success, error){

}

/**
* Update 
*/
autoEdit2API.prototype.update = function(model, success, error){

}

/**
* Update/patch 
*/
autoEdit2API.prototype.patch = function(model, success, error){

}

/**
* Destroy  
*/
autoEdit2API.prototype.destroy = function(model, success, error){

}

module.exports = autoEdit2API;