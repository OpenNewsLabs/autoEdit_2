var request = require('request');
var fs = require('fs');

var url = "http://localhost:8765/transcriptions?async=false";

/**
* Takes in file with absolute path. can use node module path to get absolute path of a file.
*/
function send_to_gentle(file, callback) {
  
console.log("Sending request to Gentle STT")

    var options = {
      headers: {
        'Content-Type': 'multipart'
      },
      formData: {
        audio: fs.createReadStream(file)
      }
    };

    request.post(url, options, function(error, response, body) {
      if (error) console.log(error);

      // var parsed = parse(JSON.parse(body));
      if (typeof callback !== 'undefined') {
            // fs.writeFileSync("./tmp/tmp.watson.tramscription.json",JSON.stringify(JSON.parse(body) ))
        callback(JSON.parse(body));
      }
    });
  
}

module.exports = send_to_gentle;
