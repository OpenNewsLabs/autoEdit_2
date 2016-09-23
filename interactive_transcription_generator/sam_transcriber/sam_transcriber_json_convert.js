var fs = require("fs");

function parseSamJsonToTranscripJson(transcriptionJson){
  var wordCounter = 0;//
  var result = [];
  var line ={"line":[]};
  for(var i =0; i< transcriptionJson.length; i++){
    var oldLine = transcriptionJson[i];
    // console.log("line")
    // console.log(line)
    // console.log(i)
    for(var k =0; k< oldLine.words.length; k++){
      var oldWord = oldLine.words[k];
      // console.log("word")
      // console.log(oldWord)
      // console.log(k)
      var newWord = {
        id: wordCounter,
        text: oldWord.word,
        startTime: oldWord.start,
        endTime: oldWord.end
      };


      //TODO: this counter doesn't seem right.
      //might be worth initialising a counter outside the most outer loop.
      //assign it here,
      //and then increment it straight after.
      line.id =i;

      ////////////////////////
      //could have transcript but then this would be a duplicate. if that is edited with content editable.
      // line.text = oldWord.transcript;//
      line.starTime = oldLine.words[0].start;//
      line.endTime =  oldLine.words[oldLine.words.length-1].end;//
      ////////////////////////
      line.line.push(newWord);

      wordCounter+=1;//
    }
    result.push(line);
    line ={"line":[]};
  }


  // console.log(JSON.stringify(result))
  // console.log("here<-----")
  return result;
}

// //test
// var demo= "/Users/pietropassarelli/Dropbox/CODE/Vox/TBVE_frontEnd/nwjs_backbone_sails_transcription/backEnd/api/services/sam_transcriber/tmp/sam.final.tramscription.json"
//
// var demoContent = JSON.parse(fs.readFileSync(demo).toString());
// // console.log(demoContent)
// parseSamJsonToTranscripJson(demoContent, function(res){
//   // console.log(JSON.stringify(res))
//   fs.writeFileSync("./tmp/parsed.sam.transcription.json",JSON.stringify(res) )
// })

module.exports = parseSamJsonToTranscripJson;
