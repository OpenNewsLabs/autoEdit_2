
var metadataReader = require('../../interactive_transcription_generator/video_metadata_reader/index.js');
//TODO: how to test this module without testing the ffprobe binary? What is a good way to deal with the media dependency to run the test? eg you need an audio or video file to run the test.
var recodeSampleVideo = "/Users/pietropassarelli/INCOMING_FILES/autoEdit_demo_videos/RecodeLiveEditing_test/Bowman.mov";
// var exampleFfprobePath = "/Users/pietropassarelli/Dropbox/CODE/Vox/SubtitleBurner_project/SubtitleBurner/bin/ffprobe";

//TODO: why here the file is relative to root of app but in metadataReader module require is nested inside spec folder?
var exampleFfprobePath = "./interactive_transcription_generator/bin/ffprobe";

var expectedMetadataEDL = { 
  filePathName: '/Users/pietropassarelli/INCOMING_FILES/autoEdit_demo_videos/RecodeLiveEditing_test/Bowman.mov',
  fileName: 'Bowman.mov',
  date: '2016-02-18 16:38:20',
  reelName: 'time',
  timecode: 'NA',
  fps: '1/60000',
  duration: 2287.285 
}

describe("Video Metadata Reader ", function() {
  //https://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support
  var result;

  beforeEach(function(done) {

    metadataReader.read({
    file: recodeSampleVideo,
    ffprobePath: exampleFfprobePath,
    callback: function(resp){
      // console.log(resp)
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
