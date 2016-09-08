/**
* Takes IBM Watson STT Service json and adds time offest onto each word.
* this is so that each chunk of audio that has been transcribed separately can be joined back togethere.
*/
// function parse(data, offset) {
//   console.log("############## Parse")
//   if (typeof offset === 'undefined') offset = 0;
//
//   var out = {
//     sentences: []
//   };
//
//   out.sentences = data.results.map(function(r) {
//     var item = {};
//     var result = {}
//     result.results = [];
//
//     //add results
//     var _item = r.alternatives[0];
//     // item.transcript = _item.transcript;
//     // item.confidence = _item.confidence;
//     item.timestamps = _item.timestamps.map(function(t) {
//       //return modified array
//       var resAr = []
//       resAr[0]= t[0];
//       resAr[1]=t[1] + offset;
//       resAr[2]=t[2] + offset;
//       // return {
//       //   word: t[0],
//       //   start: t[1] + offset,
//       //   end: t[2] + offset
//       // };
//       return resAr;
//
//       //
//     });
//     var alternatives = []
//     alternatives.push(item)
//     // {"alternatives": []}
//     result.results.push(alternatives)
//     return result;
//   });
//
//   return out;
// }
//
//
// module.exports = parse;


/**
* Takes IBM Watson STT Service json and adds time offest onto each word.
* this is so that each chunk of audio that has been transcribed separately can be joined back togethere.
*/
function parse(data, offset) {
  console.log("############## .parse")
  if (typeof offset === 'undefined') offset = 0;

  var out = {
    sentences: []
  };

  out.sentences = data.results.map(function(r) {
    var item = {};
    //add results
    var _item = r.alternatives[0];
    item.transcript = _item.transcript;
    item.confidence = _item.confidence;
    item.words = _item.timestamps.map(function(t) {
      //
      return {
        word: t[0],
        start: t[1] + offset,
        end: t[2] + offset
      };
    });
    return item;
  });

  return out;
}


module.exports = parse;
