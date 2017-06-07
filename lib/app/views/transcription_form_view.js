'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var render = require('./utils').render;

if(window.process!== undefined){
    var path =  require("path");
}

// if(window.process !== undefined){
//  win.dialog = dialog;
// }
/**
* Backbone view for transcription form for creating a new transcription
* @class TranscriptionFormView
* @constructor
* @extends Backbone.View
*/

//http://mylifeforthecode.com/getting-started-with-standard-dialogs-in-electron/
module.exports = Backbone.View.extend({
  initialize: function() {
      this.newFilePath = "";
  },
  events :{
    "click #btnElectronInputMediaFile":"electronGetFilePath",
  	'click #submitBtn': 'save',
    "keypress .form-control": "onEnterListener"

  },

  onEnterListener: function(e){
    var key = e.which || e.keyCode;
    if (key === 13 ) { // 13 is enter
      // code for enter
       e.preventDefault();
    }
  },

  electronGetFilePath: function(e){
      e.preventDefault();
      
      // if (window.process !== undefined) {
      //   document.getElementById("open-file").click();
      // }
      // 
      var self = this; 
      window.openFileDiaglogue(function(fileName){
          console.log(fileName);
          self.newFilePath = fileName[0];
          console.log(self.newFilePath );
          document.getElementById("inputFilePreview").innerHTML = self.newFilePath;
          // console.log(document.getElementById("title").value);
          if(document.getElementById("title").value ===""){
            // self.newFilePath.split("/")
            document.getElementById("title").value =  path.basename(self.newFilePath);
          }
       });

   },





      // console.log(fileName);
      // //TODO: here do some file type checks and alert if not compatible file type with ffmpeg. 
      // //eg add in config.js array off ffmpeg `ffmpeg -formats` in termanl for list. 
      // //use path library to get extension, if extension not in array then give error. 
      
      // //return an array of files, since we only accepting one, then it's always first elemet
      // //TODO: here if modify that can accept multiple, then here could deal with that logic, eg generate a panel/card with title and description for each. 
      // //here could also default transcript name to name of file. 
      // self.newFilePath = fileName[0];
      // console.log(self.newFilePath );
   
      // document.getElementById("inputFilePreview").innerHTML = self.newFilePath;

      // // console.log(document.getElementById("title").value);
      // if(document.getElementById("title").value ===""){
     
      //   // self.newFilePath.split("/")
      //   document.getElementById("title").value =  path.basename(self.newFilePath);
      // }

  
  // },

  save: function(e){
    console.log( e.target);
    //TODO: there might be a better way to get values from a form in backbone? 
    //as well as setup user validation?
  	e.preventDefault();
    var sttEngine; 
    //reading values from form 
    var newTitle        = this.$('input[name=title]').val();

    //If using "multiple" in unput  will return all selected files's paths separated with `;`. split(";") to make an array. 
    // loop through that array to create a list of title, description etc..
    // 
    //before trying this, test how many clips at same time.
    // https://trello.com/c/oDr7bSy7/173-raised-by-ben-need-to-be-able-to-add-a-batch-of-clips-into-new-transcription-not-one-by-one


    var newDescription  = this.$('textarea[name=description]').val();
    //removing # carachter coz it breaks file path as it gets converted to %23
    //TODO: there might be other symbols that have effect. figure proper way to sanitise input
    // var newFilePath     = this.$('input[name=file]').val();
    var newLanguage     = $('#languageModel').find(":selected")[0].value;

    var newFilePath = this.newFilePath; 

    //Listener on checkbox, that adds and removes IBM options if IBM is unclicked. 
    //Need to have IBM Options as element here in form view that can be appended or removed
    //TODO: There has to be a better way to get the value of radio buttons check boxes eg document.querySelector(".options");
    if($('#IBMoption')[0].checked){
      sttEngine         = "ibm";
    }else if($('#genelteOption')[0].checked){
       sttEngine        = "gentle";
    }else if($('#pocketSphinxOption')[0].checked){
      sttEngine        = "pocketsphinx";
    }

    if (newFilePath == ""){
      alert("please select a file to transcribe");
      //TODO: set, select in focus 
    }else if(newTitle ==""){
      alert("please give this transcriptiona title");
      //TODO: Set description in focus 
    }else{
      
        this.model.save({title: newTitle, 
        description: newDescription,
        videoUrl:newFilePath, 
        languageModel: newLanguage, 
        sttEngine: sttEngine},
        { success: function(mode, response, option){      
             Backbone.history.navigate("transcriptions", {trigger:true}); 
        },
        error: function(model, xhr,options){
          var errors = JSON.parse(xhr.responseText).errors;
          alert("ops, something when wrong with saving the transcription:" + errors)
        }
      });

    }

  },

  render: function(){
    this.$el.html(render('transcriptionFormTemplate', this.model.attributes));
    return this;
  }
});
