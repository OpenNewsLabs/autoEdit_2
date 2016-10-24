#contributing

## Familiarizing yourself with the project 

1. User manual 
Explore the user manual to get a sense of the main flow / user journey of the application.

2. Understand the SPeech to text API setup 
Both of IBM and for gentle from a user point of view.

3. If you want to use it with IBM get the bluemix STT keys 

4.(optional) if you wanna use it with gentle then get that setup too 

3. Run the app 
Npm install 
Npm start 

Add IBM keys 
Follow user manual 
Add a file 
Select some text 
Export 
Of you don't have an editing software then export something else 

## understanding the code base - pre requisite 

Things used in the project that is good to have some working knowledge of before or while diving into the project.

### node 
If you don't know it already might be good to recap and/or learn node a bit.
This might be easier coming from another OO language.
Safari book online node intro video + blog post on learning node js.

### nwjs 
Nwjs(formerly known as node web kit) is like electron, which is what powers atom.
It's a way to make apps for the desktop in node. It creates a chrome v8 environment that allows your app to run independently of the browser.

Read about mixed context mode in nwjs.

#### Nwjs boilerplate repo 
From this project app initial iteration this nwjs boilerplate as been extrapolated.
If you need/want to familiarize  yourself with core nwjs setup choices check it out. 

Also examples of smaller nwjs app as escalopes 

Why I chose nwjs and not electron?
1. I personally found nwjs documentation easier to follow wants you get a round the different contexts.
2. In nwjs you can easily hand a front end that could be moved to work as standalone "static site" or be a part of a web app. Allowing for max decoupling 
3. As far as I  understood electron is more opinionated and this would not be possible within that.


##### Transcriber 

##### Caption burner 

##### Cue sheet generator 
Example running ruby script and using nwjs for GUI only 


### backbone 
Is what is used on the client side.
The app has been built in such a way that the front end can be used as stand alone, such as for the demo. Or if making a web based version of 

#### backbone.sync 
Overwriting the call to api

#### underscore 
Backbone uses underscore as a dependencies, so made use of this to simplify certain operations._/;z 


### bootstrap 
For HTML components and for js client side components bootstrap js 

### native node components used

fs, path, 


## overview of app structure/architecture 

Main user journey overview, as seen in user manual.

Nwjs used to run a chrome V8 instance.

Nwjs needs an index.html file as a starting point for the app. 
This contains all the underscore templates for the backbone views.

Logic to start the app detecting whether is inside nwjs or in browser mode 

Loading IBM API keys.