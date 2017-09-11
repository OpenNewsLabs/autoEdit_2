'use strict';


var writeOutGoogle              = require('./write_out.js');

var sampleInputOneFile = [
  {
    "f": {
      "name": "/Users/pietropassarelli/Library/Application Support/autoEdit2/media/norman_door_trimmed.mp4.1504069013038.tmp.flac",
      "offset": 0
    },
    "data": {
      "sentences": [
        {
          "transcript": "there's this door on the 10th floor of the VOX media office that I hate so much",
          "confidence": 0.95495653,
          "words": [
            {
              "word": "there's",
              "start": 0,
              "end": 0.4
            },
            {
              "word": "this",
              "start": 0.4,
              "end": 0.5
            },
            {
              "word": "door",
              "start": 0.5,
              "end": 1
            },
            {
              "word": "on",
              "start": 1,
              "end": 1.3
            },
            {
              "word": "the",
              "start": 1.3,
              "end": 1.5
            },
            {
              "word": "10th",
              "start": 1.5,
              "end": 1.7
            },
            {
              "word": "floor",
              "start": 1.7,
              "end": 1.8
            },
            {
              "word": "of",
              "start": 1.8,
              "end": 2.2
            },
            {
              "word": "the",
              "start": 2.2,
              "end": 2.4
            },
            {
              "word": "VOX",
              "start": 2.4,
              "end": 2.7
            },
            {
              "word": "media",
              "start": 2.7,
              "end": 2.8
            },
            {
              "word": "office",
              "start": 2.8,
              "end": 3
            },
            {
              "word": "that",
              "start": 3,
              "end": 3.4
            },
            {
              "word": "I",
              "start": 3.4,
              "end": 3.5
            },
            {
              "word": "hate",
              "start": 3.5,
              "end": 3.6
            },
            {
              "word": "so",
              "start": 3.6,
              "end": 3.8
            },
            {
              "word": "much",
              "start": 3.8,
              "end": 4.2
            }
          ]
        },
        {
          "transcript": " dammit",
          "confidence": 0.43232667,
          "words": [
            {
              "word": "dammit",
              "start": 6.3,
              "end": 6.9
            }
          ]
        },
        {
          "transcript": " . Is your wrong",
          "confidence": 0.5716926,
          "words": [
            {
              "word": ".",
              "start": 8.9,
              "end": 9.4
            },
            {
              "word": "Is",
              "start": 9.4,
              "end": 9.5
            },
            {
              "word": "your",
              "start": 9.5,
              "end": 9.7
            },
            {
              "word": "wrong",
              "start": 9.7,
              "end": 9.9
            }
          ]
        }
      ]
    }
  }
]


