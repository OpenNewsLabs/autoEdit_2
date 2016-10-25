/**
* app, for namescope 
*@todo: is this the right way to do this?
*/
var app = app || {};

/**
* Backbone view for transcriptions list 
* @class app.TranscriptionsListView
* @constructor
* @extends Backbone.View
*/
app.TranscriptionsListView = Backbone.View.extend({
  tagName: "div",
  className: "container",
  initialize: function(){
    this.listenTo(this.collection, "fetch",   this.render);
    this.listenTo(this.collection, "destroy", this.render);
    this.listenTo(this.collection, "add",     this.render );
    //Temporary way to auto update on transcription status change. unit in  milliseconds, checking for transcriptions update every 1/2 minute.
    //TODO: Used to work, does not seem to work anymore
    setInterval(function(){ 
       if(app.transcriptionRouter.transcriptionsList.remaining().length >0){
          app.transcriptionRouter.transcriptionsList.fetch({reset: true}); 
       } 
     }, 30000);
    this.collection.fetch({reset: true});   
  },

  render: function(){
    //if there are  transcriptions it shows
    if(!this.collection.isEmpty()){
      $(this.el).empty();
      this.collection.each(this.addOne, this);
      return this;
      //if there are no transcriptions it shows helpfull message to create a new one
    }else{
      // this.$el.append 
      this.$el.html($('#homePage').html());
      return this;
    }
  },

  addOne: function(transcriptionItem){
    var transcriptionView = new app.TranscriptionListElement({model: transcriptionItem});
    this.$el.append(transcriptionView.render().el);
  }
});

/**
* Backbone view for single Transcription model view to be used in view for collection TranscriptionsListView 
* @class app.TranscriptionListElement
* @constructor
* @extends Backbone.View
*/
app.TranscriptionListElement = Backbone.View.extend({
  tagName: 'div',
  className: 'media',
  initialize: function() {

  },
  events:{
    "click #transcriptionCard": "showTranscription",
    "click button.editBtn": "editTranscription",
    "click button.deleteBtn": "deleteTranscription"
  },
  showTranscription: function(){
    //navigate to transcription page
    //TODO: is this the right way to do this?
    Backbone.history.navigate("transcription/"+this.model.cid, {trigger:true});
  },

  //TODO: delete is not working properly 
  deleteTranscription: function(){
    var r = confirm("You sure you want to delete this transcription?");
    if (r == true) {
      this.model.destroy({success: function(model, response) {
        // app.transcriptionRouter.transcriptionsList.fetch({reset: true}); 
        // Backbone.history.navigate("transcriptions", {trigger:true}); 
      }})
    } else {
      alert("Transcription was not deleted")

    }
  },

  editTranscription: function(){
    alert("Edit transcription")
  },

  template: _.template($('#transcriptionIndex').html()),

  render: function(){
    var sectionTemplate = this.template(this.model.attributes);
    this.$el.html(sectionTemplate);
    return this;
  }
});