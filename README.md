# autoEdit V2

Fast text based video editing deesktop app for Mac OSX. Built in node NWJS and backbone.
Making video production faster, easier and more accessible.


![Transcription ](/docs/img/gif/3_transcription.gif)

<!-- Uses [NWJS boilerplate](https://github.com/pietrop/nwjs_boilerplate)  as a starting point. -->

Is designed so that the front end in backbone can be used as standalone static site. Which is how 
[the demo](https://opennewslabs.github.io/autoEdit_2/public/demo/frontEnd/index.html#transcriptions) is run, with an hard coded backbone model.


## Overview of how the app works

The app uses IBM watson or Gentle open source Speech To Text systems to generate transcription.
The user can then select text and export a video sequence to the video editing software of choice.

![Overview diagram ](/docs/img/tutorial/0_diagram.png)

## Ready to use release 

See [releases section](https://github.com/OpenNewsLabs/autoEdit_2/releases) to downlaod latest packaged version ready to use. 
All you need to get started is IBM Watson API Blumix keys. [Check out the guide section on this](https://opennewslabs.github.io/autoEdit_2/user_manual/setup.html)

And the [user manual](https://opennewslabs.github.io/autoEdit_2/user_manual/usage.html)


## Launching the app 

### development 

```bash
npm install
``` 

and then in a sepate terminal window run 

````
npm run watch_js
```

and in the other terminal window run

```bash
npm start
```

You'd also need to get IBM watson STT keys or have the Gentle Open source app running locally [see the guide for instructions on setting this up ](https://opennewslabs.github.io/autoEdit_2/user_manual/setup.html)

### For build packaging 

#### 1 install dependencies 
```bash
npm install
``` 

#### 2 compile js 
and then compile front end js code with browserify

````
npm run make_js
```

#### 3 package nwjs app

Then run nwjs build script to package the app. 
````
npm run make_nw
```

This runs the deploy script is in `deploy.js` It creates a folder called `build` where you can find your packaged app. 

It also creates a `/cache` folder is used by deploy to keep the latest version needed to build and package the app, to avoid having to re-download it every time.


[more info on deploy/packaging of app in nwjs boilerplate project](lhttps://github.com/pietrop/nwjs_boilerplate#deploy)


#### 4 package app in dmg 

To create a dmg for distributing the app for OS X.

````
npm run make_dmg
```

---

## Documentation 

For more info check out the [project documentaiton](http://www.autoedit.io/jsdoc_docs/)

---

## Contributing
Feel free to get in touch with any questions. Fork the project and send me a pull request.

Is reccomended to use `.eslintrc.json` in your code editor of choice to keep style consistency.


## Contributors

- [Pietro Passarelli](http://github.com/pietrop)

