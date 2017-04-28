'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var TranscriptionListElementView = require('./transcription_list_element_view');
var render = require('./utils').render;

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
    this.listenTo(transcriptions, 'sync',   this.render);
    this.listenTo(transcriptions, 'destroy', this.render);
    this.listenTo(transcriptions, 'add',     this.render);

    // Temporary way to auto update on transcription status change. unit in
    // milliseconds, checking for transcriptions update every 1/2 minute.
    setInterval(function() {
      if (transcriptions.remaining().length > 0) {
        transcriptions.fetch({reset: true});
      }
    }, 30000);
  },

  render: function() {
    // if there are  transcriptions it shows
    this.$el.empty();
    this.$el.append("<ol class='breadcrumb'><li class='active'>Transcriptions</li></ol>");
    if (!this.collection.isEmpty()) {
      this.collection.each(this.addOne, this);
      return this;
      // if there are no transcriptions it shows helpfull message to create a new one
    } else {
      this.$el.html(render('homePage'));
      return this;
    }
  },
  
  addOne: function(transcriptionItem) {
    var transcriptionView = new TranscriptionListElementView({model: transcriptionItem});
    this.$el.append(transcriptionView.render().el);
  }
});
