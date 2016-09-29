if (window.frontEndEnviromentNWJS) {
  var fs = require("fs")
  var transcription_generate = require("../interactive_transcription_generator/index.js");
  
  var path = require('path');
  var LinvoDB = require("linvodb3");
  //TODO:change db with medea
  LinvoDB.defaults.store = { db: require("level-js") };
  //TODO: db path, for now in root of app, to be change so that in config where user can set where they want it, but also provide a default. 
  // LinvoDB.dbPath = process.cwd()+"/db"; 
  var transcriptionModel = "transcription";
  var schema = { }; // Non-strict always, can be left empty
  var options = { };
  var Transcription = new LinvoDB(transcriptionModel, schema, options);
  // LinvoDB.dbPath = process.cwd() 

  var autoEdit2API = function(method, model, options){
    autoEdit2API[method](model, options.success, options.error)
  }

  /**
  * Create 
  */
  autoEdit2API.create = function(model, success, error){
    if( model.constructor.modelType == "transcription"){
      
      var newElement = model.toJSON();
      var transcription = new Transcription(newElement);

      transcription.save(function(err) {
        model.set(transcription);
        success(model);
      });//first transcription save

      transcription_generate({
        id: transcription._id,
        videoUrl: newElement.videoUrl,
        title: newElement.title,
        description: newElement.description,
        //TODO: this is hardcoded, and this variable is not used, fix me!
        tmpWorkFolder:"/",
        destFolder:"/media",
        keys: global.keys,
        languageModel: newElement.languageModel,
        sttEngine: newElement.sttEngine,
        cbMetadata:function(respM){
          meta = respM;
          console.log("cbMetadata -before: "+ transcription._id);
          Transcription.findOne({ _id: transcription._id }, function (err, trs) {
            console.log("cbMetadata -after findOne: "+ trs._id);
            trs.metadata = respM;
            trs.save(function(err) {
              /* we have updated the Earth doc */
              // app.trigger('updateTranscription:'+trs._id);
            });
          });
        },
        cbTranscription: function(resp){
          console.log("videoUrl after cbTranscription iTG " +newElement.videoUrl);
          console.log("videoUrl after cbTranscription iTG " +resp.videoFile);

          console.log("resp from cbTranscription");
          console.log(resp);
          console.log("cbTranscription -before: "+ transcription._id);
          console.log("resp id: "+ resp.id);
          Transcription.findOne({ _id: resp.id }, function (err, trs) {
            console.log("cbTranscription -after findOne: "+ trs._id);
            trs.audioFile = resp.audioFile;
            trs.processedAudio = resp.processedAudio;
            trs.text = resp.text;
            trs.status = resp.status;
            trs.save(function(err) {
              // app.trigger('updateTranscription:'+trs._id);
            });
          });
        },
        cbVideo: function(resp){
          console.log("cbVideo -before: "+ transcription._id);
          Transcription.findOne({ _id: transcription._id}, function (err, trs) {
            console.log("cbVideo -after findOne: "+ trs._id);
            trs.videoOgg = resp.videoOgg;
            trs.processedVideo = resp.processedVideo;
            trs.save(function(err) {
              // app.trigger('updateTranscription:'+trs._id);
            });
          });

        }//video cb
      });//transcription_generate
    }//if transcription model 
  }//create

  /**
  * Read - Find all  and fine One
  fine one not currently in use  
  */
  autoEdit2API.read = function(model, success, error){
    //If a colleciton
    if (model.models) {
      console.log("a collection")
      console.log(model.constructor.modelType)
      if( model.constructor.modelType == "transcriptions"){
        Transcription.find({}, function (err, transcriptions) {
          // console.log(transcriptions)
          success(transcriptions);
        });
      }//if transcription collection
    //if a model 
    }else {
      console.log("a model")
      console.log(model.constructor.modelType)
      if(model.constructor.modelType == "transcription"){
        Transcription.findOne({ _id: model._id }, function (err, transcription) {     
            success(transcription)
        });
      }//if transcription model 
    }//if else 
  }//read

  /**
  * Update 
  */
  autoEdit2API.update = function(model, success, error){
    if(model.constructor.modelType == "transcription"){
      Transcription.findOne({ _id: model.get("_id") }, function(err, doc) {
        //TODO: there's got to be a better way to do this
        doc.text                = model.attributes.text;
        doc.languageModel       = model.attributes.languageModel;
        doc.counterForPaperCuts = model.attributes.counterForPaperCuts;
        doc.processedAudio      = model.attributes.processedAudio;
        doc.processedVideo      = model.attributes.processedVideo;
        doc.status              = model.attributes.status;
        doc.highlights          = model.attributes.highlights;
        doc.title               = model.attributes.title;
        doc.videoUrl            = model.attributes.videoUrl;
        doc.sttEngine           = model.attributes.sttEngine;
        doc.audioFile           = model.attributes.audioFile;
        doc.metadata            = model.attributes.metadata;

        doc.save(function(err) {
          success(model);
        });
      });//Transcription "update"
    }//if transcription 
  }//update

  /**
  * Update/patch 
  */
  autoEdit2API.patch = function(model, success, error){
    if(model.constructor.modelType == "transcription"){
       Transcription.findOne({ _id: model.get("_id") }, function(err, doc) {
        //TODO: there's got to be a better way to do this
        doc.text                = model.attributes.text;
        doc.languageModel       = model.attributes.languageModel;
        doc.counterForPaperCuts = model.attributes.counterForPaperCuts;
        doc.processedAudio      = model.attributes.processedAudio;
        doc.processedVideo      = model.attributes.processedVideo;
        doc.status              = model.attributes.status;
        doc.highlights          = model.attributes.highlights;
        doc.title               = model.attributes.title;
        doc.videoUrl            = model.attributes.videoUrl;
        doc.sttEngine           = model.attributes.sttEngine;
        doc.audioFile           = model.attributes.audioFile;
        doc.metadata            = model.attributes.metadata;

        doc.save(function(err) {
          success(model);
        });//save
      });//transcription "patch"
    }//if
  }

  /**
  * Destroy  
  */
  autoEdit2API.delete = function(model, success, error){
    if(model.constructor.modelType == "transcription"){
      Transcription.findOne(model._id, function(err, transcription) {
        transcription.remove(function() {
          //removing media ssociated with transcription.
          if(model.attributes.processedVideo){
            fs.unlinkSync( model.attributes.videoOgg);     
          }
          // if(model.attributes.processedAudio){
            fs.unlinkSync( model.attributes.audioFile); 
          // }
          success(model);
        });//remove 
      });//find
    }//if transcription
  }

  module.exports = autoEdit2API;
}//if in NWJS enviroment 