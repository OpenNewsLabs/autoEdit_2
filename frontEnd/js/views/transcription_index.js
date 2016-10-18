var app = app || {};

//View for collection
app.TranscriptionsListView = Backbone.View.extend({
  tagName: "div",
  className: "container",

  initialize: function(){
    // this.listenTo(this.model, "change", this.render);
    // this.listenTo(this.collection, "reset", this.render);
    this.listenTo(this.collection, "fetch", this.render);
    // this.listenTo(this.collection, "add", this.render);

    //Temporary way to auto update on transcription status change 
    setInterval(function(){ 
       if(app.transcriptionRouter.transcriptionsList.remaining().length >0){
          app.transcriptionRouter.transcriptionsList.fetch({reset: true}); 
       } 
     }, 30000);//in milliseconds 
    // }else
    //   console.log("transcriptions up to date ")
    // }
    // this.collection =  app.transcriptionRouter.transcriptionsList;    // UPDATED
    this.collection.fetch({reset: true});   // NEW
    // this.render();
    // this.listenTo( this.collection, 'add', this.render );
    this.listenTo( this.collection, 'reset', this.render ); // NEW
    // this.listenTo( this.collection, 'add', this.render ); 
  },

  render: function(){
    // console.log(this.collection.fetch())
    //if there are  transcriptions it shows
    //this.collection.length != 0
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

//////////////////////////////////////////////////////////
/////////single view for model for  list/for collection
app.TranscriptionListElement = Backbone.View.extend({
  tagName: 'div',
  className: 'media',
  //TODO: change this so that id is interpolated from model this.el.id or this.el.ciud
  //  id: 'transcription-n',
  initialize: function() {
    // var self = this;
    // this.listenTo(app, "updateTranscription:"+this.model.get('_id'), function() {
    //   self.model.fetch({success: function() {
    //     self.render();
    //   }});
    // });
  },

  events:{
    // "click button.showBtn": "showTranscription",
    "click #transcriptionCard": "showTranscription",
    "click button.editBtn": "editTranscription",
    "click button.deleteBtn": "deleteTranscription"
  },

  showTranscription: function(){
    // alert("show transcription")
    console.log("this.model.cid")
    console.log(this.model.cid)
    //TODO: save router in TBVEapp.router; so that there is only one.
    // var router = new Router();
    // app.transcriptionRouter.navigate("transcription/"+this.model.cid, {trigger: true});
    Backbone.history.navigate("transcription/"+this.model.cid, {trigger:true}); 

  },

  deleteTranscription: function(){
    var r = confirm("You sure you want to delete this transcription?");
    if (r == true) {
      //TODO: find and delete transcription here. also remove from collection.
      // var tmpTranscription = TBVEapp.transcriptionList.get({"cid":this.model.cid});
      // tmpTranscription.destroy();
      //TODO: not sure if this the right way to re-render page?
      this.model.destroy({success: function(model, response) {
        app.transcriptionRouter.transcriptionsList.fetch({reset: true}); 
      }})
      //or use router?navigate?
      // $('#main').html(this.render().el);
      // alert("Transcription has been deleted")
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
//////////////////////////////////////////////////////////
