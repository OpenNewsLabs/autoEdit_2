var parseGoogle = require('./parse.js')


var sampleResponse = {
  "results": [
    {
      "alternatives": [
        {
          "transcript": "once there was a young rat named Arthur who could never make up his mind whenever his friends asked him if he would like to go out with him he would only answer I don't know",
          "confidence": 0.9644845,
          "words": [
            {
              "startTime": "0s",
              "endTime": "0.600s",
              "word": "once"
            },
            {
              "startTime": "0.600s",
              "endTime": "0.800s",
              "word": "there"
            },
            {
              "startTime": "0.800s",
              "endTime": "0.800s",
              "word": "was"
            },
            {
              "startTime": "0.800s",
              "endTime": "1s",
              "word": "a"
            },
            {
              "startTime": "1s",
              "endTime": "1.100s",
              "word": "young"
            },
            {
              "startTime": "1.100s",
              "endTime": "1.500s",
              "word": "rat"
            },
            {
              "startTime": "1.500s",
              "endTime": "1.700s",
              "word": "named"
            },
            {
              "startTime": "1.700s",
              "endTime": "2s",
              "word": "Arthur"
            },
            {
              "startTime": "2s",
              "endTime": "2.600s",
              "word": "who"
            },
            {
              "startTime": "2.600s",
              "endTime": "2.700s",
              "word": "could"
            },
            {
              "startTime": "2.700s",
              "endTime": "2.800s",
              "word": "never"
            },
            {
              "startTime": "2.800s",
              "endTime": "3.200s",
              "word": "make"
            },
            {
              "startTime": "3.200s",
              "endTime": "3.300s",
              "word": "up"
            },
            {
              "startTime": "3.300s",
              "endTime": "3.300s",
              "word": "his"
            },
            {
              "startTime": "3.300s",
              "endTime": "3.500s",
              "word": "mind"
            },
            {
              "startTime": "3.500s",
              "endTime": "4.800s",
              "word": "whenever"
            },
            {
              "startTime": "4.800s",
              "endTime": "5.100s",
              "word": "his"
            },
            {
              "startTime": "5.100s",
              "endTime": "5.400s",
              "word": "friends"
            },
            {
              "startTime": "5.400s",
              "endTime": "5.800s",
              "word": "asked"
            },
            {
              "startTime": "5.800s",
              "endTime": "5.900s",
              "word": "him"
            },
            {
              "startTime": "5.900s",
              "endTime": "6s",
              "word": "if"
            },
            {
              "startTime": "6s",
              "endTime": "6.100s",
              "word": "he"
            },
            {
              "startTime": "6.100s",
              "endTime": "6.200s",
              "word": "would"
            },
            {
              "startTime": "6.200s",
              "endTime": "6.400s",
              "word": "like"
            },
            {
              "startTime": "6.400s",
              "endTime": "6.500s",
              "word": "to"
            },
            {
              "startTime": "6.500s",
              "endTime": "6.600s",
              "word": "go"
            },
            {
              "startTime": "6.600s",
              "endTime": "6.800s",
              "word": "out"
            },
            {
              "startTime": "6.800s",
              "endTime": "7s",
              "word": "with"
            },
            {
              "startTime": "7s",
              "endTime": "7.300s",
              "word": "him"
            },
            {
              "startTime": "7.300s",
              "endTime": "7.600s",
              "word": "he"
            },
            {
              "startTime": "7.600s",
              "endTime": "7.700s",
              "word": "would"
            },
            {
              "startTime": "7.700s",
              "endTime": "7.900s",
              "word": "only"
            },
            {
              "startTime": "7.900s",
              "endTime": "8.300s",
              "word": "answer"
            },
            {
              "startTime": "8.300s",
              "endTime": "8.400s",
              "word": "I"
            },
            {
              "startTime": "8.400s",
              "endTime": "9.200s",
              "word": "don't"
            },
            {
              "startTime": "9.200s",
              "endTime": "9.300s",
              "word": "know"
            }
          ]
        }
      ]
    },
    {
      "alternatives": [
        {
          "transcript": " he wouldn't say yes or no either would always sure to make me a choice his Aunt Helen said to him now look here no one is going to care for you if you carry on like this you have no more mind in a plate of grass one rainy day of the rats are the great noise in the Loft the pine Raptors were all rotten so that the barn was rather unsafe at last to Joyce gave way and fell to the ground the wall truck and all the rats hair stood on end with fear and horror this won't do so the captain I'll send out Scouts to search for a new home",
          "confidence": 0.9567386,
          "words": [
            {
              "startTime": "10.400s",
              "endTime": "10.800s",
              "word": "he"
            },
            {
              "startTime": "10.800s",
              "endTime": "11s",
              "word": "wouldn't"
            },
            {
              "startTime": "11s",
              "endTime": "11.100s",
              "word": "say"
            },
            {
              "startTime": "11.100s",
              "endTime": "11.400s",
              "word": "yes"
            },
            {
              "startTime": "11.400s",
              "endTime": "11.700s",
              "word": "or"
            },
            {
              "startTime": "11.700s",
              "endTime": "11.800s",
              "word": "no"
            },
            {
              "startTime": "11.800s",
              "endTime": "12.200s",
              "word": "either"
            },
            {
              "startTime": "12.200s",
              "endTime": "13s",
              "word": "would"
            },
            {
              "startTime": "13s",
              "endTime": "13.200s",
              "word": "always"
            },
            {
              "startTime": "13.200s",
              "endTime": "13.500s",
              "word": "sure"
            },
            {
              "startTime": "13.500s",
              "endTime": "13.700s",
              "word": "to"
            },
            {
              "startTime": "13.700s",
              "endTime": "13.800s",
              "word": "make"
            },
            {
              "startTime": "13.800s",
              "endTime": "13.900s",
              "word": "me"
            },
            {
              "startTime": "13.900s",
              "endTime": "14s",
              "word": "a"
            },
            {
              "startTime": "14s",
              "endTime": "14.200s",
              "word": "choice"
            },
            {
              "startTime": "14.200s",
              "endTime": "15.500s",
              "word": "his"
            },
            {
              "startTime": "15.500s",
              "endTime": "15.700s",
              "word": "Aunt"
            },
            {
              "startTime": "15.700s",
              "endTime": "16s",
              "word": "Helen"
            },
            {
              "startTime": "16s",
              "endTime": "16.100s",
              "word": "said"
            },
            {
              "startTime": "16.100s",
              "endTime": "16.300s",
              "word": "to"
            },
            {
              "startTime": "16.300s",
              "endTime": "16.500s",
              "word": "him"
            },
            {
              "startTime": "16.500s",
              "endTime": "16.800s",
              "word": "now"
            },
            {
              "startTime": "16.800s",
              "endTime": "17.100s",
              "word": "look"
            },
            {
              "startTime": "17.100s",
              "endTime": "17.200s",
              "word": "here"
            },
            {
              "startTime": "17.200s",
              "endTime": "18.100s",
              "word": "no"
            },
            {
              "startTime": "18.100s",
              "endTime": "18.300s",
              "word": "one"
            },
            {
              "startTime": "18.300s",
              "endTime": "18.400s",
              "word": "is"
            },
            {
              "startTime": "18.400s",
              "endTime": "18.500s",
              "word": "going"
            },
            {
              "startTime": "18.500s",
              "endTime": "18.600s",
              "word": "to"
            },
            {
              "startTime": "18.600s",
              "endTime": "18.700s",
              "word": "care"
            },
            {
              "startTime": "18.700s",
              "endTime": "19s",
              "word": "for"
            },
            {
              "startTime": "19s",
              "endTime": "19.100s",
              "word": "you"
            },
            {
              "startTime": "19.100s",
              "endTime": "19.400s",
              "word": "if"
            },
            {
              "startTime": "19.400s",
              "endTime": "19.500s",
              "word": "you"
            },
            {
              "startTime": "19.500s",
              "endTime": "19.800s",
              "word": "carry"
            },
            {
              "startTime": "19.800s",
              "endTime": "19.900s",
              "word": "on"
            },
            {
              "startTime": "19.900s",
              "endTime": "20.100s",
              "word": "like"
            },
            {
              "startTime": "20.100s",
              "endTime": "20.300s",
              "word": "this"
            },
            {
              "startTime": "20.300s",
              "endTime": "21.500s",
              "word": "you"
            },
            {
              "startTime": "21.500s",
              "endTime": "21.600s",
              "word": "have"
            },
            {
              "startTime": "21.600s",
              "endTime": "21.700s",
              "word": "no"
            },
            {
              "startTime": "21.700s",
              "endTime": "22s",
              "word": "more"
            },
            {
              "startTime": "22s",
              "endTime": "22.400s",
              "word": "mind"
            },
            {
              "startTime": "22.400s",
              "endTime": "22.500s",
              "word": "in"
            },
            {
              "startTime": "22.500s",
              "endTime": "22.600s",
              "word": "a"
            },
            {
              "startTime": "22.600s",
              "endTime": "22.800s",
              "word": "plate"
            },
            {
              "startTime": "22.800s",
              "endTime": "22.900s",
              "word": "of"
            },
            {
              "startTime": "22.900s",
              "endTime": "23.300s",
              "word": "grass"
            },
            {
              "startTime": "23.300s",
              "endTime": "24.400s",
              "word": "one"
            },
            {
              "startTime": "24.400s",
              "endTime": "24.700s",
              "word": "rainy"
            },
            {
              "startTime": "24.700s",
              "endTime": "24.700s",
              "word": "day"
            },
            {
              "startTime": "24.700s",
              "endTime": "25s",
              "word": "of"
            },
            {
              "startTime": "25s",
              "endTime": "25.100s",
              "word": "the"
            },
            {
              "startTime": "25.100s",
              "endTime": "25.300s",
              "word": "rats"
            },
            {
              "startTime": "25.300s",
              "endTime": "25.400s",
              "word": "are"
            },
            {
              "startTime": "25.400s",
              "endTime": "25.500s",
              "word": "the"
            },
            {
              "startTime": "25.500s",
              "endTime": "25.700s",
              "word": "great"
            },
            {
              "startTime": "25.700s",
              "endTime": "25.900s",
              "word": "noise"
            },
            {
              "startTime": "25.900s",
              "endTime": "26.200s",
              "word": "in"
            },
            {
              "startTime": "26.200s",
              "endTime": "26.300s",
              "word": "the"
            },
            {
              "startTime": "26.300s",
              "endTime": "26.700s",
              "word": "Loft"
            },
            {
              "startTime": "26.700s",
              "endTime": "27s",
              "word": "the"
            },
            {
              "startTime": "27s",
              "endTime": "27.300s",
              "word": "pine"
            },
            {
              "startTime": "27.300s",
              "endTime": "27.800s",
              "word": "Raptors"
            },
            {
              "startTime": "27.800s",
              "endTime": "28s",
              "word": "were"
            },
            {
              "startTime": "28s",
              "endTime": "28.100s",
              "word": "all"
            },
            {
              "startTime": "28.100s",
              "endTime": "28.300s",
              "word": "rotten"
            },
            {
              "startTime": "28.300s",
              "endTime": "28.700s",
              "word": "so"
            },
            {
              "startTime": "28.700s",
              "endTime": "28.900s",
              "word": "that"
            },
            {
              "startTime": "28.900s",
              "endTime": "29s",
              "word": "the"
            },
            {
              "startTime": "29s",
              "endTime": "29.300s",
              "word": "barn"
            },
            {
              "startTime": "29.300s",
              "endTime": "29.400s",
              "word": "was"
            },
            {
              "startTime": "29.400s",
              "endTime": "29.600s",
              "word": "rather"
            },
            {
              "startTime": "29.600s",
              "endTime": "30.300s",
              "word": "unsafe"
            },
            {
              "startTime": "30.300s",
              "endTime": "31.200s",
              "word": "at"
            },
            {
              "startTime": "31.200s",
              "endTime": "31.600s",
              "word": "last"
            },
            {
              "startTime": "31.600s",
              "endTime": "31.700s",
              "word": "to"
            },
            {
              "startTime": "31.700s",
              "endTime": "31.900s",
              "word": "Joyce"
            },
            {
              "startTime": "31.900s",
              "endTime": "32.300s",
              "word": "gave"
            },
            {
              "startTime": "32.300s",
              "endTime": "32.500s",
              "word": "way"
            },
            {
              "startTime": "32.500s",
              "endTime": "32.600s",
              "word": "and"
            },
            {
              "startTime": "32.600s",
              "endTime": "32.800s",
              "word": "fell"
            },
            {
              "startTime": "32.800s",
              "endTime": "33s",
              "word": "to"
            },
            {
              "startTime": "33s",
              "endTime": "33s",
              "word": "the"
            },
            {
              "startTime": "33s",
              "endTime": "33.100s",
              "word": "ground"
            },
            {
              "startTime": "33.100s",
              "endTime": "34.100s",
              "word": "the"
            },
            {
              "startTime": "34.100s",
              "endTime": "34.300s",
              "word": "wall"
            },
            {
              "startTime": "34.300s",
              "endTime": "34.700s",
              "word": "truck"
            },
            {
              "startTime": "34.700s",
              "endTime": "35.100s",
              "word": "and"
            },
            {
              "startTime": "35.100s",
              "endTime": "35.200s",
              "word": "all"
            },
            {
              "startTime": "35.200s",
              "endTime": "35.400s",
              "word": "the"
            },
            {
              "startTime": "35.400s",
              "endTime": "35.700s",
              "word": "rats"
            },
            {
              "startTime": "35.700s",
              "endTime": "35.900s",
              "word": "hair"
            },
            {
              "startTime": "35.900s",
              "endTime": "36.200s",
              "word": "stood"
            },
            {
              "startTime": "36.200s",
              "endTime": "36.300s",
              "word": "on"
            },
            {
              "startTime": "36.300s",
              "endTime": "36.400s",
              "word": "end"
            },
            {
              "startTime": "36.400s",
              "endTime": "36.800s",
              "word": "with"
            },
            {
              "startTime": "36.800s",
              "endTime": "37s",
              "word": "fear"
            },
            {
              "startTime": "37s",
              "endTime": "37.100s",
              "word": "and"
            },
            {
              "startTime": "37.100s",
              "endTime": "37.300s",
              "word": "horror"
            },
            {
              "startTime": "37.300s",
              "endTime": "38.100s",
              "word": "this"
            },
            {
              "startTime": "38.100s",
              "endTime": "38.400s",
              "word": "won't"
            },
            {
              "startTime": "38.400s",
              "endTime": "38.600s",
              "word": "do"
            },
            {
              "startTime": "38.600s",
              "endTime": "38.800s",
              "word": "so"
            },
            {
              "startTime": "38.800s",
              "endTime": "39s",
              "word": "the"
            },
            {
              "startTime": "39s",
              "endTime": "39.300s",
              "word": "captain"
            },
            {
              "startTime": "39.300s",
              "endTime": "39.500s",
              "word": "I'll"
            },
            {
              "startTime": "39.500s",
              "endTime": "39.700s",
              "word": "send"
            },
            {
              "startTime": "39.700s",
              "endTime": "39.900s",
              "word": "out"
            },
            {
              "startTime": "39.900s",
              "endTime": "40.300s",
              "word": "Scouts"
            },
            {
              "startTime": "40.300s",
              "endTime": "40.400s",
              "word": "to"
            },
            {
              "startTime": "40.400s",
              "endTime": "40.800s",
              "word": "search"
            },
            {
              "startTime": "40.800s",
              "endTime": "40.900s",
              "word": "for"
            },
            {
              "startTime": "40.900s",
              "endTime": "41s",
              "word": "a"
            },
            {
              "startTime": "41s",
              "endTime": "41.200s",
              "word": "new"
            },
            {
              "startTime": "41.200s",
              "endTime": "41.400s",
              "word": "home"
            }
          ]
        }
      ]
    },
    {
      "alternatives": [
        {
          "transcript": " within 5 hours attempt Scouts came back and said we found a stone house where there is room and board for a Saul there's a kindly horse named",
          "confidence": 0.8543271,
          "words": [
            {
              "startTime": "42.300s",
              "endTime": "42.900s",
              "word": "within"
            },
            {
              "startTime": "42.900s",
              "endTime": "43.200s",
              "word": "5"
            },
            {
              "startTime": "43.200s",
              "endTime": "43.300s",
              "word": "hours"
            },
            {
              "startTime": "43.300s",
              "endTime": "43.800s",
              "word": "attempt"
            },
            {
              "startTime": "43.800s",
              "endTime": "44.100s",
              "word": "Scouts"
            },
            {
              "startTime": "44.100s",
              "endTime": "44.400s",
              "word": "came"
            },
            {
              "startTime": "44.400s",
              "endTime": "44.600s",
              "word": "back"
            },
            {
              "startTime": "44.600s",
              "endTime": "44.700s",
              "word": "and"
            },
            {
              "startTime": "44.700s",
              "endTime": "44.900s",
              "word": "said"
            },
            {
              "startTime": "44.900s",
              "endTime": "45.200s",
              "word": "we"
            },
            {
              "startTime": "45.200s",
              "endTime": "45.400s",
              "word": "found"
            },
            {
              "startTime": "45.400s",
              "endTime": "45.500s",
              "word": "a"
            },
            {
              "startTime": "45.500s",
              "endTime": "45.800s",
              "word": "stone"
            },
            {
              "startTime": "45.800s",
              "endTime": "46.100s",
              "word": "house"
            },
            {
              "startTime": "46.100s",
              "endTime": "46.800s",
              "word": "where"
            },
            {
              "startTime": "46.800s",
              "endTime": "47s",
              "word": "there"
            },
            {
              "startTime": "47s",
              "endTime": "47.100s",
              "word": "is"
            },
            {
              "startTime": "47.100s",
              "endTime": "47.300s",
              "word": "room"
            },
            {
              "startTime": "47.300s",
              "endTime": "47.400s",
              "word": "and"
            },
            {
              "startTime": "47.400s",
              "endTime": "47.500s",
              "word": "board"
            },
            {
              "startTime": "47.500s",
              "endTime": "47.800s",
              "word": "for"
            },
            {
              "startTime": "47.800s",
              "endTime": "47.900s",
              "word": "a"
            },
            {
              "startTime": "47.900s",
              "endTime": "48.100s",
              "word": "Saul"
            },
            {
              "startTime": "48.100s",
              "endTime": "48.800s",
              "word": "there's"
            },
            {
              "startTime": "48.800s",
              "endTime": "48.800s",
              "word": "a"
            },
            {
              "startTime": "48.800s",
              "endTime": "49.200s",
              "word": "kindly"
            },
            {
              "startTime": "49.200s",
              "endTime": "49.500s",
              "word": "horse"
            },
            {
              "startTime": "49.500s",
              "endTime": "49.700s",
              "word": "named"
            }
          ]
        }
      ]
    }
  ]
}

var parsed = parseGoogle(sampleResponse,'444');

console.log("----");
console.log(JSON.stringify(parsed,null,2));


// function parseGoogle(data, offset){
// 	var out = {
//     sentences: []
//   };

//    if (typeof offset === 'undefined') {
//     offset = 0;
//   }

//     // modifying sentences results 
//   out.sentences = data.results.map(function(r) {
//     // new item object 
//     var item = {};
//     // set item to IBM Json transcription one
//     var _item = r.alternatives[0];
//     item.transcript = _item.transcript;
//     item.confidence = _item.confidence;
//     // modify item IBM Json transcription to add time offset
//     item.words = _item.timestamps.map(function(t) {
//       // add time offset for each word start and end time
//       return {
//         word: t[0],
//         start: t[1] + offset,
//         end: t[2] + offset
//       };
//     });
//     // add item back to the list of results
//     return item;
//   });

//   //returning results 
//   return out;

// }