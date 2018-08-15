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
  id: "paperedit-n",

  initialize: function(options) {
    // set transcriptions, maybe get it from the router
    this.transcriptions = options.transciptions; 
    this.transcriptionsCollection = options.transcriptionCollection;
    // List of transcriptions on the left side. 
    this.transcriotionsListElements = this.$(".transcriptionsTabs");
    //  <li class="active"><a href="#">Transcript 1</a></li>
    //  
    var node = document.createElement("LI");
    var textnode = document.createTextNode("Transcription 111");   
    node.appendChild(textnode);      
    // Needed for drag and dop 
    // https://www.html5rocks.com/en/tutorials/dnd/basics/
    this.dragSrcEl = null;
    this.dragSrcElInnerHTML = "";
    this.edlJson = null;
    this.previewCounter = 0; 
    var self  = this;
    //TODO: this `window.app` should be change into something else 
    window.appPaperedit.papereditPreview = {};
    window.appPaperedit.papereditPreview.counter = 0;
    window.appPaperedit.papereditPreview.pausedState = {};
    window.appPaperedit.papereditPreview.pausedState.paused = false;
    this.removePapercutInsertPointers();
  },

  events:{
    "click .transcriptionTabLink" : "transcriptionTabLink",
    "click .transcriptionsWords"  : "playWord",
    "click .timecodes"            : "playWord",
    "mouseup .transcription"      : "selectingWords",
    "click .addStoryPointBtn"     : "addStoryPointBtn",
    "focusout .storyOutlineHeading": "savePapereditOutlineHeading",
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
    'drop .deletePapercut'    : "deletePapercut",
    'click .deletePapercut'   : "deleteAllPapercuts",
    "click #exportEdlJSON"    : "exportEdlJSON",
    "click #exportEdl"        : "exportEdl",
    "click #exportVideoRemix" : "exportVideoRemix",
    "click .savePapercutsBtn" : "savePapercuts",
    "click .playPapercutsBtn" : "playPapercuts",
    "click .stopPapercutsBtn" : "stopPapercuts",
    "click .pausePapercutsBtn": "pausePapercuts",
    "click .papercut": "listenerTosetCurrentPapercutForInsert",
    "keyup #searchCurrentTranscription"  :"search",
    "click #btnExportToAdobeSequenceInCep": "exportToAdobeSequenceInCep"
  },

  //keyboard event using mouse trap backbone version 
  keyboardEvents: {

  },

  savePapereditOutlineHeading: function(e){
    // console.log("on focus",e.currentTarget);
    // TODO: update data-title with innerText of element that has been changed. 
    this.savePapercuts();
  },

  removePapercutInsertPointers: function(){
    var elems = document.querySelectorAll(".currentPapercutElement");
    [].forEach.call(elems, function(el) {
      el.classList.remove("currentPapercutElement");
    });
  },

  //sets element and adds css
  setElementAsCurrentPapercutForInsert: function(element){
    this.currentPapercutForInsert = element;
    //reset by removing class.
    this.removePapercutInsertPointers();

    if(element != null){
     this.currentPapercutForInsert.classList.add("currentPapercutElement");
   }
 },

 listenerTosetCurrentPapercutForInsert: function(e){
  this.setElementAsCurrentPapercutForInsert(e.currentTarget);
},

