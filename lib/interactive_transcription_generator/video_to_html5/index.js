/**
 * @module video_to_html5
 * @description Converts audio or video file into a HTML5 video mp4.
 *  previous version was using webm as explained here:
 * uses code from [this issue/question from fluent-ffmepg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/274)
 * to understand the ffmpeg used to encode webm video see [this guide](https://trac.ffmpeg.org/wiki/Encode/VP8)
 *
 * now uses: mp4
 *  @author Pietro Passarelli
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
'use strict';

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
var convert = function(config) {

  var videoSrc = config.src;
  var outputName = config.outputName;
  var callback;

  // optional callback
  if (config.callback) {
    callback = config.callback;
  }

  // setting ffmpeg bin, optional. if not specified in input fluent-ffmpeg will try to use system one if present.
  if (config.ffmpegBin) {
    ffmpeg.setFfmpegPath(config.ffmpegBin);
  } else{
    // case in which ffmpeg bin not provided in input and not present on system not covered.
    console.warn('ffmpeg binary path not defined, so using system one. if available.');
  }


  // TODO if it's audio - check with fluent-ffmpeg - ffprobe
  // https://stackoverflow.com/questions/12390402/use-fluent-ffmpeg-to-tell-if-a-file-is-a-video-or-audio
  // make separe module

    // convert to video with image
    // https://superuser.com/questions/700419/how-to-convert-mp3-to-youtube-allowed-video-format
    // ffmpeg -loop 1 -r 1 -i pic.jpg -i audio.mp3 -c:a copy -shortest output.mp4
  
    // where pic.jpg can be a black img
    // make separate module

  // Convert to MP4
  // ffmpeg -i inputfile -vf "scale=-1:360" -c:v libx264 -preset ultrafast -crf 40 output.mp4
  // executing ffmpeg comand - mp4
  ffmpeg(videoSrc)
    .output(outputName)
    .withVideoCodec('libx264')
    // for details on the ffmpeg flags see https://trac.ffmpeg.org/wiki/Encode/H.264
    .addOptions(['-preset ultrafast', '-f mp4', '-vf scale=-1:360', '-crf 28', '-tune zerolatency','-movflags +faststart' ])
    // .withVideoBitrate(1024)
    .withAudioCodec('aac')
    // when done executing returning output file name to callback
    .on('end', function() { callback(outputName); })
    .run();

};

module.exports = convert;
