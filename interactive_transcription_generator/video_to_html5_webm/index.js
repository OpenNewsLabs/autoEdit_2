/**
 * @module video_to_html5_webm
 * @description Converts audio or video file into a HTML5 video webm.
 * uses code from [this issue/question from fluent-ffmepg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/274)
 * to understand the ffmpeg used to encode webm video see [this guide](https://trac.ffmpeg.org/wiki/Encode/VP8)
 * @author Pietro Passarelli 
 * @example <caption>Example usage</caption>

  convert_video({
    src: "path/to/vide_file.mov",
    outputName: "path/to/webm_file.webm",
    ffmpegBin: "path/to/bin/ffmpge",
    callback: function(resp){
      // do something with output, path to webm video
    }
  });
* @example <caption>Example of object retunred video webm html5 </caption>
  {
    videoOgg: "path/to/video/webmFile.webm",
    processedVideo: true 
  }
 * @requires fluent-ffmpeg
 * @requires an ffmpeg binary. For example if packaged inside a nwjs app. This can be set in config attributes options.
 */
"use strict";

var ffmpeg = require('fluent-ffmpeg');

/**
 * @function convert
 * @description Takes in a config object with propreties: src, outputName, ffmpegBin and optional callback.
 * @param {object} config - The parameter containting attribute options.
 * @param {string} config.src - full path of video or audio to convert.
 * @param {string} config.outputName - full path of video file name, needs to have `.webm` extension.
 * @param {string} config.ffmpegBin - Path to the ffmpeg binary. Optional, if no provided it will try to use system one if present.
 * @returns {callback} config.callback - Optional callback to return when video done processing. It returns the converted webm path name. Same as `config.outputName` input.
 */
var convert = function(config){

  var videoSrc = config.src;
  var outputName = config.outputName;
  var callback;

  //optional callback
  if(config.callback){
    callback = config.callback;
  }

  //setting ffmpeg bin, optional. if not specified in input fluent-ffmpeg will try to use system one if present. 
  if(config.ffmpegBin){
    ffmpeg.setFfmpegPath(config.ffmpegBin);
  }else{
    //case in which ffmpeg bin not provided in input and not present on system not covered.
    console.warn("ffmpeg binary path not defined, so using system one. if available.");
  }

  //executing ffmpeg comand 
  ffmpeg(videoSrc)
    .output(outputName)
    .withVideoCodec('libvpx')
    .addOptions(['-qmin 0', '-qmax 50', '-crf 5'])
    .withVideoBitrate(1024)
    .withAudioCodec('libvorbis')
    //when done executing returning output file name to callback 
    .on('end', function(){ callback(outputName); })
    .run();
};

module.exports = convert;
