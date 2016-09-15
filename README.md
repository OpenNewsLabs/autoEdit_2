# autoEdit V2

<!-- ## Description -->

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

## Folder structure 

[See documentation](/system_manual/intro.html) for breakdown explanation.

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

See [documentation on packaging/deploying the app](https://opennewslabs.github.io/autoEdit_2/system_manual/deployment.html)


---

## Contributing
Feel free to get in touch with any questions. For the the project and send me a pull request.

## Issue reporting
This tool is under development and you may find some bugs. In that case we will appreciate if you can [fill an issue](https://github.com/OpenNewsLabs/autoEdit_2/issues) or<a href="mailto:{{site.email}}?Subject=autoEdit%20bug"> get in touch</a> .


## Licence

[See licence file](/LICENCE.MD)

## Contributors

- [Pietro Passarelli](http://github.com/pietrop)


