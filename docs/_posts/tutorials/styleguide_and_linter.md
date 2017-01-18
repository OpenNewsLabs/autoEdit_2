# Style Guidelines
### Configure style rules

### ESLinter
`.eslintrc.json` provides the [_AirBnB_](https://github.com/airbnb/javascript) style guide (for JS but also for HTML/EJS and CSS/Sass) with the indendation spacing edit to a value of 4.

### Beautify
`.jsbeautifyrc` provides style rules for a Beautify plugins (we're using [**Sublime Text 3**](https://www.sublimetext.com/3) with [**Prettify HTML,CSS,JS**](https://packagecontrol.io/packages/HTML-CSS-JS%20Prettify) package)

### Use ESLinter

##### The following instructions refer to a setup made for **Sublime Text 3** (it'd not be too much different for _Atom_).

#### Install ESLinter in Sublime Text 3
(Use this video tutorial as a reference [SettingUp ESLint](https://www.youtube.com/watch?v=QUK4hMoYv_c))

- Install [`ESLint`](http://eslint.org/) on your local machine.
  We warmly suggest to install it globally through: `npm install -g eslint`.
- Install the following pakages in Sublime: 
    + [`SublimeLinter-eslint`](https://github.com/roadhump/SublimeLinter-eslint)
    + [`SublimeLinter-jshint`](https://github.com/SublimeLinter/SublimeLinter-jshint)
    + [`SublimeLinter-csslint`](https://github.com/SublimeLinter/SublimeLinter-csslint)
    + [`SublimeLinter-html-tidy`](https://github.com/SublimeLinter/SublimeLinter-html-tidy)

## HTML Styleguide
#### Always use lowercase tag and attribute names

Good
```
<a class="{class}" id="{id}" data-name="{name}" href="{url}">{text}</a>
```
Bad
```
<A Class="{class}" Id="{id}" data-Name="{name}" HREF="{url}">{text}</A>
```

#### Write one discrete element per line

Good
```
<div>
    <h1>Test</h1>
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Lorem ipsum dolor sit amet.</p>
    <ul>
        <li>
            <a href="{url}">{text}</a>
        </li>
        <li>
            <a href="{url}">
                <img src="{img}" alt=""/>
            </a>
        </li>
    </ul>
</div>
```
Bad
```
<div>
    <h1>Test</h1>
    <p>Lorem ipsum dolor sit amet.</p><p>Cupiditate facere.</p>
    <ul>
        <li><a href="#">{text}</a></li>
        <li><a href="#"><img src="{img}" alt=""/></a></li>
    </ul>
</div>
```

#### Use one additional level of indentation for each nested element

Good
```
<div>
    <h1>Test</h1>
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Cupiditate facere nulla quaerat quam.</p>
    <ul>
        <li>
            <a href="{url}">{text}</a>
        </li>
        <li>
            <a href="{url}">
                <img src="{img}" alt=""/>
            </a>
        </li>
    </ul>
</div>
```
Bad
```
<div>
<h1>Test</h1>
<p>Lorem ipsum dolor sit amet.</p>
<p>Lorem ipsum dolor sit amet.</p>
<ul>
<li>
<a href="#">{text}</a>
</li>
<li>
<a href="{url}">
<img src="{img}" alt=""/>
</a>
</li>
</ul>
</div>
```

#### Use valueless boolean attributes

Good
```
<input type="checkbox" checked disabled/>
```
```
<a data-nn-lightboxLink href="...">
```
Bad
```
<input type="checkbox" checked="checked" disabled="disabled"/>
```
```
<a data-nn-lightboxLink="true" href="...">
```

#### Always use double quotes to quote attribute values

Good
```
<a class="{class}" data-name="{name}" id="{id}" href="{url}">{text}</a>
<a class="{class}" data-name="{'key': 'value', 'key': 'value'}" id="{id}" href="{url}">{text}</a>
```
Bad
```
<a class='{class}' data-name='{name}' id='{id}' href='{url}'>{text}</a>
```

#### Omit the type attributes from link stylesheet, style and script elements

Good
```
<script src="extern.js"></script>
<link rel="stylesheet" href="stylesheet.css"/>
```
Bad
```
<link href="/uploadify/stylesheet.css" type="text/css" rel="stylesheet"/>
<script src="extern.js" type="text/javascript"></script>
```

#### Always include closing tags

Good
```
<html>
    <body>
        <ul>
            <li>
                <a href="{url}">{text}</a>
            </li>
            <li>
                <a href="{url}">{text}</a>
            </li>
        </ul>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet.</p>
    </body>
</html>
```
Bad
```
<html>
    <body>
        <ul>
            <li>
                <a href="{url}">{text}</a>
            <li>
                <a href="{url}">{text}</a>
        </ul>
        <p>Lorem ipsum dolor sit amet.
        <p>Lorem ipsum dolor sit amet.
```

#### Always include a trailing slash in self-closing elements (for the sake of redability)

Good
```
<br/>
<hr/>
<img src="{img}" alt=""/>
<input type="checkbox"/>
<meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit."/>
```
Bad
```
<br>
<hr>
<img src="{img}" alt="">
<input type="checkbox">
<meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
```

#### Multimedia feedback
  **Always use the alt tag.**

Good
```
<img src="spreadsheet.png" alt="Spreadsheet screenshot"/>
```
If it is a decorative image use an empty alt tag.
```
<img src="icon.png" alt=""/>
```
Bad
```
<img src="spreadsheet.png"/>
```

#### Do not use inline JS

We don't use inline javascript in the code, when it is not absolutely necessary. This are the reasons:
  * It blocks the page rendering
  * It mixes up structure and behaviour
  * It doesn't get cached
  * It isn't normally tested
  * It doesn't get minified

#### Do not use inline CSS

We don't use inline CSS:
  * It mixes structure and design
  * It doesn't get cached
  * It doesn't get minified
  * It isn't under SCSS control


#### HTML attribute order

HTML attributes should be listed in an order that reflects the fact that class names are the primary interface through which CSS select elements and we use the data attribute to init javascript functionality.
1. class
2. data-*
3. id
4. Everything else

Good
```
<a class="{class}" data-name="{name}" id="{id}" href="{url}" target="_blank">{text}</a>
```

#### Inline Javascript exception

Inline Javascript and Javascript in the `<head>` should be avoided for performance reasons. But there are 3 exceptions:
  * no-js/js: If Javascript is enabled we replace the no-js class with a js class in the html tag
  * no-svg/svg: If svg is supported we replace the no-svg class with a svg class in the html tag
  * picture: Add the new HTML5 picture element (this is needed for the picturefill fallback)

Good
```
<script>
    document.createElement("picture");
    (function(H){H.className=H.className.replace(/\bno-js\b/,'js')}(document.documentElement));
    (function(H){if (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")){H.className=H.className.replace(/\bno-svg\b/,'svg');}}              (document.documentElement));
</script>
```
## CSS/Sass Styleguide
### Anatomy of a CSS selector
```
.foo .bar .baz {
    float: left;   
} 
```
The whole block (lines 1-3) is called a ruleset.
Line 1 is the (compound) selector.
The whole line 2 is a declaration, made up of float, which is a property, and left, which is a value.

#### General principles

Don't try to prematurely optimise your code; keep it readable and understandable.
All code in any code-base should look like a single person typed it, even when many people are contributing to it.
Strictly enforce the agreed-upon style.
Before your write new code, try to reuse existent code.
Only declare things that are really necessary. Don't add default values, like text-weight: normal when not really needed:

Good
```
padding-left: 15px;
padding-right: 15px;
```
Bad

Set top and bottom space to 0 only when needed.
```
padding: 0 15px;
```

#### Whitespace

- Use whitespace to improve readability.
- Use 4 spaces for indentation (don't use tabs).
- Don't use more than one blank line as a separator.
- Strip all end-of-line and end-of-file whitespace.

#### Encoding
All SCSS files should be UTF-8 (no BOM) encoded. Make sure you use double quotes.

Good
```
@charset "UTF-8";
```


#### Comments
Comment style should be simple and consistent within a single code base:
Add two blank lines above the comment
Place comments on a new line above their subject
Add one blank line below the comment
Keep line-length to a sensible maximum (same rule as for the code line length)
Use always single line comments (they are not rendered into the CSS)

Good
```
.selector1 {
    float: left;
}
  
  
// Comment
  
.selector2 {
    float: right;
}
```

##### Do not use comments for ...
- commenting out old code. If code is not needed any more delete it. If you need it later, you'll find it with the help of the version control system (SVN or git) history function.

- setting a reminder, like `// TODO`. Do it properly right away. The truth is: Nobody will take care of it later on.

#### Format
The chosen code format must ensure that code is:
- easy to read
- easy to clearly comment
- minimises the chance of accidentally introducing errors
- and results in useful diffs and blames.

##### Rules
**Use one discrete selector per line in multi-selector rulesets**

Good

```
.foo,
.bar,
.selector {
    background: #fff; 
}
```
 
Bad
```
.foo, .bar, .selector {
    background: #fff; 
}
```

**Include a single space before the opening brace of a ruleset**

Good

```
.foo {
    background: #fff; 
}
```

Bad

```
.foo{
    background: #fff; 
}
```

**Include one declaration per line in a declaration block**

Good
```
.foo {
    background: #fff;
    color: #000; 
}
```
Bad
```
.foo {
    background: #fff; color: #000;
}
```

**Use one level of indentation for each declaration**

Good
```
.foo {
    background: #fff;
    color: #000;     
}
```

Bad
```
.foo {
        background: #fff;
        color: #000; 
}
```

Bad
```
.foo {
background: #fff;
color: #000;
}
```

**Include a single space after the colon of a declaration**

Good
```
.foo {
    background: #fff;
    color: #000;   
}
```

Bad
```
.foo {
    background:#fff;
    color:#000;   
}
```

**Use lowercase and shorthand hex values, e.g., #aaa**
Good
```
.foo {
    background: #fff;
    border: 1px solid #def;
    color: #abcdef;
}
```

Bad
```
.foo {
    background: #ffffff;
    border: 1px solid #ddeeff;
    color: #ABCDEF;
}
```

**Use single quotation marks for attribute selectors and property values**
Good
```
.foo:after {
    content: ''; 
}
```
Bad
```
.foo:after {
   content: "";
}
```
Good

```
html {
  font-family: 'open sans', arial, sans-serif;
}
```
Bad
```
html {
  font-family: "open sans", arial, sans-serif;
}
```

**Quote attribute values in selectors, e.g., input[type="checkbox"]**
Good
```
.foo[type='text'] {
    border: 1px solid #f00; 
}
```
Bad
```
.foo[type=text] {
    border: 1px solid #f00; 
}
```

**Where allowed, avoid specifying units for zero-values**
Good
```
.foo {
    margin: 0;
    padding: 0 2px 0 4px; 
}
```

Bad
```
.foo {
    margin: 0px;
    padding: 0px 2px 0px 4px
}
```
## JS Styleguide
