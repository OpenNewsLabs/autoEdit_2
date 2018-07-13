const fs = require('fs');
const srtJsonToWordLinesJson = require('./srtJsonToWordLinesJson.js');
const srtJsonWordLinesJsonToautoEditJson = require('./srtJsonWordLinesJsonToautoEditJson.js');

function convert(captionsFilePath){
    const captionsString = openFile(captionsFilePath);
    var srtLineJson = convertSrtToJson(captionsString);
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

/**
 * @todo: this function is repeated from Rev conversion. absract as own module
 * @param {stirng} timecodeStringHHMMSSFFF, eg '00:33:19,470' 
 * as described in their documentation https://www.rev.com/api/attachmentsgetcontent
 * timestamp format is hh:mm:sss,fff
 * where fff represents milliseconds 
 * @returns {number} - timecode in seconds 
 */
function timecodesToSeconds(timecodeStringHHMMSSFFF){
    var tcArray = timecodeStringHHMMSSFFF.split(":");
    var hoursInSeconds = parseInt(tcArray[0],10) * 60 * 60;
    var minutesInSeconds = parseInt(tcArray[1],10) * 60;
    // seconds and milliseconds are joined together for this calculation by replacing the comma with a full stop.
    var secondsAndMilliseconds = parseFloat(tcArray[2].replace(/,/,'.'));
    return hoursInSeconds+minutesInSeconds+secondsAndMilliseconds;
}


// convert srt 
function convertSrtToJson(captionsString){
    //split srt string into array. where each element it's a line of the srt file.
    var srtArray = captionsString.split("\n");
    //define regex for recognising components of the srt file. number. timecodes, words in a line, empty space between lines
    //line counter regex
    var oneDigit = /^[0-9]+$/;
    //timecode regex
    // "00:00:06,500 --> 00:00:10,790" there seems to be some cases where the milliseconds have 2 digits
    var twoTimeCodes =  /\d{2}:\d{2}:\d{2},\d{2,3} --> \d{2}:\d{2}:\d{2},\d{2,3}/
    var words = /\w/;

    //setup data structure to save results as as array of line objects.
    var result = []
    // initialise first line object outside of the loop ensure persistency for the different attributes across file lines.
    var lineO = {};
    
    srtArray.forEach((line)=>{
        //issue a round charatcher windwos/mac \n \r messing up the code.
        if(oneDigit.test(line.split("\r")[0])){
            //line object is reset when we encounter a new srt line counter, rather then after the line text, ebcause number of line text can be variable.
            lineO = {};
            lineO.id = line;
        }else if (twoTimeCodes.test(line)) {
            var timecodes = line.split(" --> ")
            lineO.startTime = timecodes[0]
            lineO.endTime = timecodes[1]
            //because number of lines in srt is variable, 1 or 2 generally, but we don't want to be opionionated about that just in case. and because We split on `\n` then needs to do a bunch of different passages to add all the text. so initialising the text as empty string after the timecode var is best way to add that attribute.
            lineO.text ="";
        }else if(words.test(line)){
            lineO.text +=line+"\n";
        }else{
            //also save line when done
            result.push(lineO);
        }
    })
    return result;
} 

function openFile(filePath){
    return fs.readFileSync(filePath).toString('utf8');
}

module.exports = convert;

// var sampleSrt = '/Users/pietropassarelli/Desktop/Demo_media/BBC_interview/23 glas blower INT.srt'
// convert(sampleSrt)