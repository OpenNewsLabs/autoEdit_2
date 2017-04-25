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
   initialize: function() {
      console.log("PAPEREDIT NEW FORM");
   },

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
  	e.preventDefault();

    //reading values from form 
    var newTitle        = this.$('input[name=title]').val();
    var newDescription  = this.$('textarea[name=description]').val();;

  	this.model.save({title: newTitle, description: newDescription},{
      success: function(mode, response, option){      
           Backbone.history.navigate("paperedits", {trigger:true}); 
      },
      error: function(model, xhr,options){
        var errors = JSON.parse(xhr.responseText).errors;
        alert("ops, something when wrong with saving the paperedit:" + errors)
      }
    });
  },


  render: function(){
    this.$el.html(render('papereditFormTemplate', this.model.attributes));
    return this;
  }
});
