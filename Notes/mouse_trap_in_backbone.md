# mouse_trap_in_backbone

after loading backone 

first laod mousetrap.js file 
https://github.com/ccampbell/mousetrap


then load mousetrap backbone integration 
https://github.com/closeio/backbone.mousetrap

then can start using it in views

as explained in readme 

```
var View = Backbone.View.extend({
    keyboardEvents: {
        'command+shift+t': 'test',
        'control+shift+t': 'test'
    },

    test: function(ev) {
        alert('hello world!');
    }
});
```