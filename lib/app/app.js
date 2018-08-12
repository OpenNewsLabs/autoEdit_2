'use strict';
var $ = require('jquery');
var Backbone = require('backbone');

// Load bootstrap and backbone.mousetrap which add stuff to jquery and backbone
// and have nothing to export directly.
require('bootstrap');
require('backbone.mousetrap');

// Connect up the backend for backbone
if (typeof window.DB !== 'undefined') {
  Backbone.sync = window.DB;
} else {
  Backbone.sync = require('./demo_db');
}

// var config = require('../../config');

// app backbone files
var TranscriptionRouter = require('./router');
var PapereditRouter = require('./router_paperedit');

// This starts the application
$(document).ready(function() {
  // name in navbar brand element

  // TODO: get this from somewhere else so it's not hardcoded
  $('#brandAppName').text('autoEdit2');
  document.title = 'autoEdit2';


  // Name in page document title
  // TODO: can replace thie with electron's name.

// TODO: need to remove, simplify this
  // For mobile version safari doesn't play webm
  window.userAgentSafari = false;

  /**
   * To allow code reuse it detects if we are running this front end in NWJS
   * and if so it sets up the mac os x menus. If not, does not thing. but sets
   * a window variable to be able to detect this state elsewhere in the app.
   * It means same front end code could be used standalone on the web or
   * packaged as desktop app without too much tweaking.
   */

  if (window.ENV_BROSWER) {
    console.debug('In the browser ');
    // Chrome as both safari and chrome in the user agent
    if (navigator.userAgent.indexOf('Safari') != -1 &&
        navigator.userAgent.indexOf('Chrome') == -1) {
      window.userAgentSafari = true ;
    }
  }

  // Initialize the router and start the app
  window.appTranscription = new TranscriptionRouter();
  window.appPaperedit = new PapereditRouter();
  Backbone.history.start();

  // if in nwjs mode check if the watson keys are set.
  // if (window.process !== undefined) {
  //   // TODO: perhaps change this as || speechmatics, watson, IBM are set?
  //   if (!window.areWatsonAPIkeysSet()) {
  //     window.location = 'index.html#settings';
  //   }else {
      window.location = 'index.html#transcriptions';
  //   }
  // }
});
