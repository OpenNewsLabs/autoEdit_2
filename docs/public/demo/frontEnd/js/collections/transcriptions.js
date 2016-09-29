//Collections.fetch() retrieves a set of models from the server in the form of a JSON array by sending an HTTP GET request to the URL specified by the collection’s url property (which may be a function). When this data is received, a set() will be executed to update the collection.

//https://addyosmani.com/backbone-fundamentals/#views-1
var app = app || {};


var TranscriptionsList = Backbone.Collection.extend({
  model: app.Transcription,
  url: config.serverUrl+"/transcription",
  // url: "http://localhost:1337/transcription"
  // localStorage: new Backbone.LocalStorage('transcriptionsListCollection')



  // Filter down the list of all todo items that are finished.
    completed: function() {
      return this.filter(function( transcription ) {
        return transcription.get('status');
      });
    },


     // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply( this, this.completed() );
    },


    //A nextOrder() method implements a sequence generator while a comparator() sorts items by their insertion order.

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if ( !this.length ) {
        return 1;
      }
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function( todo ) {
      return todo.get('order');
    }


});


  // Create our global collection of **Transcriptions**.
 app.TranscriptionsList = new TranscriptionsList();