var sampleInputTwoFiles = [
  {
    "f": {
      "name": "/Users/pietropassarelli/Library/Application Support/autoEdit2/media/norman_door_trimmed.mp4.1504069013038.tmp.flac",
      "offset": 0
    },
    "data": {
      "sentences": [
        {
          "transcript": "there's this door on the 10th floor of the VOX media office that I hate so much",
          "confidence": 0.95495653,
          "words": [
            {
              "word": "there's",
              "start": 0,
              "end": 0.4
            },
            {
              "word": "this",
              "start": 0.4,
              "end": 0.5
            },
            {
              "word": "door",
              "start": 0.5,
              "end": 1
            },
            {
              "word": "on",
              "start": 1,
              "end": 1.3
            },
            {
              "word": "the",
              "start": 1.3,
              "end": 1.5
            },
            {
              "word": "10th",
              "start": 1.5,
              "end": 1.7
            },
            {
              "word": "floor",
              "start": 1.7,
              "end": 1.8
            },
            {
              "word": "of",
              "start": 1.8,
              "end": 2.2
            },
            {
              "word": "the",
              "start": 2.2,
              "end": 2.4
            },
            {
              "word": "VOX",
              "start": 2.4,
              "end": 2.7
            },
            {
              "word": "media",
              "start": 2.7,
              "end": 2.8
            },
            {
              "word": "office",
              "start": 2.8,
              "end": 3
            },
            {
              "word": "that",
              "start": 3,
              "end": 3.4
            },
            {
              "word": "I",
              "start": 3.4,
              "end": 3.5
            },
            {
              "word": "hate",
              "start": 3.5,
              "end": 3.6
            },
            {
              "word": "so",
              "start": 3.6,
              "end": 3.8
            },
            {
              "word": "much",
              "start": 3.8,
              "end": 4.2
            }
          ]
        },
        {
          "transcript": " dammit",
          "confidence": 0.43232667,
          "words": [
            {
              "word": "dammit",
              "start": 6.3,
              "end": 6.9
            }
          ]
        },
        {
          "transcript": " . Is your wrong",
          "confidence": 0.5716926,
          "words": [
            {
              "word": ".",
              "start": 8.9,
              "end": 9.4
            },
            {
              "word": "Is",
              "start": 9.4,
              "end": 9.5
            },
            {
              "word": "your",
              "start": 9.5,
              "end": 9.7
            },
            {
              "word": "wrong",
              "start": 9.7,
              "end": 9.9
            }
          ]
        }
      ]
    }
  },

  {
    "f": {
      "name": "/Users/pietropassarelli/Library/Application Support/autoEdit2/media/norman_door_trimmed.mp4.1504069013038.tmp.flac",
      "offset": 400000
    },
    "data": {
      "sentences": [
        {
          "transcript": "there's this door on the 10th floor of the VOX media office that I hate so much",
          "confidence": 0.95495653,
          "words": [
            {
              "word": "there's",
              "start": 0,
              "end": 0.4
            },
            {
              "word": "this",
              "start": 0.4,
              "end": 0.5
            },
            {
              "word": "door",
              "start": 0.5,
              "end": 1
            },
            {
              "word": "on",
              "start": 1,
              "end": 1.3
            },
            {
              "word": "the",
              "start": 1.3,
              "end": 1.5
            },
            {
              "word": "10th",
              "start": 1.5,
              "end": 1.7
            },
            {
              "word": "floor",
              "start": 1.7,
              "end": 1.8
            },
            {
              "word": "of",
              "start": 1.8,
              "end": 2.2
            },
            {
              "word": "the",
              "start": 2.2,
              "end": 2.4
            },
            {
              "word": "VOX",
              "start": 2.4,
              "end": 2.7
            },
            {
              "word": "media",
              "start": 2.7,
              "end": 2.8
            },
            {
              "word": "office",
              "start": 2.8,
              "end": 3
            },
            {
              "word": "that",
              "start": 3,
              "end": 3.4
            },
            {
              "word": "I",
              "start": 3.4,
              "end": 3.5
            },
            {
              "word": "hate",
              "start": 3.5,
              "end": 3.6
            },
            {
              "word": "so",
              "start": 3.6,
              "end": 3.8
            },
            {
              "word": "much",
              "start": 3.8,
              "end": 4.2
            }
          ]
        },
        {
          "transcript": " dammit",
          "confidence": 0.43232667,
          "words": [
            {
              "word": "dammit",
              "start": 6.3,
              "end": 6.9
            }
          ]
        },
        {
          "transcript": " . Is your wrong",
          "confidence": 0.5716926,
          "words": [
            {
              "word": ".",
              "start": 8.9,
              "end": 9.4
            },
            {
              "word": "Is",
              "start": 9.4,
              "end": 9.5
            },
            {
              "word": "your",
              "start": 9.5,
              "end": 9.7
            },
            {
              "word": "wrong",
              "start": 9.7,
              "end": 9.9
            }
          ]
        }
      ]
    }
  }
]

var result = writeOutGoogle( sampleInputOneFile );
// var result = writeOutGoogle( sampleInputTwoFiles )

console.log(JSON.stringify(result,null,2));