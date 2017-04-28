'use strict';
var Backbone = require('backbone');
var config = require('../../../config');
var Paperedit = require('../models/paperedit');

/**
 * Transcriptions collection
 * https://addyosmani.com/backbone-fundamentals/#views-1
 */
module.exports = Backbone.Collection.extend({
  model: Paperedit,
  url: config.serverUrl + '/paperedit',
}, {
  // sets type for autoEditAPI to know if we are retrieving model or collection
  modelType: 'paperedits'
});
