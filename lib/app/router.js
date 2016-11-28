'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var TranscriptionListView = require('./views/transcription_list_view');
var TranscriptionFormView = require('./views/transcription_form_view');
var TranscriptionView = require('./views/transcription_view');
var Transcription = require('./models/transcription');
var Transcriptions = require('./collections/transcriptions');
var render = require('./views/utils').render;

/**
 * Render a string or view to the main container on the page
 * @param {(Object|String)} string_or_view A string or backbone view
 **/
function displayMain(string_or_view) {
  var content;
  if (typeof string_or_view === 'string') {
    content = string_or_view;
  } else {
    content = string_or_view.el;
    string_or_view.render();
  }
  $('#main').html(content);
}

/**
* Transcriptions application router
*/
module.exports = Backbone.Router.extend({
  routes: {
    '': 'index',
    'transcriptions': 'transcriptionsList',
    'transcriptions/new': 'newTranscription',
    'transcription/:id': 'showTranscription',
    'transcription/:id/edit': 'editTranscription',
    '*path': 'notFound'
  },

  initialize: function() {
    console.debug('Router: INITIALIZED ROUTER');
    // Setup canonical transcriptions collection
    this.transcriptionsList = new Transcriptions();
  },

  // TODO: router not going to default page
  index: function() {
    displayMain(render('welcome'));
  },

  transcriptionsList: function() {
    var self = this;
    console.debug('Router: Transcriptions list');
    if ( typeof this.transcriptionsListView === 'undefined' ) {
      this.transcriptionsListView = new TranscriptionListView({collection: this.transcriptionsList});
    }
    this.transcriptionsList.fetch({success: function() {
      displayMain(self.transcriptionsListView);
    }});
  },

  newTranscription: function() {
    console.debug('Router: new transcription');
    // creating a transcription object, here could add default values such as
    // {title: "Video Interview "+getTimeNow(), description: getTimeNow()}
    var newTranscription          = new Transcription({title: '', description: ''});
    var newTranscriptionFormView  = new TranscriptionFormView({model: newTranscription});
    // rendering in view
    displayMain(newTranscriptionFormView);
  },

  showTranscription: function(cid) {
    var tmpTranscription = this.transcriptionsList.get({'cid': cid});
    console.debug('Router: showTranscription', cid, tmpTranscription.attributes.title);
    var tmpTranscriptionView = new TranscriptionView({model: tmpTranscription});
    displayMain(tmpTranscriptionView);
  },

  editTranscription: function(id) {
    console.debug('Router: editTranscription: ' + id);
    var tmpEditTranscription = this.transcriptionsList.get({'cid': id});
    var editTranscriptionFormView = new TranscriptionFormView({model: tmpEditTranscription});
    displayMain(editTranscriptionFormView);
  },

  notFound: function() {
    console.error('Not found');
    displayMain(render('404'));
    alert('Not found');
  }
});
