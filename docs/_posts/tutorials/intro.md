## Documentation Intro

-  Explore the documentation as [Docco style code documentation](/docco_docs/autoEdit2API.html)
- Github repo [for autoEdit2](https://github.com/OpenNewsLabs/autoEdit_2)

If you are not familiar with Node, NWJS, or backbone check out the [prerequisite](/jsdoc_docs/tutorial-prerequisites.html) section to see the minimum you need to learn to get up to speed with this proejc.t

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

`autoEdit2API` overwrighting `backbone.sync` method and using node modules for backend for db using linvodb3, which uses `medeadown`. see [current db setup tutorial for more info](/jsdoc_docs/current_db_setup.html)


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


### `docs` 
[Project page, on github pages](https://opennewslabs.github.io/autoEdit_2/).
Jekyll website,  using 

- For landing page [pratt-app-landing-page](http://blacktie.co/2013/10/pratt-app-landing-page/) [demo](http://blacktie.co/demo/pratt)
- Other user manual and documentation pages [jekyll-docs-template](https://github.com/bruth/jekyll-docs-template) [demo](http://bruth.github.io/jekyll-docs-template)

-  `/docs/_posts` for user manual page and `/docs/_posts/tutorial` for  developer documentation.
- using jdoc and docco for automatic documentation generated 


### `deploy.js`

Deployment script. [more info on deploy/packaging of app in nwjs boilerplate project](lhttps://github.com/pietrop/nwjs_boilerplate#deploy)

### `cache` 
is a folder used by deploy to keep the latest version needed to build and package the app, to avoid having to re-download it every time


### `wttskeys.json` 
At root level is where watson API keys are ketp, this file is in `.gitignore` to avoid accidentally pushing it to github. When you first clone the project, this file shoudl not be there. 

See [user manual to see how user ir prompted to add IBM keys on startup](https://opennewslabs.github.io/autoEdit_2/user_manual/setup.html#add-the-api-keys-to-the-app-at-startup)

### `spec`
Test suite 