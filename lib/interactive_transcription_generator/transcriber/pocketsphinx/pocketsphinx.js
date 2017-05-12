// 'use strict';

var Path = require('path');
var spawn = require('child_process').spawn;
/**
* pocketSphinx function to convert audio file meeting pocketSphinx specs to text
* takes in audio file
* returns string of transcription formatted by pocketSphinx see line 43 for example
*/
function pocketSphinx(path, cb) {
  console.log("entering pocketSphinx function")
  // var filename = path.replace('.temp.wav', '') + '.transcription.txt';

// TODO: replace __dirname with path where pockestphinx stuff is found, if not provided, then use __dirname?
//pocketsphinx folder, move in `lib/bin`

//TODO: check if __dirname needs refactoring into proccess etc..like for ffmpeg or if __dirname is ok.
//https://github.com/cmusphinx/pocketsphinx/blob/master/doc/pocketsphinx_continuous.1
  var args = [
    '-infile', path,
    //Print word times in file transcription.
    '-time', 'yes',
    //to write log messages in
    '-logfn', '/dev/null',
    //Num of speech frames to keep before silence to speech.
    '-vad_prespeech', '10',
    //Num of silence frames to keep after from speech to silence.
    '-vad_postspeech', '50',
    //Feature stream type, depends on the acoustic model
    '-feat', '1s_c_d_dd	1s_c_d_dd',
    //pronunciation dictionary (lexicon) input file
    '-dict', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/cmudict-en-us.dict'),
    //word pronunciation dictionary input file
    '-fdict', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/noisedict'),
    //containing feature extraction parameters.
    '-featparams', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/feat.params'),
    //containing acoustic model files.
    '-hmm', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us'),
    //trigram language model input file
    '-lm', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us.lm.bin'),
    //definition input file
    '-mdef', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/mdef'),
    //gaussian means input file
    '-mean', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/means'),
    //dump (compressed mixture weights) input file
    '-sendump', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/sendump'),
    //state transition matrix input file
    '-tmat', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/transition_matrices'),
    //gaussian variances input file
    '-var', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/variances')
  ];

  var options = {
    env: {
      'DYLD_LIBRARY_PATH': Path.join(__dirname, 'sphinxbase/lib') + ':' + Path.join(__dirname, 'pocketsphinx/lib/')
    }
  };

  var ps = spawn(Path.join(__dirname, 'pocketsphinx/bin/pocketsphinx_continuous'), args, options);

  // console.log("path ps", Path.join(__dirname, 'pocketsphinx/bin/pocketsphinx_continuous'), args, options);
  // console.log("ps",ps);

  var transcript = '';

  //TODO: some issue here running spawn, buffer in memory?
  //see if there is a pocketsphinx node module with the binary. 
  //see if nwjs has prefered way of running child process. 
  //TODO: otherwise use buffer object in js?
  //Probl not do with issue with nwjs. 
  ps.stdout.on('data', function(data) {

    console.log("transcribing...");
    transcript += '' + data;
    console.log("transcript:", transcript);
//console.log(transcript)
// how do you destroy i said i needed
// <s> 0.160 0.180 0.998501
// how 0.190 0.340 0.070404
// do 0.350 0.510 0.740274
// you 0.520 0.890 0.979021
// destroy 0.900 1.260 0.768872
// i 1.270 1.490 0.201456
// said 1.500 1.700 0.611245
// <sil> 1.710 2.050 0.992924
// i 2.060 2.240 0.329978
// needed(2) 2.250 2.640 0.435223
// </s> 2.650 3.040 1.000000
  });

  ps.on('close', function(code) {
    console.log("close", code);
    console.info("transcript on close:", transcript);
    cb(transcript);
  });
}


// pocketSphinx('./test.mp4.temp.wav',function(pocketsphinx_text){
//   console.log(pocketsphinx_text)
//   console.log("here")
//
//   // pocketSphinxTextConverter.convert(pocketsphinx_text, function(hypertranscript){
//   //   console.log(hypertranscript)
//   // })
//
// })


module.exports = pocketSphinx;
