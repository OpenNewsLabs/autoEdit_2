'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var TranscriptionListView = require('./views/transcription_list_view');
var TranscriptionFormView = require('./views/transcription_form_view');
var TranscriptionView = require('./views/transcription_view');
var Transcription = require('./models/transcription');
var Transcriptions = require('./collections/transcriptions');

// TODO: not sure if backbone events still needed?
// _.extend(app, Backbone.Events);

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
    // TODO: figure out what routes initialise is for
    console.info('Router: INITIALIZED ROUTER');
    this.transcriptionsList = new Transcriptions();

    // if running as demo, front end only the fetch breaks the app as there is no backend. so this is workaround
    if (window.frontEndEnviromentNWJS) {
      this.transcriptionsList.fetch();
    }
  },

  // TODO: router not going to default page
  index: function() {
    $('#main').html('<div class="container-fluid"><h1>Welcome! - </h1><p>Go to <code>new</code> to transcribe a new media</p><p><code>Transcriptions</code> to view transcriptions in the system</p></div>');
  },

  transcriptionsList: function() {
    console.info('Router: Transcriptions list');
    var transcriptionsListView  = new TranscriptionListView({collection: this.transcriptionsList});
    // if running as demo, front end only the fetch breaks the app as there is no backend. so this is workaround
    if (window.frontEndEnviromentNWJS) {
      this.transcriptionsList.fetch({success: function() {
        $('#main').html(transcriptionsListView.render().el);
      }});
    } else {
      $('#main').html(transcriptionsListView.render().el);
    }
  },

  newTranscription: function() {
    console.info('Router: new transcription');
    // creating a transcription object, here could add default values such as
    // {title: "Video Interview "+getTimeNow(), description: getTimeNow()}
    var newTranscription          = new Transcription({title: '', description: ''});
    var newTranscriptionFormView  = new TranscriptionFormView({model: newTranscription});
    // rendering in view
    $('#main').html(newTranscriptionFormView.render().el);
  },

  // TODO: is this the right way to do this???
  showTranscription: function(cid) {
    console.info('Router: showTranscription: ' + cid);
    var tmpTranscription = this.transcriptionsList.get({'cid': cid});
    console.info('Router: showTranscription - title: ' + tmpTranscription.attributes.title);
    var tmpTranscriptionView = new TranscriptionView({model: tmpTranscription});
    $('#main').html(tmpTranscriptionView.render().$el);
  },

  // Edit function is not currently implemented, placeholder code.
  editTranscription: function(id) {
    console.info('Router: editTranscription: ' + id);
    var tmpEditTranscription = this.transcriptionsList.get({'cid': id});
    var editTranscriptionFormView = new TranscriptionFormView({model: tmpEditTranscription});
    $('#main').html(editTranscriptionFormView.render().el);
  },

  notFound: function() {
    console.info('Not found');
    alert('Not found');
  }
});
