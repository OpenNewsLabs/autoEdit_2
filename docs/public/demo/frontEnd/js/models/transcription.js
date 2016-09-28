
 var app = app || {};
// http://backbonejs.org/#Model
app.Transcription = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: config.serverUrl+"/transcription",
  defaults: {
    // title: "Default Title ",
    // description: "Default Description",
    //original file path
    // videoUrl: "/",
    // url:"/",
    // sttEngine: "ibm",
    languageModel: "en-US_BroadbandModel", //default is american US broadband model
    counterForPaperCuts: 0,
    audioFile: undefined,
    processedAudio: false,
    processedVideo: false,
    status: false,
    highlights: [],
    // orderedPaperCuts:[],
    videoOgg:undefined,
    metadata:undefined,
    text: undefined
 
    //status is marked as false by default and turned to true when transcription has been processed
    //get date from metadata of video
  },
  //validate
  //http://beletsky.net/2012/11/baby-steps-to-backbonejs-model.html
  // or
  //https://github.com/thedersen/backbone.validation
  //example https://jsfiddle.net/thedersen/udXL5/
  validate: function(attributes){
    if(!attributes.title){
      return "Remember to set a title for your section.";
    // }else if(!attributes.videoUrl){
    //   return "Remember to pick a video file";
    }
  },

  //initializer
  initialize: function(){
    //catch error if invalid initialization.
    // console.log('This model has been initialized.');
    // this.id = this._id;

    this.on("invalid", function(model, error){
      console.info(error);
    });
    
    this.on('change', function(){
        // console.info('- Values for this model have changed.');
    });

    this.on('change:title', function(){
        // console.log('Title value for this model has changed.');
    });

     this.on('destroy', function(){
     
      // if(window.frontEndEnviromentNWJS){
        // console.log("deleting associated media")
        // var fs = require("fs")
        // TODO: use path library to make absolute path.
        // var path = require("path")
          // console.log(path.resolve(this.attributes.videoOgg))
          // console.log( path.resolve(this.attributes.audioFile))

            // fs.unlinkSync( path.resolve(this.attributes.videoOgg));    
            // fs.unlinkSync(  path.resolve(this.attributes.audioFile));    
      // }
    
        // console.log('Title value for this model has changed.');
    });

  }

//app.TranscriptionsList.get(1).constructor.returnSrtJson()
//https://stackoverflow.com/questions/9686001/get-a-backbone-model-instances-model-class-name
},{

  //TODO: change this to returnSrt coz that's what it is doing
  //and make rturns srtJson in helper function in model 

 function loopThroughStuff(text, cb){
        // var text = app.TranscriptionsList.get(8).get("text");

        var newLinesAr = []
        var newLine ={}
        var counter = 1
        
        _.each(text, function(paragraphs){

           _.each(paragraphs.paragraph, function(paragraph){

            
            if(paragraph.line.length > 8){
              // console.log(JSON.stringify(paragraph))
              // console.log(JSON.stringify(paragraph.line.length))
              // console.log("---")
              var regroupLines = split(paragraph.line, 8)
              // console.log(regroupLines)
              //make srt lines 
              _.each(regroupLines, function(l){
                console.log(JSON.stringify(l))
                console.log("---")
                 newLine.id = counter;
                 counter+=1;
                 newLine.startTime = fromSecondsForSrt(l[0].startTime);
                 newLine.endTime = fromSecondsForSrt(l[l.length-1].endTime);
                 newLine.text = "";
                _.each(l, function(w){
                  // console.log("---");
                  // console.log(JSON.stringify(w));
                  newLine.text += w.text +" ";
                })//words
                  newLinesAr.push(newLine)
                  newLine={}
              })//lines in regrouped lines

            }else{
              newLine.id = counter;
              counter+=1
              newLine.startTime = fromSecondsForSrt(paragraph.line[0].startTime)
              newLine.endTime = fromSecondsForSrt(paragraph.line[paragraph.line.length -1].endTime)
              newLine.text = ""
              _.each(paragraph.line, function(word){
                // console.log(word)
                newLine.text += word.text +" "
              })//line
              newLinesAr.push(newLine)
              newLine={}
            }
           
            
          })//paragraph
        })//paragraphs

        cb(newLinesAr)
    }

      //in order to sue this 
      //TODO: this needs to be moved/used from the srt lib
      function createSrtContent(srtJsonContent, cb){
        var lines = "";
        for(var i=0; i< srtJsonContent.length; i++){
          srtLineO = srtJsonContent[i];
          lines+=srtLineO.id+"\n";
          lines+=srtLineO.startTime+" --> "+srtLineO.endTime+"\n";
          lines+=srtLineO.text+"\n\n";
        }

        if(cb){cb(lines)}else{return lines};
      }

      loopThroughStuff(text, function(res){
         result = createSrtContent(res)
      })
          

    return result;
  },


returnPlainTextTimecoded: function(attr){
  console.log(attr)
      function loopThroughStuff(text, cb){
        // var text = app.TranscriptionsList.get(8).get("text");

        var newLinesAr = []
        var newLine ={}
        var counter = 1
        
        _.each(text, function(paragraphs){
           _.each(paragraphs.paragraph, function(paragraph){
            newLine.id = counter;
            counter+=1

            newLine.startTime = fromSecondsForSrt(paragraph.line[0].startTime)
            newLine.endTime = fromSecondsForSrt(paragraph.line[paragraph.line.length -1].endTime)
            newLine.speaker = paragraphs.speaker;
            newLine.text = ""
            _.each(paragraph.line, function(word){
              // console.log(word)
              newLine.text += word.text +" "
            })//line
            newLinesAr.push(newLine)
            newLine={}
          })//paragraph
        })//paragraphs

        cb(newLinesAr)
      }


      function createPlainTextTimecoded(srtJsonContent, cb){
        var lines = "";

        var head="Transcription: "+attr.title+"\n\n"
        head += "Description: "+attr.description+"\n\n"
        head += "File name: " +attr.metadata.fileName +"\n\n"
        head += "File path: "+attr.metadata.filePathName +"\n\n"
        head += "Reel: "+attr.metadata.reelName +"\n"
        head += "Camera Timecode: "+attr.metadata.timecode +"\n"
        head += "fps: "+attr.metadata.fps +"\n"
        head += "Duration: "+fromSeconds(attr.metadata.duration)+"\n"
        // 
        for(var i=0; i< srtJsonContent.length; i++){

          srtLineO = srtJsonContent[i];
          // lines+=srtLineO.id+"\n";
          lines+="["+srtLineO.startTime+"\t"+srtLineO.endTime+"\t"+srtLineO.speaker +"]"+"\n";
          lines+=srtLineO.text+"\n\n";
        
        }

        if(cb){cb(lines)}else{return head+"\n\n"+lines};
      }

      loopThroughStuff(attr.text, function(res){
         result = createPlainTextTimecoded(res)
      })
          

    return result;

},


  returnEDLSrtJson: function(text){
    //TODO: refactor, this is duplicate move to helper in module?
    function createSrtContent(srtJsonContent, cb){
        var lines = "";
        for(var i=0; i< srtJsonContent.length; i++){
          srtLineO = srtJsonContent[i];
          lines+=srtLineO.id+"\n";
          lines+=srtLineO.startTime+" --> "+srtLineO.endTime+"\n";
          lines+=srtLineO.text+"\n\n";
        }

        if(cb){cb(lines)}else{return lines};
      }

     result =   createSrtContent(text)

      return result;

  }

});



