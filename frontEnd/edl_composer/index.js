
/*
https://documentation.apple.com/en/finalcutpro/usermanual/index.html#chapter=96%26section=1%26tasks=true
"In an EDL, each clip in your sequence is represented by a line of text called an event, which has a unique event number. A clip in an EDL is defined by a source reel name and two pairs of timecode In and Out points. The first pair of timecode numbers describes the source tape (or clip) In and Out points. The second pair describes the timecode location where that clip should be placed onto a master tape (or Timeline)."
*/

var EDL = function (config){
  this.head = "TITLE: "+config.title+"\nFCM: NON-DROP FRAME\n\n";

     this.offset = 0;//"00:00:00:00";
     console.log("EDL index offset")
      console.log(config.offset)
    if(config.offset!= "NA"){
      //converting offset to seconds, because in camera metadata comes in as hh:mm:ss:ms
      console.log("assigning offset")
      console.log(config.offset)
      this.offset = toSeconds(config.offset) ;
      console.info("offset EDL index assigned")
      console.log(config.offset)
      console.log(this.offset)
    }


  this.body = function(){
    console.log(config)
    // if(config.offset){
      // var startTimecode =config.offset ;//"00:00:00:00";
    // }else{
       var startTimecode =0 ;//"00:00:00:00";
    // }
    var edlBody = [];
    for(var j = 0; j < config.events.length; j++){
      var event =  config.events[j];

        var edlLine = new EDLline(event, startTimecode, this.offset)
        //set start timecode for next to tape out of current.
        startTimecode = edlLine.tapeOut();
        edlBody.push(edlLine.compose());
    }
    return edlBody.join("");
  }

  this.compose = function(){
    return this.head + this.body();
  }

}

var EDLline = function(event, tapeIn, offset){
    
  this.offset = offset;

  this.counter = event.id;

  this.n = function(){
    if(this.counter.toString().length ==1 ){
      return "00"+this.counter.toString();
    }else if(this.counter.toString().length ==2){
      return "0"+this.counter.toString();
    }else if(this.counter.toString().length ==3){
      return this.counter.toString();
    }else{
      return this.counter.toString();
    }
  };

  this.startTime = event.startTime;
  this.endTime = event.endTime;

  this.clipInPoint = function(){
    //return convert  this.endTime to TC
    return parseFloat(this.startTime) ;
  };
  this.clipOutPoint = function(){
    //return convert  this.endTime to TC
    return  parseFloat(this.endTime);
  };

  this.reelName = event.reelName;
  this.reelName7digit= function(){
    return this.reelName.split("").slice(0,7).join("")
  };

  this.clipName = event.clipName;

  this.tapeIn = tapeIn;
  
  this.tapeOut = function(){
    var result = (this.tapeIn + (this.clipOutPoint()- this.clipInPoint()));
    return result;
    // return 890;
  };

  this.compose = function(){
    console.log("inpoint");
    console.log(this.clipInPoint());
    console.log(this.clipInPoint()+this.offset);
    console.log("outpoint");
    console.log(this.clipOutPoint());
    console.log(this.clipOutPoint()+this.offset);
    
    var res ="";
    //Handling lack of reel name in clip.
    if(this.reelName != "NA" ){
       res =  ""+this.n()+"   "+this.reelName7digit()+" AX  AA/V  C  "
    }else{
       res =  ""+this.n()+"   "+" AX  AA/V  C  "
    }

    res+=fromSeconds(this.clipInPoint()+this.offset)+" "+fromSeconds(this.clipOutPoint()+this.offset)+" ";
    res+=fromSeconds(this.tapeIn)+" "+fromSeconds(this.tapeOut())+"\n";

    res+= "* FROM CLIP NAME: "+this.clipName+"\n";

    //Handling lack of reel name in clip.
    if(this.reelName != "NA" ){
      res+="FINAL CUT PRO REEL: "+this.reelName+" REPLACED BY: "+this.reelName7digit()+"\n\n";
    }else{
      res+="\n";
    }
    return res;
  }

}

