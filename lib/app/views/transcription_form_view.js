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
  events :{
  	'click #submitBtn': 'save'
  },

  save: function(e){
  	e.preventDefault();

    var sttEngine; 

    //reading values from form 
    var newTitle        = this.$('input[name=title]').val();
    var newDescription  = this.$('textarea[name=description]').val();;
    var newFilePath     = this.$('input[name=file]').val();
    var newLanguage     = $('#languageModel').find(":selected")[0].value;

    if($('#IBMoption')[0].checked){
      sttEngine         = "ibm";
    }else if($('#genelteOption')[0].checked){
       sttEngine        = "gentle";
    };
    
    var newSTTLanguage  = $('#IBMoption')[0].checked;

  	this.model.save({title: newTitle, description: newDescription,videoUrl:newFilePath, languageModel: newLanguage, sttEngine: sttEngine},{
      success: function(mode, response, option){      
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
