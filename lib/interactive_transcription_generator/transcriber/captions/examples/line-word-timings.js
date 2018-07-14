var line = {
  "startTime": 874.11,
    "endTime": 880.67,
    "id": "120",
    "text": "Allora il vetro prodotto a Venezia, a Murano era sicuramente uno dei migliori del\n"
  }


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
        var wordDuration = wordText.length * averageWordDuration;
        // first word in line of text
        if(index === 0){
            tmpWordStartTime = lineStartTime;
            tmpWordEndTime = tmpWordStartTime+wordDuration;
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
            tmpWordEndTime = tmpWordStartTime+wordDuration;
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

console.log(lineWordTimings(line));