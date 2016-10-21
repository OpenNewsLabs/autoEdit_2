/**
* @module srt
* @description provides a function to convert srt line object json to srt file content as string
* originally from [srtParserComposer](https://github.com/pietrop/srtParserComposer) and  [on npm](https://www.npmjs.com/package/srt_parser_composer)
* Expecting srtJsonContent to be like so

@example <caption>Example USage</catpion>
var srtJsonContent = [
  {
    "id": "1",
    "startTime": "00:00:00,160",
    "endTime": "00:00:04,890",
    "text": "There’s this door on the 10th floor I just\nhate so much.\n"
  },
  {
    "id": "3",
    "startTime": "00:00:05,799",
    "endTime": "00:00:11,629",
    "text": "Goddammit!\nDo you ever get this door wrong? “pretty\n"
  },
  {
    "text": "regularly.”\nHow often? “like 30% of the time.”\n",
    "id": "4",
    "startTime": "00:00:11,629",
    "endTime": "00:00:12,000"
  },
  {
    "id": "6",
    "startTime": "00:00:14,290",
    "endTime": "00:00:16,869",
    "text": "Have you seen people misuse it?\nAll the time. Every day. Constantly.\n"
  }
]

createSrtContent(srtJsonContent, function(resp){
  //do something with the srt file content returned as a string 
})

*  @example <caption> it returns a string content of the srt file like so</caption> 
1
00:00:00,160 --> 00:00:04,890
There’s this door on the 10th floor I just
hate so much.

3
00:00:05,799 --> 00:00:11,629
Goddammit!
Do you ever get this door wrong? “pretty

4
00:00:11,629 --> 00:00:12,000
regularly.”
How often? “like 30% of the time.”

6
00:00:14,290 --> 00:00:16,869
Have you seen people misuse it?
All the time. Every day. Constantly.

* @author Pietro Passarelli 
*/

/**
 * Srt composer from json of lines objets
 * @param {json} srtContent
 * @param {cb} callback
 * @todo add error handling and error.
 */
"use strict";

function createSrtContent(srtJsonContent, cb){
  var lines = "";
  for(var i=0; i< srtJsonContent.length; i++){
    srtLineO = srtJsonContent[i];
    lines+=srtLineO.id+"\n";
    lines+=srtLineO.startTime+" --> "+srtLineO.endTime+"\n";
    lines+=srtLineO.text+"\n";
  }
  //TODO figure out if callback here is redundant and could just return
  if(cb){cb(lines)}else{return lines};
}
