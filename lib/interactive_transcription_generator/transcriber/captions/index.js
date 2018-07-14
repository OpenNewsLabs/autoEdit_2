const fs = require('fs');
const srtJsonToWordLinesJson = require('./srtJsonToWordLinesJson.js');
const srtJsonWordLinesJsonToautoEditJson = require('./srtJsonWordLinesJsonToautoEditJson.js');
const srtToJsonLine = require('./srtToJsonLine.js');
const timecodesToSeconds = require('./timecodesToSecond.js');

function convert(captionsFilePath){
    const captionsString = openFile(captionsFilePath);
    var srtLineJson = srtToJsonLine(captionsString);
    var srtLineJsonSecondsTimecodes = convertTimecodesToSeconds(srtLineJson);
    var result = srtJsonToWordLinesJson(srtLineJsonSecondsTimecodes);
    result = srtJsonWordLinesJsonToautoEditJson(result);
    return result;
}

function convertTimecodesToSeconds(srtLineJsonArray){
    var result =  srtLineJsonArray.map((lineObject)=>{
        return {
            startTime :timecodesToSeconds(lineObject.startTime),
            endTime : timecodesToSeconds(lineObject.endTime),
            id: lineObject.id,
            text: lineObject.text
        };
    })
    return result;
}


function openFile(filePath){
    return fs.readFileSync(filePath).toString('utf8');
}

module.exports = convert;

var sampleSrt = '/Users/pietropassarelli/Desktop/Demo_media/BBC_interview/23 glas blower INT.srt'
var res = convert(sampleSrt);
console.log(JSON.stringify(res,null,2));