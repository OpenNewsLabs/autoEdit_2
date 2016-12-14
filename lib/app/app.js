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

var config = require('../../config');

// app backbone files
var TranscriptionRouter = require('./router');

// This starts the application
$(document).ready(function() {
    // vars
    var gui,
        menu,
        option,
        shortcut;
    // name in navbar brand element
    $('#brandAppName').text(config.appName);

    // Name in page document title
    document.title = config.appName;

    // For mobile version safari doesn't play webm
    window.userAgentSafari = false;

    /**
     * To allow code reuse it detects if we are running this front end in NWJS
     * and if so it sets up the mac os x menus. If not, does not thing. but sets
     * a window variable to be able to detect this state elsewhere in the app.
     * It means same front end code could be used standalone on the web or
     * packaged as desktop app without too much tweaking.
     */

    if (typeof window.nw !== 'undefined') {
        gui = window.nw;

        // Create menu
        menu = new gui.Menu({
            type: 'menubar'
        });

        // Default mac menu bar comands + copy, cut, paste
        // TODO: replace with variable for app name, centralize from package.json name.
        menu.createMacBuiltin(config.appName);
        // Append Menu to Window
        gui.Window.get().menu = menu;

        console.debug('node-webkit', window.process.versions['node-webkit']);
        console.debug('node', window.process.versions['node']);

        /**
         * adding NWJS console keyboard shortcut to be able to trigger that in production
         */
        option = {
            key: 'Ctrl+Alt+J',
            active: function() {
                console.log('Global desktop keyboard shortcut:', this.key, 'active.');
                window.nw.Window.get().showDevTools();
            },
            failed: function(msg) {
                // :(, fail to register the |key| or couldn't parse the |key|.
                console.error(msg);
            }
        };

        // Create a shortcut with |option|.
        shortcut = new gui.Shortcut(option);
        // Register global desktop shortcut, which can work without focus.
        gui.App.registerGlobalHotKey(shortcut);
        // end of console keyboard shortcut

        // Override all external link clicks:
        $('body').on('click', '[target=_blank]', function(eve) {
            eve.preventDefault();
            gui.Shell.openExternal($(this).attr('href'));
        });
    } else {
        console.debug('NOT USING NWJS ');

        // Chrome as both safari and chrome in the user agent
        if (navigator.userAgent.indexOf('Safari') != -1 &&
            navigator.userAgent.indexOf('Chrome') == -1) {
            window.userAgentSafari = true;
        }
    }

    // Initialize the router and start the app
    window.app = new TranscriptionRouter();
    Backbone.history.start();

    // TODO: not sure if this is the right thing to do
    window.location = 'index.html#transcriptions';
});
