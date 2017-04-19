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
     // this.$(".transcription-tab-content").innerHTML= render('hypertranscript', this.transcriptionsCollection.attributes);
     // 
    // document.addEventListener("selectionchange", function(event) {
    //   console.log('Selection changed.',event); 
    // });
   },
 
  events:{
    "click .transcriptionTabLink" : "transcriptionTabLink",
    "click .transcriptionsWords"                  : "playWord",
    "click .timecodes"                  : "playWord",
    "mouseup .transcription"            : "selectingWords",
    "click .addStoryPointBtn"           : "addStoryPointBtn"

    // "click .papereditWords" : "previevPaperedit"

    
  },



  //keyboard event using mouse trap backbone version 
  keyboardEvents: {

  },

  addStoryPointBtn: function (){
    var storyPointHeading = prompt("Had a heading for your story point", "Section A: ");
    if (storyPointHeading != null) {
      var papercutElement = document.createElement('h4');
          papercutElement.innerHTML = " <span class='glyphicon glyphicon-pencil'></span> <span class='storyPointHeading' contenteditable='true'>"+storyPointHeading+"</span>";
      this.addElementToPaperEditElement(papercutElement);
    }
  },
   
  selectingWords: function(e){
    // https://stackoverflow.com/questions/11300590/how-to-captured-selected-text-range-in-ios-after-text-selection-expansion 
    // https://jsfiddle.net/JasonMore/gWZfb/
    var selectedRange = null;
   if (window.getSelection) {
     selectedRange = window.getSelection().getRangeAt(0).cloneContents();
     // console.log("window")
    } else {
      selectedRange = document.getSelection().getRangeAt(0).cloneContents();
      // console.log("document")
    }

    var selectedElements = $(selectedRange).find('span');
    //first element of selection
    var firstElement = $(selectedRange).find('span')[0];
    var elemCount = $(selectedRange).find('span').length ;
    //last element
    var lastElIndex =elemCount - 1;
    //last element of selection
    var lastElement = $(selectedRange).find('span')[lastElIndex];
    // var tmpCounter = this.model.get("counterForPaperCuts");
    
    var papercut = this.extractEDLJSONPapercutFromElement(selectedElements);
        
    var papercutElement = render('papercut', papercut); 
    console.log(papercutElement);

    this.addElementToPaperEditElement(papercutElement);
  },

  addElementToPaperEditElement: function(stringElement){
    //get paperedit element 
    if(typeof stringElement == "string"){
      var papereditElement = document.querySelector(".paperedit");
      var papercutElement = document.createElement('div');
      papercutElement.innerHTML = stringElement;
      //add papercut at end of paperedit element
      papereditElement.appendChild(papercutElement);
    }else{
      var papereditElement = document.querySelector(".paperedit");
      // var papercutElement = document.createElement('div');
      // papercutElement.innerHTML = stringElement;
      // //add papercut at end of paperedit element
      papereditElement.appendChild(stringElement);
    }
  
  },

  extractEDLJSONPapercutFromElement: function(elements){
    console.log("elements", elements);

    var papercutAr = [];
      for(var i = 0; i< elements.length; i++){
        var word = {};
            word.text             = elements[i].innerHTML;
            word.clipName         = elements[i].dataset.clipName;
            word.reelName         = elements[i].dataset.reelName;
            word.startTime        = elements[i].dataset.startTime;
            word.endTime          = elements[i].dataset.endTime;
            word.speaker          = elements[i].dataset.speaker; 
            word.audioFile        = elements[i].dataset.audioFile;
            word.src              = elements[i].dataset.src;
            word.transcriptionId  = elements[i].dataset.transcriptionId;
            word.videoId          = elements[i].dataset.videoId;
        papercutAr.push(word);
      }
      var papercut= {};
      papercut.papercut = papercutAr; 
        // return papercut;
      return papercut;

  },

  //param JSON Of transcription model.attributes
  //helper function to Show Highlights selections in hypertranscripts
  renderHighlights: function(transcriptionAttributes,self){
   var tmpHighlights =  transcriptionAttributes.highlights;

    for (var i =0; i < tmpHighlights.length; i++ ){
      var min =  tmpHighlights[i].startTime;
      var max = tmpHighlights[i].endTime;
      //needs to grab the words of the element of the view not in the dom  
      //TODO: move loop out of a function?      
      self.$(".words").filter(function(){
        return $(this).data('start-time') >= min && $(this).data('end-time') <= max;
      }).addClass("highlight");
    }
  },

  showTranscriptionComponent: function(transcriptionAttributes){
     document.querySelector(".transcription-tab-content").innerHTML= render('hypertranscript', transcriptionAttributes);
    //Show Highlights selections in hypertranscripts
    this.renderHighlights(transcriptionAttributes,this);
  }, 

  transcriptionTabLink: function(event){
    event.preventDefault();
    
    var transcriptionId = event.target.attributes.id.value;
    // get transcription from id 
    var transcriptionTmp =this.transcriptionsCollection.get(transcriptionId );
    // console.log("transcriptionTmp",transcriptionTmp, transcriptionTmp.attributes);
    var currentElement = event.currentTarget.parentElement;
    // make css blue of current element in tab inactive. 
    // not knowing which one is active, roll through all of them and remove class.
    // perhaps better solution is to keep state of current active element and remove class from that one, and then
    // assigned new one. 
    $('.liTranscriptionTabLink').removeClass("active");
    //make current element active. active property is in li that containe link, so adding class to parent.
    $(currentElement).addClass("active");
    //update hypertranscript component with current transcript selection.
   
    this.showTranscriptionComponent(transcriptionTmp.attributes);

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
    // set default hypertranscript 
    var transcriptionAttributes = this.transcriptionsCollection.models[0].attributes;
    
    // Add default hypertranstript first one of transcription collection. 
    this.$(".transcription-tab-content").html( render('hypertranscript', transcriptionAttributes));
    //Show Highlights selections in hypertranscripts
    // call show hilights on first transcription. 
    this.renderHighlights(transcriptionAttributes,this);
    // TODO: mark first LI element of transcription tab as active 
    return this;
  }
  
});
