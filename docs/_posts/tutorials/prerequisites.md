

A list of some things used in this project that is good to have some working knowledge of before or while diving into the code.

### [Node][node] 
If you don't know it already might be good to recap and/or learn node a bit.
This might be easier coming from another OO language.
Safari book online node intro video + blog post on learning node js.

### [nwjs][nwjs] 
[Nwjs][nwjs](formerly known as node web kit) is like [electron][electron], which is what powers the [atom code editor][atom].
It's a way to make apps for the desktop in node. It creates a chrome v8 environment that allows your app to run independently of the browser.

Read about [mixed context mode in nwjs][nwjscontexts].

#### Nwjs boilerplate repo 
From this project app initial iteration this [nwjs boilerplate][nwjsboilerplate] as been extrapolated.
If you need/want to familiarize  yourself with core nwjs setup choices check it out. 

##### Why I nwjs and not electron?
1. I personally found nwjs documentation easier to follow wants you get a round the different contexts.
2. In nwjs you can easily hand a front end that could be moved to work as standalone "static site" or be a part of a web app. Allowing for max decoupling 
3. As far as I  understood electron is more opinionated and this would not be possible within that.

##### small NWJS apps Examples

###### [Transcriber][transcriber]
OS X desktop application to transcibe video or audio files using IBM Watson Speech to text API. This was an initial prototype preceeding autoEdit2. The idea was to test the quality of the IBM Watson STT recognition with the user in isolation from other functionality. It proved very popular with video producers.     

*Note:* Because it was a "throw away prototype" there some unresolved bugs, such as if the video exceeds 100mbs when converted into audio to send to IBM STT API it will be rejected by the API and no error raised to the user. 
In autoEdit2 this has been fixed by chunking the audio into 5 minutes clips.


###### [Caption burner][captions_burner] 
NWJS os x desktop app that given a srt and a video burns the captions onto the video. Can also export as gif.

Use of 


###### Cue sheet generator 
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

[fs](https://nodejs.org/api/fs.html), [path](https://nodejs.org/api/path.html), etc..

### ffmpeg and node wrapper [fluent-ffmpeg][fluent_ffmpeg]

Worth having a look at [fluent-ffmpeg][fluent_ffmpeg] and [ffmpeg][ffmpeg]. 
Ffmpeg does not have great documentation. 

<!-- I've put togethere a tutorial with some of the basic ffmpeg comands. 
[][link to ffmpeg tutorial, draft in notes folder] -->

On the other hand fluent ffmpeg allows you to the set ffmpeg bin, which is handy for packaging and using ffmpeg inside nwjs without requiring it as a dependency, is documented with examples and is generally more straightforward. t


[node]:https://nodejs.org/en/about/
[nwjs]:http://docs.nwjs.io/en/latest/For%20Users/Getting%20Started/
[electron]:http://electron.atom.io/
[atom]:https://atom.io/
[nwjscontexts]:http://docs.nwjs.io/en/latest/For%20Users/Advanced/JavaScript%20Contexts%20in%20NW.js/
[nwjsboilerplate]:https://github.com/pietrop/nwjs_boilerplate
[transcriber]:https://voxmedia.github.io/Transcriber/
[captions_burner]:https://voxmedia.github.io/captions_burner/
[fluent_ffmpeg]: https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
[ffmpeg]:https://www.ffmpeg.org/