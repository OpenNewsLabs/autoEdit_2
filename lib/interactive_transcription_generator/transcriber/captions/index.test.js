var convertSrtToautoEditTranscripJson = require("./index.js");
var captionFilePath = '/Users/pietropassarelli/Dropbox/WB\ full\ interviews_videos/VimeoVersion/JR/Jesselyn_Radack_on_Vimeo.mp4.srt';
var result =  convertSrtToautoEditTranscripJson(captionFilePath);

console.log(result);