/**
 * @file Manages the backend of the app by overwrighting backbone.sync function to the `autoEditAPI.js` module.
 * @author Pietro Passarelli 
 */

if (window.frontEndEnviromentNWJS) {
	var autoEdit2API = require("./autoEdit2API.js");
	Backbone.sync = autoEdit2API;
}else{
	//hardcode demo here?
}
