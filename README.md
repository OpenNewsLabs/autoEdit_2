# autoEdit V2

Fast text based video editing deesktop app for Mac OSX. Built in node NWJS and backbone.
Making video production faster, easier and more accessible.

![Transcription ](/docs/img/gif/3_transcription.gif)

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

## repackaging the the app
the deploy script is in `deploy.js` and you can run it with `node deploy.js` from terminal from root of app, creates a folder called `build` where you can find your packaged app.  or `npm run build`

[more info on deploy/packaging of app in nwjs boilerplate project](lhttps://github.com/pietrop/nwjs_boilerplate#deploy)

The `/cache` folder is used by deploy to keep the latest version needed to build and package the app, to avoid having to re-download it every time.


`tmd_media`  is where the wav files are kept, and the deleted, when sending split chunks to watson.
`media` is where video webm previews and audio wav files for transcriptions are kept. 

`wttskeys.json` at root level is where watson API keys are ketp, this file is in gitignore to avoid accidentally pushing it to github. When you first clone the project, this file shoudl not be there. And you want to make sure is not there in the packaged app if you don't want to share your API keys.

---

## Contributing
Feel free to get in touch with any questions. Fork the project and send me a pull request.

### Workflow 
If you want to collaborate please keep to the following workflow:

#### New feature
Create a remote branch first from `develop` by using the naming convention:

- `FEATURE/AEDEV-[progressive number] - [description]`

Than do a checkout on your machine.

_**Please make yourself sure the number chosed for the new branch is always the latest.**_

#### Bugfixing
Create a remote branch first from `develop` by using the naming convention:

- `BUGFIX/AEDEV-[progressive number] - [description]`

Than do a checkout on your machine.

_**Please make yourself sure the number chosed for the new branch is always the latest.**_

#### Pull Requests
Once finished please send a _Pull Request_ (**PR**) on `develop`. 
This will be merged on the `develop` branch at first, then tested and eventually the branch `develop` will be merged in `master` when a new release is due.

Please also notice that the branch `master` is exclusively used for releases: **do not send _Pull Request_ on `master`. They will be rejected**

#### I need to rework on a branch already merged
First thing first you need to do a checkout on the local branch store on your computer. Afterwards do a pull from `develop` branch (it doesn't matter that it may be recognised as a not tracked branch. Proceed anyway) so that your local branch is always up-to-date before to start writing code. This will avoid too many confilcts when this branch will be merged again.

## Contributors

- [Pietro Passarelli](http://github.com/pietrop)

