//app
var app = app || {};
_.extend(app, Backbone.Events);

//router
var TranscriptionRouter = Backbone.Router.extend({
  routes: {
    "" : "index",
    "transcriptions": "transcriptionsList",
    "transcriptions/new": "newTranscription",
    "transcription/:id": "showTranscription",
    "transcription/:id/edit":"editTranscription",
    '*path': "notFound"
  },
  initialize: function(){
    //TODO: figure out what routes initialise is for
    console.info("INITIALIZED ROUTER")
    this.transcriptionsList = app.TranscriptionsList;
    this.transcriptionsList.fetch();
  },

  index: function(){
      $('#main').html("<div class='container-fluid'><h1>Welcome! - </h1><p>Go to <code>new</code> to transcribe a new media</p><p><code>Transcriptions</code> to view transcriptions in the system</p></div>");
  },

  transcriptionsList: function() {
    console.log("transcriptions list")

    this.transcriptionsListView = new app.TranscriptionsListView(
      {collection: this.transcriptionsList});

    var transcriptionsListView = this.transcriptionsListView;

    this.transcriptionsList.fetch({success: function() {
      $('#main').html(transcriptionsListView.render().el);
    }});
  },

  newTranscription: function() {
    console.info("new transcription")
    var  newTranscription = new app.Transcription({title: "", description: ""});//{title: "Video Interview "+getTimeNow(), description: getTimeNow()}

    var newTranscriptionFormView = new app.TranscriptionFormView({model: newTranscription});
      // var transcriptionFormView = new TranscriptionFormView();
    $("#main").html(newTranscriptionFormView.render().el);
  },


  showTranscription: function(cid) {
    console.info(cid)
    //TODO: is this the right way to do this???
    console.log("wtf")
    console.log(this)
    var tmpTranscription = app.TranscriptionsList.get({"cid":cid})
    console.log(tmpTranscription)

    var tmpTranscriptionView = new app.TranscriptionView({model: tmpTranscription});
    $("#main").html(tmpTranscriptionView.render().$el)
  },

  editTranscription: function(id){
    //TODO: is this the right way to do this???
    var tmpEditTranscription = this.transcriptionsList.get({"cid":id})
    // var tmpTranscriptionView = new app.TranscriptionView({model: tmpTranscription});
    // $("#main").html(tmpTranscriptionView.render().$el)
    var editTranscriptionFormView = new app.TranscriptionFormView({model: tmpEditTranscription});
      // var transcriptionFormView = new TranscriptionFormView();
    $("#main").html(editTranscriptionFormView.render().el);
  },

   notFound: function(){
    alert("Not found")
  }
})

//This starts the application 
$(document).ready(function(){
  Backbone.history.start();
  app.transcriptionRouter = new TranscriptionRouter();
  window.location = "index.html#transcriptions";
})