// schema/example of transcription json from Rev
// https://www.rev.com/api/attachmentsgetcontent
// var timecodes = require('node-timecodes');

function convertRevTranscription(revTranscript){
    var text = [];
    var paragraph = {};

    revTranscript.monologues.forEach((monologue,indexP)=>{
        paragraph.id = indexP;
        paragraph.speaker = monologue.speaker_name;
        paragraph.paragraph = [];
        // TODO: Add lines 
        var tmpLine = {
            'id': indexP,
            'startTime':0,
            'endTime': 0,
            'line': []
        }

        paragraph.paragraph.push(tmpLine)
        // remove words that are not text, and that don't have timecodes.
        var monologueELements = monologue.elements.filter((word)=>{
            return word.timestamp !== undefined &&  word.type =='text';
        })

        console.log('monologueELements ', JSON.stringify(monologueELements,null,2));

        monologueELements.forEach((word, index)=>{
            var tmpWord;
            // TODO: exclude other possible punctuation
            // if(word.type =='text' && word.timestamp !== undefined  && word.end_timestamp !== undefined){
            // if(word.type =='text' && word.value !== " " && word.value !== "." && word.value !== "!" && word.value !== "," && word.value !== "?"){
            
                var startTc = revTimecodesToSeconds(word.timestamp);
                var endTc = revTimecodesToSeconds(word.end_timestamp);
                    // startTc =timecodes.toSeconds(startTc);
                    // endTc =  timecodes.toSeconds(endTc);

               console.log('startTc, endTc ',startTc, endTc);

                tmpWord = {
                    id: index,//double check index
                    // convert time-code
                    startTime: startTc,//word.timestamp, //timecodes.toSeconds(word.timestamp),
                    // convert time-code
                    endTime: endTc,//word.end_timestamp,//timecodes.toSeconds(word.end_timestamp),
                    text: word.value
                };
                // console.log(paragraph.paragraph[0].line);
                paragraph.paragraph[0].line.push(tmpWord);
            // }
        });
        
        text.push(paragraph);
        // reset paragraph for next iteration
        paragraph = {};
    })

    // return reorganizeLines(text);
    return text;
}

/**
 * Helper function 
 * Adjust lines time-codes
 */
// function reorganizeLines(text){
//     text.forEach((paragraph)=>{
//         paragraph.paragraph.forEach((line,index)=>{
//             line.startTime = line.line[0].startTime;
//             line.endTime =  line.line[line.line.length-1].endTime;
//             // adjust words ids
//             line.line.forEach((word,index)=>{
//                 word.id =  index;
//             })
//         });
//     });

//     return text;

// }

module.exports = convertRevTranscription;


// Rev timecodes eg  "00:33:19,470"
// converts to '00:33:19:47' by removing last char
// and replacing `,` with `:`
// function convertRevTimecodesToTc(timecodeString){
//     var tmpTcArray = timecodeString.split(',');
//     var tmpTcSecondPart = tmpTcArray[1].split('');
//     tmpTcSecondPart.pop();
//     var tmpTcFirstPart = tmpTcArray[0];
//     var result = `${tmpTcFirstPart}:${tmpTcSecondPart.join("")}`;
//     return result;
// }

/**
 * 
 * @param {stirng} timecodeStringHHMMSSFFF, eg '00:33:19,470' 
 * as described in their documentation https://www.rev.com/api/attachmentsgetcontent
 * timestamp format is hh:mm:sss,fff
 * where fff represents milliseconds 
 * @returns {number} - timecode in seconds 
 */
function revTimecodesToSeconds(timecodeStringHHMMSSFFF){
        var tcArray = timecodeStringHHMMSSFFF.split(":");
        var hoursInSeconds = parseInt(tcArray[0],10) * 60 * 60;
        var minutesInSeconds = parseInt(tcArray[1],10) * 60;
        // seconds and milliseconds are joined together for this calculation by replacing the comma with a full stop.
        var secondsAndMilliseconds = parseFloat(tcArray[2].replace(/,/,'.'));
        return hoursInSeconds+minutesInSeconds+secondsAndMilliseconds;
}