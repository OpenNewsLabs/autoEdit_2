var convertGoogleToJson         = require('./convert_to_json.js');
var sampleResponse = {
  "sentences": [
    {
      "transcript": "a little hand thing though sort of indicates full but we still have terrible terrible doors in the world so many of them for whether I buy this house or not is not a function of weather has good doors in it and so except for safety reasons stores 10 not to be rude but the tyranny of bad Wars must end",
      "confidence": 0.932209,
      "words": [
        {
          "word": "a",
          "start": 444,
          "end": 444
        },
        {
          "word": "little",
          "start": 444,
          "end": 444.4
        },
        {
          "word": "hand",
          "start": 444.4,
          "end": 444.8
        },
        {
          "word": "thing",
          "start": 444.8,
          "end": 445.1
        },
        {
          "word": "though",
          "start": 445.1,
          "end": 445.3
        },
        {
          "word": "sort",
          "start": 445.3,
          "end": 445.8
        },
        {
          "word": "of",
          "start": 445.8,
          "end": 445.9
        },
        {
          "word": "indicates",
          "start": 445.9,
          "end": 446.4
        },
        {
          "word": "full",
          "start": 446.4,
          "end": 447
        },
        {
          "word": "but",
          "start": 447,
          "end": 447.7
        },
        {
          "word": "we",
          "start": 447.7,
          "end": 447.7
        },
        {
          "word": "still",
          "start": 447.7,
          "end": 448.1
        },
        {
          "word": "have",
          "start": 448.1,
          "end": 448.4
        },
        {
          "word": "terrible",
          "start": 448.4,
          "end": 449
        },
        {
          "word": "terrible",
          "start": 449,
          "end": 449.8
        },
        {
          "word": "doors",
          "start": 449.8,
          "end": 450.4
        },
        {
          "word": "in",
          "start": 450.4,
          "end": 450.5
        },
        {
          "word": "the",
          "start": 450.5,
          "end": 450.6
        },
        {
          "word": "world",
          "start": 450.6,
          "end": 450.6
        },
        {
          "word": "so",
          "start": 450.6,
          "end": 451.7
        },
        {
          "word": "many",
          "start": 451.7,
          "end": 452.3
        },
        {
          "word": "of",
          "start": 452.3,
          "end": 452.4
        },
        {
          "word": "them",
          "start": 452.4,
          "end": 452.6
        },
        {
          "word": "for",
          "start": 452.6,
          "end": 456.1
        },
        {
          "word": "whether",
          "start": 456.1,
          "end": 456.9
        },
        {
          "word": "I",
          "start": 456.9,
          "end": 457
        },
        {
          "word": "buy",
          "start": 457,
          "end": 457.3
        },
        {
          "word": "this",
          "start": 457.3,
          "end": 457.6
        },
        {
          "word": "house",
          "start": 457.6,
          "end": 458
        },
        {
          "word": "or",
          "start": 458,
          "end": 458.1
        },
        {
          "word": "not",
          "start": 458.1,
          "end": 458.4
        },
        {
          "word": "is",
          "start": 458.4,
          "end": 458.5
        },
        {
          "word": "not",
          "start": 458.5,
          "end": 458.8
        },
        {
          "word": "a",
          "start": 458.8,
          "end": 458.9
        },
        {
          "word": "function",
          "start": 458.9,
          "end": 459.3
        },
        {
          "word": "of",
          "start": 459.3,
          "end": 459.4
        },
        {
          "word": "weather",
          "start": 459.4,
          "end": 459.6
        },
        {
          "word": "has",
          "start": 459.6,
          "end": 459.8
        },
        {
          "word": "good",
          "start": 459.8,
          "end": 460
        },
        {
          "word": "doors",
          "start": 460,
          "end": 460.4
        },
        {
          "word": "in",
          "start": 460.4,
          "end": 460.6
        },
        {
          "word": "it",
          "start": 460.6,
          "end": 460.7
        },
        {
          "word": "and",
          "start": 460.7,
          "end": 461.5
        },
        {
          "word": "so",
          "start": 461.5,
          "end": 461.7
        },
        {
          "word": "except",
          "start": 461.7,
          "end": 462.9
        },
        {
          "word": "for",
          "start": 462.9,
          "end": 463.2
        },
        {
          "word": "safety",
          "start": 463.2,
          "end": 463.7
        },
        {
          "word": "reasons",
          "start": 463.7,
          "end": 463.9
        },
        {
          "word": "stores",
          "start": 463.9,
          "end": 464.7
        },
        {
          "word": "10",
          "start": 464.7,
          "end": 465.1
        },
        {
          "word": "not",
          "start": 465.1,
          "end": 465.3
        },
        {
          "word": "to",
          "start": 465.3,
          "end": 465.5
        },
        {
          "word": "be",
          "start": 465.5,
          "end": 465.7
        },
        {
          "word": "rude",
          "start": 465.7,
          "end": 466
        },
        {
          "word": "but",
          "start": 466,
          "end": 466.2
        },
        {
          "word": "the",
          "start": 466.2,
          "end": 466.5
        },
        {
          "word": "tyranny",
          "start": 466.5,
          "end": 467
        },
        {
          "word": "of",
          "start": 467,
          "end": 467.1
        },
        {
          "word": "bad",
          "start": 467.1,
          "end": 467.6
        },
        {
          "word": "Wars",
          "start": 467.6,
          "end": 468.2
        },
        {
          "word": "must",
          "start": 468.2,
          "end": 468.8
        },
        {
          "word": "end",
          "start": 468.8,
          "end": 469.2
        }
      ]
    },
    {
      "transcript": "and I told him that's my feelings are very misleading you're goddamn right and if we all thought like you well we might just design a better world",
      "confidence": 0.9221018,
      "words": [
        {
          "word": "and",
          "start": 477.9,
          "end": 478.4
        },
        {
          "word": "I",
          "start": 478.4,
          "end": 478.5
        },
        {
          "word": "told",
          "start": 478.5,
          "end": 479.5
        },
        {
          "word": "him",
          "start": 479.5,
          "end": 479.6
        },
        {
          "word": "that's",
          "start": 479.6,
          "end": 480.4
        },
        {
          "word": "my",
          "start": 480.4,
          "end": 480.6
        },
        {
          "word": "feelings",
          "start": 480.6,
          "end": 481
        },
        {
          "word": "are",
          "start": 481,
          "end": 481.2
        },
        {
          "word": "very",
          "start": 481.2,
          "end": 481.2
        },
        {
          "word": "misleading",
          "start": 481.2,
          "end": 481.7
        },
        {
          "word": "you're",
          "start": 481.7,
          "end": 483.7
        },
        {
          "word": "goddamn",
          "start": 483.7,
          "end": 485.2
        },
        {
          "word": "right",
          "start": 485.2,
          "end": 485.7
        },
        {
          "word": "and",
          "start": 485.7,
          "end": 486.3
        },
        {
          "word": "if",
          "start": 486.3,
          "end": 486.3
        },
        {
          "word": "we",
          "start": 486.3,
          "end": 486.5
        },
        {
          "word": "all",
          "start": 486.5,
          "end": 486.6
        },
        {
          "word": "thought",
          "start": 486.6,
          "end": 486.9
        },
        {
          "word": "like",
          "start": 486.9,
          "end": 487.2
        },
        {
          "word": "you",
          "start": 487.2,
          "end": 487.3
        },
        {
          "word": "well",
          "start": 487.3,
          "end": 488.1
        },
        {
          "word": "we",
          "start": 488.1,
          "end": 488.2
        },
        {
          "word": "might",
          "start": 488.2,
          "end": 488.4
        },
        {
          "word": "just",
          "start": 488.4,
          "end": 488.5
        },
        {
          "word": "design",
          "start": 488.5,
          "end": 489.1
        },
        {
          "word": "a",
          "start": 489.1,
          "end": 489.2
        },
        {
          "word": "better",
          "start": 489.2,
          "end": 489.6
        },
        {
          "word": "world",
          "start": 489.6,
          "end": 489.8
        }
      ]
    },
    {
      "transcript": " it won't open because it",
      "confidence": 0.8995269,
      "words": [
        {
          "word": "it",
          "start": 491.6,
          "end": 492
        },
        {
          "word": "won't",
          "start": 492,
          "end": 492.4
        },
        {
          "word": "open",
          "start": 492.4,
          "end": 492.8
        },
        {
          "word": "because",
          "start": 492.8,
          "end": 493.2
        },
        {
          "word": "it",
          "start": 493.2,
          "end": 493.8
        }
      ]
    }
  ]
}

var result = convertGoogleToJson(sampleResponse)

console.log(JSON.stringify(result, null, 2))