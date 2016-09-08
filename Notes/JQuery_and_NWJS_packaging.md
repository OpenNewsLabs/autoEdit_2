# JQuery and NWJS packaging 

it seems like that you need to use libraries that require JQuery, such as bootstrap js or backnone. 

if you just use standard html src 

<!-- example  -->

it might trigger an error saying that js is nto defined. 

<!-- exmaple  -->


Solution is to include jquery using js and adding it to the dom, and use a callabck to add other library that need it as dependency once done. 


```
Issue 
Jquery not loading in nwjs once is packaged for deployment and can’t figure out why.

For reproducing the issue,I boiled it down to a minimal repo 

Download this repo [url coming soon]

`npm start `

you see "Added using jquery"

because in `index.html` there is 

```
$("#main").html("Added using jquery")
```

if you do `node deploy.js`
you see "Default html text"

which is the html in index, which mean jquery did not substitute the text in main
```
  <div id="main" class="container-fluid">
   <p>Default html text</p>
  </div><!-- container-fluid -->
```

if you look at the error in console in the packaged version 

`Uncaught ReferenceError: $ is not defined`

is the main error.
```



Solution, a bit of callback hell to make sure the script are loaded in the right order.

```
//loads scripts dynamically adding them to the body of the page
function loadExtScript(src, callback) {
  var s = document.createElement('script');
  s.src = src;
  document.body.appendChild(s);

  s.onload = function () {
    // if loaded...call the callback
    if(callback){callback(s)}
  }
}

/**
* To make sure scripts are deployed int he right order when NWJS is packaged, a little bit of callbacl hell.
*/
loadExtScript("vendor/jquery.min.js",function(script){
    //set jquery for bootstrap 
     window.jQuery = window.$ ;
     
     loadExtScript("vendor/bootstrap-3.3.6-dist/js/bootstrap.js",function(){

       loadExtScript("vendor/underscore-min.js",function(){
          loadExtScript("vendor/backbone-min.js",function(){
            //app.js backbone files 
           loadExtScript("js/models/transcription.js",function(){
               loadExtScript("js/collections/transcriptions.js",function(){
                 loadExtScript("js/views/transcription_index.js",function(){
                     loadExtScript("js/views/transcription_show.js",function(){
                        loadExtScript("js/views/transcription_form.js",function(){
                          loadExtScript("js/router.js",function(){
                               console.log("loaded stuff")
                          }) 
                        }) 
                    }) 
                  }) 
                })
            })
         })
      })
  })
})
```


## JQuery 

`jquery.min.1.12.4.js` seems to hit the sweet spot between being compatible with NWJS, Bootstrap, and having the `.find()` that has been used in the client side and is not supported in previous versions.
