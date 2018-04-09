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
    'click #btnElectronInputMediaFile':'electronGetFilePath',
    'click #submitBtn': 'save',
    'keypress .form-control': 'onEnterListener',
    'change input[type=radio]': 'changedRadio'
  },

//change view of language tab preferences when making a choice in radio button language options. 
  changedRadio: function(e){
    $('#languageTabs a[href="#'+e.currentTarget.value+'"]').tab('show');
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
    //before trying this, test how many clips at same time.
    // https://trello.com/c/oDr7bSy7/173-raised-by-ben-need-to-be-able-to-add-a-batch-of-clips-into-new-transcription-not-one-by-one
    var newDescription  = this.$('textarea[name=description]').val();
    //removing # carachter coz it breaks file path as it gets converted to %23
    //TODO: there might be other symbols that have effect. figure proper way to sanitise input
    // var newFilePath     = this.$('input[name=file]').val();
    var newLanguage     = '';

    var newFilePath = this.newFilePath; 


    var radios = document.querySelectorAll('.languageRadio');
    var sttEngine ;
    //see which one has been selected by the user. 
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            // get value, set checked flag or do whatever you need to
            sttEngine = radios[i].value;       
        }
    }

    //TODO: there might be a better way to do this?
    //set the language 
    if(sttEngine == 'ibm'){
      newLanguage = $('#languageModelIBM').find(":selected")[0].value;

    }else if(sttEngine == 'speechmatics'){
      newLanguage = $('#languageModelSpeechmatics').find(":selected")[0].value;

    }

    if (newFilePath == ""){
      alert("please select a file to transcribe");
      //TODO: set, select in focus 
    }else if(newTitle ==""){
      alert("please give this transcriptiona title");
      //TODO: Set description in focus 
    }else{
      if(sttEngine === "ibm" || sttEngine === "speechmatics"){
        if(navigator.onLine){
          console.log("SPEECHMATICS-Transcription form ", newTitle, newDescription, newFilePath,  newLanguage,  sttEngine);

            this.model.save({title: newTitle, 
            description: newDescription,
            videoUrl:newFilePath, 
            languageModel: newLanguage, 
            sttEngine: sttEngine},
            { 
              success: function(mode, response, option){      
                 Backbone.history.navigate("transcriptions", {trigger:true}); 
            },
              error: function(model, xhr,options){
                var errors = JSON.parse(xhr.responseText).errors;
                alert("ops, something went wrong with saving the transcription:" + errors);
              }
            });

        }else{
          alert("You seem to be offline, check your internet connection and try again if you'd like to use Speechmatics or IBM");
        }
     
      //captions can be used offline, parse captions with parserComposer module in transcriber option.
      }else if(sttEngine === "srt"){
        //  console.log("SRT-Transcription form ", newTitle, newDescription, newFilePath,  newLanguage,  sttEngine);
         // this.model.save({title: newTitle, 
         //    description: newDescription,
         //    videoUrl:newFilePath, 
         //    languageModel: newLanguage, 
         //    sttEngine: sttEngine},
         //    { 
         //      success: function(mode, response, option){      
         //         Backbone.history.navigate("transcriptions", {trigger:true}); 
         //    },
         //      error: function(model, xhr,options){
         //        var errors = JSON.parse(xhr.responseText).errors;
         //        alert("ops, something when wrong with saving the transcription:" + errors);
         //      }
         //    });


      //pocketsphinx and Gentle handled as fallback cases.
      // in the "backend" the `sttEngine` will determine which one is uded.
      // these can be used offline 
      }else if(sttEngine === "gentle" || sttEngine === "pocketsphinx"){
        //TODO: sort out this repetition
        this.model.save({title: newTitle, 
        description: newDescription,
        videoUrl:newFilePath, 
        languageModel: newLanguage, 
        sttEngine: sttEngine},
        { 
          success: function(mode, response, option){      
             Backbone.history.navigate("transcriptions", {trigger:true}); 
        },
          error: function(model, xhr,options){
            var errors = JSON.parse(xhr.responseText).errors;
            alert("ops, something when wrong with saving the transcription:" + errors);
          }
        });

      }else{
        console.error("need to chose a sttEngine");
      

    }
  }

  },


  render: function(){
    this.$el.html(render('transcriptionFormTemplate', this.model.attributes));
    return this;
  }
});
