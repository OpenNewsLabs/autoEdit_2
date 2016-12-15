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
      console.log("in interval");
      console.log(transcriptions);
      if (transcriptions.remaining().length > 0) {

        transcriptions.fetch({reset: true});
        console.warn("after fetch");
        console.log(transcriptions);
      }
    }, 30000);
    
    // transcriptions.fetch({reset: true});
  },

  render: function() {
    console.debug('Render transcription list view');
    // if there are  transcriptions it shows
    if (!this.collection.isEmpty()) {
      this.$el.empty();
      console.debug("build TranscriptionsList");
      this.collection.each(this.addOne, this);
      return this;
      // if there are no transcriptions it shows helpfull message to create a new one
    } else {
      // this.$el.append
      // TODO: there seems to be a bug on this line, object is not a function.
      this.$el.html(render('homePage'));
      return this;
    }
  },

  addOne: function(transcriptionItem) {
    console.debug(transcriptionItem.attributes);
    var transcriptionView = new TranscriptionListElementView({model: transcriptionItem});
    this.$el.append(transcriptionView.render().el);
  }
});
