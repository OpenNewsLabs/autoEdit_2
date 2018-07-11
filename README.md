## Brief of the project

# autoEdit V2

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

### STT 

The app uses the following Speech To Text systems to generate transcription

- [X] IBM watson(free trial + paid), 
- [X] Speechmatics(free trial + paid), 
- [X] Gentle(open source) 
- [X] pocketsphinx (open source) 
- [ ] Rev.com (human transcriptions)

The user can then select text and export a video sequence to the video editing software of choice.

### Stack

It is built using node electron and backbone. 

#### `backbone.sync` 
Is designed so that the front end in backbone can be used as standalone static site. Which is how [the demo](https://opennewslabs.github.io/autoEdit_2/demo/index.html) is run, with an hard coded sample data in `backbone.sync`.

`backbone.sync` is overridden in `./electrong/db.js` to connect to `medeadown`/ `linvodb3` databse locally.

#### `ffmpeg` and `electrong`
autoEdit uses ffmpeg under the hood, and this can sometimes be problematic to setup, [I wrote here](http://pietropassarelli.com/ffmpeg-electron.html) about how this setup works in autoEdit, with semplified example.

###  Documentation for developers

For more info check out the [project documentation](https://pietropassarelli.gitbooks.io/autoedit-2-documentation/content/)

- [ ] documentation is out of date and needs cleaning up, sudgestions on how to improve this welcome

<!-- For development I also use an [R&D planning doc](https://docs.google.com/document/d/1aQ8MzevowNq2QrK77cT0Bh46xeq4ABxoV93FD85MCkM/edit?usp=sharing) that helps me plan architectural and components choices, evaluate different options and keep track of what has or hasn't worked over time.-->
 

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

 
