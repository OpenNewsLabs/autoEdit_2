//http://sailsjs.org/documentation/concepts/services/creating-a-service
/*
* NOTE:This module makes it easier to swap the transcriber that interfaces with the STT API
* use different once, or different STT APIs.
*/
// var transcribe = require("./transcriber_watson/index.js");
var transcribe = require("./sam_transcriber/index.js");
module.exports = transcribe;
