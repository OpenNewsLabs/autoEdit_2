<!-- https://gist.github.com/simenbrekken/1999230 -->
# draft 

# draft

## Transcription 

### New Transcription 

POST Transcription 

    // process media, 
    // STT etc..
    // saves to DB

### Transcriptions list

GET transcriptions


### Transcription Show

GET Transcription? - migh tnoe be needed 

### updated Transcription

PUT Transcription


### Transcription Delete

DELETE Transcription 

--- 

## PaperEdit

### New PaperEdit

POST PaperEdit

### PaperEdit List

GET PaperEditS

### PaperEdit Show

Get PaperEdit


### updated PaperEdit

PUT PaperEdit

###PaperEdit Delete

DELETE PaperEdit 


----
POSTMA

>With Postman, to test HTTP post actions with a raw JSON data payload, select the raw option and set the following header parameters:
>`Content-Type: application/json`


# Todo: 

- [ ] New transcription - figure out why post request not trigger

- [ ] demo vs client side mode, figure out workaround. eg 

config.js set URL for bakcend

app.js detect when in demo mode, and when in server side mode. 
`Backbone.sync = require('./demo_db');`

abstract the logic to overwrite backbone.sync somewhere else?

set ENV var for server/client deployment vs github pages demo?


- [ ] edit/update transcription 

- [x] New Paperedit 

- [ ] delete paperedit

- [ ] edit update transcriptions


- [ ] end points for creating sequences. eg with ffmpeg-remix. added to transcritpion and paper-edit?