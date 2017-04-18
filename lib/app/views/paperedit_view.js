'use strict';
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var render = require('./utils').render;
var FileSaver = require('file-saver');
var moment = require('moment');
var fromSeconds =  require('node-timecodes').fromSeconds;
var EDL = require('../../edl_composer/index');


/**
* Backbone view for transcription view for individual transcriptions 
* @class TranscriptionView
* @constructor
* @extends Backbone.View
*/
module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'container-fluid',
  //TODO: change this so that id is interpolated from model this.el.id or this.el.ciud
  id: "paperedit-n",//+this.model.id+"",

  initialize: function() {
 
   },
 
  events:{
    
  },



  //keyboard event using mouse trap backbone version 
  keyboardEvents: {
   
  },

 
  /**
  * @function render
  */
  render: function(){    
    this.model.attributes.id = this.model.attributes._id;
    var sectionTemplate = render('papereditShow', this.model.attributes);
    this.$el.html(sectionTemplate);
    ///end of modify compiled template to update hilights. 
    return this;
  }
  
});
