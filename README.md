# autoEdit V2

autoEdit 2 is a fast text based video editing, node electrong, Os X desktop app, with Backbone front end. For making video production faster, easier and more accessible.

## Ready to use release 

See [releases section](https://github.com/OpenNewsLabs/autoEdit_2/releases) to download latest packaged version ready to use. 
All you need to get started is IBM Watson API Blumix keys. [Check out the user manual](hhttps://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/) and the [developer's documentation](https://pietropassarelli.gitbooks.io/autoedit-2-r-d-documentation-for-developers/content/)


## Overview


1. It creates automatic transcription from a video or audio file
2. the user can make text selections 
3. export those selections as a video sequence in the editing software of choice


![Overview diagram ](/assets/autoEdit_overview_diagram_1.0.7.png)


It is built in node electron and backbone. 

<!-- ![Transcription ](/docs/img/gif/3_transcription.gif) -->

Watch [video overview of the transcription part on youtube](http://www.youtube.com/watch?v=4z143-nJlzs).

The app uses IBM watson(free trial), as well as Gentle and pocketsphinx open source Speech To Text systems to generate transcription.
The user can then select text and export a video sequence to the video editing software of choice.

Is designed so that the front end in backbone can be used as standalone static site. Which is how 
[the demo](https://opennewslabs.github.io/autoEdit_2/demo/index.html) is run, with an hard coded sample data in `backbone.sync`.

For more info [check out the documentation](https://pietropassarelli.gitbooks.io/autoedit-2-documentation/content/).

### -->Papereditig<--

As of version `1.0.6` you can pull selections from multiple transcriptions into a paperedit, see a video preview, and export as an EDL video sequence. [Check out the user manual for more on this](https://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/paperediting.html).

### --> Move to electron<--
As of version `1.0.7` (soon to be released) moved from nwjs to electron to package the app for desktop. This will allow to do a leap forward in certain areas of the roadmap. 

## Development

### Launching the app

```bash
npm install
``` 

and then run the following comand to compile the js client side files with browserify and start electron. 

```bash
npm start
```

You'd also need to get IBM watson STT keys or have the Gentle Open source app running locally [see the guide for instructions on setting this up ](https://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/chapter1.html)

### Building/packaging the app

Building and packaging the app, can be done with one comand. 


```bash
npm run build:mac
```

This install dependencies, runs browserify on the client side js code, builds the electron application in the `./build` folder and packages into a dmg image which is saved onto the `~/Desktop`. 

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

 
## Contributors

List of contributors that have helped shaped this version of autoEdit by contributing and/or advising on this or previous versions of autoEdit, in no particular order.

- [Andrea Baldo](https://twitter.com/and_baldo)
- [Dan Zajdband](https://twitter.com/impronunciable)
- [Rosario Rascuna](https://twitter.com/_sarhus)
- [Daniele Bottillo](https://twitter.com/dbottillo)
- [Sanette Tanaka](https://twitter.com/ssktanaka)
- [Ryan Mark](https://twitter.com/ryanmark)
- [Katie O'Dowd]()
- [Pietro Passarelli](http://github.com/pietrop)

## Active contributors 

- [Pietro Passarelli](http://github.com/pietrop)
- [Andrea Baldo](https://twitter.com/and_baldo)



