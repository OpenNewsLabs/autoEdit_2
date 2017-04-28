/**
 * @module video_metadata_reader
 * @description Reads video metadata needed for EDL. reel, timecode, fps. If those fields are not present in the metadata associated with the media file the attributes in the resulting json is replaced with "NA".
 * @example <caption>Example usage</caption>
 var metadataReader = require('./index.js');
 var sampleVideo = "sampleVideo.mov";

  metadataReader.read({
    file: sampleVideo,
    ffprobePath: exampleFfprobePath,
    callback: function(resp){
      console.log(JSON.stringify(resp));
    }
  });

  * @example <caption>Example output from `readVideoMetadataForEDL`</caption>
{ 
   filePathName: '/some_file_path/Bowman.mov',
  date: '2016-02-18 16:38:20',
  reelName: 'time',
  timecode: '00:01:18:56',
  r_frame_rate: ' 30000/1001',
  fps : 29.97,
  duration: 2287.285  // in seconds 
}

 * @author Pietro Passarelli 
 * @requires fluent-ffmpeg
 * @requires path
 */
// "use strict";

var path = require('path');
var ffmpeg = require('fluent-ffmpeg');

/*
 * @function readMetadata.
 * Reads all metadata available from video and audio file using ffprobe.
 * @param {object} config - The parameter containting attribute options.
 * @param {string} config.file - video or audio file to read metadata from.
 * @param {string} config.ffprobePath - path to ffprobe binary. If not present it will try to use system one.
 * @returns {callback} config.callback - Optional callback to return when ffprobe done reading. It returns an json object.
 */
function readMetadata(config){
  var file = config.file;
  var callback;

  if ( config.ffprobePath ) {
    //setting ffprobe bin
    ffmpeg.setFfprobePath(config.ffprobePath);
  } else {
    console.warn("ffprobe binary path not defined, so using system one. if available");
  }

  if(config.callback){
    //optional callback
    callback = config.callback;
  }

  ffmpeg.ffprobe(file, function(err, metadata){
    callback(metadata);
  });
}

/*
 * @function readVideoMetadataForEDL
 * Reads metadata available from video and audio file using ffprobe to return the EDL are.
 * @param {object} config - The parameter containting attribute options.
 * @param {string} config.file - video or audio file to read metadata from.
 * @param {string} config.ffprobePath - path to ffprobe binary. If not present it will try to use system one.
 * @returns {callback} config.callback - Optional callback to return when ffprobe done reading. It returns an object containing metadata info needed for EDL(Edit Decision List): filePathName,fileName,date, reelName, timecode, fps, duration,
 */
function readVideoMetadataForEDL(config){
  var file = config.file;
  var callback = config.callback;
  var video = {};

  if ( config.ffprobePath ) {
    //setting ffprobe bin
    ffmpeg.setFfprobePath( config.ffprobePath );
  } else {
    console.warn("ffprobe binary path not defined, so using system one. if available");
  }

  //running ffprobe   
  ffmpeg.ffprobe(file, function(err, metadata ) {
    // metadata is an object that contains all of the metadata available for the media file. Attributes especially nested onece may or may not be present costently across media files. Hence the following multiple boolean checks before reading attributes.
    //eg if format does not exist ad an attribtue then filename attribute will not be found under format.

    //reading file name 
    if(metadata !== undefined && metadata.format !== undefined && metadata.format.filename !== undefined ){
      video.filePathName = metadata.format.filename;
      var filePathO = path.parse(video.filePathName);
      video.fileName = filePathO.base;
    } else {
      video.filePathName = "NA";
      video.fileName = "NA";
    }

    // reading date
    if( metadata !== undefined && metadata.streams[0] !== undefined && metadata.streams[0].tags !== undefined && metadata.streams[0].tags.creation_time !== undefined ) {
      video.date = metadata.streams[0].tags.creation_time;
    } else {
      video.date = "NA";
    }

    // reading reel 
    if(metadata !== undefined && metadata.streams[2] !== undefined && metadata.streams[2].tags !== undefined &&  metadata.streams[2].tags.reel_name !== undefined){
      video.reelName = metadata.streams[2].tags.reel_name;
    }else {
      video.reelName = "NA";
    }

    // reading timecode eg "00:00:00:00"
    if(metadata !== undefined && metadata.format !== undefined && metadata.format.tags !== undefined &&  metadata.format.tags.timecode !== undefined){
      video.timecode =  metadata.format.tags.timecode;
    }else{
      video.timecode =  "NA";
    }

    // reading fps eg "1/25"
    if(metadata !== undefined && metadata.streams[0] !== undefined && metadata.streams[0].r_frame_rate !== undefined ){
      //https://www.ffmpeg.org/ffmpeg-all.html#Video-rate
      // frame rate eg `30000/1001` is 30000/1001 = 29.97 => Ntsc
      video.r_frame_rate = metadata.streams[0].r_frame_rate;
      //converting to frames per seconds
      var firstNumber     = parseInt(video.r_frame_rate.split("/")[0]);
      var lastNumber      = parseInt(video.r_frame_rate.split("/")[1]);
      video.fps           = parseFloat(firstNumber/lastNumber ).toFixed( 2 ); 

    }else{
      video.r_frame_rate  = "NA";
      video.fps           =  "NA";
    }


    // reading duration eg in secods
    if(metadata !== undefined && metadata.streams[0] !== undefined && metadata.streams[0].duration !== undefined ){
      video.duration = metadata.streams[0].duration;
    }else{
      video.duration = "NA";
    }
    //returning metadata EDL info 
    if(callback) { callback(video) } else { return video };
  });
}


module.exports = {
  read: readVideoMetadataForEDL,
  readMetadata: readMetadata
};
