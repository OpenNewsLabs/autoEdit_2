'use strict';
/**
 * @module db
 * @description Manages the backend of the app by overwrighting backbone.sync function
 * @author Pietro Passarelli
 * @requires fs
 * @requires linvodb
 * @requires medeadown
 * @requires interactive_transcription_generator/index.js
 * @todo Write documentation.
 * @todo add error handling and error callbacks
 */

var path = require("path");
var fs = require('fs');
var LinvoDB = require('linvodb3');
var transcription_generate = require('../lib/interactive_transcription_generator/index.js');
var medeadown = require('medeadown');

var dataPath = window.nw.App.dataPath;

LinvoDB.defaults.store = { db: medeadown };

// +db path, for now in root of app, to be change so that in config where user
// can set where they want it, but also provide a default.
// LinvoDB.dbPath = path.join(process.cwd(), '/db');
LinvoDB.dbPath = dataPath;

// setting up transcription model in database.
var transcriptionModel = 'transcription';
// Non-strict always, can be left empty
var schema = {};
var options = {};
var Transcription = new LinvoDB(transcriptionModel, schema, options);

var DB = {};

// Setting up media folders for media and tmp media on local file system,
// user libary application support folder
var tmpMediaFolder = path.join(dataPath, 'tmp_media');
var mediaFolder = path.join(dataPath, 'media');

// if media folder does not exists create it
if (!fs.existsSync(tmpMediaFolder)) {
  console.debug('tmpMediaFolder folder not present, creating tmpMediaFolder folder');
  fs.mkdirSync(tmpMediaFolder);
} else {
  // do nothing, build folder was already there
  console.debug('tmpMediaFolder folder was already present');
}

// if temp media folder does not exists create it
if (!fs.existsSync(mediaFolder)) {
  console.debug('mediaFolder folder not present, creating mediaFolder folder');
  fs.mkdirSync(mediaFolder);
} else {
  // do nothing, build folder was already there
  console.debug('mediaFolder folder was already present');
}

/**
 * Create a callback function for LinvoDB queries
 * @param {function} success - Success callback
 * @param {function} error - Error callback
 * @returns {fuction} callback for LinvoDB
 */
function makeLinvoCallback(success, error) {
  return function(err, found) {
    if (err) {
      // if we have an error, log it and bail
      console.error(err);
      return error(err);
    }

    // return transcription collection
    success(found);
  };
}

/**
 * @function
 * @description Create functionality, mapped to REST POST
 * @param {object} method - Backbone RESTfull method request.
 * @param {object} model - Backbone model being handled.
 * @param {object} options - Sucess or failure callback.
 * @returns {object} sucess callback with backbone model containing db id
 */
DB.create = function(model, success, error) {
  console.debug('DB.create', model.constructor.modelType);
  if (model.constructor.modelType == 'transcription') {
    var newElement = model.toJSON();
    // create transcription element to save in db
    var transcription = new Transcription(newElement);
    // save transcription in db
    transcription.save(function(err) {
      if (err) {
        // if we have an error, log it and bail
        console.error(err);
        return error(err);
      }

      // updating backbone with saved transcritpion, containing db id
      model.set(transcription);

      // returning saved transcription callback
      success(model);

      // using interactive_transcription_generator to generate metadata,
      // transcription json
      // webm video preview
      transcription_generate({
        id: transcription._id,
        videoUrl: newElement.videoUrl,
        title: newElement.title,
        description: newElement.description,
        // TODO: this is hardcoded, and this variable is not used, fix me!
        // tmpWorkFolder:"/",
        // destFolder:"/media",
        tmpWorkFolder: tmpMediaFolder,
        destFolder: mediaFolder,
        keys: window.IBMWatsonKeys,
        languageModel: newElement.languageModel,
        sttEngine: newElement.sttEngine,
        cbMetadata: function(respM) {
          console.log("respM");
          console.log(respM);
          // update current transcription with metadata data
          Transcription.findOne({ _id: transcription._id }, function (err, trs) {
            console.debug('got metadata for transcription: ' + trs._id);
            console.log(trs);
            trs.metadata = respM;
            console.log("inside transcription find after assigning trs.to meta");
            console.log(trs.metadata);
            // saving current transcription
            trs.save(function(err) { 
              console.log("trs");
              console.log(trs);
              if (err) console.error(err); 
            });
          });
        },
        cbTranscription: function(respT) {
          // updating current transcription with transcription json.
          Transcription.findOne({ _id: transcription._id }, function (err, trs) {
            console.debug('got transcription json for transcription: ' + trs._id);
            console.log(trs);
            // updating transcription attributes with result
            trs.audioFile = respT.audioFile;
            trs.processedAudio = respT.processedAudio;
            trs.text = respT.text;
            trs.status = true;
            // saving current transcription
            trs.save(function(err) { 
              console.warn("does the transcription contain the metadata");
               console.warn(trs.metadata);
               console.log(trs);
               model.set(trs);

              if (err) console.error(err); });
          });
        },
        cbVideo: function(respV) {
          // updating current transcription with webm html5 video preview.
          Transcription.findOne({ _id: transcription._id }, function (err, trs) {
            console.debug('got video webm back for transcription: ' + trs._id);
            // updating transcription attributes with result
            trs.videoOgg = respV.videoOgg;
            trs.processedVideo = respV.processedVideo;
            // saving current transcription
            trs.save(function(err) { if (err) console.error(err); });
          });
        }
      });

    });
  }
};

