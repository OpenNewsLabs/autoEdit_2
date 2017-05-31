# autoEdit V2

autoEdit 2 is a fast text based video editing, node NWJS, Os X desktop app, with Backbone front end. For making video production faster, easier and more accessible.

## Ready to use release 

See [releases section](https://github.com/OpenNewsLabs/autoEdit_2/releases) to download latest packaged version ready to use. 
All you need to get started is IBM Watson API Blumix keys. [Check out the user manual](hhttps://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/) and the [developer's documentation](https://pietropassarelli.gitbooks.io/autoedit-2-r-d-documentation-for-developers/content/)


## Overview

![Overview diagram ](/assets/0_diagram.png)

1. It creates automatic transcription from a video or audio file
2. the user can make text selections 
3. export those selections as a video sequence in the editing software of choice


It is built in node NWJS and backbone. 

<!-- ![Transcription ](/docs/img/gif/3_transcription.gif) -->

Watch [video overview on youtube](http://www.youtube.com/watch?v=4z143-nJlzs).

The app uses IBM watson(free trial), as well as Gentle and pocketsphinx open source Speech To Text systems to generate transcription.
The user can then select text and export a video sequence to the video editing software of choice.

Is designed so that the front end in backbone can be used as standalone static site. Which is how 
[the demo](https://opennewslabs.github.io/autoEdit_2/demo/index.html) is run, with an hard coded sample data in `backbone.sync`.

For more info [check out the documentation](https://pietropassarelli.gitbooks.io/autoedit-2-documentation/content/).

### -->Papereditig<--

As of version `1.0.6` you can pull selections from multiple transcriptions into a paperedit, see a video preview, and export as an EDL video sequence. [Check out the user manual for more on this](https://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/paperediting.html).

## Development

### Launching the app

```bash
npm install
``` 

and then run the following comand to compile the js client side files with browserify and start nwjs. 

```bash
npm start
```

You'd also need to get IBM watson STT keys or have the Gentle Open source app running locally [see the guide for instructions on setting this up ](https://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/chapter1.html)

### Building/packaging the app

Building and packaging the app, can be done with one comand. 


```bash
npm run build
```

This install dependencies, runs browserify on the client side js code, builds the nwjs application in the `./build` folder and packages into a dmg image which is saved onto the `~/Desktop`. 

<!-- Build for Linux 

https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build#linux

Build for windows 
-->



## Documentation 

For more info check out the [project documentation](https://pietropassarelli.gitbooks.io/autoedit-2-r-d-documentation-for-developers/content/)


## Contributing
Feel free to get in touch with any questions. Via email <pietro@autoedit.io> or [twitter @pietropassarell](https://twitter.com/pietropassarell).Fork the project and send me a pull request.

Sign up to the [mailing list](http://eepurl.com/cMzwSX), follow on [twitter](http://twitter.com/autoEdit2) and/or [facebook](https://www.facebook.com/autoEdit.io/) to keep up to date with the latest releases. 

Check out the [issues section](https://github.com/OpenNewsLabs/autoEdit_2/issues) and [waffle.io Dashboard](https://waffle.io/OpenNewsLabs/autoEdit_2)

[![Stories in Ready](https://badge.waffle.io/OpenNewsLabs/autoEdit_2.png?label=ready&title=Ready)](https://waffle.io/OpenNewsLabs/autoEdit_2)

Is reccomended to use [`.eslintrc.json`](./.eslintrc.json) in your code editor of choice to keep style consistency.

## Open source 

This is an open source project, in it's current version it was originally created as part of a [Knight-Mozilla fellowship](https://opennews.org/what/fellowships/) by [Pietro Passarelli](http://pietropassarelli.com) with the [Vox Media product team](http://product.voxmedia.com). You can [contribute](https://github.com/OpenNewsLabs/autoEdit_2) and/or <a href="mailto:{{site.email}}?Subject=autoEdit%202%20question">propose ideas</a> you have for this project.

This tool is under development and you may find some bugs. In that case we will appreciate if you can [fill an issue](https://github.com/OpenNewsLabs/autoEdit_2/issues) or  <a href="mailto:pietro@autoEdit.io?Subject=Hello" target="_top">get in touch</a>.

If you are curious about [whatever happened to autoEdit "1" check this out](http://pietropassarelli.com/autoEdit.html).

## Support the project 

Sign up to the [mailing list](http://eepurl.com/cMzwSX), follow on [twitter](http://twitter.com/autoEdit2) and/or [facebook](https://www.facebook.com/autoEdit.io/) to keep up to date with the latest releases. Say hi at <a href="mailto:pietro@autoEdit.io?Subject=Hello" target="_top">pietro@autoEdit.io</a>, always curious to hear what autoEdit is helping you with.

[autoEdit.io](http://www.autoEdit.io) it's free and open source. Free as in free speech as well as in free beer. [Help support the autoEdit project to keep it that way](https://donorbox.org/c9762eef-0e08-468e-90cb-2d00643697f8?recurring=true). Support will go towards fixing bugs, adding features, provide support for users etc.

<!-- 
## Contributors

List of contributors that have helped shaped this version of autoEdit by contributing and/or advising on this or previous versions of autoEdit, in no particular order.

- [Pietro Passarelli](http://github.com/pietrop)
- [Andrea Baldo](https://twitter.com/and_baldo)
- [Dan Zajdband](https://twitter.com/impronunciable)
- [Rosario Rascuna](https://twitter.com/_sarhus)
- [Daniele Bottillo](https://twitter.com/dbottillo)
- [Sanette Tanaka](https://twitter.com/ssktanaka)
- [Ryan Mark](https://twitter.com/ryanmark)
- [Katie O'Dowd]()
- [Lauren Rabaino](https://twitter.com/laurenrabaino) -->


## Active contributors 

- [Pietro Passarelli](http://github.com/pietrop)
- [Andrea Baldo](https://twitter.com/and_baldo)


<!--
TODO: move in documentation appendix. 

## packaging ffmpeg and ffprobe in autoEdit

using modified version of static ffmpeg /ffprobe lib.

require in config.js and make them avaible to rest of app from there.  eg require config to get the path.

static ff has advantage that packages cross platform bin of ffmpeg. which means you could be developeing this app on mac, linux and windows, without ffmpeg on your machine and could still be developing for autoEdit. 

in production, we want to remove the versions we don't need. 
we use the files notation for electron-builder to specify in package.json 

that all apps need to have these files. (this might not be needed tho as they are added by default?)
Making use of ${os} and ${arch} var provided.

```json
"node_modules/ffmpeg-static/bin/${os}/${arch}/ffmpeg",
"node_modules/ffmpeg-static/index.js",
"node_modules/ffmpeg-static/package.json",
"node_modules/ffprobe-static/bin/${os}/${arch}/ffmpeg",
"node_modules/ffprobe-static/index.js",
"node_modules/ffprobe-static/package.json"
 ```

then for each os specific settings, eg for mac we do this, remove the folders for the opposite os. 

```json
"mac": {
      "category": "public.app-category.productivity",
      "files": [
        "!node_modules/ffmpeg-static/bin/win${/*}",
        "!node_modules/ffmpeg-static/bin/linux${/*}",
        "!node_modules/ffprobe-static/bin/win${/*}",
        "!node_modules/ffprobe-static/bin/linux${/*}"
      ]
    },
```

To make use of use of ${os} and ${arch} var provided by electron-builder, we modified the ff github package

- renames `win32` to `win`. win32 is how the `os` module detects it, but for the folder structure to be inferable programmaticly by electron-builder files settings, we need to change the name.
- Similarly for os x, change folder to `mac` rather then `darwin`.
- 

Then  in index.js we adjust the output of `os` module to meet electron-builder needs

```
if(platform == "darwin"){
	platform = "mac";
}else if(platform == "win32"){
	platform = "win";
}
```
and change rest of code accordingly.



Unrelated, but also added `browser` in list of platform, because when config, that requries ff path is loaded, if it is detected in browser mode. TODO: test not requirins config.js in browserify, removing this `!==browser` and see what happens.

-->
