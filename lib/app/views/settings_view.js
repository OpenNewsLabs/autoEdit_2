'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var render = require('./utils').render;

/**
* Backbone view for transcription form for creating a new transcription
* @class TranscriptionFormView
* @constructor
* @extends Backbone.View
*/
module.exports = Backbone.View.extend({
 tagName: 'div',
 className: 'container',

 initialize: function(options){
   this.options = options;
   this.settings = options.settings;
   _.bindAll(this, 'render');
 },

 events :{
   'click #submitBtnIbmCredentials': 'saveIBM',
   'click #submitBtnSpeechmaticsCredentials': 'saveSpeechmatics',
   'click #submitBtnRevCredentials': 'saveRev',
   "keypress .form-control": "onEnterListener"
 },

 onEnterListener: function(e){
  var key = e.which || e.keyCode;
    if (key === 13 ) { // 13 is enter
      // code for enter
      e.preventDefault();
    }
  },

  saveIBM: function(e){
    e.preventDefault();
    //SAVE IBM credentialls  
    var ibmCredentials = {};
    ibmCredentials.username  = this.$('input[name=username-ibm]').val().trim();
    ibmCredentials.password  = this.$('input[name=password-ibm]').val().trim();
    ibmCredentials.url  = this.$('input[name=url-ibm]').val().trim();
   //TODO: double check this
    if((ibmCredentials.username  != "") && (ibmCredentials.password != "")){
      //save 
      window.setWatsonAPIkeys(ibmCredentials);
      window.alert("Thank you! Saved the IBM keys so you don't have to enter them again.");
    }else{
      alert("Please add valid credentials to save");
    }
    // End Save IBM crdentials 
  },
   saveSpeechmatics: function(e){
      e.preventDefault();
    //SAVE IBM credentialls  
    var speechmaticsCredentials = {};
    speechmaticsCredentials.username  = this.$('input[name=username-speechmatics]').val().trim();
    speechmaticsCredentials.password  = this.$('input[name=password-speechmatics]').val().trim();
   //TODO: double check this
    if((speechmaticsCredentials.username  != "") && (speechmaticsCredentials.password != "")){
      //save 
      window.setSpeechmaticsAPIkeys(speechmaticsCredentials);
      window.alert("Thank you! Saved the Speechmatics keys so you don't have to enter them again.");
    }else{
      alert("Please add valid credentials to save");
    }
  },

  saveRev: function(e){
    e.preventDefault();
  //SAVE IBM credentialls  
  var revCredentials = {};
  revCredentials.username  = this.$('input[name=username-rev]').val().trim();
  revCredentials.password  = this.$('input[name=password-rev]').val().trim();
 //TODO: double check this
  if((revCredentials.username  != "") && (revCredentials.password != "")){
    //save 
    window.setRevAPIkeys(revCredentials);
    window.alert("Thank you! Saved the Rev keys so you don't have to enter them again.");
  }else{
    alert("Please add valid credentials to save");
  }
},


  render: function(){
    this.$el.html(render('settingsTemplate',  this.settings));
      return this;
    }
  });