/**
 * @function
 * @description Read functionality,Find all  and fine One, mapped to REST GET
 * @param {object} method - Backbone RESTfull method request.
 * @param {object} model - Backbone model being handled.
 * @param {object} options - Sucess or failure callback.
 * @returns {object} sucess callback with backbone model
 */
DB.read = function(model, success, error) {
  // If a colleciton
  if (model.models) {
    console.debug('DB.read', 'Collection', model.constructor.modelType);
    // for transcription model
    if (model.constructor.modelType === 'transcriptions') {
      // look in database
      Transcription.find({}, makeLinvoCallback(success, error));
    }// if transcription collection
  } else {
    console.debug('DB.read', 'Model', model.constructor.modelType, model.get('_id'));
    // for transcription model
    if (model.constructor.modelType === 'transcription') {
      // looks in database using transcription id
      Transcription.findOne({ _id: model.get('_id') }, makeLinvoCallback(success, error));
    }
  }
};

/**
 * @function
 * @description Update functionality, mapped to REST PUT
 * @param {object} method - Backbone RESTfull method request.
 * @param {object} model - Backbone model being handled.
 * @param {object} options - Sucess or failure callback.
 * @returns {object} sucess callback with backbone model
 */
DB.update = function(model, success, error) {
  console.debug('DB.update', model.constructor.modelType);
  // for transcription model
  if (model.constructor.modelType == 'transcription') {
    // looks in database using transcription id
    Transcription.findOne({ _id: model.get('_id') }, function(err, doc) {
      // TODO: there's got to be a better way to do this
      // NOTE: rather then using update, which did not seemed to be optimised for speed.
      // uses `findOne`, replaces attributes with new once.
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
      // saving transcription to database
      doc.save(makeLinvoCallback(success, error));
    });
  }
};

/**
 * @function
 * @description Patch functionality, mapped to REST PUT
 * @param {object} method - Backbone RESTfull method request.
 * @param {object} model - Backbone model being handled.
 * @param {object} options - Sucess or failure callback.
 * @returns {object} sucess callback with backbone model
 */
DB.patch = function(model, success, error) {
  console.debug('DB.patch', model.constructor.modelType);
  if (model.constructor.modelType == 'transcription') {
    Transcription.findOne({ _id: model.get('_id') }, function(err, doc) {
      // TODO: there's got to be a better way to do this
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

      doc.save(makeLinvoCallback(success, error));
    });
  }
};

/**
 * @function
 * @description Delete functionality, mapped to REST Delete
 * @param {object} method - Backbone RESTfull method request.
 * @param {object} model - Backbone model being handled.
 * @param {object} options - Sucess or failure callback.
 * @returns {object} sucess callback with backbone model
 */
DB.delete = function(model, success, error) {
  console.debug('DB.delete', model.constructor.modelType);
  // /for transcription model
  if (model.constructor.modelType == 'transcription') {
    // looks in database using transcription id
    // worth looking into alternative
    // https://github.com/Ivshti/linvodb3#removing-from-the-collection
    Transcription.remove({ _id: model.get('_id') }, {multi: false }, function (err, numRemoved) {
      if (err) {
        console.error(err);
        error(err);
      } else if (numRemoved < 1) {
        var msg = "Couldn't delete transcription " + model.get('_id');
        console.error(msg);
        error(msg);
      } else {
        // removing media associated with transcription.
        // TODO: this only deletes the video if the video has done processing. think about refactoring so that attribute can be present before processing starts. As it is now this means incomplete vidoes are left in the folder if the transcription is deleted
        if (model.attributes.processedVideo && fs.existsSync(model.attributes.videoOgg)) {
          fs.unlinkSync(model.attributes.videoOgg);
        }
        // if the trascription has been shown the audio will always be present because is needed to generate the text transcription. But having test here just in case
        if (model.attributes.audioFile && fs.existsSync(model.attributes.audioFile)) {
          fs.unlinkSync(model.attributes.audioFile);
        }
        // returns sucess callback
        console.debug('Deleted transcription ' + model.attributes._id);
        success(model);
      }
    });
  }
};

/**
 * @function
 * @description API Object to override Backnone.sync
 * @param {object} method - Backbone RESTfull method request.
 * @param {object} model - Backbone model being handled.
 * @param {object} options - Sucess or failure callback.
 */
module.exports = function(method, model, options) {
  DB[method](model, options.success, options.error);
};
