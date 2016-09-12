# autoEdit V2

## What?

<!-- what is and what it does -->


## Overview of how the app works

<!--  -->

## Ready to use release 

see [releases section]() to downlaod latest packaged version ready to use. 
all you need to get started is IBM Watson API Blumix keys. [more on this here]()


## Launching the app 

For developers

```bash
npm install
``` 

and then 

```bash
npm start
```
---

## Folders structure

```
|--

```

### `backEnd_node`,
 overwrighting backbone.sync method and using node modules for backend
for db using linvodb3, which uses level-js, which uses indexdb in chrome v8.

###`frontEnd`, 
backbone front end 

### `docs` 
project page, github pages

### `deploy.js`
`node deploy.js` from terminal from root of app, creates a folder called `build` where you can find your packaged app. 

[more on deploy here](link to project page deploy instruction)

### `cache` 
is a folder used by deploy to keep the latest version needed to build and package the app, to avoid having to re-download it every tim e


### `tmd_media` 
is where the wav files are kept, and the deleted, when sending split chunks to watson.

### `media`
 is where video webm previews and audio wav files for transcriptions are kept. 

###`wttskeys.json` 
at root level is where watson API keys are ketp, this file is in gitignore to avoid accidentally pushing it to github. 
When you first clone the project, this file shoudl not be there. 

---

