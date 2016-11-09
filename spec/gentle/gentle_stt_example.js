//probably not testable this 

var send_to_gentle = require("./gentle_stt.js");
var demo_audio  ="demo_audio.wav";
send_to_gentle({audio: demo_audio},function(watsonSttJson){
  console.log(JSON.stringify(watsonSttJson, null, '\t'))
})
/////// allign 

var send_to_gentle = require("./gentle_stt.js");
var demo_audio  ="demo_audio.wav";
var demo_text = "./demo.txt"
send_to_gentle({audio: demo_audio, text: demo_text},function(watsonSttJson){
  console.log(JSON.stringify(watsonSttJson, null, '\t'))
})