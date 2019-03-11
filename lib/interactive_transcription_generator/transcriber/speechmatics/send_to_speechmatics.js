
"use strict";
const fs = require("fs");
const Speechmatics = require('./speechmatics-sdk.js');

var SendToSpeechmatics = function(){};


SendToSpeechmatics.prototype.send = function(audioFile,keys, languageModel, cb){
    console.log("SendToSpeechmatics.send",audioFile,keys, languageModel, cb );

    var opts = {};

    const speech_to_text = new Speechmatics(keys.username, keys.password);

    var existingReadStream = fs.createReadStream(audioFile);
    
    speech_to_text.createJob({audioStream: existingReadStream, model: languageModel, diarisation: true}, function(error, res){
        //{"balance":360,"check_wait":null,"cost":0,"id":7420708}
        //{"balance":330,"check_wait":30,"cost":6,"id":7421841}
        console.log("inside speechmatics module : ",JSON.stringify(res));
        console.log("-----------------");
        
        var speechmaticsJobId = res.id;
        
            console.log("not done", error, res);
            var checkAgainInMilliseconds = parseInt(res.check_wait) *1000;
            console.log("checkAgainInMilliseconds ", checkAgainInMilliseconds);


            // electron has issues with timer accuracy drifting  
            //https://github.com/electron/electron/issues/7079 
            //fix timer issue https://peter.sh/experiments/chromium-command-line-switches/
            //Just passed the command line argument to "electron . --disable-background-timer-throttling"  in package.json start script
           var timer = setInterval(function(){
                console.log("inside set timeout");
                
                speech_to_text.getTranscript(speechmaticsJobId, opts,

                    function (err, transcript){

                            console.log("handleTranscriptionResp");
                            //// make module to rearrange , see notes.md 
                            // fs.writeFileSync('./speechmatics_sample_output_longer.json', JSON.stringify(transcript,null, 2) );
                            console.log(JSON.stringify(transcript,null, 2));

                            if (err){
                                console.error(err);
                                 if(!((err.code) && (err.code === 404))){  //error // "Job In Progress" // message // "Job In Progress"
                                    clearInterval(timer);
                                    if(cb){
                                        cb(err, null);
                                    }else{ 
                                        return err;
                                    }
                                }
                            }else{
                                // body of rseponse in transcript attribute might contain error, so need to check for that if transcription still in progress
                                // {
                                // "code": 404,
                                // "error": "Job In Progress"
                                // }
                                // if transcript.code is not defined then get result
                                if(transcript.code === undefined){ 
                                    clearInterval(timer);
                                    if(cb){
                                        cb(null, transcript);
                                    }else{ 
                                        return transcript;
                                    }
                                }
                            }
                        });

            }, checkAgainInMilliseconds);
        });
};



module.exports = SendToSpeechmatics;