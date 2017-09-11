'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var render = require('./utils').render;

// var watsonKeysPath = window.nw.App.dataPath + '/wttskeys.json';

if (typeof window.nw !== 'undefined') {
  var watsonKeysPath = window.nw.App.dataPath + '/wttskeys.json';
  var googleKeysPath = window.nw.App.dataPath + '/gskeys.json';
}else{
  //not in nwjs 
  var watsonKeysPath = "/";
}

/**
* Backbone view for transcription form for creating a new transcription
* @class TranscriptionFormView
* @constructor
* @extends Backbone.View
*/
module.exports = Backbone.View.extend({
 tagName: 'div',
 className: 'container',

 initialize: function(options){
   this.options = options;
   this.settings = options.settings;
   _.bindAll(this, 'render');
 },

 events :{
   'click #submitBtnIbmCredentials': 'saveIBM',
   'click #submitBtnGoogleCredentials': 'saveGoogle',
   'click #submitBtnIbmMicrosoftCredentisl': 'saveMicrosoft',
   "click #btnElectronInputMediaFileGoogleCredentials":"electronGetFilePathGoogleCredentials",
   "keypress .form-control": "onEnterListener"
 },

 onEnterListener: function(e){
  var key = e.which || e.keyCode;
    if (key === 13 ) { // 13 is enter
      // code for enter
      e.preventDefault();
    }
  },

  electronGetFilePathGoogleCredentials: function(e){
    e.preventDefault();
      var self = this; 
      window.openFileDiaglogueJSON(function(fileName){
          console.log(fileName);
          self.newFilePath = fileName[0];
          console.log(self.newFilePath );
          document.getElementById("inputFilePreviewGoogleCredentials").innerHTML = self.newFilePath;
          // console.log(document.getElementById("title").value);
          if(window.process !== undefined){
              //TODO: maybe use fs instead.
            // const fs = require('fs');
            // var obj = JSON.parse(fs.readFileSync('file', 'utf8'));
            // const googleCrdentials = require(self.newFilePath);
            // console.log(googleCrdentials);
            window.setGoogleAPIkeys(self.newFilePath);
            window.alert("Thank you! Saved the Google API keys so you don't have to enter them again.");
             //update elements in form form
             var googleKeys = window.GoogleKeys();
            
            document.getElementById("apiKey").value = googleKeys.apiKey;
            // document.getElementById("project_id").value = googleKeys.project_id;
            // document.getElementById("private_key_id").value = googleKeys.private_key_id;
            // document.getElementById("private_key").value = googleKeys.private_key;
            // document.getElementById("client_email").value = googleKeys.client_email;
            // document.getElementById("client_id").value = googleKeys.client_id;
            // document.getElementById("auth_uri").value = googleKeys.auth_uri;
            // document.getElementById("token_uri").value = googleKeys.token_uri;
            // document.getElementById("auth_provider_x509_cert_url").value = googleKeys.auth_provider_x509_cert_url;
            // document.getElementById("client_x509_cert_url").value = googleKeys.client_x509_cert_url;
          }
           

           
        
       });
  },

  saveIBM: function(e){
  	e.preventDefault();
    //SAVE IBM credentialls  
  	var ibmCredentials = {};
    ibmCredentials.username  = this.$('input[name=username]').val().trim();
    ibmCredentials.password  = this.$('input[name=password]').val().trim();
   //TODO: double check this
    if((ibmCredentials.username  != "") && (ibmCredentials.password != "")){
   	  //save 
      window.setWatsonAPIkeys(ibmCredentials)
      window.alert("Thank you! Saved the IBM keys so you don't have to enter them again.");
    }else{
      alert("Please add valid credentials to save");
    }
    // End Save IBM crdentials
    
    // 
  },
   saveGoogle: function(e){
    e.preventDefault();
    console.log(document.getElementById("apiKey").value );

    var apiKeyToSave = {apiKey: document.getElementById("apiKey").value };
    window.setGoogleAPIkeys(apiKeyToSave);
    //SAVE Google credentialls  
    alert("Thank you! Saved the Google keys so you don't have to enter them again.");
    
    // 
  },

  saveMicrosoft:function(e){
    e.preventDefault();
   //  var ibmCredentials = {};
   //  ibmCredentials.username  = this.$('input[name=username]').val().trim();
   //  ibmCredentials.password  = this.$('input[name=password]').val().trim();
   // //TODO: double check this
   //  if((ibmCredentials.username  != "") && (ibmCredentials.password != "")){
   //    //save 
   //    window.setWatsonAPIkeys(ibmCredentials)
   //    window.alert("Thank you! Saved the keys so you don't have to enter them again.");
   //  }else{
   //    alert("Please add valid credentials to save");
   //  }
  
    // 
  },

  render: function(){
    this.$el.html(render('settingsTemplate',  this.settings));
      return this;
    }
  });
