/** 
* https://www.rev.com/api/quick-start/retrieve-files
* Retrieving a transcription from Rev API is in two parts
* 1 - from order number to --> transcript URI
* 2 - from transcript URI get --> transcript JSON
* 
* REFACTOR: 
* - construct request, header + options 
* - First request - order number to get --> transcript URI
*       orderNumberToGetTranscriptURI
* - Second request - order number to get --> transcript json
* - callback argument to propagate result
* 
*/
const request = require('request');
const createRequestOptionsHeader = require('./util-options-header.js');

function getTranscriptJson(argsOptions, cb) {

    var transcriptUriRequestOptions = createRequestOptionsHeader({
        clientApiKey: argsOptions.clientApiKey,
        userApiKey: argsOptions.userApiKey,
        url: argsOptions.url,
        // Optional, only when constructing request to retrieve an order
        orderNumber: argsOptions.orderNumber,
        // type of request 'getMedia', 'getTranscription', 'getOrdersStatus', 'getOrder'
        type: 'getOrder'
    })

   
    // making the first request 
    console.log('making first request with order number for transcript URI');
    request(transcriptUriRequestOptions, callbackHandleTranscriptUri);

    /**
     * Helper function -  callback
     *  Request callback for first request 
     */
    function callbackHandleTranscriptUri(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response.statusCode, response.statusMessage, ' request successful')
            // Retrieve Completed File
            var result = JSON.parse(body);
            var transcriptURL = getTranscriptUri(result);
            // TODO: get transcription name ? or use the one from media.
            // var transcriptName =  getTranscriptName(result);

            var transcriptJsonRequestOptions = createRequestOptionsHeader({
                clientApiKey: argsOptions.clientApiKey,
                userApiKey: argsOptions.userApiKey,
                url: transcriptURL,
                // Optional, only when constructing request to retrieve an order
                orderNumber: argsOptions.orderNumber,
                // type of request
                // 'getMedia', 'getTranscription', 'getOrdersStatus', 'getOrder'
                // order status if default if others not specified.
                type: 'getTranscription'
            })

            // Make second request 
            console.log('making second request with transcript URI for content');
            // console.log(JSON.stringify(transcriptJsonRequestOptions,null,2));
            request(transcriptJsonRequestOptions, callbackHandleGetTranscriptJson);
        }
        else {
            var errorMessage = `Error getting transcription URI: ${response.statusCode} ${response.statusMessage}`;
            console.error(errorMessage, error);
        }
    }

    /**
     * Helper function - callback
     * second callback to retrieve transcription content from URI 
     */
    function callbackHandleGetTranscriptJson(error, response, body) {
        if (!error && response.statusCode == 200) {
            if (cb) {
                // rev transcription json content 
                cb(JSON.parse(body));
            }
        }
        else {
            var errorMessage = `Error Error getting transcription content: ${response.statusCode} ${response.statusMessage}`;
            console.error(errorMessage);
            console.error(error);
            // console.log(response);
        }
    }
}

/**
 * helper function 
 * gets transcript uri from API response initially from order order number 
*/
function getTranscriptUri(result) {
    var transcript = result.attachments.filter((el) => {
        return el.kind == 'transcript';
    });
    var transcriptURL = transcript[0].links[0].href;
    return transcriptURL;
}


// function getTranscriptName(result){
//     var transcript = result.attachments.filter((el) => {
//         return el.kind == 'transcript';
//     });
//     var transcriptName = transcript[0].name;
//     return transcriptName;
// }

module.exports = getTranscriptJson;