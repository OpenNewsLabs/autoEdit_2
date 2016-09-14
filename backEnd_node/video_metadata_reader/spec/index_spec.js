var metadataReader = require('../index.js');

var recodeSampleVideo = "/Users/pietropassarelli/INCOMING_FILES/autoEdit_demo_videos/RecodeLiveEditing_test/Bowman.mov";

var exampleFfprobePath = "/Users/pietropassarelli/Dropbox/CODE/Vox/SubtitleBurner_project/SubtitleBurner/bin/ffprobe";
//I don't think you need ffmpeg bin for this module, but not sure how to test it
// var exampleFfmpegPath = "/Users/pietropassarelli/Desktop/nwjs_transcription_rnd/transcriber/bin/ffmpeg";


// config = {};
// config.file = recodeSampleVideo;
// config.ffprobePath = exampleFfprobePath;
// config.callback = function(resp){
//   console.log(resp);
// };

var expectedMetadataEDL = {
  "filePathName": "/Users/pietropassarelli/INCOMING_FILES/autoEdit_demo_videos/RecodeLiveEditing_test/Bowman.mov",
  "fileName": "Bowman.mov",
  "date": "2016-02-18 16:38:20",
  "reelName": "time",
  "timecode": "00:01:18:56",
  "fps": "1/60000",
  "duration": 2287.285
}

describe("Video Metadata Reader ", function() {
  //https://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support
  var result;

  beforeEach(function(done) {
    // config.callback = function(resp){
    //   result = resp;
    //     done();
    // };
    metadataReader.read({
    file: recodeSampleVideo,
    ffprobePath: exampleFfprobePath,
    callback: function(resp){
      result = resp;
        done();
    }
  })

})

  it("should Read metada from video", function(done){
    expect(result).toEqual(expectedMetadataEDL);
    done();
  });

  it("it should read file name", function(done){
    expect(result.fileName).toEqual(expectedMetadataEDL.fileName);
    done();
  });

  it("it should read file path", function(done){
    expect(result.filePathName).toEqual(expectedMetadataEDL.filePathName);
    done();
  });

  it("it should read card/reel name", function(done){
    expect(result.reelName).toEqual(expectedMetadataEDL.reelName);
    done();
  });

  it("it should read fps", function(done){
    expect(result.fps).toEqual(expectedMetadataEDL.fps);
    done();
  });

  it("it should read duration", function(done){
    expect(result.duration).toEqual(expectedMetadataEDL.duration);
    done();
  });

  it("it should read camera timecode (tc start)", function(done){
    expect(result.timecode).toEqual(expectedMetadataEDL.timecode);
    done();
  });

});
