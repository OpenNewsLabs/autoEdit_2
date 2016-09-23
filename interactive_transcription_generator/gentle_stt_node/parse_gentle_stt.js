
/**
* Module to parse the gentleJson json into interactive transcription json 
*/

function parse(gentleJson){

var lines = [
				{
					line: []
				} 
			];

	for (var i = 0; i<gentleJson.words.length; i++){
		//console.log(JSON.stringify(gentleJson.words[i], null, 4))
		var word = {};
		word.id = i;
		word.text = gentleJson.words[i].word;
		word.startTime = gentleJson.words[i].start;
		word.endTime = gentleJson.words[i].end;

		lines[0].line.push(word);
	}
	return lines
console.log(JSON.stringify(lines, null, 4))
}




module.exports = parse;