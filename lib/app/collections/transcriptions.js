'use strict';
var Backbone = require('backbone');
var config = require('../../../config');
var Transcription = require('../models/transcription');

/**
 * Transcriptions collection
 * https://addyosmani.com/backbone-fundamentals/#views-1
 */
module.exports = Backbone.Collection.extend({
  model: Transcription,
  url: config.serverUrl + '/transcription',
  // Filter down the list of all transcription models that are completed.
  completed: function() {
    return this.filter(function(transcription) {
      return transcription.get('status');
    });
  },
  // Filter down the list to only todo items that are still not finished.
  remaining: function() {
    // returns transcription models that are complete, eg status == true
    return this.without.apply(this, this.completed());
  },
  // A nextOrder() method implements a sequence generator while a comparator()
  // sorts items by their insertion order.
  // We keep the Todos in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new items.
  nextOrder: function() {
    if (!this.length) {
      return 1;
    }
    return this.last().get('order') + 1;
  },
  // Todos are sorted by their original insertion order.
  comparator: function(todo) {
    return todo.get('order');
  }
}, {
  // sets type for autoEditAPI to know if we are retrieving model or collection
  modelType: 'transcriptions'
});
