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
  id: "transcription-n",//+this.model.id+"",

  initialize: function() {
    this.editable = false;
    var tmpHighlights =  this.model.get("highlights");

    for (var i =0; i < tmpHighlights.length; i++ ){
      var min =  tmpHighlights[i].startTime;
      var max = tmpHighlights[i].endTime;
      //needs to grab the words of the element of the view not in the dom        
      this.$(".words").filter(function(){
        return $(this).data('start-time') >= min && $(this).data('end-time') <= max;
      }).addClass("highlight");
    }
   },
 
  events:{
    //playback keyboard shortcuts
    "click #pausePlayVideo"   : "pausePlayVideo",
    "click #slowVideo"        : "slowVideo",
    "click #fastVideo"        : "fastVideo",
    "click #fastForwardVideo" : "fastForwardVideo",
    "click #volumeDown"       : "volumeDown",
    "click #volumeUp"         : "volumeUp",
    "click #rewindVideo"      : "rewindVideo",

    //interactive transcript click word plays video
    "click span.words"                  : "playWord",
    "click .timecodes"                  : "playWord",
    //search field 
    "keyup #searchCurrentTranscription" :"search",
    //text selection in transcription 
    "mouseup .transcription"            : "selectingWords",
    "click #clearHighlights"            : "clearHighlights",
    //edit text in transcription mode
    "click #editWords"      : "makeEditable",
    //hilight text in transcription mode
    "click #highlightWords": "makeHilightable",
    //TODO: sequence preview not in use 
    //TODO: remove associated functions 
    "click #playPreviewChrono"  : "playPreviewChrono",
    "click #playPreviewSelOrd"  : "playPreviewSelOrd",
    //EDL Export
    "click #exportEdlChronological"   : "exportEdlChronological",
    "click #exportEdlSelectionOrder"  : "exportEdlSelectionOrder",
    //Text export 
    "click #exportPlainText"              : "exportPlainText",
    "click #exportTimecodedTranscription" : "exportTimecodedTranscription",
    //Export Text EDL
    "click #exportPlainTextEDL"                 : "exportPlainTextEDL",
    "click #exportPlainTextEDLSelOrder"         : "exportPlainTextEDLSelOrder",
    "click #exportPlainTimecodedTextEDL"        : "exportPlainTimecodedTextEDL",
    "click #exportPlainTimecodedTextEDLSelOrder": "exportPlainTimecodedTextEDLSelOrder",
    //JSON Export
    "click #exportJsonEDL"            : "exportJsonEDL",
    "click #exportJsonEDLSelOrder"    : "exportJsonEDLSelOrder",
    "click #exportJsonTranscription"  : "exportJsonTranscription",
    //Export Captions 
    "click #expoertCaptionsSrt"     : "expoertCaptionsSrt",
    //TODO: currently not in use 
    "click #expoertCaptionsSrtEDL"  : "expoertCaptionsSrtEDL",
    //link to user manual 
    "click #edlUserManualInfo"  : "edlUserManualInfo"
  },

  /**
  * @function makeHilightable
  * @description function to disable words contet ediable to allow to select text of transcription
  */
  makeHilightable: function(){
    var modeNotice =  document.getElementById("hilightModeNoticeContainer");

    var hilightNotice = "<div class='alert alert-info alert-dismissible hidden-print' role='alert' id='hilightModeNotice'>";
    hilightNotice +="<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
    hilightNotice += "<strong>You are in hilight mode.</strong>";
    hilightNotice +="<p>Select words to include in your Edit Decision List (EDL) video sequence.</p>";
    hilightNotice +="</div>";

    var status = false;
    if( $("#highlightWords").hasClass("btn-primary")){
      status = true;
    }else{
      status = false;
    }

    if(status){
      //disable editing
      //TODO: check if you can remove more thne one class at once with JQuery comand?
      $("#highlightWords").removeClass("active btn-primary");
      $("#highlightWords").addClass("btn-default");
      //highlightWords
      $("#editWords").removeClass("btn-default");
      $("#editWords").addClass("active btn-primary");
      //enable content editable
      $('.words').attr('contenteditable','true');
    }else{
      //Editing active 
      $("#editWords").removeClass("active btn-primary");
      $("#editWords").addClass("btn-default");
      //highlightWords
      $("#highlightWords").removeClass("btn-default");
      $("#highlightWords").addClass("active btn-primary");
      //disable editable on words 
      $('.words').attr('contenteditable','false');
      //add hilight notice 
       modeNotice.innerHTML = hilightNotice;
    }
  },

  /**
  * @function makeEditable
  * @description function to make words contet ediable to allow to edit the text of transcription
  */
  makeEditable: function(){
    var modeNotice =  document.getElementById("hilightModeNoticeContainer");
    //remove hilight mode notice 
    // add text editing notice 
    var editNotice= "<div class='alert alert-warning alert-dismissible hidden-print' role='alert' id='editModeNotice'> ";
      editNotice +="<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
      editNotice +="<strong>You are in text edit mode.</strong>";
      editNotice +="<p>Click on a word to edit. Tab or click to move to the next word.</p>";
      editNotice +="</div>";

    var status = false;
    if( $("#editWords").hasClass("btn-primary")){
      status = true;
    }else{
      status = false;  
    }

    if(status){
    //Editing active 
     $("#editWords").removeClass("active");
     $("#editWords").removeClass("btn-primary");
     $("#editWords").addClass("btn-default");
     //highlightWords
     $("#highlightWords").removeClass("btn-default");
     $("#highlightWords").addClass("btn-primary");
     $("#highlightWords").addClass("active");
     //disable editable on words 
     $('.words').attr('contenteditable','false');
      //remove edit notice 
      // modeNotice.removeChild(document.getElementById("editModeNotice")) ;
    }else{
      //disable editing
      $("#highlightWords").removeClass("active");
      $("#highlightWords").removeClass("btn-primary");
      $("#highlightWords").addClass("btn-default");
      //editWords
      $("#editWords").removeClass("btn-default");
      $("#editWords").addClass("btn-primary");
      $("#editWords").addClass("active");
      //enable content editable
      $('.words').attr('contenteditable','true');

      //remove hilight notice 
      //add edit notice 
      modeNotice.innerHTML = editNotice;
      // listener on word changed 
      var contents = $('.words').html();
      //TODO: input change to event that detect when focus out or somehting else so that i doesn't auto save as typing coz that is super slow...

      //when using click for moving between words in edit mode, this auto selects the current word in content editbale. 
      //users have requested this feature to make it faster to, delete/replace word with correct one. they currently do cmd+a
      $(".words").on("click", function(event){
        //select all text in content edibale 
        document.execCommand('selectAll',false,null);
      });
      //same as above but when using tab to move between words
      $('.words').on( 'keyup', function( e ) {
          if( e.which == 9 ) {
            //select all text in content edibale 
            document.execCommand('selectAll',false,null);
          }
      } );


      $( ".words" ).on( "focusout", { model: this.model }, function(event) {
        //pause word 
        var model       = event.data.model;
        var tmpWordId   =  $( this )[0].dataset.wordId;
        var tmpWordText = $( this ).text();
        //find word to update in transcription text attribute to replace/update and save 
        _.each(model.attributes.text, function(paragraphs){
          _.each(paragraphs, function(paragraph){
            _.each(paragraph, function(lines){
              _.each(lines.line, function(word){
                if(word.id == tmpWordId){
                  word.text = tmpWordText;
                    model.save({wait: false});
                }        
              });
            });
          });
        });
      });
    }
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

  /**
  * @function exportHelper
  */
  nameFileHelper(name, ext){
    var timeStr = moment().format('DD_MM_YYYY_HH-mm-ss');
    return ""+name.replace(" ", "_") +"_"+ timeStr +"."+ext;
  },

  /**
  * @function exportEdlChronological
  * @description EDL - Chronological
  */
  exportEdlChronological: function(e){
    console.log("EXPORT EDL")
    var edlSq = {  "title": this.model.get("title"), offset: this.model.get("metadata").timecode};
    edlSq.events = [];
    //ad line number to paper-cuts
    //NOTE: here you can decide to sort them chronologically(ie by startTime)
     //TODO: this could probably be moved in the model . eg return chrone order hiligths 
    for(var k = 0; k<  this.model.attributes.highlights.length; k++){
      var event =  this.model.attributes.highlights[k];
      event.id = k+1;
      edlSq.events.push(event);
    }
    //end move in model
    var edl = new EDL(edlSq)
    var edlFileName = this.nameFileHelper(this.model.get("title")+"_chronological","edl"); 
    this.exportHelper({fileName: edlFileName, fileContent: edl.compose(), urlId: "#exportEdlChronological"});
  },

  /**
  * @function exportEdlSelectionOrder
  * @description EDL - election order
  */
  exportEdlSelectionOrder: function(e){
    var edlSq = {  "title": this.model.get("title"), offset: this.model.get("metadata").timecode};
    edlSq.events = [];
    //TODO: this could probably be moved in the model . eg return selection order hiligths 
    var selections = this.model.get("highlights");
    var   selectionsSorted =  _.sortBy(selections, function(o) { return o.paperCutOrder; });
    for(var k = 0; k<  selectionsSorted.length; k++){
      var event =  selectionsSorted[k];
      event.id = k+1;
      edlSq.events.push(event);
    }
    // end of move in the model 
    var edl = new EDL(edlSq);
    var edlFileName = this.nameFileHelper(this.model.get("title")+"_selection_order","edl"); 
    //if client side running inside NWJS then do this 
    this.exportHelper({fileName: edlFileName, fileContent: edl.compose(), urlId: "#exportEdlSelectionOrder"});
  },

  /**
  * @function expoertCaptionsSrt
  * @description Captions
  */
  expoertCaptionsSrt: function(){
    //ISSUE: not working client side only.
    var fileName = this.nameFileHelper(this.model.get("title"),"srt"); 
    var srtFileContent =  this.model.constructor.returnSrtContent(this.model.get("text"));
    this.exportHelper({fileName: fileName, fileContent: srtFileContent, urlId: "#expoertCaptionsSrt"});
  },

  /**
  * @function expoertCaptionsSrtEDL
  * @todo not in use, turn it back on by adding export options under captions
  * @description Captions
  */
  expoertCaptionsSrtEDL: function(){
    //ISSUE: not working client side only.
    //ISSUE: papercuts selections, ammount of text per seelection might not be the optimal ammount for srt displaying on screen.
    var srtFileContent =  this.model.constructor.returnEDLSrtJson(this.model.get("highlights"));

    var fileName = this.nameFileHelper(this.model.get("title")+"_EDL","srt"); 

    this.exportHelper({fileName: fileName, fileContent: srtFileContent, urlId: "#expoertCaptionsSrtEDL"});

  },

  /**
  * @function exportPlainText
  * @description Plain Text - Transcription
  */ 
  exportPlainText: function(){
    //NOTE: temporary patch 
    //Better implementation is to fetch this from db, or have model function that 
    //organises and formats the text properly 

    //TODO: if want to add speaker names, before paragraph, get this from backend.

    // var tmp = $(".words").text().replace(/%HESITATION /g, "\n\n");
    var plainText =  this.model.constructor.returnPlainText(this.model.attributes);

    var plainTextFileName = this.nameFileHelper(this.model.get("title"),"txt"); 
    this.exportHelper({fileName: plainTextFileName, fileContent: plainText, urlId: "#exportPlainText"});
  },

  /**
  * @function exportTimecodedTranscription
  * @description Timecoded - Transcription
  */ 
  exportTimecodedTranscription: function(){
    //TODO in model, make timecoded plain text demo
    var tmp =  "Timecoded text demo";
    var plainTextTimecoded =  this.model.constructor.returnPlainTextTimecoded(this.model.attributes);
    var textFileName = this.nameFileHelper(this.model.get("title"),"txt"); 
    this.exportHelper({fileName: textFileName, fileContent: plainTextTimecoded, urlId: "#exportTimecodedTranscription"});
  },

  /**
  * @function exportPlainTextEDL
  * @description EDL - Plain Text 
  */ 
  exportPlainTextEDL: function(){
    // ISSUE: it doesn't work in client side browser only mode
     var paperCuts = this.model.get("highlights");
     var tmp =makePlainText(paperCuts);
     var textFileName = this.nameFileHelper(this.model.get("title")+"_EDL","txt"); 
     this.exportHelper({fileName: textFileName,fileContent: tmp, urlId: "#exportPlainTextEDL"});

        function makePlainText(paperCuts){
          var result ="";
          for(var i =0; i< paperCuts.length; i++){
            result += "["+paperCuts[i].speaker+"]" +"\n";
            result += paperCuts[i].text +"\n\n";
          }
          return result;
        }
  },

  /**
  * @function exportPlainTextEDLSelOrder
  * 
  */ 
  exportPlainTextEDLSelOrder: function(){
    var paperCuts = this.model.get("highlights");
    var selectionsSorted =  _.sortBy(paperCuts, function(o) { return o.paperCutOrder; });
    var selections = makePlainText(selectionsSorted);
    var textFileName = this.nameFileHelper(this.model.get("title")+"_EDL","txt"); 
    this.exportHelper({fileName: textFileName,fileContent: selections, urlId: "#exportPlainTextEDLSelOrder"});

      function makePlainText(paperCuts){
        var result ="";
        for(var i =0; i< paperCuts.length; i++){
           result += "["+paperCuts[i].speaker+"]" +"\n";
          result += paperCuts[i].text +"\n\n";
        }
        return result;
      }
  },

  /**
  * @function exportPlainTimecodedTextEDL
  */ 
  exportPlainTimecodedTextEDL: function(){
    //ISSUE: in browser client side mode, doesn't seem to be making the paper-cuts it just returns the words, why?
    function makeTimecodedPlainText(paperCuts){
        var result ="";
        for(var i =0; i< paperCuts.length; i++){
          //convert with timecode function
          result += "["+fromSeconds(paperCuts[i].startTime) +"\t";
          result += fromSeconds(paperCuts[i].endTime) +"\t";
          result += paperCuts[i].speaker+"]" +"\n";
          result += paperCuts[i].text +"\n\n";
        }
        return result;
      }

    var paperCuts = this.model.get("highlights");
    var tmp =makeTimecodedPlainText(paperCuts);
    var textFileName = this.nameFileHelper(this.model.get("title")+"_EDL","txt"); 
    this.exportHelper({fileName: textFileName,fileContent: tmp, urlId: "#exportPlainTimecodedTextEDL"});
  },


  /**
  * @function exportPlainTimecodedTextEDLSelOrder
  */ 
  exportPlainTimecodedTextEDLSelOrder: function(){

      function makeTimecodedPlainText(paperCuts){
          var result ="";
          for(var i =0; i< paperCuts.length; i++){
            //convert with timecode function
            result += "["+fromSeconds(paperCuts[i].startTime) +"\t";
            result += fromSeconds(paperCuts[i].endTime) +"\t";
            result += paperCuts[i].speaker+"]" +"\n";
            result += paperCuts[i].text +"\n\n";
          }
          return result;
        }

    var paperCuts        = this.model.get("highlights");
    console.log("paperCuts",paperCuts);
    var selectionsSorted = _.sortBy(paperCuts, function(o) { return o.paperCutOrder; });
    console.log("selectionsSorted",selectionsSorted);
    var tmp             = makeTimecodedPlainText(selectionsSorted);
    var textFileName    = this.nameFileHelper(this.model.get("title")+"_EDL","txt"); 
    this.exportHelper({fileName: textFileName,fileContent: tmp, urlId: "#exportPlainTimecodedTextEDL"});
  },


  /**
  * @function exportPlainTimecodedTextEDLSelOrder
  * @description /JSON - Transcription 
  */ 
  exportJsonTranscription: function(){
    var transcription = this.model.attributes;
    var tmpTranscription = JSON.stringify(transcription,null,"\t");
    var jsonFileName = this.nameFileHelper(this.model.get("title"),"json");  
    this.exportHelper({fileName: jsonFileName,fileContent: tmpTranscription, urlId: "#exportJsonTranscription"});
  },

  /**
  * @function exportJsonEDL
  * @description JSON - EDL 
  */ 
  exportJsonEDL: function(){
    var paperCuts = this.model.get("highlights");
    var tmpPaperCuts = JSON.stringify(paperCuts,null,"\t");
    var jsonFileName = this.nameFileHelper(this.model.get("title")+"_EDL","json");  
    this.exportHelper({fileName: jsonFileName,fileContent: tmpPaperCuts, urlId: "#exportJsonEDL"});
   },

  /**
  * @function exportJsonEDL
  * @description JSON - EDL
  */
  exportJsonEDLSelOrder: function(){
    var paperCuts = this.model.get("highlights");
    var selectionsSorted =  _.sortBy(paperCuts, function(o) { return o.paperCutOrder; });
    var tmpPaperCuts = JSON.stringify(selectionsSorted,null,"\t");
    var jsonFileName = this.nameFileHelper(this.model.get("title")+"_EDL","json");  
    this.exportHelper({fileName: jsonFileName,fileContent: tmpPaperCuts, urlId: "#exportJsonEDLSelOrder"});
   },

  /**
  * @function edlUserManualInfo
  */
  edlUserManualInfo: function(){
    var url = 'https://opennewslabs.github.io/autoEdit_2/user_manual/usage.html#exporting-a-video-sequenceedl';
    if( window.nw ){
      window.nw.Shell.openExternal(url);
    } else {
      window.open(url);
    }
  },

  /**
  * @function selectingWords
  */
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
    var tmpCounter = this.model.get("counterForPaperCuts");

    for(var i = 0; i < elemCount; i++){
      var element = $(".words[data-start-time='"+selectedElements[i].dataset.startTime.toString()+"']");

      if(element.hasClass( "highlight" )){
        element.removeClass("highlight");
        //remove addedCounter from element
        //decrease counter of addedCounter in transcription
        //TODO: check if var `tmpCounter` needs to be redifined. with var or can remove var.
        var tmpCounter = this.model.get("counterForPaperCuts");
        // this.model.set({counterForPaperCuts: tmpCounter-1 })
        element.removeData( "counterForPaperCuts" );
      }else {
        element.addClass("highlight");
        //increment added counter in transcription
        this.model.set({counterForPaperCuts: tmpCounter+1 });
        element.data( "paper-cut-order", tmpCounter+1 );
      }
    }

   var m =  this.model;
      //overwright/set the highlights
      this.model.set({highlights:  this.makePaperEdit($(".words").filter(".highlight"), m) });
      //save the model
      this.model.save({wait: false});
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
  * @function clearHighlights
  */ 
  clearHighlights: function(){
    var r = confirm("You are about to clear all of the highlighted selections from this transcription. Press Ok to continue or Cancel to abort");
    if (r === true) {
      // txt = "You pressed OK!";
      $(".words").filter(".highlight").removeClass("highlight");
      // .removeData( "counterForPaperCuts" );
      //  this.model.set({counterForPaperCuts: 0 })
      this.model.set({highlights:  [] });
      // this.model.save({wait: false});
    } else {
      // txt = "You pressed Cancel!";
      alert("Relax, nothing was cleared");
    }
  },

  /**
  * @function makePaperEdit
  * @description gets a a papercut sequence from hilighted words
  */
  makePaperEdit: function (selection, model){
    /**
    * @function groupContiguosWordsInPapercuts
    * Groups words from selection into array of contiguos words
    * uuses modified version of this code to divide contiguos numbers 
    https://stackoverflow.com/questions/22627125/grouping-consecutive-elements-together-using-javascript
    */
    function groupContiguosWordsInPapercuts(selectedWords){
      var result = [], temp = [], difference;
      for (var i = 0; i < selectedWords.length; i += 1) {
        $($(".words")[1]);
        var wordId = $($(selectedWords[i]) ).data("word-id");   
        if (difference !== ( wordId- i)) {
          if (difference !== undefined) {
            result.push(temp);
            temp = [];
          }
          difference = wordId - i;
        }
        temp.push(selectedWords[i]);
      }
      if (temp.length) {
        result.push(temp);
      }
      return result;
    }
    /**
    * @function makeSection
    * @description Makes papercuts of group of words.
    * by taking start of first word and end of last word.
    */
    function makeSection(arrayOfPapercuts){
      var result=[];
      for(var i = 0; i< arrayOfPapercuts.length; i++){
        var firstWord = arrayOfPapercuts[i][0];
        var lastWord = arrayOfPapercuts[i][arrayOfPapercuts[i].length -1];
        //TODO: iterate from first word to last word 
        //use  0 as starting point 
        //arrayOfPapercuts[i].length -1 as end point 
        //iterate over arrayOfPapercuts[i] 
        var words = [];
        var selectionText = "";
        for(var j =0; j< (arrayOfPapercuts[i].length -1 ); j++){
          var wordText = $(arrayOfPapercuts[i][j]).data("text");
          //TODO:recreate word from data attributes
          var word = {
            "id": $(arrayOfPapercuts[i][j]).data("word-id"),
            "text":  $(arrayOfPapercuts[i][j]).data("text"),
            "startTime":  $(arrayOfPapercuts[i][j]).data("start-time"),
            "endTime": $(arrayOfPapercuts[i][j]).data("end-time")
          };
          //TODO: add the word to the words array 
          words.push(word);
          selectionText+=wordText+" ";
        }
        model.attributes.counterForPaperCuts +=1;
        var paperCut = {
          id: i,
          paperCutOrder: model.attributes.counterForPaperCuts,
          startTime: $(firstWord).data("start-time"),
          endTime:  $(lastWord).data("end-time"),
          reelName: $(firstWord).data("reel-name"),
          clipName: $(firstWord).data("clip-name"),
          speaker: $(firstWord).data("speaker"),
          // wordId: $(firstWord).data("word-id"),
          // lineId: $(firstWord).data("line-id"),
          // paragraphId: $(firstWord).data("paragaph-id"),
          transcriptionId: $(firstWord).data("transcription-id"),
          videoId: $(firstWord).data("video-id"),
          videoOgg: $(firstWord).data("src"),
          audioFile: $(firstWord).data("audioFile"),
          text: selectionText,
          words: words
          //TODO: Add the word array of selection to the papercut
        };
        result.push(paperCut);
      }
      return result;
    }

  return makeSection(groupContiguosWordsInPapercuts(selection));
  },

  //keyboard event using mouse trap backbone version 
  keyboardEvents: {
    'command+k'           : 'pausePlayVideo',
    'ctrl+k'              : 'pausePlayVideo',
    'command+shift+k'     : 'pausePlayVideo',
    'ctrl+shift+k'        : 'pausePlayVideo',
    'command+j'           : 'slowVideo',
    'ctrl+j'              : 'slowVideo',
    'command+l'           : 'fastVideo',
    'ctrl+l'              : 'fastVideo',
    'command+shift+l'     : 'fastForwardVideo',
    'ctrl+shift+l'        : 'fastForwardVideo',
    'command+shift+right' : 'fastForwardVideo',
    'ctrl+shift+right'    : 'fastForwardVideo',
    'command+shift+j'     : 'rewindVideo',
    'ctrl+shift+j'        : 'rewindVideo',
    'command+shift+left'  : 'rewindVideo',
    'ctrl+shift+left'     : 'rewindVideo',
    'command+shift+up'    : 'volumeUp',
    'ctrl+shift+up'       : 'volumeUp',
    'command+shift+down'  : 'volumeDown',
    'ctrl+shift+down'     : 'volumeDown',
    'shift+/'             : 'showHideShortcuts'
  },

  /**
  * @function Shortcuts
  */
  showHideShortcuts: function(){
    console.log("show shorcuts");
    document.getElementById("shortcuts").click();
  },

  /**
  * @function Keyboard shortcuts for playback - 
  */
  slowVideo: function(ev){
    ev.preventDefault();
    var videoIdElem="#videoId_"+this.model.get("id");
    var videoElem = $(videoIdElem)[0];

    if(videoElem.playbackRate <= 0.5){
      videoElem.playbackRate =  0.5 ;
    }else{
      videoElem.playbackRate = videoElem.playbackRate - 0.5 ;
    }

    if (videoElem.paused) {
      videoElem.play();
    } 
    
    this.updateSpeedDisplay(videoElem.playbackRate);
  },

  /**
  * @function Keyboard shortcuts for playback -
  */
  fastVideo: function(ev){
    var videoIdElem="#videoId_"+this.model.get("id");
    var videoElem = $(videoIdElem)[0];

    if(videoElem.playbackRate >= 4){
      videoElem.playbackRate = 4 ;
    }else{
      videoElem.playbackRate = videoElem.playbackRate + 0.5 ;
    }

    if (videoElem.paused) {
      videoElem.play();
    } 

    this.updateSpeedDisplay(videoElem.playbackRate);
  },

  /**
  * @function Keyboard shortcuts for playback - play/pause
  */
  pausePlayVideo: function(ev){
    var videoIdElem="#videoId_"+this.model.get("id");
    var videoElem = $(videoIdElem)[0];
    
    if (videoElem.paused) {
      videoElem.play();
    } else {
      videoElem.pause();
    }
  },

  /**
  * @function Keyboard shortcuts for volume - decrease
  */
  volumeDown: function(ev){
    var videoIdElem="#videoId_"+this.model.get("id");
    var videoElem = $(videoIdElem)[0];
   
    if (videoElem.volume <= 0){
      videoElem.volume = 0;
    }else{
      videoElem.volume -= 0.2;
    }
  },

  /**
  * @function Keyboard shortcuts for volume - increase
  */
  volumeUp: function(ev){
    var videoIdElem="#videoId_"+this.model.get("id");
    var videoElem = $(videoIdElem)[0];
    videoElem.volume += 0.2;
  },

  /**
  * @function Keyboard shortcuts for playback - fastforward
  */
  fastForwardVideo: function(ev){
    var videoIdElem="#videoId_"+this.model.get("id");
    var videoElem = $(videoIdElem)[0];
    videoElem.currentTime += 5;
  },

  /**
  * @function Keyboard shortcuts for playback - rewind
  */
  rewindVideo: function(ev){
    var videoIdElem="#videoId_"+this.model.get("id");
    var videoElem = $(videoIdElem)[0];
    videoElem.currentTime -= 5;
  },

  /**
  * @function helper function to update diplay speed
  */
  updateSpeedDisplay: function(speed){
  //subtracting 1 because playback rate default / nromal is 1. but for display to user makes more sense to have zero as default
    document.getElementById("speedInput").value = speed-1;
  },
  //end of playback volume control

  /**
  * @function render
  */
  render: function(){    
    this.model.attributes.id = this.model.attributes._id;
    var sectionTemplate = render('transcriptionShow', this.model.attributes);
    this.$el.html(sectionTemplate);
    //modify compiled template to update hilights. 
    var tmpHighlights =  this.model.get("highlights");
      for(var i = 0; i < tmpHighlights.length; i++ ){
        var min =  tmpHighlights[i].startTime ;
        var max = tmpHighlights[i].endTime ;
        //needs to grab the words of the element of the view not in the dom        
        this.$(".words").filter(function(){
          return $(this).data('start-time') >= min && $(this).data('end-time') <= max;
        }).addClass("highlight");
      } 
    ///end of modify compiled template to update hilights. 
    return this;
  }
  
});
