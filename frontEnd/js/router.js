var app = app || {};
_.extend(app, Backbone.Events);

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

    // app.checkAndUpdateTranscriptions =function(activate){
    //   if(activate){
    //      var clientSideNofTranscriptions =  app.transcriptionRouter.transcriptionsList.length; 
    //     app.transcriptionRouter.transcriptionsList.fetch();
    //      var serverSudeNofTranscriptions = app.transcriptionRouter.transcriptionsList.length; 
         
    //      if (clientSideNofTranscriptions != serverSudeNofTranscriptions ){

    //      }
    //      app.transcriptionRouter.transcriptionsListView = new app.TranscriptionsListView({collection: app.transcriptionRouter.transcriptionsList});
    //     $('#main').html(app.transcriptionRouter.transcriptionsListView.render().el);

    //   }else{

    //   }
    // }

  },

  index: function(){
    console.log("home<--")
    // this.transcriptionsList.fetch();
     // $('#main').html(this.transcriptionsListView.render().el);
    //TODO: figure out why this doesn't load.
    //also how to route home view
    //TODO: fix this so that it redirects to the transcription list
    //$('#homePage').html()
      $('#main').html("<div class='container-fluid'><h1>Welcome! - </h1><p>Go to <code>new</code> to transcribe a new media</p><p><code>Transcriptions</code> to view transcriptions in the system</p></div>");
  },

  transcriptionsList: function(){
    console.log("transcriptions list")

    this.transcriptionsListView = new app.TranscriptionsListView(
      {collection: this.transcriptionsList});

    var transcriptionsListView = this.transcriptionsListView;

    //TODO load from model db with fetch
    //TODO to fix this need to do MyAPI.js and override Backbone.sync() method.
    // this.transcriptionsList = new TranscriptionsList();
    // this.transcriptionsListView = new TranscriptionsListView({collection: this.transcriptionsList});
    this.transcriptionsList.fetch({success: function() {
      $('#main').html(transcriptionsListView.render().el);
    }});
  },

  newTranscription: function(){
    console.info("new transcription")
    var  newTranscription = new app.Transcription({title: "", description: ""});//{title: "Video Interview "+getTimeNow(), description: getTimeNow()}

    var newTranscriptionFormView = new app.TranscriptionFormView({model: newTranscription});
      // var transcriptionFormView = new TranscriptionFormView();
    $("#main").html(newTranscriptionFormView.render().el);
  },


  showTranscription: function(cid){
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
    // console.log("home<--")
    // this.transcriptionsList.fetch();
     // $('#main').html(this.transcriptionsListView.render().el);
    //TODO: figure out why this doesn't load.
    //also how to route home view
    //TODO: fix this so that it redirects to the transcription list
      // $('#main').html("<div class='container-fluid'><h1>Welcome!</h1><p>Go to <code>new</code> to transcribe a new media</p><p><code>Transcriptions</code> to view transcriptions in the system</p></div>");
  }
})

$(document).ready(function(){
//This starts the application 
Backbone.history.start();

app.transcriptionRouter = new TranscriptionRouter();

//autoRefresh Transcriptions when on list view function

// demoTranscription();

//Set list of transcriptions as first page 
window.location = "index.html#transcriptions"

})



///////////





