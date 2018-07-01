"use strict";
var convertSpeechmaticsJsonToTranscripJson = require("./convert_json.js");

var exampleJSON = require("./speechmatics_sample_output.json");
var expectedJSON = require("./autoedit_json_expected_output.json");

// TODO: add jest and run test with it to compare two json after function, or jasmine

console.log(convertSpeechmaticsJsonToTranscripJson(exampleJSON));