/*
* Module to convert srtJson to nested array of line word objects.
Line to word timecode accuracty.
Original code modified from Popcorn srt parser.
https://github.com/mozilla/popcorn-js/blob/master/parsers/parserSRT/popcorn.parserSRT.js

Input looks like this
```
[ { startTime: 4.5,
    endTime: 6.17,
    id: '1',
    text: 'QUESTION: ma come hai\n' },
  { startTime: 6.17,
    endTime: 9.229,
    id: '2',
    text: 'cominciato, come hai deciso di diventare un\n' },
    ...
  ]
```

output looks something like this see example_output folder for `srtJsonToWordLineJson_sample.json` example file.
```
[
  [
    {
      "start": 4.89,
      "end": 1.88,
      "text": "There’s"
    },
    {
      "start": 4.46,
      "end": 2.74,
      "text": "this"
    },
    {
      "start": 4.029999999999999,
      "end": 2.3099999999999996,
      "text": "door"
    },
    ....
  ]
  ...
]
```
*/

/**
* takes in a srtJson and converts it into an array of lines containing word objects with
* word level timing.
*/
const fs = require('fs');
function convertTowordsLines(srtJson){
// fs.writeFileSync('lib/interactive_transcription_generator/transcriber/captions/examples/srtJson.json',JSON.stringify(srtJson,null,2));
var resultLines = [];
  for(var i=0; i<srtJson.length ; i++){
    var line = [];
    var srtJsonLine = srtJson[i];

    // console.log("-----")
    // console.log(srtJsonLine)
    var arOfWords= convertOneSrtLine(srtJsonLine) //cb
    console.log(arOfWords);
    console.log('---');
    // line = ;
    resultLines.push(arOfWords);
  }
  return resultLines;
}

/*
* Converts one srtJson line into array of words with accourate time attributes.
*/
function convertOneSrtLine(lineO){
  var resultArrayOfWords =[];
  var lineStartTime = lineO.startTime;
  var lineEndTime = lineO.endTime;
  var lineDuration = lineEndTime - lineStartTime;
  var numberOfWordsInAline = getNumberOfWordsInAstring(lineO);
  // approximate average word duration 
  var averageWordDuration = lineDuration / numberOfWordsInAline;
  // console.log(lineStartTime, lineEndTime, numberOfWordsInAline,lineDuration);

  lineO.text.split(" ").forEach((wordText, index)=>{
      var tmpWordStartTime;
      var tmpWordEndTime;
      // first word in line of text
      if(index === 0){
          tmpWordStartTime = lineStartTime;
          tmpWordEndTime = tmpWordStartTime+averageWordDuration;
      }
      // last word in line of text
     else if(index === lineO.text.split(" ").length-1){
        // preceding word end timecode
        tmpWordStartTime = resultArrayOfWords[index-1].endTime;
        tmpWordEndTime = lineEndTime;
      }
      // other words, not first and last
      else{
          // preceding word end timecode
          tmpWordStartTime = resultArrayOfWords[index-1].endTime;
          // start of this word + average duration
          tmpWordEndTime = tmpWordStartTime+averageWordDuration;
      }

      var newWord = {
          id: index,
          startTime: tmpWordStartTime, 
          endTime: tmpWordEndTime,
          text: wordText
      }
      resultArrayOfWords.push(newWord);
  })
  return resultArrayOfWords;
}


function getNumberOfWordsInAstring(text){
  return text.text.split(" ").length;
}


/**
* Helper function
*/
function createWord(id, start, end, text){
  word = {};
  word.id = id;
  word.startTime = start;
  word.endTime = end;
  word.text = text;
  return word;
}


module.exports =  convertTowordsLines;
