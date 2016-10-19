/**
* @module parse
* @description parse the gentleJson json into interactive transcription json for autoEdit2
* @example 
var gentleParser = require("./parse_gentle_stt.js")
var demoJson = require("./example/allign.json")
var lines = gentleParser(demoJson)
console.log(lines);
* 
* @tutorial gentle_transcription_json_spec
*/

/**
* @function parse
* @description Module to parse the gentleJson json into interactive transcription json 
* @param {object} gentleJson - gentle Json specs 
* @returns {object} autoEdit2 `transcription.lines` json specs
*/
function parse(gentleJson){
//autoEdit2 transcription json assumes that there are multiple lines. But  Gentle doesn't group words into lines. so using this line array with one line object to add all words to it as one one line. 
var lines = [
							{
								line: []
							} 
						];
	//iterate over gentle transcription json 
	for (var i = 0; i<gentleJson.words.length; i++){
		//creating new word
		var word = {};
		//adding id
		word.id = i;
		//copy word from gentle onto new one 
		word.text = gentleJson.words[i].word;
		word.startTime = gentleJson.words[i].start;
		word.endTime = gentleJson.words[i].end;
		//add word to line. hard coded index for first line, coz Gentle doesn't group words into lines
		lines[0].line.push(word);
	}

	return lines
}

module.exports = parse;