var send_to_gentle = require("./gentle_stt.js");

var demo_audio  ="/Users/pietropassarelli/Dropbox/CODE/Vox/TBVE/Lotus_v5/backEnd/norman_door.mp4.wav";


send_to_gentle(demo_audio,function(watsonSttJson){
  // console.log("finished!!!!")
  console.log(JSON.stringify(watsonSttJson, null, '\t'))
})