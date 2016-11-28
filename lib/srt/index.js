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
'use strict';

/**
 * Srt composer from json of lines objets
 * @param {json} srtContent
 * @param {cb} callback
 * @todo add error handling and error.
 */
function createSrtContent(srtData, cb) {
  var lines = '';
  for(var i = 0; i < srtData.length; i++) {
    var srtLineO = srtData[i];
    lines += srtLineO.id + '\n';
    lines += srtLineO.startTime + ' --> ' + srtLineO.endTime + '\n';
    lines += srtLineO.text + '\n\n';
  }
  // TODO figure out if callback here is redundant and could just return
  if(cb) { cb(lines); } else { return lines; }
}

module.exports.createSrtContent = createSrtContent;


//NOTE: node-timecodes npm lib ( https://github.com/synchronized-tv/node-timecodes) does not support exporting timecodes in format suitable for srt file. which requires a comma instead of a dot for millisercons. Hence adding it here as a helper. Ideally it should be integrated in node timecode library.

/**
* @funciton padNumber
* @description helper function to make timecode consistent eg 00:05:00:00 vs 00:5:00:00
* @param{nb} digit - integer to make into two digits if not by adding a zero
*/
var padNumber = function (nb) {
  var length = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

  while (('' + nb).length < length) {
    nb = '0' + nb;
  }
  return nb;
};

/**
* @function fromSecondsForSrt
* @description converts time in seconds to timecode for srt file 
* [modified from ]{@link https://github.com/Synchronized-TV/node-timecodes/blob/master/src/toSeconds.js}
* @param{number} seconds - seconds to convdert to 00:00:00,00
* @returns {string} result - returns string "hh:mm:ss:ms" eg "00:00:00,00"
*/
var fromSecondsForSrt = function (seconds) {
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
};

module.exports.fromSecondsForSrt = fromSecondsForSrt;
