Testing 

## General questions

- How to test code that connects to an API?
- How to test code that uses ffmpeg/ffprobe? 
- in jsdoc, all files following convention `name_of_module/index.js` appear as named `index`. workaround?

## video_to_html5_webm
Does this even need to be tested?

##autoEdit2API
How to test this? it requires the window object to run


## client side javascript modules: ed_composer, date, srt.

How to test these with jasmine?

Using Browserify client side needs a further look into NWJS contexts.

Perhaps they need refactoring like so?

http://stackoverflow.com/questions/13520906/approaches-to-modular-client-side-javascript-without-namespace-pollution
eg 

```
// moduleA.js

var MyApplication = (function(app) {

    app.util = app.util || {};

    app.util.hypotenuse = function(a, b) {
        return Math.sqrt(a * a + b * b);
    };

    return app;
})(MyApplication || {});

var a = 3,
    b = 4;
console.log('Hypotenuse: ', MyApplication.util.hypotenuse(a, b));
```

or https://www.airpair.com/javascript/posts/the-mind-boggling-universe-of-javascript-modules



## sam_transcriber module
How to test index.js? it brings togethere a bunch of submodules and is connected to the IBM API.
Enough to test it's components serpately?


## split.js, metadata reader
Jdocco how to document callback param/return?



--- 
Other things to think about 

- IBM API keys not stored it library user system folder. This makes it harder to send to Vox Users with API key burnt in. 
	- Solution 1: share API key with users and have them add to system?
	- Solution 2: save API key inside app(as was done previously) so that users can download a ready to use version.

- videoOgg attribute change to more sensible name eg videoWebm. 


- Right way to configure jlint for Node?  
I changed the jslint pref 

```
{
  // The plugin looks for a .jshintrc file in the same directory as the source
  // file you're prettifying (or any directory above if it doesn't exist, or in
  // your home folder if everything else fails) and uses those options along
  // the default ones.

  // Details: https://github.com/victorporof/Sublime-JSHint#using-your-own-jshintrc-options
  // Example: https://github.com/jshint/jshint/blob/master/examples/.jshintrc
  // Documentation: http://www.jshint.com/docs/options/
  "browser": true,
  "esnext": true,
  "globals": {
      "require": false,
      "module":false,
      "console": false
  },
  "strict": "global",
  "undef": true,
  "unused": true
}
```