//TODO: check on module export class.
// module.export = EDL;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* Timecode conversion code from https://www.npmjs.com/package/node-timecodes and extracted to use outside of npm node modules on client side
*/
function padNumber(nb) {
  var length = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

  while (('' + nb).length < length) {
    nb = '0' + nb;
  }
  return nb;
}

/* converts time in seconds to timecode */
function fromSeconds(seconds) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var defaultFrameRate = 25;
  var _ref$frameRate = _ref.frameRate;
  var frameRate = _ref$frameRate === undefined ? defaultFrameRate : _ref$frameRate;
  var _ref$ms = _ref.ms;
  var ms = _ref$ms === undefined ? false : _ref$ms;

  var _seconds = parseFloat(seconds) || 0,
      milliseconds = Math.round((_seconds - parseInt(_seconds, 10)) * 10000, 10) / 10;

  var hours = Math.floor(_seconds / (60 * 60), 10),
      mins = Math.floor(_seconds / 60, 10) - hours * 60,
      secs = Math.floor(_seconds - hours * 3600 - mins * 60, 10),
      frame = Math.floor(Math.round(milliseconds / 1000 / (1 / frameRate) * 100) / 100);

  var suffix = ms && padNumber(parseInt(milliseconds, 10), 3) || padNumber(frame, 2);

  return padNumber(hours) + ':' + padNumber(mins) + ':' + padNumber(secs) + ':' + suffix;
}
///////////////////////////////////////////////////////////////////////////////////////////////
///for srt composer


function fromSecondsForSrt(seconds) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var defaultFrameRate = 25;
  var _ref$frameRate = _ref.frameRate;
  var frameRate = _ref$frameRate === undefined ? defaultFrameRate : _ref$frameRate;
  var _ref$ms = _ref.ms;
  var ms = _ref$ms === undefined ? false : _ref$ms;

  var _seconds = parseFloat(seconds) || 0,
      milliseconds = Math.round((_seconds - parseInt(_seconds, 10)) * 10000, 10) / 10;

  var hours = Math.floor(_seconds / (60 * 60), 10),
      mins = Math.floor(_seconds / 60, 10) - hours * 60,
      secs = Math.floor(_seconds - hours * 3600 - mins * 60, 10),
      frame = Math.floor(Math.round(milliseconds / 1000 / (1 / frameRate) * 100) / 100);

  var suffix = ms && padNumber(parseInt(milliseconds, 10), 3) || padNumber(frame, 2);

  return padNumber(hours) + ':' + padNumber(mins) + ':' + padNumber(secs) + ',' + suffix+"0";
}

///////
//modified from https://github.com/Synchronized-TV/node-timecodes/blob/master/src/toSeconds.js

/*convert timecodes to seconds*/
function toSeconds(timecode, fr){
  //option to convert passing in frame rate
  var frameRate;
  if(fr == undefined){
       frameRate = 25;
  }else{
     frameRate = fr;
  }

  var  tc = timecode.split(':');
  return parseFloat(tc[0] * 60 * 60 + parseInt(tc[1], 10) * 60 + parseInt(tc[2], 10) + parseInt(tc[3], 10) / frameRate);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////Example usage

// var edlSqDemo = {
//     "title": "Demo Title of project",
//     //offset is option default is "00:00:00:00"
//     "offset": "00:00:28:08",
//     "events":  [
//       { "id":1,
//         "startTime": 10,
//         "endTime": 20,
//         "reelName":"SomeReelName",
//         "clipName":"Something.mov"
//       },
//       { "id":2,
//         "startTime": 45,
//         "endTime": 55,
//         "reelName":"SomeOtherReelName",
//         "clipName":"SomethingElse.mov"
//       },
        // { "id":2,
//         "startTime": 45,
//         "endTime": 55,
//         "reelName":"NA",
//         "clipName":"SomethingElse.mov"
//       }
//     ]
// }
//
//
// var edl = new EDL(edlSqDemo)
// console.log(edl.compose())
