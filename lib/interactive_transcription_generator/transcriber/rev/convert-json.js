// schema/example of transcription json from Rev
// https://www.rev.com/api/attachmentsgetcontent
var timecodes = require('node-timecodes');

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

        monologue.elements.forEach((word, index)=>{
            var tmpWord;
            // TODO: exclude other possible punctuation
            if(word.type =='text' && word.value !== " " && word.value !== "." && word.value !== "!" && word.value !== "," && word.value !== "?"){
                tmpWord = {
                    id: index,//double check index
                    // convert time-code
                    startTime: word.timestamp, //timecodes.toSeconds(word.timestamp),
                    // convert time-code
                    endTime: word.end_timestamp,//timecodes.toSeconds(word.end_timestamp),
                    text: word.value
                };
                // console.log(paragraph.paragraph[0].line);
                paragraph.paragraph[0].line.push(tmpWord);
            }
        });
        
        text.push(paragraph);
        // reset paragraph for next iteration
        paragraph = {};
    })

    return reorganizeLines(text);
}

/**
 * Helper function 
 * Adjust lines time-codes
 */
function reorganizeLines(text){
    text.forEach((paragraph)=>{
        paragraph.paragraph.forEach((line,index)=>{
            line.startTime = line.line[0].startTime;
            line.endTime =  line.line[line.line.length-1].endTime;
            // adjust words ids
            line.line.forEach((word,index)=>{
                word.id =  index;
            })
        });
    });

    return text;

}

module.exports = convertRevTranscription;

// Rev: 00:00:07,000
// EDL: 00:02:30:12

// converting timecoes with frame to seconds?

// // shaves of last extra zero for time-code conversion. altho not an accurate conversion more of a patch.
// var g = "00:00:07,000".replace(/,/,':').split("")
// g.pop()
// g.join('')