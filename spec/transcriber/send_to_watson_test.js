////SESSION + JSON
var watsonTranscribe = require("./send_to_watson.js");
// var demo_audio = "norman_door.mp4.temp.wav";
// var demo_audio = "/Users/pietropassarelli/Desktop/ndt.wav";
// var demo_audio  ="/Users/pietropassarelli/Dropbox/CODE/Vox/TBVE_components/2_process_transcription/gentle_stt_node/norman_door_trimmed.mp4.wav";
var demo_audio = "/Users/pietropassarelli/Desktop/MediaParty/MVI_9545_test.wav.wav.0.wav";
// ./norman_door_trimmed2.mp4.temp.wav

var keys = require("/Users/pietropassarelli/Dropbox/CODE/Vox/TBVE/Lotus_v9/wttskeys.json")
// var keys = {
//   username: '',
//   password: '',
// }
// watsonTranscribe.setKeys(keys)

watsonTranscribe(demo_audio, keys,function(watsonSttJson){
  // console.log("finished!!!!")
  console.log(JSON.stringify(watsonSttJson))
})

//expecting
// {"results":[{"alternatives":[{"word_confidence":[["good",0.5226654096561781],["sign",0.8968980265341627],["that's",0.33068099683985763],["a",0.5004924982939409],["really",0.9225775917431259],["big",0.33090172790390293],["deal",0.06063344866732878],["Lenormand",0.2752494104476093],["door",0.5567587025325377],["is",0.999999999999964],["one",0.9999999999999509],["with",0.8283391360408389],["a",0.544415806086574],["design",0.9505787607300696],["told",0.43942960858989005]],"confidence":0.621,"transcript":"good sign that's a really big deal Lenormand door is one with a design told ","timestamps":[["good",0.13,0.33],["sign",0.33,0.68],["that's",0.68,0.95],["a",0.95,1],["really",1,1.49],["big",1.52,1.81],["deal",1.81,2.12],["Lenormand",2.59,3.07],["door",3.07,3.32],["is",3.32,3.5],["one",3.5,3.75],["with",3.75,3.9],["a",3.9,3.93],["design",3.93,4.41],["told",4.41,4.68]]}],"final":true}],"result_index":0}