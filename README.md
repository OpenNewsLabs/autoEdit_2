# autoEdit V2

## Description

Fast text based video editing deesktop app for Mac OSX. Built in node NWJS and backbone.
Making video production faster, easier and more accessible.

![Transcription ](/docs/img/gif/3_transcription.gif)

Uses [NWJS boilerplate](https://github.com/pietrop/nwjs_boilerplate)  as a starting point.

Is designed so that the front end in backbone can be used as standalone static site. Which is how 
[the demo](https://opennewslabs.github.io/autoEdit_2/public/demo/frontEnd/index.html#transcriptions) is run, with an hard coded backbone model.

## Key features
- 5min transcription time
- Multi language
- Can work offline 


## Overview of how the app works

The app uses IBM watson or Gentle open source Speech To Text systems to generate transcription.
The user can then select text and export a video sequence to the video editing software of choice.

![Overview diagram ](/docs/img/tutorial/0_diagram.png)

## Ready to use release 

See [releases section](https://github.com/OpenNewsLabs/autoEdit_2/releases) to downlaod latest packaged version ready to use. 
All you need to get started is IBM Watson API Blumix keys and/or a version of Gentle Open source STT app running locally on your mac. [Check out the guide section on this](https://opennewslabs.github.io/autoEdit_2/user_manual/setup.html) as well as the [user manual](https://opennewslabs.github.io/autoEdit_2/user_manual/usage.html).


## Launching the app in development

For developers

```bash
npm install
``` 

and then 

```bash
npm start
```

You'd also need to get IBM watson STT keys or have the Gentle Open source app running locally [see the guide for instructions on setting this up ](https://opennewslabs.github.io/autoEdit_2/user_manual/setup.html)

## Packaging /deploying the app 

From terminal from root of app, run 

```bash
npm run build
```

This creates a folder called `build` where you can find your packaged app. 

before deployment you may want to change the toolabr visible to false. in `package.json`

```json
"toolbar": false,
```

[more info on deploy/packaging of app in nwjs boilerplate project](lhttps://github.com/pietrop/nwjs_boilerplate#deploy)

---

## Folders structure

```bash
.
├── README.md
├── backEnd_node
│   ├── autoEdit2API.js
│   ├── bin
│   ├── gentle_stt_node
│   ├── sam_transcriber
│   ├── spec
│   ├── sync.js
│   ├── video_metadata_reader
│   └── video_to_html5_webm
├── build
│   └──  ...
├── cache
│   └── ...
├── config.js
├── deploy.js
├── docs
│   └── ...
├── frontEnd
│   ├── date_now
│   ├── demo_jr.js
│   ├── edl_composer
│   ├── index.html
│   ├── js
│   ├── public
│   ├── srt
│   └── vendor
├── media
│   ├── JR_cam_B_transcription.mp4.wav
│   ├── JR_cam_B_transcription.mp4.webm
│   ├── ...
│   └── keep.md
├── node_modules
├── nw.icns
├── package.json
├── tmp_media
│   ├── ...
│   └── keep.md
├── tree.md
└── wttskeys.json

```

### `backEnd_node`,
 overwrighting backbone.sync method and using node modules for backend
for db using linvodb3, which uses level-js, which uses indexdb in chrome v8.

###`frontEnd`, 
backbone front end . `demo_jr.js` is the code that runs the demo when index is runned in client side mode in the browser.

`js` contains the backbone project.

### `docs` 
[Project page, on github pages](https://opennewslabs.github.io/autoEdit_2/).

### `deploy.js`

Deployment script. [more info on deploy/packaging of app in nwjs boilerplate project](lhttps://github.com/pietrop/nwjs_boilerplate#deploy)

### `cache` 
is a folder used by deploy to keep the latest version needed to build and package the app, to avoid having to re-download it every time


### `tmd_media` 
is where the wav files are kept, and the deleted, when sending split chunks to watson.

### `media`
 is where video webm previews and audio wav files for transcriptions are kept. 

###`wttskeys.json` 
at root level is where watson API keys are ketp, this file is in gitignore to avoid accidentally pushing it to github. 
When you first clone the project, this file shoudl not be there. 
---

## Contributing
Feel free to get in touch with any questions. For the the project and send me a pull request.

## Issue reporting
This tool is under development and you may find some bugs. In that case we will appreciate if you can [fill an issue](https://github.com/OpenNewsLabs/autoEdit_2/issues){:target="_blank"} or<a href="mailto:{{site.email}}?Subject=autoEdit%20bug"> get in touch</a> .


## Licence

```
The MIT License (MIT)
Copyright (c) 2016  Pietro Passarelli

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## Contributors

- [Pietro Passarelli](http://github.com/pietrop)


