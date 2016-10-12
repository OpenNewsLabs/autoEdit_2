/**
  var config = {
  videoUrl: "",
  title: "",
  description: "",
  tmpWorkFolder: "",
  destFolder:""
  }
  */
var fs = require("fs");
var path = require("path");

var generate = function(config) {
  //TODO: adda tmp word folder, and dest folder in var?
  var transcribe = require("./sam_transcriber/index.js");
  var convert_video = require("./video_to_html5_webm/index.js");
  var MetadataReader = require("./video_metadata_reader/index.js");
  // console.log(process.cwd())

  //NOTE_if running index_example, need to change the path of bin
  var ffmpegPath =  process.cwd() + "/interactive_transcription_generator/bin/ffmpeg";
  // var ffmpegPath =  "./interactive_transcription_generator/bin/ffmpeg";
  //TODO: move to local bin
  var ffprobePath = process.cwd() + "/interactive_transcription_generator/bin/ffprobe";

  // var ffprobePath = "./interactive_transcription_generator/bin/ffprobe";

  var videoFile = config.videoUrl;
  //TODO: do .tmp/audio  folder for audio files in root of sails
  // var audioFileName = "./"+path.parse(videoFile).base+".wav";
  var videoFileName = path.parse(videoFile).base;
  videoFileName = videoFileName.replace(/\s+/g,"_");
  // var currentDir = process.cwd().split(path.sep)[process.cwd().split(path.sep).length -1];

  //Make audio and webm file unique. Eg so that if upload same video twice it gets different audio and video preview.
  //by using `timeNowFileName()`  in `frontEnd/date_now/index.js`
  // var audioFileName     = process.cwd() + config.destFolder + "/" + videoFileName +"."+Date.now()+ ".wav";
  // var oggOutputNamePath = process.cwd() + config.destFolder + "/" + videoFileName +"."+Date.now()+ ".webm";

  var audioFileName     = config.destFolder + "/" + videoFileName +"."+Date.now()+ ".wav";
  var oggOutputNamePath = config.destFolder + "/" + videoFileName +"."+Date.now()+ ".webm";

  // TODO: use system application data folder
  var appRootFolderForMedia = config.tmpWorkFolder;
  // ""+ process.cwd()+"/.tmp/"+path.parse(videoFile).base+".ogg"
  // var audioFileAbsolutePath = path.resolve(audioFileName)
  var audioFileAbsolutePath = audioFileName;

  // TODO: use system temp folder
  // var tmpFolderCwd = process.cwd() + "/tmp_media";
  // var tmpFolder = path.resolve(tmpFolderCwd);
  var tmpFolder = config.tmpWorkFolder;



  // var newTranscription= {
  //  title: config.title,
  //  description: config.description,
  //  videoUrl: config.videoUrl,
  //  // status: false,
  //  // text:
  //  //videoOgg:
  //  //metadata:
  // }


  //  // cb to save // return transcription to save 

  // /////////////////////////////////////////
  // console.log(config.keys)
  //spawn new process 

  //TODO: add language / model var, argument
  transcribe({
    videoFile: config.videoUrl,
    // keys: global.keys,
    keys: config.keys,
    audioFileOutput: audioFileAbsolutePath,
    ffmpegBin: ffmpegPath,
    ffprobePath: ffprobePath,
    tmpPath: tmpFolder,
    languageModel: config.languageModel,
    sttEngine: config.sttEngine,

    callback: function(respTranscriptJson){
      console.log("###############-ITG Done transcribing"+videoFile);
      console.log("config.videoUrl "+ config.videoUrl);
      // console.log(JSON.stringify(respTranscriptJson));

      var created = {};
      var paragraphs = [{"id":0,  "speaker": "Unamed Speaker ","paragraph":{}}];
      //update paragraphs of transcription
      paragraphs[0].paragraph = respTranscriptJson;

      created.status = true;
      created.text = paragraphs;

      var tmpAudioDirPath = path.parse(audioFileAbsolutePath).dir;
      var tmpAudioDir = appRootFolderForMedia;
      var tmpAudioName = path.parse(audioFileAbsolutePath).base;
      //".." because root is index which is inside `frontEnd` and 
      created.audioFile =  audioFileName;
      // created.audioFile =  ".."+config.destFolder+"/"+tmpAudioName;
      // console.log("created.audioFile")
      // console.log(created.audioFile)

      created.processedAudio= true;
      created.id = config.id;
      created.videoFile = videoFile;

      console.log("###############-ITG updates transcription"+videoFile);

      if(config.cbTranscription){
        console.info("inside interactive_transcription_generator index created.videoFile: "+ created.videoFile);
        // fs.writeFileSync("/"+created.videoFile+".json",JSON.stringify(created, null,"\t"));

        config.cbTranscription(created);
      }
      //Callback to save

    } //callback transcriber
  }); //transcriber

  /////////////////////////////////////////

  //spawn new process
  MetadataReader.read({
    file: videoFile,
    ffprobePath: ffprobePath,
    callback: function(resp){
      console.log("###############-ITG metadata "+videoFile);
      // console.log(JSON.stringify(resp));
      //add metadata to transcription
      // created.metadata = resp;

      //CALLBACL HERE 

      if(config.cbMetadata){
        config.cbMetadata(resp);
      }
      //callback to save

    }//end callback
  });//end read metadata


  /////////////////////////////////////////

  ////spawn new process 
  convert_video({
    src: videoFile,
    outputName: oggOutputNamePath,
    ffmpegBin: ffmpegPath,
    callback: function(outputName){
      console.log("#########-ITG Saving webm video file "+JSON.stringify(outputName));
      var tmpVideoDirPath = path.parse(outputName).dir;

      var created = {};

      var tmpVideoDir = appRootFolderForMedia;
      var tmpFileName = path.parse(outputName).base;

      // created.videoOgg =  tmpVideoDir+ "/"+tmpFileName;
      created.videoOgg = oggOutputNamePath;
      created.processedVideo= true;
      //CALLBACK HERE 

      if(config.cbVideo){
        config.cbVideo(created);
      }
    }
  });
};
//InteractiveTranscriptionGenerator({videoUrl: "",title: "",description: "", tmpWorkFolder: "",destFolder:"" })

module.exports = generate;

// example use
// var iTg = new InteractiveTranscriptionGenerator();
// iTg.generate({
//  /// config with callbacks
// })
