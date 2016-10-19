/**
 * @file Manages the backend of the app by overwrighting backbone.sync function
 * @author Pietro Passarelli 
 * @requires fs
 * @requires path
 * @requires linvodb
 * @requires level-js
 * @requires interactive_transcription_generator/index.js
 * @todo Write documentation.
 * @todo add error handling and error callbacks
 */

//checking that we are in NWJS enviroment 
// if (window.frontEndEnviromentNWJS) {
  var fs = require("fs")
  var transcription_generate = require("../interactive_transcription_generator/index.js");
  var path = require('path');
  var LinvoDB = require("linvodb3");
  LinvoDB.defaults.store = { db:  require("medeadown") }; //medea level-js
  //TODO:change db with medea
  //+db path, for now in root of app, to be change so that in config where user can set where they want it, but also provide a default. 
  // LinvoDB.dbPath = path.join(process.cwd(), "/db"); 
  LinvoDB.dbPath = window.config.dataPath;

  //setting up transcription model in database.
  var transcriptionModel = "transcription";
  // Non-strict always, can be left empty
  var schema = { }; 
  var options = { };
  var Transcription = new LinvoDB(transcriptionModel, schema, options);

  /**
  * @constructs autoEdit2API
  * @description API Object to override Backnone.sync
  * @param {object} method - Backbone RESTfull method request.
  * @param {object} model - Backbone model being handled.
  * @param {object} options - Sucess or failure callback.
  */
  var autoEdit2API = function(method, model, options){
    autoEdit2API[method](model, options.success, options.error)
  }

  /**
  * @function 
  * @description Create functionality, mapped to REST POST
  * @param {object} method - Backbone RESTfull method request.
  * @param {object} model - Backbone model being handled.
  * @param {object} options - Sucess or failure callback.
  * @returns {object} sucess callback with backbone model containing db id
  */
  autoEdit2API.create = function(model, success, error){
    if( model.constructor.modelType == "transcription"){
      
      var newElement = model.toJSON();
      //create transcription element to save in db 
      var transcription = new Transcription(newElement);
      //save transcription in db
      transcription.save(function(err) {
        //updating backbone with saved transcritpion, containing db id
        model.set(transcription);
        //returning saved transcription callback
        success(model);
      });

      //setting up media folders for media and tmp media on local file system, user libary application support folder 
      var tmpMediaFolder = window.config.dataPath+"/tmp_media";
      var mediaFolder = window.config.dataPath+"/media"
      //if media folder does not exists create it
      if (!fs.existsSync(tmpMediaFolder)){
        console.log("tmpMediaFolder folder not present, creating tmpMediaFolder folder")
          fs.mkdirSync(tmpMediaFolder);
      }else{
        // do nothing, build folder was already there
        console.log("tmpMediaFolder folder was already present")
      }
      //if temp media folder does not exists create it
      if (!fs.existsSync(mediaFolder)){
        console.log("mediaFolder folder not present, creating mediaFolder folder")
          fs.mkdirSync(mediaFolder);
      }else{
        // do nothing, build folder was already there
        console.log("mediaFolder folder was already present")
      }

      // using interactive_transcription_generator to generate metadata, 
      // transcription json 
      // webm video preview 
      transcription_generate({
        id: transcription._id,
        videoUrl: newElement.videoUrl,
        title: newElement.title,
        description: newElement.description,
        //TODO: this is hardcoded, and this variable is not used, fix me!
        // tmpWorkFolder:"/",
        // destFolder:"/media",
        tmpWorkFolder: tmpMediaFolder,
        destFolder: mediaFolder,
        keys: global.keys,
        languageModel: newElement.languageModel,
        sttEngine: newElement.sttEngine,
        cbMetadata:function(respM){
          meta = respM;
          //update current transcription with metadata data
          Transcription.findOne({ _id: transcription._id }, function (err, trs) {
            console.info("got metadata for transcription: "+transcription._id)
            trs.metadata = respM;
            //saving current transcription
            trs.save(function(err) {
              // app.trigger('updateTranscription:'+trs._id);
            });
          });
        },
        cbTranscription: function(resp){
          //updating current transcription with transcription json.
          Transcription.findOne({ _id: resp.id }, function (err, trs) {
            console.info("got transcription json for transcription: "+ trs._id);
            //updating transcription attributes with result
            trs.audioFile = resp.audioFile;
            trs.processedAudio = resp.processedAudio;
            trs.text = resp.text;
            trs.status = resp.status;
            //saving current transcription 
            trs.save(function(err) {
              // app.trigger('updateTranscription:'+trs._id);
            });
          });
        },
        cbVideo: function(resp){
          //updating current transcription with webm html5 video preview.
          Transcription.findOne({ _id: transcription._id}, function (err, trs) {
            console.info("got video webm back for transcription: "+ trs._id);
            //updating transcription attributes with result
            trs.videoOgg = resp.videoOgg;
            trs.processedVideo = resp.processedVideo;
            //saving current transcription 
            trs.save(function(err) {
              // app.trigger('updateTranscription:'+trs._id);
            });
          });
        }
      });
    }
  }

  /**
  * @function 
  * @description Read functionality,Find all  and fine One, mapped to REST GET
  * @param {object} method - Backbone RESTfull method request.
  * @param {object} model - Backbone model being handled.
  * @param {object} options - Sucess or failure callback.
  * @returns {object} sucess callback with backbone model
  */
  autoEdit2API.read = function(model, success, error){
    //If a colleciton
    if (model.models) {
      console.info("Collection:" +model.constructor.modelType )
      //for transcription model
      if( model.constructor.modelType == "transcriptions"){
        //look in database
        Transcription.find({}, function (err, transcriptions) {
          //return transcription collection 
          success(transcriptions);
        });
      }//if transcription collection
    }else {
      //if a model 
      console.info("Model: "+model.constructor.modelType)
      //for transcription model
      if(model.constructor.modelType == "transcription"){
        //looks in database using transcription id
        Transcription.findOne({ _id: model._id }, function (err, transcription) {     
            //return transcription model
            success(transcription)
        });
      }
    }
  }

  /**
  * @function 
  * @description Update functionality, mapped to REST PUT
  * @param {object} method - Backbone RESTfull method request.
  * @param {object} model - Backbone model being handled.
  * @param {object} options - Sucess or failure callback.
  * @returns {object} sucess callback with backbone model
  */
  autoEdit2API.update = function(model, success, error){
    //for transcription model
    if(model.constructor.modelType == "transcription"){
      //looks in database using transcription id
      Transcription.findOne({ _id: model.get("_id") }, function(err, doc) {
        //TODO: there's got to be a better way to do this
        //NOTE: rather then using update, which did not seemed to be optimised for speed.
        //uses `findOne`, replaces attributes with new once.
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
        //saving transcription to database
        doc.save(function(err) {
          //returning sucess callback with backbone model to client side
          success(model);
        });
      });
    } 
  }

  /**
  * @function 
  * @description Patch functionality, mapped to REST PUT
  * @param {object} method - Backbone RESTfull method request.
  * @param {object} model - Backbone model being handled.
  * @param {object} options - Sucess or failure callback.
  * @returns {object} sucess callback with backbone model
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
        });
      });
    }
  }

  /**
  * @function 
  * @description Delete functionality, mapped to REST Delete
  * @param {object} method - Backbone RESTfull method request.
  * @param {object} model - Backbone model being handled.
  * @param {object} options - Sucess or failure callback.
  * @returns {object} sucess callback with backbone model
  */
  autoEdit2API.delete = function(model, success, error){
    ///for transcription model
    if(model.constructor.modelType == "transcription"){
      //looks in database using transcription id
      //worth looking into alternative
      //https://github.com/Ivshti/linvodb3#removing-from-the-collection 
      Transcription.remove({ _id: model._id }, {multi: false }, function (err, numRemoved) {
          //removing media associated with transcription.
          //TODO: this only deletes the video if the video has done processing. think about refactoring so that attribute can be present before processing starts. As it is now this means incomplete vidoes are left in the folder if the transcription is deleted
          if(model.attributes.processedVideo){
            //TODO: review if this is the right way to check if the file exists before deleting it. 
            if(fileExists( model.attributes.videoOgg)){
              fs.unlinkSync( model.attributes.videoOgg);  
            }
          }
          //if the trascription has been shown the audio will always be present because is needed to generate the text transcription. But having test here just in case
          if(model.attributes.audioFile){
            if(fileExists( model.attributes.audioFile)){
              fs.unlinkSync( model.attributes.audioFile);
            } 
          }
          //returns sucess callback
          success(model);
        // }); 
      });
    }
  }



  /**
  * @function fileExists
  * @description helper function to check if a file exists
  * @param {string} filename - the file path to check.
  * returns {boolean} - True if it exists, False if it doesn't
  */
  function fileExists(filename){
  try{
    require('fs').accessSync(filename)
    return true;
  }catch(e){
    return false;
  }
}

  module.exports = autoEdit2API;
// }//if in NWJS enviroment 



