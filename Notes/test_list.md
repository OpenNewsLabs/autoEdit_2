# Manual test list 

A list of things to test pre roll out to check everything is working, initally to be done manual then will be substituted by automated tests.


## Main user journey - video upload

- start up no video, but message about adding one
- add video 
- process in under 5 minutes
- status of video in transcriptions list auto updates
- click on video takes to transcription show page
- clicable transcription



## Main user journey - Selection and EDL

- for video uploaded and in show page
- select text
- export EDL, 
- EDL valid format, and reconnects in premiere (2 main scenarios video with Timecode camera metatada, and vieo without, as well as audio)

## Main user journey -  Export options

- export all other options, give valid files, eg captions, plain text etc...


- audio `.ogg` not working on safari. only `.wav` file works. reason for converting to .ogg is that it is smaller file size, so faster to send to IBM, requires less bandwith. 
For working on mobile would need to work on phone.  


- Transcription delete in transcription index not working properly. it is not deleting the right transcription. it delete right media but wrong model.