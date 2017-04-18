'use strict';
var path = require("path");
var fromSecondsForSrt = require('../../srt').fromSecondsForSrt;
var fromSeconds =  require('node-timecodes').fromSeconds;
var createSrtContent = require('../../srt').createSrtContent;
var Backbone = require('backbone');
var config = require('../../../config');

// http://backbonejs.org/#Model
module.exports = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: path.join(config.serverUrl, 'paperedit'),
  defaults: {
    title: 'Default Title ',
    description: 'Default Description',
    offset: "00:00:00:00",
    //papercuts 
    events: []
  },

  // validate
  // http://beletsky.net/2012/11/baby-steps-to-backbonejs-model.html
  //  or
  // https://github.com/thedersen/backbone.validation
  // example https://jsfiddle.net/thedersen/udXL5/
  validate: function(attributes) {
    if (!attributes.title) {
      return 'Remember to set a title for your section.';
      // }else if(!attributes.videoUrl){
      //   return 'Remember to pick a video file';
    }
  },

  // initializer
  initialize: function() {
    // catch error if invalid initialization.
    // console.log('This model has been initialized.');
    // this.id = this._id;

    this.on('invalid', function(model, error) {
      console.info(error);
    });

    this.on('change', function() {
      // console.info('- Values for this model have changed.');
    });

    this.on('change:events', function() {
      console.log('text value for this model has changed.');
    });
    this.on('destroy', function() {
    });
  }

  // app.TranscriptionsList.get(1).constructor.returnSrtJson()
  // https://stackoverflow.com/questions/9686001/get-a-backbone-model-instances-model-class-name
}, {

  modelType: 'paperedit',

  // TODO: change this to returnSrt coz that's what it is doing
  // and make rturns srtJson in helper function in model


});