pausePapercuts: function(){
  var video = document.getElementById("videoPreview");
    //complicated to implement.
    video.pause();
    window.appPaperedit.papereditPreview.pausedState.paused = true;
    window.appPaperedit.papereditPreview.pausedState.resumedTime = video.currentTime; 
    clearTimeout(window.appPaperedit.papereditPreview.timer);
  },

  stopPapercuts: function(){
    var video = document.getElementById("videoPreview");
    //complicated to implement.
    video.pause();
    //counter = counter;
    clearTimeout(window.appPaperedit.papereditPreview.timer);
    window.appPaperedit.papereditPreview.counter = 0;
  },

  //see it abstracted in isolation at 
  //https://jsfiddle.net/pietrops/u5usa10f/
  playPapercuts: function(){
    var videoSequence = this.getEDLJsonDataFromDom();
    if(videoSequence ==  0){
      alert("There are no papercut to generate a preview. Select some on the transcription side and try again.");
    }else{
      this.playVideoPreview(videoSequence);
    }
  },


  playVideoPreview: function (playlist){
    var video = document.getElementById("videoPreview");
    window.appPaperedit.papereditPreview.numberOfClips = playlist.length - 1;

    function playSequence(playlist) {
      var segment = playlist[ window.appPaperedit.papereditPreview.counter];
      if(segment.src == ""){
        video.setAttribute("src", segment.audioFile + "#t=" + segment.startTime + "," + segment.endTime);
      }else{
        video.setAttribute("src", segment.src + "#t=" + segment.startTime + "," + segment.endTime);
      }
      
      video.load();
      if(window.appPaperedit.papereditPreview.pausedState.paused ){
        video.currentTime = parseFloat(window.appPaperedit.papereditPreview.pausedState.resumedTime);
        window.appPaperedit.papereditPreview.pausedState.paused  = false;
      }
      video.play();
      // * 1000, because Timer is in ms
      var stopVideoAfter = (segment.endTime - segment.startTime) * 1000;
      // call function to stop player after given intervall
      // https://stackoverflow.com/questions/9845565/in-html5-video-how-to-play-a-small-clip-from-a-long-video
      window.appPaperedit.papereditPreview.timer = setTimeout(function() {
        video.pause();
        if (window.appPaperedit.papereditPreview.counter <  window.appPaperedit.papereditPreview.numberOfClips) {
          window.appPaperedit.papereditPreview.counter += 1;
          playSequence(playlist);
        } else {
          //reset counter
          window.appPaperedit.papereditPreview.counter = 0;
        }
      }, stopVideoAfter);
    }
    // calling function 
    // TODO: perhaps function declaration of playSequence() can be viewed in view namespace eg so can call as this.playSequence()
    playSequence(playlist);

  },


  savePapercuts : function(){
    // TODO: figure out a better way to serialize data, at th emoment just converting the whole HTML of papereidt into string
    // and saving it in events attribute of paperedit. 
    // on inizialization rendering repopulating that field. 
    // 
    // var 
    // papercuts = [
    //  {
    //    title: "some title"
    //   },
    //  {
    //    papercut: [    // to keep consitency with template.
    //      {
    //        ...
    //    
    //      }
    //    ]
    //  }
    // 
    // ]
    ////////////// make papercut data structure from dom elements to save in db.
    var  lines = [];  
 
     var papereditLinesElements = document.querySelectorAll(".papereditLine");
     
     for(var i=0; i< papereditLinesElements.length; i++){
      var papereditLineElement = papereditLinesElements[i];
      var wordsElements = papereditLineElement.children;
      //in this case line refers to paperedit lines(basicly papecuts), not transcription lines.
      var line ={};
    

      if(papereditLinesElements[i].dataset.title !== undefined){
        //then it is a title 
        // line.title = papereditLinesElements[i].dataset.title;
        line.title = papereditLinesElements[i].innerText.trim();
        lines.push(line);
       }else{ 
        line.papercut =[]; 
        // otherwise it is a papercut 
        for(var j=0; j< wordsElements.length; j++){

          var word = JSON.parse(JSON.stringify(wordsElements[j]. dataset));
          //calling it `papercut` so that it's compatible with template. papercut as a collection of words. can correspond with a line or not.
          line.papercut.push(word);
        }
         lines.push(line);
      }
      // add it to the paperedit lines.
     
    }
    //////////////////////////////
    // TODO: PAPERCUT_REFACTOR
    // this.model.set({events: document.querySelector(".paperedit").innerHTML.replace("currentPapercutElement", "") });
    this.model.set({events: lines  });
      //save the model
      this.model.save({wait: false});
    },

  //TODO: refactor EDL export, move it as an helper in backbone views utils/helpers. as used both by transcription and paperedit.
  /**
  * @function exportEdl
  * @description EDL - Chronological
  */
  exportEdl: function(e){
    var papereditJson=  this.makeEDLJSON(false);
    //end move in model
    var edl = new EDL(papereditJson);
    var edlFileName = this.nameFileHelper(papereditJson.title ,"edl"); 
    this.exportHelper({fileName: edlFileName, fileContent: edl.compose(), urlId: "#exportEdl"});
  },

  //titlesBol boolean to decide whether to add titles as array in the EDL JSON or not.
  makeEDLJSON: function(titlesBol){
   var papereditJson ={};
   papereditJson.title = this.model.get("title");
   papereditJson.events = this.getEDLJsonDataFromDom(titlesBol); 
   return papereditJson;
 },

//  exportEdlJSONWithTitles: function(){
//   var papereditJson=  this.makeEDLJSON(true);
//   var tmpPaperedit = JSON.stringify(papereditJson,null,"\t");
//   var jsonFileName = this.nameFileHelper(papereditJson.title+"_EDL","json");  
//   this.exportHelper({fileName: jsonFileName,fileContent: tmpPaperedit, urlId: "#exportJsonEDL"});
// },

