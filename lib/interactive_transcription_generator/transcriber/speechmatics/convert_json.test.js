"use strict";
const fs = require('fs');
var convertSpeechmaticsJsonToTranscripJson = require("./convert_json.js");

var exampleJSON = require("./trimmer-conversation-example.mp4.1535057583816.json");
var expectedJSON = require("./autoedit_json_expected_output.json");

// TODO: add jest and run test with it to compare two json after function, or jasmine

console.log(JSON.stringify(convertSpeechmaticsJsonToTranscripJson(exampleJSON),null,2 ) );

fs.writeFileSync('./tmpResult.json',JSON.stringify(convertSpeechmaticsJsonToTranscripJson(exampleJSON),null,2 ));