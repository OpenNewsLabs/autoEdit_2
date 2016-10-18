var request = require('request');
var fs = require('fs');

var url = "http://localhost:8765/transcriptions?async=false";

/**
* Takes in file with absolute path. can use node module path to get absolute path of a file.
*/
function send_to_gentle(config, callback) {
  var file = config.audio;
  var text;
  if(typeof config.text !== 'undefined'){
    text  = config.text;
  }
 
  //TODO: text is optional check if exists
  var text = config.text;
  console.log(text)

  console.log("Sending request to Gentle STT")

    var options = {
      headers: {
        'Content-Type': 'multipart'
      },
      formData: {
        audio: fs.createReadStream(file)
      }
    };

    //if there is a text attribute adding it to the form data 
    if(typeof text !== 'undefined'){
      options.formData.transcript = fs.createReadStream(text);
    }

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
