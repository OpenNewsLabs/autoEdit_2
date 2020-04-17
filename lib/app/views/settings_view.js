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

  initialize: function(options) {
    this.options = options;
    this.settings = options.settings;
    // _.bindAll(this, 'render');
  },

  events: {
    'click #submitBtnIbmCredentials': 'saveIBM',
    'click #submitBtnSpeechmaticsCredentials': 'saveSpeechmatics',
    'click #submitBtnAssemblyaiCredentials': 'saveAssemblyai',
    'click #submitBtnRevCredentials': 'saveRev',
    'click #submitBtnBBCCredentials': 'saveBBC',
    'click #submitBtnTwitterCredentials': 'saveTwitter',
    'keypress .form-control': 'onEnterListener'
  },

  onEnterListener: function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      // code for enter
      e.preventDefault();
    }
  },

  saveIBM: function(e) {
    e.preventDefault();
    // SAVE IBM credentialls
    var ibmCredentials = {};
    ibmCredentials.username  = this.$('input[name=username-ibm]').val().trim();
    ibmCredentials.password  = this.$('input[name=password-ibm]').val().trim();
    ibmCredentials.url  = this.$('input[name=url-ibm]').val().trim();
    // TODO: double check this
    if ((ibmCredentials.username  != '') && (ibmCredentials.password != '')) {
      // save
      window.setWatsonAPIkeys(ibmCredentials);
      window.alert("Thank you! Saved the IBM keys so you don't have to enter them again.");
    } else {
      alert('Please add valid credentials to save');
    }
    // End Save IBM crdentials
  },
  saveSpeechmatics: function(e) {
    e.preventDefault();
    // SAVE Speechmatics credentialls
    var speechmaticsCredentials = {};
    speechmaticsCredentials.username  = this.$('input[name=username-speechmatics]').val().trim();
    speechmaticsCredentials.password  = this.$('input[name=password-speechmatics]').val().trim();
    // TODO: double check this
    if ((speechmaticsCredentials.username  != '') && (speechmaticsCredentials.password != '')) {
      // save
      window.setSpeechmaticsAPIkeys(speechmaticsCredentials);
      window.alert("Thank you! Saved the Speechmatics keys so you don't have to enter them again.");
    } else {
      alert('Please add valid credentials to save');
    }
  },

  saveAssemblyai: function(e) {
    e.preventDefault();
    // SAVE assemblyai credentialls
    var assemblyaiCredentials = {};
    // speechmaticsCredentials.username  = this.$('input[name=username-speechmatics]').val().trim();
    assemblyaiCredentials.password  = this.$('input[name=password-assemblyai]').val().trim();
    // TODO: double check this
    if ( (assemblyaiCredentials.password != '')) {
      // save
      window.setAssemblyaiAPIkeys(assemblyaiCredentials);
      window.alert("Thank you! Saved the assemblyai keys so you don't have to enter them again.");
    } else {
      alert('Please add valid credentials to save');
    }
  },

  saveRev: function(e) {
    e.preventDefault();
    // SAVE IBM credentialls
    var revCredentials = {};
    revCredentials.username  = this.$('input[name=username-rev]').val().trim();
    revCredentials.password  = this.$('input[name=password-rev]').val().trim();
    revCredentials.url  = this.$('input[name=url-rev]').val().trim();
    // TODO: double check this
    if ((revCredentials.username  != '') && (revCredentials.password != '') && (revCredentials.url != '')) {
    // save
      window.setRevAPIkeys(revCredentials);
      window.alert("Thank you! Saved the Rev keys so you don't have to enter them again.");
    } else {
      alert('Please add valid credentials to save');
    }
  },

  saveBBC: function(e) {
    e.preventDefault();
    // SAVE BBC credentialls
    var bbcCredentials = {};
    bbcCredentials.email  = this.$('input[name=email-bbc]').val().trim();
    // TODO: double check this
    if (this.validateEmail(bbcCredentials.email)) {
    // save
      window.setBBCAPIkeys(bbcCredentials);
      window.alert("Thank you! Saved the BBC email address so you don't have to enter it again.");
    } else {
      alert('Please add valid BBC credentials to save');
    }
  },

  saveTwitter: function(e){
    e.preventDefault();
    let twitterCredentials = {};
    twitterCredentials.consumerKey =  this.$('input[name=tiwtter-consumer-key]').val().trim();
    twitterCredentials.consumerSecret = this.$('input[name=tiwtter-consumer-secret]').val().trim();
    twitterCredentials.accessToken = this.$('input[name=tiwtter-access-token]').val().trim();
    twitterCredentials.accessTokenSecret = this.$('input[name=tiwtter-access-token-secret]').val().trim();

    if(twitterCredentials.consumerKey !== "" && twitterCredentials.consumerSecret !== "" && twitterCredentials.accessToken  !=="" && twitterCredentials.accessTokenSecret !==""){
      window.setTwitterAPIkeys(twitterCredentials);
      window.alert("Thank you! Saved the Twitter credentials  so you don't have to enter it again.");
    }else{
      alert('Please add valid Twitter credentials to save');
    }
  },

  validateEmail: function(email) {
    const re = /\S+@bbc.co.uk/;
    return re.test(email);
  },


  render: function() {
    var cloneOfSettings = JSON.parse(JSON.stringify(this.settings));
    this.$el.html(render('settingsTemplate',  cloneOfSettings ));
    return this;
  }
});
