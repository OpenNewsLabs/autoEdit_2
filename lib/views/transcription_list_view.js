'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var TranscriptionListElementView = require('./transcription_list_element_view');

/**
 * Backbone view for transcriptions list
 * @class TranscriptionsListView
 * @constructor
 * @extends Backbone.View
 */
module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'container',
  initialize: function() {
    var transcriptions = this.collection;
    this.listenTo(transcriptions, 'fetch',   this.render);
    this.listenTo(transcriptions, 'destroy', this.render);
    this.listenTo(transcriptions, 'add',     this.render);

    // Temporary way to auto update on transcription status change. unit in
    // milliseconds, checking for transcriptions update every 1/2 minute.
    setInterval(function() {
      if (transcriptions.remaining().length > 0) {
        transcriptions.fetch({reset: true});
      }
    }, 30000);

    transcriptions.fetch({reset: true});
  },

  render: function() {
    // if there are  transcriptions it shows
    if (!this.collection.isEmpty()) {
      $(this.el).empty();
      this.collection.each(this.addOne, this);
      return this;
      // if there are no transcriptions it shows helpfull message to create a new one
    } else {
      // this.$el.append
      this.$el.html($('#homePage').html());
      return this;
    }
  },

  addOne: function(transcriptionItem) {
    var transcriptionView = new TranscriptionListElementView({model: transcriptionItem});
    this.$el.append(transcriptionView.render().el);
  }
});
