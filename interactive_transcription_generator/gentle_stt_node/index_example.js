// index_example.js

var  transcribe =  require("./index.js")

var demo_audio ="/Users/pietropassarelli/Desktop/test/app/interactive_transcription_generator/gentle_stt_node/norman_door_trimmed.mp4.wav";
var demo_text = "./demo.txt"


transcribe({audio: demo_audio,text: demo_text}, function(resp){
	
	console.log(JSON.stringify(resp, null, '\t'))

})


