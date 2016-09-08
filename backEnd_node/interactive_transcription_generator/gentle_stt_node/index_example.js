// index_example.js

var  transcribe =  require("./index.js")

var demo_audio  ="/Users/pietropassarelli/Dropbox/CODE/Vox/TBVE_components/2_process_transcription/gentle_stt_node/norman_door_trimmed.mp4.wav";



transcribe(demo_audio, function(resp){
	
	console.log(JSON.stringify(resp, null, '\t'))

})