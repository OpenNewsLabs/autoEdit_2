'use strict';
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

/**
 * Backbone view for single Transcription model view to be used in view for
 * collection TranscriptionsListView
 * @class TranscriptionListElementView
 * @constructor
 * @extends Backbone.View
 */
module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'media',
  initialize: function() {

  },
  events:{
    "click #transcriptionCard": "showTranscription",
    "click button.editBtn": "editTranscription",
    "click button.deleteBtn": "deleteTranscription"
  },
  showTranscription: function(){
    //navigate to transcription page
    //TODO: is this the right way to do this?
    Backbone.history.navigate("transcription/"+this.model.cid, {trigger:true});
  },

  //TODO: delete is not working properly 
  deleteTranscription: function(){
    var r = confirm("You sure you want to delete this transcription?");
    if (r == true) {
      this.model.destroy({success: function(model, response) {
        // app.transcriptionRouter.transcriptionsList.fetch({reset: true}); 
        // Backbone.history.navigate("transcriptions", {trigger:true}); 
      }})
    } else {
      alert("Transcription was not deleted")

    }
  },

  editTranscription: function(){
    alert("Edit transcription")
  },

  template: _.template($('#transcriptionIndex').html()),

  render: function(){
    var sectionTemplate = this.template(this.model.attributes);
    this.$el.html(sectionTemplate);
    return this;
  }
});
