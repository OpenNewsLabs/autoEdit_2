'use strict';
var path = require('path');
var Backbone = require('backbone');
var config = require('../../../config');

//
// getting transcriptions for paperedit
var Transcriptions = require('../collections/transcriptions');

// http://backbonejs.org/#Model
module.exports = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: path.join(config.serverUrl, 'paperedit'),
  defaults: {
    title: 'Default Title ',
    description: 'Default Description',
    offset: '00:00:00:00',
    // papercuts
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
    // this.id = this._id;

    this.transcriptionsList = new Transcriptions();
    // console.log("this.transcriptionsList",this.transcriptionsList);


    this.on('invalid', function(model, error) {
      console.info(error);
    });

    this.on('change', function() {
      // console.info('- Values for this model have changed.');
    });

    this.on('change:events', function() {
      // console.log('text value for this model has changed.');
    });
    this.on('destroy', function() {
    });
  }
}, {

  modelType: 'paperedit',
});
