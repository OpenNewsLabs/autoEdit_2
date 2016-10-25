## Documentation Intro

-  Explore the documentation as [Docco style code documentation](/docco_docs/autoEdit2API.html)
- Github repo [for autoEdit2](https://github.com/OpenNewsLabs/autoEdit_2)

If you are not familiar with [Node][node], [NWJS][nwjs], [backbone][backbone] or not sure were to start to get an overview to familiarise yourself with this project, check out the [prerequisite section](/jsdoc_docs/tutorial-prerequisites.html) to get an overview of the stack and see the minimum you need to know to get up to speed with this project.

## Overview 

### 1. User manual 
Explore the [user manual][usermanual] to get a sense of the main flow / user journey of the application.


### 2. IBM Blumix STT API keys
If you want to use it with IBM get the [bluemix STT keys](/user_manual/setup.html#setup)

### 4. Run the app 

```
npm install 
```

```
npm start 
```


### 5.Add IBM keys 

See [user manual for how to add them to the app on launch](https://opennewslabs.github.io/autoEdit_2/user_manual/setup.html#add-the-api-keys-to-the-app-at-startup).


### Follow the main user journey

[Follow user manual][usermanual] to  see the main user journey in getting a transcription from an audio/video file and a video sequence of selections.

- Add a file 
- Select some text 
- Export 

Can also try other export options. plain text, captions.

## Project folder structure.

```bash
.
├── LICENCE.MD
├── README.md
├── appdmg.json
├── config.js
├── deploy.js
├── docs
├── favicon.ico
├── frontEnd
│   ├── autoEdit2API.js
│   ├── date_now
│   ├── demo_jr.js
│   ├── edl_composer
│   ├── index.html
│   ├── js
│   ├── public
│   ├── srt
│   └── vendor
├── interactive_transcription_generator
│   ├── README.md
│   ├── bin
│   ├── index.js
│   ├── transcriber
│   ├── video_metadata_reader
│   └── video_to_html5_webm
├── nw.icns
├── autoEdit_logo.png
├── package.json
└── spec

```


### `deploy.js`

Deployment script. more info on [packaging and building a new release here](/jsdoc_docs/tutorial-deployment.html).

### `docs` 

#### Project page
Contains a jeckyll site for the [project page, hosted on github pages](https://opennewslabs.github.io/autoEdit_2/).

Uses these two templates

- Landing page [pratt-app-landing-page](http://blacktie.co/2013/10/pratt-app-landing-page/) [demo](http://blacktie.co/demo/pratt)
- User manual: [jekyll-docs-template](https://github.com/bruth/jekyll-docs-template) [demo](http://bruth.github.io/jekyll-docs-template)

#### Documentation 

-  `/docs/_posts` for user manual page 
- using jdoc and docco for automatic documentation generated. (jsdoc is the one you are reading now). 
- `/docs/_posts/tutorial` for  developer documentation (jsdoc tutorials).

See [updating documentation](/jsdoc_docs/tutorial-updating_the_documentation.html) section for how to use jsdoc and docco. 


### `spec`
Test suite `npm run test`.

### `frontEnd`

```
├── frontEnd
	├── autoEdit2API.js
	├── date_now
	│   └── index.js
	├── demo_jr.js
	├── edl_composer
	│   ├── README.md
	│   └── index.js
	├── index.html
	├── js
	│   ├── collections
	│   │   └── transcriptions.js
	│   ├── models
	│   │   └── transcription.js
	│   ├── router.js
	│   ├── sync.js
	│   └── views
	│       ├── transcription_form.js
	│       ├── transcription_index.js
	│       └── transcription_show.js
	├── public
	│   └── css
	│       └── custom.css
	├── srt
	│   └── index.js
	└── vendor
	    ├── backbone-min.js
	    ├── backbone-min.map
	    ├── backbone.async.js
	    ├── backbone.mousetrap.js
	    ├── bootstrap-3.3.6-dist
	    ├── jquery.min.1.12.4.js
	    ├── mousetrap.js
	    ├── underscore-min.js
	    └── underscore-min.map
```

`autoEdit2API` overrides `backbone.sync` method to provide a backend for the app and persistent storage using linvodb3, which uses `medeadown` to storing db on the user file system. see [current db setup tutorial for more info](/jsdoc_docs/current_db_setup.html)


backbone front end . `demo_jr.js` is the code that runs the demo when index is runned in client side mode in the browser.

`js` contains the backbone project.


### `interactive_transcription_generator`

```
├── interactive_transcription_generator
	├── README.md
	├── bin
	│   ├── ffmpeg
	│   └── ffprobe
	├── index.js
	├── transcriber
	│   ├── README.md
	│   ├── convert_to_audio.js
	│   ├── examples
	│   ├── gentle_stt_node
	│   ├── ibm_stt_node
	│   ├── index.js
	│   ├── split.js
	│   └── trimmer.js
	├── video_metadata_reader
	│   ├── README.md
	│   ├── examples
	│   └── index.js
	└── video_to_html5_webm
	    └── index.js
```


[nwjs]: http://docs.nwjs.io/en/latest/For%20Users/Getting%20Started/
[node]:https://nodejs.org/en/
[backbone]:http://backbonejs.org/
[usermanual]:user_manual/usage.html

