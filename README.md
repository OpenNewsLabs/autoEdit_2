# autoEdit V2

autoEdit 2 is a fast text based video editing, node NWJS, Os X desktop app, with Backbone front end. For making video production faster, easier and more accessible.

## Ready to use release 

See [releases section](https://github.com/OpenNewsLabs/autoEdit_2/releases) to download latest packaged version ready to use. 
All you need to get started is IBM Watson API Blumix keys. [Check out the guide section on this](https://opennewslabs.github.io/autoEdit_2/user_manual/setup.html) and the [user manual](https://opennewslabs.github.io/autoEdit_2/user_manual/usage.html)

## Overview

![Overview diagram ](/docs/img/tutorial/0_diagram.png)

1. It creates automatic transcription from a video or audio file
2. the user can make text selections 
3. export those selections as a video sequence in the editing software of choice

It is built in node NWJS and backbone. 

<!-- ![Transcription ](/docs/img/gif/3_transcription.gif) -->

Watch [video overview on youtube](http://www.youtube.com/watch?v=4z143-nJlzs).

The app uses IBM watson or Gentle open source Speech To Text systems to generate transcription.
The user can then select text and export a video sequence to the video editing software of choice.

Is designed so that the front end in backbone can be used as standalone static site. Which is how 
[the demo](https://opennewslabs.github.io/autoEdit_2/public/demo/frontEnd/index.html#transcriptions) is run, with an hard coded sample data in `backbone.sync`.

For more info [check out the documentation](http://www.autoedit.io/jsdoc_docs/).

## Development

### Launching the app

```bash
npm install
``` 

and then run the following comand to compile the js client side files with browserify and start nwjs. 

````
npm run start_make_js
```

You'd also need to get IBM watson STT keys or have the Gentle Open source app running locally [see the guide for instructions on setting this up ](https://opennewslabs.github.io/autoEdit_2/user_manual/setup.html)

### Building/packaging the app

Building and packaging the app, can be done with you can do it with one comand. 


```
npm run build
```

This install dependencies, runs browserify on the client side js code, builds the nwjs application in the `./build` folder and packages into a dmg image which is saved onto the `~/Desktop`. 

<!-- Or alternativly you can do it in 4 steps if you need to troubleshoot the process.

#### 1 install dependencies 

```bash
npm install
``` 

#### 2 compile js 
And then compile front end js code with browserify

````
npm run make_js
```

#### 3 package nwjs app

Then run nwjs build script to package the app. 
````
npm run make_nw
```

This runs the deploy script is in `build.js` It creates a folder called `build` where you can find your packaged app. 

It also creates a `/cache` folder is used by deploy to keep the latest version needed to build and package the app, to avoid having to re-download it every time.


[more info on deploy/packaging of app in nwjs boilerplate project](lhttps://github.com/pietrop/nwjs_boilerplate#deploy)


#### 4 package app in dmg 

To create a dmg for distributing the app for OS X.

````
npm run make_dmg
```
 -->
 
---

## Documentation 

For more info check out the [project documentation](http://www.autoedit.io/jsdoc_docs/)

---

## Contributing
Feel free to get in touch with any questions. [via email](pietro@autoedit.io) or [twitter @pietropassarell](https://twitter.com/pietropassarell).Fork the project and send me a pull request.

Check out the [issues section](https://github.com/OpenNewsLabs/autoEdit_2/issues) and [waffle.io Dashboard](https://waffle.io/OpenNewsLabs/autoEdit_2)

[![Stories in Ready](https://badge.waffle.io/OpenNewsLabs/autoEdit_2.png?label=ready&title=Ready)](https://waffle.io/OpenNewsLabs/autoEdit_2)

Is reccomended to use [`.eslintrc.json`](./.eslintrc.json) in your code editor of choice to keep style consistency.

## Contributors

- [Pietro Passarelli](http://github.com/pietrop)

