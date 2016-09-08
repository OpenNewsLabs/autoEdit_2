var send_to_gentle = require("./gentle_stt.js");
var gentleParser = require("./parse_gentle_stt.js")


function transcribe(audio, cb){

	send_to_gentle(audio, function(gentleJson){
	  // console.log("finished!!!!")
	  // console.log(JSON.stringify(gentleJson, null, '\t'))

	 var lines = gentleParser(gentleJson)
	 
		 if(cb){
		 	cb(lines)
		 }else{
		 	return lines
		 }

	})

}

module.exports = transcribe;