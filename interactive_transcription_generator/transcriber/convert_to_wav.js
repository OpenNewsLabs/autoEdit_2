/**
* @module convert_to_wav
* @description Convers video file into wav (or any ffmpeg supported input)
* takes in input file, output destination file, and callback,
* callback returns audio file name/path
* @requires fluent-ffmpeg
*/

//TODO: refactor with fluent ffmpeg so that can add ffmpeg bin to config json and input

var ffmpeg = require('fluent-ffmpeg');

/**
 * @function convertToWav
 * @param {string} file -  path to audio or viceo file to convert to wav
 * @param {string} audioFile - path to output wav audio file
 * @param {string} ffmpegPath - path to ffmpeg binary. If not present it will try to use system one.
 * @returns {callback} callback - callback to return audio file path as string. 
*/
function convertToWav(file,audioFile,ffmpegPath, callback) {

    //setting ffmpeg binary path
  if(ffmpegPath) {
    ffmpeg.setFfmpegPath(ffmpegPath);
  } else {
    console.warn("ffmpeg binary path not defined, so using system one. if available");
  }

  //running ffmpeg comand 
  var comand = ffmpeg(file)
                .noVideo()
                .audioCodec('pcm_s16le')
                .audioChannels(1)
                .audioFrequency(16000)
                .output(audioFile)
                .on('end',
                //listener must be a function, so to return the callback wrapping it inside a function
                  function(){
                    callback(audioFile)
                  }
                  || function() {
                     console.log('Finished processing');
                  }
                ).run();
}

module.exports = convertToWav;
