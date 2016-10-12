// or could use https://github.com/powmedia/backbone-forms  ?
var app = app || {};

app.TranscriptionFormView = Backbone.View.extend({
  template: _.template($('#transcriptionFormTemplate').html()), 
  events :{
  	'click #submitBtn': 'save',
    'click #gentleSetupLink': "gentleSetupLink"

  	// submit : 'save'
  },

  save: function(e){
  	e.preventDefault();
  	var newTitle = this.$('input[name=title]').val();
    var newDescription = this.$('textarea[name=description]').val();;
    var newFilePath = this.$('input[name=file]').val();
    var newLanguage = $('#languageModel').find(":selected")[0].value;

    var sttEngine; 
    if($('#IBMoption')[0].checked){
      sttEngine= "ibm";
    }else if($('#genelteOption')[0].checked){
       sttEngine= "gentle";
    }
    
    var newSTTLanguage = $('#IBMoption')[0].checked

  	this.model.save({title: newTitle, description: newDescription,videoUrl:newFilePath, languageModel: newLanguage, sttEngine: sttEngine},{
      success: function(mode, response, option){
            
           Backbone.history.navigate("transcriptions", {trigger:true}); 
      },
      error: function(model, xhr,options){
        var errors = JSON.parse(xhr.responseText).errors;
        alert("ops, something when wrong with saving the transcription:" + errors)
      }
    });
 
  },

  gentleSetupLink: function(){
    if( window.frontEndEnviromentNWJS ){
      require('nw.gui').Shell.openExternal('https://opennewslabs.github.io/autoEdit_2/user_manual/setup.html#gentle-stt-open-source-free-and-offline');
    }
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});


//TODO try this and see if it stops dupplicate issues 
// https://github.com/powmedia/backbone-forms#usage
// Once the user is done with the form, call `form.commit()` to apply the updated values to the model. I
//f there are validation errors they will be returned. See validation for more information.

