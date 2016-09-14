/**
* Convers video file into wav (or any ffmpeg supported input)
* takes in input file, output destination file, and callback,
* callback returns audio file name/path
*/

//TODO: refactor with fluent ffmpeg so that can add ffmpeg bin to config json and input

var ffmpeg = require('fluent-ffmpeg');

function convertToWav(file,aud_file,exampleFfmpegPath, callback) {

  ffmpeg.setFfmpegPath(exampleFfmpegPath);

  var comand = ffmpeg(file)
                .noVideo()
                .audioCodec('pcm_s16le')
                .audioChannels(1)
                .audioFrequency(16000)
                // .audioBitrate(audioBitRateFor100mbSize)
                // .videoBitrate(audioBitRateFor100mbSize, true)
                .output(aud_file)
                .on('progress', function(progress) {
                  //  progress // {"frames":null,"currentFps":null,"currentKbps":256,"targetSize":204871,"timemark":"01:49:15.90"}
                  // console.log('Processing: ' + progress.timemark + ' done ' + progress.targetSize+' kilobytes');
                })
                .on('end',
                //listener must be a function, so to return the callback wrapping it inside a function
                  function(){
                    callback(aud_file)
                  }
                  || function() {
                     console.log('Finished processing');
                  }
                ).run();
}
  module.exports = convertToWav;
