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
  // initialize: function() {
      // TODO: load json with transcriptions languages, from IBM watson, and make choice menu with those.
  // },
  events :{
  	'click #submitBtn': 'save',
    "keypress .form-control": "onEnterListener"

  },

  onEnterListener: function(e){
    var key = e.which || e.keyCode;
    if (key === 13 ) { // 13 is enter
      // code for enter
       e.preventDefault();
    }
  },

  save: function(e){
    //TODO: there might be a better way to get values from a form in backbone? 
    //as well as setup user validation?
  	e.preventDefault();
    var sttEngine; 
    //reading values from form 
    var newTitle        = this.$('input[name=title]').val();
    var newDescription  = this.$('textarea[name=description]').val();;
    //removing # carachter coz it breaks file path as it gets converted to %23
    //TODO: there might be other symbols that have effect. figure proper way to sanitise input
    var newFilePath     = this.$('input[name=file]').val();
    var newLanguage     = $('#languageModel').find(":selected")[0].value;

    //TODO: There has to be a better way to get the value of radio buttons check boxes
    if($('#IBMoption')[0].checked){
      sttEngine         = "ibm";
    }else if($('#genelteOption')[0].checked){
       sttEngine        = "gentle";
    }else if($('#pocketSphinxOption')[0].checked){
      sttEngine        = "pocketsphinx";
    }
    
    var newSTTLanguage  = $('#IBMoption')[0].checked;

  	this.model.save({title: newTitle, 
      description: newDescription,
      videoUrl:newFilePath, 
      languageModel: newLanguage, 
      sttEngine: sttEngine},
      { success: function(mode, response, option){      
           Backbone.history.navigate("transcriptions", {trigger:true}); 
      },
      error: function(model, xhr,options){
        var errors = JSON.parse(xhr.responseText).errors;
        alert("ops, something when wrong with saving the transcription:" + errors)
      }
    });
  },

  render: function(){
    this.$el.html(render('transcriptionFormTemplate', this.model.attributes));
    return this;
  }
});
