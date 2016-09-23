/**
 * sorting concat json, deleting tmp audio files, and returning
 takes in data array of ibm watson json stt, callback for final json to output
 */
var fs = require('fs');

function writeOut(data, cb) {
  // console.log("################# 4. writeOut")
  var out = [];

  data = data.sort(function(a, b) {
    return a.f.offset - b.f.offset;
  });

  data.forEach(function(d) {
    out = out.concat(d.data.sentences);
  });

  //removing temp audio files
  if (data.length > 1) {
    data.forEach(function(d) {
      fs.unlink(d.f.name);
    });
  }

  //output json of transcription
  // fs.writeFileSync("./tmp/sam.final.tramscription.json",JSON.stringify(out ))
  return out;
}

module.exports = writeOut;
