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
    // console.log("this", this, this.el, this.$el);
    // console.log(" this.$('.transcriptionsTabs')", this.$(".transcriptionsTabs"));
    // console.log("options.transcriptions",options);
    // console.log("options.transcriptions",options.transciptions);
    // set transcriptions, maybe get it from the router
    this.transcriptions = options.transciptions; 
    this.transcriptionsCollection = options.transcriptionCollection;

    // console.log("this.model", this.model);
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
     // console.log(" this.transcriotionsListElements", this.transcriotionsListElements);
     // this.$(".transcription-tab-content").innerHTML= render('hypertranscript', this.transcriptionsCollection.attributes);
     // 
    // document.addEventListener("selectionchange", function(event) {
    //   console.log('Selection changed.',event); 
    // });
    
    // Needed for drag and dop 
    // https://www.html5rocks.com/en/tutorials/dnd/basics/
    this.dragSrcEl = null;
    this.dragSrcElInnerHTML = "";
    this.edlJson = null;
    this.previewCounter = 0; 
 
    this.currentPapercutForInsert = null;

   },
 
  events:{
    "click .transcriptionTabLink" : "transcriptionTabLink",
    "click .transcriptionsWords"  : "playWord",
    "click .timecodes"            : "playWord",
    "mouseup .transcription"      : "selectingWords",
    "click .addStoryPointBtn"     : "addStoryPointBtn",

    // D&D
    "dragstart .papercut" : "dragStartPapercut",
    'dragenter .papercut' : 'sortablePapercut',
    'dragleave .papercut' : 'sortablePapercut',
    'drop .papercut'      : 'dropPapercut',
    'dragover .papercut': function(ev) {
        ev.preventDefault();
    },

    'dragover .deletePapercut': function(ev) {
        ev.preventDefault();
    },

    'drop .deletePapercut': "deletePapercut",

    'click .deletePapercut': "deleteAllPapercuts",

    "click #exportEdlJSON" : "exportEdlJSON",
    "click #exportEdlJSONWithTitles": "exportEdlJSONWithTitles",
    "click #exportEdl" : "exportEdl",

    "click .savePapercutsBtn": "savePapercuts",

    "click .playPapercutsBtn": "playPapercuts",
    "click .stopPapercutsBtn": "stopPapercuts",

    "click .papercut": "setCurrentPapercutForInsert"
    // "click .storyPointHeading" : "newStoryPointHeading",
    // "click .papereditWords" : "previevPaperedit"
  },

  //keyboard event using mouse trap backbone version 
  keyboardEvents: {

  },

  
  setCurrentPapercutForInsert: function(e){
    this.currentPapercutForInsert = e.currentTarget;
    // alert("Setting current");
    // console.log("Setting current", e, e.currentTarget, e.currentTarget.innerHTML);
  },

  stopPapercuts: function(){
    var video = document.getElementById("videoPreview");
    video.pause();
  },

  playPapercuts: function(){
   var videoSequence = this.getEDLJsonDataFromDom();
   //Video instance
    var video = document.getElementById("videoPreview");
    var counter = 0;

    function playVideoSegments(videoSequence){
      // initialised counter to play video segments in the array    
      /*******************base case, first video ****************/
      //base case, playing first video segment in sequence
      var videoSrc  = videoSequence[counter]['src'];
      var inPoint   = videoSequence[counter]['startTime'];
      var outPoint  = videoSequence[counter]['endTime'];
      // helper function to play one video segment
      video.src = videoSrc + "#t="+inPoint+","+outPoint;
      console.log(video.src);
      video.load;
      video.play();
      counter += 1;
      
      video.addEventListener("timeupdate", function() {
        if (video.currentTime >= outPoint) {
          videoSrc  = videoSequence[counter]['src'];
          inPoint   = videoSequence[counter]['startTime'];
          outPoint  = videoSequence[counter]['endTime'];
          //    counter += 1;
          playVideoSegments(videoSequence);
        }
       }, false);
    }

    playVideoSegments(videoSequence);

  },


  savePapercuts : function(){
     // TODO: figure out a better way to serialize data, at th emoment just converting the whole HTML of papereidt into string
    // // and saving it in events attribute of paperedit. 
    // // on inizialization rendering repopulating that field. 
      this.model.set({events: document.querySelector(".paperedit").innerHTML });
      // console.log("inside save",document.querySelector(".paperedit").innerHTML , this.model.get("events"));
      //save the model
      this.model.save({wait: false});
      // console.log( this.getPapercutsJsonDataFromDomToSaveInDb() );
      // console.log("SAVED?");
      // alert("Saved");
  },

  //TODO: refactor EDL export helper in backbone views utils/helpers.
  /**
  * @function exportEdl
  * @description EDL - Chronological
  */
  exportEdl: function(e){
    console.log("EXPORT EDL");
    var papereditJson=  this.makeEDLJSON(false);
    console.log(JSON.stringify(papereditJson, null, 2));
    //end move in model
    var edl = new EDL(papereditJson);
    console.log(edl.compose());
    var edlFileName = this.nameFileHelper(papereditJson.title +"_chronological","edl"); 
    this.exportHelper({fileName: edlFileName, fileContent: edl.compose(), urlId: "#exportEdl"});
  },


  //titlesBol boolean to decide whether to add titles as array in the EDL JSON or not.
  makeEDLJSON: function(titlesBol){
     var papereditJson ={};
        papereditJson.title = this.model.get("title");
        papereditJson.events = this.getEDLJsonDataFromDom(titlesBol); 
     return papereditJson;
  },

   exportEdlJSONWithTitles: function(){
    var papereditJson=  this.makeEDLJSON(true);

    var tmpPaperedit = JSON.stringify(papereditJson,null,"\t");
    var jsonFileName = this.nameFileHelper(papereditJson.title+"_EDL","json");  
    this.exportHelper({fileName: jsonFileName,fileContent: tmpPaperedit, urlId: "#exportJsonEDL"});

    // console.log(papereditJson,tmpPaperedit);
  },

  exportEdlJSON: function(){
    var papereditJson=  this.makeEDLJSON();

    var tmpPaperedit = JSON.stringify(papereditJson,null,"\t");
    var jsonFileName = this.nameFileHelper(papereditJson.title+"_EDL","json");  
    this.exportHelper({fileName: jsonFileName,fileContent: tmpPaperedit, urlId: "#exportJsonEDL"});

    // console.log(papereditJson,tmpPaperedit);
  },


  //TODO: both make file helper and exportHelper should be moved in shared util and refactored out of transcription view as well
  /**
  * @function exportHelper
  */
  nameFileHelper(name, ext){
    var timeStr = moment().format('DD_MM_YYYY_HH-mm-ss');
    return ""+name.replace(" ", "_") +"_"+ timeStr +"."+ext;
  },


  /**
  * @function exportHelper
  */
  exportHelper(config){
    if(config.fileContent === ""){
      alert("File " + config.fileName + " seems to be empty");
    }

    var fileName = config.fileName; //this.title _ + append time of day to name
    var fileContent = config.fileContent;
    var urlId = config.urlId;

    var formBlob = new Blob([fileContent], { type: 'text/plain' });
    FileSaver.saveAs(formBlob, config.fileName);
  },



  deleteAllPapercuts: function(e){
    var r = confirm("Click ok to delete all papercuts in the paperedit, cancel to abort");
    if (r == true) {
      document.querySelector(".paperedit").innerHTML="";
      // update EDL
      this.getEDLJsonDataFromDom();
      this.savePapercuts();
    } else {
        alert("Relax, nothing was deleted");
    }
    //SAVE/Update
   
  },

  deletePapercut: function(e){
    e.preventDefault();
    // console.log("deletePapercut",e);
    this.dragSrcEl.remove();
    this.dragSrcEl = null;
    //update EDL
    this.getEDLJsonDataFromDom();
    this.savePapercuts();
    //resetting current papercut selection that is used to drop papercut in place other then at end of document. 
    this.currentPapercutForInsert = null; 

  },

  dragStartPapercut: function(e){
    this.dragSrcEl = e.currentTarget;
    // console.log(e.currentTarget, e);
    // TODO: sortout horribel patch. instead of innerHTML get all element as HTML. 
    // in theory should use data transfer object from the drag and drop event but couldn't get it to work. might be confusion between jquery and plain js methods to set and get.
    this.dragSrcElInnerHTML = e.currentTarget.outerHTML;
  },

  dropPapercut: function(e){
    console.log("DROP!1");
      //it's not a swaps the elements on drop. 
     // on drop it needs to append the draged element after the drop element.
     //  e.currentTarget is current target element.
      if (e.stopPropagation) {
        // Stops some browsers from redirecting.
        e.stopPropagation(); 
      }
      //  Don't do anything if dropping the same element/raw/papercut we're dragging.
      if (this.dragSrcEl !=  e.currentTarget) {
        // TODO: could be abstracted as own function. that makes dom element from string.
        // https://stackoverflow.com/questions/3103962/converting-html-string-into-dom-elements
        var tmpDiv = this.createHTMLDomElementFromString(this.dragSrcElInnerHTML);
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
        e.currentTarget.insertAdjacentHTML('beforebegin', this.dragSrcElInnerHTML);
        // Remove this.dragSrcEl element, remove the element that was initially dragged from it's original place.
        this.dragSrcEl.remove();
      }

    //   return false;

    // //TODO: save EDL 
    // create EDL 
    this.getEDLJsonDataFromDom();
    // // Save paperedit EDL.  save in internal state.
    console.log("DROP!2");
    this.savePapercuts();
    // // add a this.paperEdit in initialise
    // // also add a save model for paperedit when EDL is updated.
  },


  getEDLJsonDataFromDom: function(keepTitlesBool){
    //default don't keep titles, if no arg provided
    var keepTitles = false; 
    //else use what the user has requested
    if(arguments.length != 0){
      keepTitles = keepTitlesBool;
    }
    // {"startTime":"21.97",
    // "endTime":"26.61","
    // transcriptionId":"24dcd88b",
    // "reelName":"NA",
    // "clipName":"Ian Perkin-Mobile.mp4",
    // "videoId":"videoId_24dcd88b",
    // "speaker":"Unnamed Speaker",
    // "src":"/Users/pietropassarelli/Library/Application Support/autoEdit2/media/Ian_Perkin-Mobile.mp4.1486169904445.webm",
    // "audioFile":"/Users/pietropassarelli/Library/Application Support/autoEdit2/media/Ian_Perkin-Mobile.mp4.1486169904445.ogg"}"
    var papercutsElements = document.querySelectorAll('.papercut'); 
    var papercuts = [];
    for (var i=0; i< papercutsElements.length; i++){
      var papercut  = JSON.parse(JSON.stringify(papercutsElements[i].dataset));
          //so that it starts from 1 and not from zero.
          papercut.id = i+1;
      //exclude titles from EDL
      //if keep title true add all papercuts to the array
      if(keepTitles){
          papercuts.push(papercut); 
      //otherwise only add the paper cut when there isn't a title in it.
      }else{
         if(!papercut.title){
          papercuts.push(papercut); 
        }
      }
     
        
    }
  
    this.edlJson = papercuts; 
    //SAVE/UPDATE
    // this.savePapercuts(true);
    console.log(papercuts);
    return papercuts; 
  },

  sortablePapercut: function(){
    // console.log("drag start");
  },

  createHTMLDomElementFromString: function(string){
    var parser = new DOMParser();
    var tmpDiv = parser.parseFromString(string, "text/xml");
    return tmpDiv;
  },

  addStoryPointBtn: function (){
    var storyPointHeading = prompt("Had a heading for your story point", "Section A: ");
    if (storyPointHeading != null) {
      // var papercutElement = document.createElement('h4');
      // TODO: replace with ejs template
      var papercutHeadingStringTemplate ="<div data-title='"+storyPointHeading+"' class='row papercut' draggable='true'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>";
          papercutHeadingStringTemplate +="<h4><span class='glyphicon glyphicon-pencil' ></span> <span contenteditable='true'>"+storyPointHeading+"</span></h4></div></li> ";
      // var papercutElement.innerHTML = papercutHeadingStringTemplate;
      this.addElementToPaperEditElement(papercutHeadingStringTemplate);
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
    console.log("PAPERCUT",papercut);
    var papercutElement = render('papercut', papercut); 
    // console.log(papercutElement);

    this.addElementToPaperEditElement(papercutElement);

    this.getEDLJsonDataFromDom();

    this.savePapercuts();
  },


  insertAfter: function(el, referenceNode) {
      referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  },


  addElementToPaperEditElement: function(stringElement){
    //get paperedit element 
    var papercutElement;
    var papereditElement = document.querySelector(".paperedit");
    if(typeof stringElement == "string"){
      if(this.currentPapercutForInsert == null){
        //Add at the end of the .paperedit
        papereditElement = document.querySelector(".paperedit");
        papercutElement = document.createElement('div');
        papercutElement.innerHTML = stringElement;
        papereditElement.appendChild(papercutElement);

        this.getEDLJsonDataFromDom();
        this.savePapercuts();
      }else{
        //
        var currentPapercutForInsert =this.currentPapercutForInsert;
        papercutElement = document.createElement('div');
        papercutElement.innerHTML = stringElement;

        // currentPapercutForInsert.appendChild(papercutElement);
        this.insertAfter(papercutElement, currentPapercutForInsert);
        //update currentPapercutForInsert to latest element added. 
        this.currentPapercutForInsert = papercutElement;
        this.getEDLJsonDataFromDom();
        this.savePapercuts();
        //change this.currentPapercutForInsert to last element added. = papercutElement? 
      }
      
      //add papercut at end of paperedit element
      
    }else{
      var papereditElement = document.querySelector(".paperedit");
      // var papercutElement = document.createElement('div');
      // papercutElement.innerHTML = stringElement;
      // //add papercut at end of paperedit element
      papereditElement.appendChild(stringElement);
      this.getEDLJsonDataFromDom();
      this.savePapercuts();
    }
  
  },

  extractEDLJSONPapercutFromElement: function(elements){
    // console.log("elements", elements);

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
            //HARDCODED!!
            word.offset           = elements[i].dataset.offset;
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
    // TODO: figure out a better way to serialize data, at th emoment just converting the whole HTML of papereidt into string
    // // and saving it in events attribute of paperedit. 
    // // on inizialization rendering repopulating that field. 
    this.$(".paperedit").html(this.model.get('events'));
    return this;
  }
  
});
