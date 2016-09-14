# autoEdit V2



## What?
Fast text based video editing deesktop app for Mac OSX. Built in node NWJS and backbone.
Making video production faster, easier and more accessible.

![Transcription ](/docs/gif/3_transcription.gif)

Uses [NWJS boilerplate](https://github.com/pietrop/nwjs_boilerplate)  as a starting point.

Is designed so that the front end in backbone can be used as standalone static site. Which is how 
[the demo](https://opennewslabs.github.io/autoEdit_2/public/demo/frontEnd/index.html#transcriptions) is run, with an hard coded backbone model.


## Overview of how the app works

The app uses IBM watson or Gentle open source Speech To Text systems to generate transcription.
The user can then select text and export a video sequence to the video editing software of choice.

![Overview diagram ](/docs/img/tutorial/0_diagram.png)

## Ready to use release 

see [releases section](https://github.com/OpenNewsLabs/autoEdit_2/releases) to downlaod latest packaged version ready to use. 
All you need to get started is IBM Watson API Blumix keys. [Check out the guide section on this](https://opennewslabs.github.io/autoEdit_2/user_manual/setup.html)

And the [user manual](https://opennewslabs.github.io/autoEdit_2/user_manual/usage.html)


## Launching the app 

For developers

```bash
npm install
``` 

and then 

```bash
npm start
```

You'd also need to get IBM watson STT keys or have the Gentle Open source app running locally [see the guide for instructions on setting this up ](https://opennewslabs.github.io/autoEdit_2/user_manual/setup.html)

---

## Folders structure

```
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
`node deploy.js` from terminal from root of app, creates a folder called `build` where you can find your packaged app. 

or 

```
npm run build
```

[more info on deploy/packaging of app in nwjs boilerplate project](lhttps://github.com/pietrop/nwjs_boilerplate#deploy)

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
Feel free to get in touch with any questions. for the project and send me a pull request.


## Contributors

- [Pietro Passarelli](http://github.com/pietrop)


