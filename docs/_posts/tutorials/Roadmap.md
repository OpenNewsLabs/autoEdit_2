# Roadmap  - Draft 


--- 

## Refactoring consolidating 

Before diving into the paper-editing side of things some refactoring is needed to setup the app so that is easier to add features to it.

[see current github issues](https://github.com/OpenNewsLabs/autoEdit_2/issues).

---
## Make NWJS auto-update feature ?


---
## Update NWJS boilerplate with - browserify boilerplate ?


---
## More STT APIs support for transcriber module 
Add possibility to expand on different STT APIs.


### Settings panel 
in order to expand on more APIs support, it makes sense to refactor and add a setting panel. 
The setting panel should read from the interactive transcriber. 
Figure out what options for STT APIs are available and provide form fields for those options. 
This would make it easier to expand and add more options over time.

The new transcription view should also auto generate options for STT based on those that have a API Keys in the settings panel, and hide those that don't. 

### Refactoring Transcriber module
This needs refactoring the transcriber module to make it easier to add new STT APIs.
Separate modules that are re-used by transcriber module (eg, convert to audio, trim etc..)

Maybe use ES6 and classes to write this?

Write tutorial for dev documentation on how to add custom STT APIs.  maybe pluging system?
Define specs autoEdit 2 transcript needs to have to be accepted by application. 

make 5 minutes chunking optional, for wider compatibility, eg when IBM incorporates this, it could be turned off. 

---

## Exporting Video / Audio

### Exporting video
Look at ffmpeg documentation 

Look at Laurian ffmpeg-remix, how could this work with other formats?how could it work with mixed format?

Allow user to chose export format, mp4, webm, ogg, mov?
(check which once are supported by twitter/facebook/youtube upload to ensure compatibility. if webm is ok then stick with that)


### exporting audio
see what needs to change in the code to export audio.

--- 

## Captioning - export

### Breaking down sentences
Reverse engegneering the YouTube Captioning tool. Especially the alligner. How does it figure out how to make lines fit on screen and space/time them so nicely?

#### Option one, space using math. 
calcualte number of words per line per screen, and see space between one line and following to work out spacing

also work out how long captions need to stay on, to avoid feeling short.

#### Option 2, use Gentle to re-allign 
can this be of help?


--- 

## Text editing 

>“So I do kind of wish you could edit the whole row instead of word by word. it’s just frustrating when ibm gets a whole phrase off and to go word by word makes it a little harder”
> - Scotty Kan user interview 28th Sept 2016.

Look into 

- Contenteditable over whole line + resync with gentle 
- Or text area boxes for paragraphs to edit + resync with Gentle.
- another option is to make line or paragraph editable and then re-sync that with Gentle.

For the gentle implementation it be best to incorporate Gentle into the app. 
It can be run as python module.or started as a server.


---

## Incorporating Gentle into autoEdit 
So that it can be added as default STT without needing extra setup. 

This requires 

1- changing Gentle so that from terminal python comand text attribute is optional and can return transcription. this currenlty only happens in curl comand with API more info on this refactoring here.  [more details on what it would take to do this here](https://docs.google.com/document/u/1/d/1UlKkjAVK3WDWtnp3C2x_r6bYgEvon5ZEQj-eDJnyB7E/edit?usp=drive_web).

2 - looking into [Refactoring Transcriber module](#Refactoring Transcriber module) from above section to see how to best integrate it. 
If Gentle is part of the transcriber module. It could take trimmed audio file as input, same as other transcriber APIs, and to do so ffmpeg could be removed from a "gentle light" version which narrows down the code needed to be added as a transcriber plugin. 


----


## audotEdit -> paperedit roadmap 
more info in google docs <-- link coming soon 

