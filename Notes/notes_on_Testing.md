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