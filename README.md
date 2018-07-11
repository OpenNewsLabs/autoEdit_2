# autoEdit 2

autoEdit 2 is a fast text based video editing, desktop app for Mac, Linux and Windows, built with node and electron, and Backbone front end. For making video production faster, easier and more accessible.


## Ready to use release 

See [releases section](https://github.com/OpenNewsLabs/autoEdit_2/releases) to download latest packaged version ready to use. 

All you need to get started is to decide what speech to text service you want to use and get some credentials to get going [check out the user manual for more details](https://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/setup-stt-apis.html) 

## Setup

```bash
git clone git@github.com:OpenNewsLabs/autoEdit_2.git
```

```
cd autoEdit_2
```

 ```bash
npm install
``` 

## Usage - development

To compile the js client side files with browserify and start electron. 

```
npm start
```

_Note:_ You'd also need to get Speech to text keys or have the Gentle Open source app running locally [check out the user manual for more details](https://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/setup-stt-apis.html), unless you are chosing `pocketsphinx` as speech to text option.


## System Architecture
_High level overview of system architecture_

### High level Overview

1. autoEdit uses Speech to text services to create automatic transcription from a video or audio file
2. the user can make text selections 
3. export those selections as a video sequence in the editing software of choice

See [See use rmanual ](https://pietropassarelli.gitbooks.io/autoedit2-user-manual) and diagram below for more details.

### Background 
autoEdit, it's a text based video editing software that creates a digital paper-editing workflow. For more backaground see this write up on Source ["Introducing autoEdit"](https://source.opennews.org/articles/video-editing-made-better-introducing-autoedit/) as well as for more in depth on the underlying workflow [see this gitbook  "How to tell compelling stories out of video interviews"](https://pietropassarelli.gitbooks.io/how-to-tell-compelling-stories-out-of-video-inter/content/), and [especially this section focused on digital Paper-editing](https://pietropassarelli.gitbooks.io/how-to-tell-compelling-stories-out-of-video-inter/content/digital-paper-editing/autoedit-2-digital-paper-editing-software.html).

<!-- Video overview of main user journey Watch [video overview of the transcription part on youtube](http://www.youtube.com/watch?v=4z143-nJlzs). -->


![Overview diagram ](/assets/autoEdit_overview_diagram_1.0.7.png)


### Stack

It is built using node electron and backbone. 

<!--
#### Folder structure

```js
.
├── LICENCE.md
├── README.md
├── assets
│   └── autoEdit_overview_diagram_1.0.7.png
// images, icons needed during the build processs
├── build
│   ├── autoedit.png
│   ├── background.png
│   ├── icon.icns
│   └── icon.ico
├── config
│   └── make_demo.js
├── config.js
// where you find packaged version of the app after running build
├── dist
│   ├── autoEdit2-1.0.11-mac.zip
│   ├── autoEdit2-1.0.11.dmg
│   ├── github
│   └── mac
// contain project page published as github pages - autoEdit.io
├── docs
// electron part of the app
├── electron
// app.js is excluded from repo through .gitignore
// and is generated with browserify to bundle client side js on npm start
│   ├── app.js
│   ├── custom.css
// db.js connects to "backend" through overriding `backbone.sync` API methods
│   ├── db.js
// hard coded demos for front end demo 
│   ├── demo_paperedit.json
│   ├── demo_transcription.json
// list of ffmpeg extensions allowed to be opened by auto edit when loading video or audio
│   ├── ffmpeg_extentions.js
// main landing page for the app
│   ├── index.html
// main electron js entrypoint as specified in package.json "main": "electron/main.js",
// loading window, adding app menues etc..
│   ├── main.js
// logic to handle credentials for some of the STT services
│   ├── rev_keys.js
│   ├── speechmatics_keys.js
│   └── watson_keys.js
├── lib
// main logic of client side app, bundled into electron/app.js
│   ├── app
// module to convert sequence into an EDL file, edit decision list
// to open in video editig software
│   ├── edl_composer
// a collection of modules to handle prepping media and communicating with the STT APIs
│   ├── interactive_transcription_generator
// node module to generate caption file
│   └── srt
// tests, written using jasmine
├── spec
// third party library bundled with browserify in package.json
└── vendor
    ├── backbone.async.js
// provides keyboard shortcuts
    └── backbone.mousetrap.js
```

-->

#### backbone app
The backbone app is in `lib/app` for troubleshooting you can use `cmd`+ `alt` +`i` to ge the electron developer console, and there you have `appTranscription` and `appPaperedit` two backbone routers in the gloabl `window` scope that give you access to getting to individual backbone models and collections for transcriptions and paper-edit.

#### `backbone.sync` 
Is designed so that the front end in backbone can be used as standalone static site. Which is how [the demo](https://opennewslabs.github.io/autoEdit_2/demo/index.html) is run, with an hard coded sample data in `backbone.sync`.

In the `electron` app `backbone.sync` overrides the backbone API methods.
This is set in `./lib/app/app.js` as 
`Backbone.sync = window.DB;` where `DB` is set in `./electrong/db.js`.

This also a workaround for electron different ways of threating node and javascript depending on how they are added to the project. 

If you use `require` in the html file, then you are in node context, and can use module like `fs` but if you use a script tag, then you are in js client side code and don't have access to thos function. 

The downside of being in node context on the client side, without using a bundle like browserify and requring modules directly is that the front end is no longer portable as standalone client side web app if needed, eg for the demo page.

`DB` in `./electrong/db.js` allows to connect the backbone front to the `medeadown`/ `linvodb3` databse locally. As well as trigger `./lib/interactive_transcription_generator` component to at a high level
- read metadata of the media file, for the EDL sequence
- create video preview
- create audio version to send to STT APIs

#### electron
Code of the electron app is in the `./electron` folder.


#### `ffmpeg` and `electrong`
autoEdit uses `ffmpeg` under the hood, and getting `ffmpeg` and `electron` to work can sometimes be problematic when setting up a new app, so [I wrote here](http://pietropassarelli.com/ffmpeg-electron.html) about how this setup works in autoEdit, with semplified example.

### STT 

The app uses the following Speech To Text systems to generate transcription

- [X] IBM watson(free trial + paid), 
- [X] Speechmatics(free trial + paid), 
- [X] Gentle(open source) 
- [X] pocketsphinx (open source) 
- [ ] Rev.com (human transcriptions)

The user can then select text and export a video sequence to the video editing software of choice.

###  Documentation for developers

For more info check out the [project documentation](https://pietropassarelli.gitbooks.io/autoedit-2-documentation/content/)

- [ ] documentation is out of date and needs cleaning up, sudgestions on how to improve this welcome

<!-- For development I also use an [R&D planning doc](https://docs.google.com/document/d/1aQ8MzevowNq2QrK77cT0Bh46xeq4ABxoV93FD85MCkM/edit?usp=sharing) that helps me plan architectural and components choices, evaluate different options and keep track of what has or hasn't worked over time.-->

There is also a google doc for a ["QA Test Plan autoEdit 2"](https://docs.google.com/document/d/18hqjb5K7owSV6HJ-uqgeFwxicRUvf-nYsdpJiBkF-BU/edit?usp=sharing), which was original used with Vox Media QA team. It is now not up to date to the paper-editing features, but is comprehensive enough for the test. And a great starting point to make a new one.
 

## Development env

 _How to run the development environment_
_Coding style convention ref optional, eg which linter to use_
_Linting, github pre-push hook - optional_

- node 
- npm 
- [speech to text credentials](https://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/setup-stt-apis.html)

### linting 

Use [`.eslintrc.json`](./.eslintrc.json) in your code editor of choice to keep style consistency.

## Build
_How to run build_
<!-- 
https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build#linux
-->

### Build: Mac OSX
Building and packaging the app, can be done with one comand. 

```bash
npm run build:mac:dmg
```

This install dependencies, runs browserify on the client side js code, builds the electron application in the `./dist` folder and packages into a `.dmg` image which is saved into the `~/dist` folder as well. 

If you'd rather a `.zip` file instead of the `.dmg` then you can run 

```
npm run pack:mac
```

### Build: Linux

```bash
npm run build:linux
```

This creates an `.AppImage` that works across linux distribution see deployment section and this [issue](https://github.com/OpenNewsLabs/autoEdit_2/issues/36) and corresponding [PR](https://github.com/OpenNewsLabs/autoEdit_2/pull/45) for more details.

### Build: Windows

You need to be a on a windows machine to build for Windows

```bash
npm run build:win
```

<!-- https://www.davidbaumgold.com/tutorials/wine-mac/ -->

## Tests

_How to carry out tests_

At the moment some unit tests are in the `spec` folder using jasmine, and you can them using

```
npm run test
```

However they still need to be fixed up a bit. And perhaps move to jest.

- [ ] PR and help on improving test coverage welcome.

## Deployment

_How to deploy the code/app into test/staging/production_

There is no deployment as such as it's electron app, so the build described above serves as a packaging of the app for release.

However As of version `1.0.8` support is added for Linux thanks to [@probonopd](https://github.com/probonopd) [#36](https://github.com/OpenNewsLabs/autoEdit_2/issues/36).

On commit to  master there is a continuos built setup on Travis CI that builds and adds an up to date linux release to the release section under [Continuous build](https://github.com/OpenNewsLabs/autoEdit_2/releases/tag/continuous)

- [ ] PR and help welcome on creatiing a continuos integration service for Mac and Windows as well



## Build project page
The project page is visible at [autoedit.io/demo](http://www.autoedit.io).To edit the project page go to `./project_page` flder and edit the [jekyll](https://jekyllrb.com/) site.

To update the project page run

```
npm run make_page
```

This copyies from the `./project_page` folder (that also contains the demo front end) to [the `/docs` folder](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/) in this repo used to publish with [github page](https://pages.github.com/).

This comand also updates the demo front end ([autoedit.io/demo](http://www.autoedit.io/demo)). To update project page without updating demo front end code `npm run preview_page_no_demo_reload`.

The project page is a jeckyll site, and can be previewed locally using

```
npm run preview_page
```

Then visit [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

## Build/update demo front end page

[autoedit.io/demo](http://www.autoedit.io/demo) contains a dummy demo of the front end, to update this after substantial changes to the app, run

```
npm run make_demo
```

This runs browserify to bundle the client side code and copies the `./electron` folder into the `./project_page/demo` folder.



## Open source 

This is an open source project, in it's current version it was originally created as part of a [Open News Knight-Mozilla fellowship](https://opennews.org/what/fellowships/) by [Pietro Passarelli](http://pietropassarelli.com) with the [Vox Media product team](http://product.voxmedia.com). You can [contribute](https://github.com/OpenNewsLabs/autoEdit_2) and/or <a href="mailto:{{site.email}}?Subject=autoEdit%202%20question">propose ideas</a> you have for this project.

This tool is under development and you may find some bugs. In that case we will appreciate if you can [fill an issue](https://github.com/OpenNewsLabs/autoEdit_2/issues) or  <a href="mailto:pietro@autoEdit.io?Subject=Hello" target="_top">get in touch</a>.

If you are curious about [whatever happened to autoEdit "1" check this out](http://pietropassarelli.com/autoEdit.html).

## Contributing

Feel free to get in touch with any questions. Via email <pietro@autoedit.io> or [twitter @pietropassarell](https://twitter.com/pietropassarell). 

[Github issuess](https://help.github.com/articles/about-issues/) to sudgest ideas and report bugs welcome. And/or fork the project and send me a [pull request](https://help.github.com/articles/about-pull-requests/).

Sign up to the [mailing list](http://eepurl.com/cMzwSX), follow on [twitter](http://twitter.com/autoEdit2) and/or [facebook](https://www.facebook.com/autoEdit.io/) to keep up to date with the latest releases. 

Check out the [issues section](https://github.com/OpenNewsLabs/autoEdit_2/issues) and [waffle.io Dashboard](https://waffle.io/OpenNewsLabs/autoEdit_2)

[![Stories in Ready](https://badge.waffle.io/OpenNewsLabs/autoEdit_2.png?label=ready&title=Ready)](https://waffle.io/OpenNewsLabs/autoEdit_2)


## Contributors

List of contributors that have helped shaped autoEdit by contributing and/or advising on this or previous versions in no particular order.

- [Andrea Baldo](https://twitter.com/and_baldo)
- [Dan Zajdband](https://twitter.com/impronunciable)
- [Rosario Rascuna](https://twitter.com/_sarhus)
- [Daniele Bottillo](https://twitter.com/dbottillo)
- [Sanette Tanaka](https://twitter.com/ssktanaka)
- [Ryan Mark](https://twitter.com/ryanmark)
- [Katie O'Dowd]()
- [Pietro Passarelli](http://github.com/pietrop)

### Active contributors 

- [Pietro Passarelli](http://github.com/pietrop)

---

## Support the project 
<!-- Sign up to the [mailing list](http://eepurl.com/cMzwSX), follow on [twitter](http://twitter.com/autoEdit2) and/or [facebook](https://www.facebook.com/autoEdit.io/) to keep up to date with the latest releases. Say hi at <a href="mailto:pietro@autoEdit.io?Subject=Hello" target="_top">pietro@autoEdit.io</a>, always curious to hear what autoEdit is helping you with. -->

[autoEdit.io](http://www.autoEdit.io) it's free and open source. Free as in free speech as well as in free beer. [Help support the autoEdit project to keep it that way](https://donorbox.org/c9762eef-0e08-468e-90cb-2d00643697f8?recurring=true). Support will go towards fixing bugs, adding features, provide support for users etc...

 