exportEdlJSON: function(){

  // like this, model has also got the transcriptions attributes that are all the transcriptions in the project.
  // can be a very big json. 
  var papereditJson = {
    title:  this.model.attributes.title,
    description: this.model.attributes.description, 
    events:this.model.attributes.events
  }; //this.makeEDLJSON();

  var tmpPaperedit = JSON.stringify(papereditJson,null,2);
  var jsonFileName = this.nameFileHelper(papereditJson.title+"_EDL","json");  
  this.exportHelper({fileName: jsonFileName,fileContent: tmpPaperedit, urlId: "#exportJsonEDL"});
},

  exportVideoRemix: function(){
    console.log('exportVideoRemix');
    var eventsPapercuts = this.model.attributes.events;
    var m4RemixFileName = this.nameFileHelper(this.model.attributes.title,"mp4"); 
    // Checks 
    var path = require('path');

    // check if there are src files to input into ffmpeg-remix that are not mp4 preview. eg webm from earlier versions
    var listOfsrcFilesBool = eventsPapercuts.map((d)=> { 
      var ext = path.extname(d.papercut[0].src);
      console.log('ext ', ext);
      return ext === '.mp4'? true: false;
    });
    console.log('listOfsrcFilesBool ', listOfsrcFilesBool);
    var isNotValidSequence = listOfsrcFilesBool.includes(false);
    console.log('isNotValidSequence ',isNotValidSequence);

  if (!isNotValidSequence){
      var ffmpegRemixJson = this.autoEditEventPaperCutsJsonToFfmpegRemixJson(eventsPapercuts,m4RemixFileName);
      window.ffmpegRemix(ffmpegRemixJson,(res)=>{
        console.log(res)
      alert('done exporting paper-edit mp4 video preview at: '+res);
      })
      console.log('exportVideoRemix');
    } else{
      alert('This feature is only compatible with files uploaded from version 1.0.12 onwards, as we have switched from webm to mp4 for preview, re-ingest older transcriptions and try again.')
    }

  },
  autoEditEventPaperCutsJsonToFfmpegRemixJson(autoEditEventPapercutJson, fileName){
    var ffmpegRemixInputArray =  autoEditEventPapercutJson.map((event)=>{
    return { 
        source: event.papercut[0].src,
        start :parseFloat(event.papercut[0].startTime),
        end: parseFloat(event.papercut[event.papercut.length-1].endTime)
      }
    })
    return {
    // TODO: edit this using electrong user file path
    // or prompt dialogue to get user input on where to save.
      output: fileName,
      input: ffmpegRemixInputArray,
      limit: 5 // max ffmpeg parallel processes, default null (unlimited)
      // ffmpegPath: require('ffmpeg-static').path // optionally set path to ffmpeg binary
    }
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
    var r = confirm("Click ok to delete all papercuts in the paperedit, cancel to abort. Drag individual papercuts on delete button to delete them one at a time.");
    if (r == true) {
      document.querySelector(".paperedit").innerHTML="";
      // update EDL
      this.getEDLJsonDataFromDom();
      this.savePapercuts();
      this.setElementAsCurrentPapercutForInsert(null);
    } else {
      alert("Relax, nothing was deleted");
    }
  },

  deletePapercut: function(e){
    e.preventDefault();
    this.dragSrcEl.remove();
    this.dragSrcEl = null;
    //update EDL
    this.getEDLJsonDataFromDom();
    this.savePapercuts();
  },

  dragStartPapercut: function(e){
    this.dragSrcEl = e.currentTarget;
    // TODO: sortout horribel patch. instead of innerHTML get all element as HTML. 
    // in theory should use data transfer object from the drag and drop event but couldn't get it to work. might be confusion between jquery and plain js methods to set and get.
    this.dragSrcElInnerHTML = e.currentTarget.outerHTML;
  },

  dropPapercut: function(e){
     // it does not swaps the elements on drop. 
     // on drop it needs to append the draged element after the drop element.
     // `e.currentTarget` is current target element.
     if (e.stopPropagation) {
        // Stops some browsers from redirecting.
        e.stopPropagation(); 
      }
      //  Don't do anything if dropping the same element/raw/papercut we're dragging.
      if (this.dragSrcEl !=  e.currentTarget) {
        // Helper function. that makes dom element from string.
        // https://stackoverflow.com/questions/3103962/converting-html-string-into-dom-elements
        var tmpDiv = this.createHTMLDomElementFromString(this.dragSrcElInnerHTML);
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
        e.currentTarget.insertAdjacentHTML('beforebegin', this.dragSrcElInnerHTML);
        // Remove this.dragSrcEl element, remove the element that was initially dragged from it's original place.
        this.dragSrcEl.remove();
      }
    // create EDL 
    this.getEDLJsonDataFromDom();
    // Save paperedit EDL.  save in internal state.
    this.savePapercuts();
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
        // papercut
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

      return papercuts; 
  },
  //TODO: check if this is needed?
  sortablePapercut: function(){
    //
  },

  createHTMLDomElementFromString: function(string){
    var parser = new DOMParser();
    var tmpDiv = parser.parseFromString(string, "text/xml");
    return tmpDiv;
  },

  addStoryPointBtn: function (){
    var storyPointHeading = '_______';//prompt("Had a heading for your story point", "Sequence : ");
    // if (storyPointHeading != null) {
      // TODO: replace with ejs template
      var papercutHeadingStringTemplate ="<div data-title='"+storyPointHeading+"' class='row papercut papereditLine' draggable='true'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>";
      papercutHeadingStringTemplate +="<h4><span class='glyphicon glyphicon-pencil' ></span> <span class='storyOutlineHeading' contenteditable='true'>"+storyPointHeading+"</span></h4></div>";
      this.addElementToPaperEditElement(papercutHeadingStringTemplate);
    // }
  },

  selectingWords: function(e){
    // https://stackoverflow.com/questions/11300590/how-to-captured-selected-text-range-in-ios-after-text-selection-expansion 
    // https://jsfiddle.net/JasonMore/gWZfb/
    var selectedRange = null;
    if (window.getSelection) {
      selectedRange  = window.getSelection().getRangeAt(0).cloneContents();
    } else {
      selectedRange  = document.getSelection().getRangeAt(0).cloneContents();
    }

    var selectedElements  = $(selectedRange).find('span');
    //first element of selection
    var firstElement      = $(selectedRange).find('span')[0];
    var elemCount         = $(selectedRange).find('span').length ;
    //last element
    var lastElIndex       = elemCount - 1;
    //last element of selection
    var lastElement       = $(selectedRange).find('span')[lastElIndex];
    var papercut          = this.extractEDLJSONPapercutFromElement(selectedElements);
    var papercutElement   = render('papercut', papercut); 
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
        papereditElement          = document.querySelector(".paperedit");
        papercutElement           = document.createElement('div');
        papercutElement.innerHTML = stringElement;
        papereditElement.appendChild(papercutElement);
        this.getEDLJsonDataFromDom();
        this.savePapercuts();
      }else{
        //
        var currentPapercutForInsert  = this.currentPapercutForInsert;
        papercutElement               = document.createElement('div');
        papercutElement.innerHTML     = stringElement;
        // currentPapercutForInsert.appendChild(papercutElement);
        this.insertAfter(papercutElement, currentPapercutForInsert);
        //update currentPapercutForInsert to latest element added. 
        this.setElementAsCurrentPapercutForInsert(papercutElement);
        this.getEDLJsonDataFromDom();
        this.savePapercuts();
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
    var papercutAr = [];
    for(var i = 0; i< elements.length; i++){
      var word = {};
      word.text             = elements[i].innerHTML;
      word.clipName         = elements[i].dataset.clipName;
      word.reelName         = elements[i].dataset.reelName;
      word.fps              = elements[i].dataset.fps;
      word.startTime        = elements[i].dataset.startTime;
      word.endTime          = elements[i].dataset.endTime;
      word.speaker          = elements[i].dataset.speaker; 
      word.audioFile        = elements[i].dataset.audioFile;
      word.src              = elements[i].dataset.src;
      word.transcriptionId  = elements[i].dataset.transcriptionId;
      word.videoId          = elements[i].dataset.videoId;
      word.offset           = elements[i].dataset.offset;
      papercutAr.push(word);
    }
    var papercut= {};
    papercut.papercut = papercutAr;
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
      self.$(".transcription .words").filter(function(){
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
    var transcriptionTmp =this.transcriptionsCollection.get(transcriptionId);
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


  /**
  * @function search
  */ 
  search:function(e){
    // alert("searching")
    var searchedText = $(e.currentTarget).val();
    var searchTextArray = searchedText.split(" ");
    //TODO: need to resest the search
    //make search as a
    $(".words").removeClass("searched");
    // $( 'p:contains('+searchedText+')' ).css( "text-decoration", "underline" );
    if(searchTextArray.length > 0){
      for(var i = 0; i < searchTextArray.length; i++){
        $('.words[data-text='+searchTextArray[i]+']').addClass("searched");
      }
    }
  },

  exportToAdobeSequenceInCep: function(){
    var self = this;
    // alert('CEP sequence for premiere ')
    //'" + JSON.stringify({clips: self.model.get('events'), sequenceName: self.mode.get('title') })+"'
    window.__adobe_cep__.evalScript("$._PPP.create_sequence_from_paper_edit()", function (response){
      // mute autoEdit video 
      // videoElem.muted = true; 
      // console.log(response); 
    })
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
    
    // TODO: PAPERCUT_REFACTOR
    // needs to get papercuts json and use papercuts template to create html to add here. 
    //assagning events to local var coz not sure how access the array in the tempalte otherwise?
    var events = {"events" : this.model.get('events')} ; 
    this.$(".paperedit").html(render('papercuts',events ) );
    // this.$(".paperedit").html(this.model.get('events'));
    return this;
  }
});
