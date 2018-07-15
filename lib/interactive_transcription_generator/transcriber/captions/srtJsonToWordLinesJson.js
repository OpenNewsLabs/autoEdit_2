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
function convertTowordsLines(srtJson){
  return srtJson.map((srtJsonLine)=>{
    return convertOneSrtLine(srtJsonLine) 
  });
}

/*
* Converts ONE srtJson line into array of words with accourate time attributes.
* lineObject input looks like 
{
  "startTime": 874.11,
    "endTime": 880.67,
    "id": "120",
    "text": "Allora il vetro prodotto a Venezia, a Murano era sicuramente uno dei migliori del\n"
  }
 *
 * output looks like
 * 
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
*/
function convertOneSrtLine(lineObject){
  var resultArrayOfWords =[];
  var lineDuration =  lineObject.endTime - lineObject.startTime;
  var numberOfCharInAline = getNumberOfCharsInAstring(lineObject.text);
  // approximate average charatcher duration (without counting spaces)
  var averageCharacterDuration = lineDuration / numberOfCharInAline;
  // iterate over each word
  lineObject.text.split(" ").forEach((wordText, index)=>{
      var currentWordCharNumber = wordText.length;
      var currentWordDurationBasedOnChar = currentWordCharNumber * averageCharacterDuration;
      // new word objec to add to result array  
      var newWord = {
          // TODO: find better way to do the id for the word
          id: index,
          startTime: 0, 
          endTime: 0,
          text: wordText
      }

      // first word in line of text
      if(index === 0){
          newWord.startTime = lineObject.startTime;
          newWord.endTime = newWord.startTime + currentWordDurationBasedOnChar;
      }
      // last word in line of text
     else if(index === lineObject.text.split(" ").length - 1){
        // start time of word is the preceding word end timecode
        newWord.startTime = resultArrayOfWords[index-1].endTime;
        newWord.endTime =  lineObject.endTime;
      }
      // other words, not first and last
      else{
          // start time of word is the preceding word end timecode
          newWord.startTime = resultArrayOfWords[index-1].endTime;
          // start of this word + average duration
          newWord.endTime = newWord.startTime +currentWordDurationBasedOnChar;
      }
      resultArrayOfWords.push(newWord);
  })
  return resultArrayOfWords;
}

/*
*  Helper function, counts char not including spaces
* intput, string of text
* output integer
*/
function getNumberOfCharsInAstring(text){
  return text.split(" ").join("").length;
}


module.exports =  convertTowordsLines;
