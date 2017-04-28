'use strict';
var Backbone = require('backbone');
var render = require('./utils').render;

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
    // console.warn("transcription list element");
    // console.warn(this);

    this.listenTo(this.model, 'change', this.render);

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
    if (confirm("You sure you want to delete this transcription?")) {
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

  render: function(){
    var sectionTemplate = render('transcriptionElementIndex', this.model.attributes);
    this.$el.html(sectionTemplate);
    return this;
  }
});
