/**
 * Creates Options Header object for API request
 * 
 * Example usage
 * 
    createRequestOptionsHeader({
        clientApiKey:, 
        userApiKey: ,
        url: ,
        // Optional, only when constructing request to retrieve an order
        orderNumber: ,
        // type of request
        // , 'getOrdersStatus',   
        //  To get a transcription json the request header first needs to
        // have the order number to get the transcript resource URI
        //  'getOrder', 'getTranscription'
        // ...
        // 'getMedia',
        // order status if default if others not specified.
        type: 
    })
 * 
 */
function createRequestOptionsHeader(argsOptions){

    const credentials =  `Rev ${argsOptions.clientApiKey}:${argsOptions.userApiKey}`;

    var headers = {
        'Authorization': credentials,
        'Content-Type': 'application/json'
    };
    // Logic to set header to retrieve transcription content 
    // 'Accept': 'application/json+rev-transcript',
    if(argsOptions.type === 'getTranscription'){
        headers['Accept'] = 'application/json+rev-transcript';
    }
    else if(argsOptions.type === 'getMedia' ){
        // TODO: ...
    }
    
    var options = {
        // interpolate order number 
        //TODO: order number optional 
        url: `${argsOptions.url}`,
        headers: headers
    };

    if( argsOptions.type === 'getOrder'){
        options.url += `/${argsOptions.orderNumber}`;
    }
    // else if(argsOptions.type === 'getMedia' ){
    //     // TODO: ...
    //     options.url += `/${argsOptions.orderNumber}`;
    // }

    return options;
}

module.exports = createRequestOptionsHeader;