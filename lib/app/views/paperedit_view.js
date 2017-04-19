'use strict';
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var render = require('./utils').render;
var FileSaver = require('file-saver');
var moment = require('moment');
var fromSeconds =  require('node-timecodes').fromSeconds;
var EDL = require('../../edl_composer/index');


/**
* Backbone view for transcription view for individual transcriptions 
* @class TranscriptionView
* @constructor
* @extends Backbone.View
*/
module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'container-fluid',
  //TODO: change this so that id is interpolated from model this.el.id or this.el.ciud
  id: "paperedit-n",//+this.model.id+"",

  initialize: function(options) {
    console.log("this", this, this.el, this.$el);
     console.log(" this.$('.transcriptionsTabs')", this.$(".transcriptionsTabs"));
    console.log("options.transcriptions",options);
    console.log("options.transcriptions",options.transciptions);
    // set transcriptions, maybe get it from the router
    this.transcriptions = options.transciptions; 
    this.transcriptionsCollection = options.transcriptionCollection;

    console.log("this.model", this.model);
    // this.paperedit = this.model;
    // 
    // 
    // List of transcriptions on the left side. 
    // 
    this.transcriotionsListElements = this.$(".transcriptionsTabs");
    //  <li class="active"><a href="#">Transcript 1</a></li>
    //  
     var node = document.createElement("LI");
     var textnode = document.createTextNode("Transcription 111");   
     node.appendChild(textnode);      
     // this.transcriotionsListElements.appendChild(textnode); 
     // this.$(".transcriptionsTabs").append( "<li class='active'><a href='#'>Transcript 11111</a></li>");
     console.log(" this.transcriotionsListElements", this.transcriotionsListElements);

   },
 
  events:{
    "click .transcriptionTabLink" : "transcriptionTabLink",
    "click span.words"                  : "playWord",
    "click .timecodes"                  : "playWord"

      // https://getbootstrap.com/javascript/#markup
      // 
      // $('#myTabs a').click(function (e) {
      //   e.preventDefault()
      //   $(this).tab('show')
      // })

      // $(function () {
      //   $('[data-toggle="popover"]').popover()
      // })
      // 

    // Listener of List of transcriptions on the left side.
    // when clicked (on clicked listener) re-render transcription section. updating with transcription clicked.
   
    
    // Listener on export  btn EDL. 
    // function to read all elements in paper-edit and make EDL JSON sequence from that. 
    // function to make that into an EDL file. 
  

    // some preview feature, eg play btn with popcorn js.  
    // function to read all elements in paper-edit and make EDL JSON sequence from that.
    // feed that json to preview "component"  so that playback can be possible. 
  },



  //keyboard event using mouse trap backbone version 
  keyboardEvents: {
   
  },


  transcriptionTabLink: function(event){
    event.preventDefault()
    console.log(event.target.attributes.id.value);
    var transcriptionId = event.target.attributes.id.value;
    // get transcription from id 
    var transcriptionTmp =this.transcriptionsCollection.get(transcriptionId );
    console.log("transcriptionTmp",transcriptionTmp, transcriptionTmp.attributes);

    // $(".transcription-tab-content").html(render('hypertranscript', transcriptionTmp.attributes));
    // 
    document.querySelector(".transcription-tab-content").innerHTML= render('hypertranscript', transcriptionTmp.attributes);
    // console.log( "BOHH",transcriptionTmp,  render('hypertranscript', transcriptionTmp.attributes));
    // render('_hypertranscript', transcriptionTmp.attributes);

    // //show class clicked on.  
    // $("#"+transcriptionId+".hidden").removeClass("hidden");
    // console.log(event,event.target, event.data)
  },


  /**
  * @function playWord
  */ 
  playWord: function(e){
    var wordStartTime = e.currentTarget.dataset.startTime;
    var videoIdElem="#"+e.currentTarget.dataset.videoId;
    var videoElem = $(videoIdElem)[0];
    videoElem.currentTime = wordStartTime;
    videoElem.play();
    var vid = document.getElementById(e.currentTarget.dataset.videoId);

    vid.ontimeupdate = function() {
      $("span.words").filter(function() {
        if($(this).data("start-time") < $(videoIdElem)[0].currentTime){
          $(this).removeClass( "text-muted" );
        }else{
          $(this).addClass("text-muted");
        }
      });
    };
  },



  // some kind of view listner to make hyper transcript eg click on word, it moves to correspondind part of video. 
 
  /**
  * @function render
  */
  render: function(){    
    this.model.attributes.id = this.model.attributes._id;
    // Not sure if this is the right way to add this to the view.
    // probably it be better to compose view elements
    this.model.attributes.transcriptions = this.transcriptions;
    var sectionTemplate = render('papereditShow', this.model.attributes);
    this.$el.html(sectionTemplate);
    ///end of modify compiled template to update hilights. 
    return this;
  }
  
});
