/**
 * Get the media associated with a transcription order 
 * 
 */
const request = require('request');
const fs = require('fs');

function getMedia(options, cb){
    console.log('getMedia options.dest: ',options.dest)
    var mediaFileDestination = options.dest;
    const credentials =  `Rev ${options.clientApiKey}:${options.userApiKey}`;

    var headers = {
        'Authorization': credentials
    };

    var options = {
        // interpolate order number 
        url: `${options.url}/${options.orderNumber}`,
        headers: headers
    };
    // Request callback
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response.statusCode, response.statusMessage,' request successful')
            // console.log(JSON.stringify(JSON.parse(body),null,2))
            // console.log(JSON.stringify(JSON.parse(body),null,2))
       
            // Retrieve Completed File
            var result = JSON.parse(body);
            // console.log(JSON.stringify(result,null,2))
            // console.log("-------")
            var media = result.attachments.filter((el)=>{
                return el.kind == 'media';
            });
            // media[0] coz filter returns an array
            var mediaURL = media[0].links[0].href;
            var mediaName = media[0].name;
            // TODO: does media.name always have file extension?
            // https://www.rev.com/api/quick-start/retrieve-files
            console.log(mediaName);
            console.log(mediaURL);
            // add media file extension as sudgested in docs 
            // https://www.rev.com/api/quick-start/retrieve-files
            mediaURL +='.mp4'
            console.log(mediaURL);
            // TODO: change the Header information to retrieve media file
            var headers = {
                // https://www.rev.com/api/attachmentsgetcontent
                // can change the return type 
                // 'Accept': 'application/json+rev-transcript',
                'Authorization': credentials
            };

            var options = {
                url: mediaURL,
                headers: headers
            };

            // TODO: change the request as a GET To retrieve media, 
            // https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries
            // and save locally 

            // make second request 
            var r = request(options,((error, response, body) => {
                console.log('inside request');
                console.log('ERROR::', error);

            }))

            r.on('response',  function (res) {               
                if (response.statusCode === 200) {
                    // Add Try catch block?
                    // var dest = `./${Date.now()}-${mediaName}`;
                    console.log('get media dest-string? ',mediaFileDestination)
                    var mediaWriteStream = fs.createWriteStream(mediaFileDestination);
                    res.pipe(mediaWriteStream);

                    mediaWriteStream.on('end', function() {
                        console.log('Finished downloading file, call callback here ', dest);
                        if(cb){
                            cb(dest)
                        }
                    });
                }
                else{
                    console.log(response.statusCode);
                }    
              });

            // r.on('end',(res)=>{
            //     console.log('end')
            // })
        }
        else{
            var errorMessage = `Error: ${response.statusCode} ${response.statusMessage}`;
            console.error(errorMessage);
            console.error(error);
        }
    }

    // making the request 
    request(options, callback);
}

module.exports = getMedia;