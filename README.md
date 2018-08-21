# autoEdit 2

autoEdit 2 is a fast text based video editing, desktop app for Mac, Linux and Windows, built with node and electron, and Backbone front end. For making video production faster, easier and more accessible.


## Ready to use release 

See [releases section](https://github.com/OpenNewsLabs/autoEdit_2/releases) to download latest packaged version ready to use. And view [user manual](https://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/) for overview of the app.

All you need to get started is to decide what speech to text service you want to use and get some credentials to get going [check out the user manual for more details](https://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/setup-stt-apis.html) 

## Setup

```bash
git clone git@github.com:OpenNewsLabs/autoEdit_2.git
```

```
cd autoEdit_2
```

 ```bash
npm install
``` 

## Usage - development

```
npm start
```

Compiles the js client side files with browserify and starts electron

_Note:_ You'd also need to get Speech to text keys or have the Gentle Open source app running locally [check out the user manual for more details](https://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/setup-stt-apis.html), unless you are chosing `pocketsphinx` as speech to text option.

## Background 
autoEdit, it's a text based video editing software that creates a digital paper-editing workflow. For more backaground see this write up on Source ["Introducing autoEdit"](https://source.opennews.org/articles/video-editing-made-better-introducing-autoedit/) as well as for more in depth on the underlying workflow [see this gitbook  "How to tell compelling stories out of video interviews"](https://pietropassarelli.gitbooks.io/how-to-tell-compelling-stories-out-of-video-inter/content/), and [especially this section focused on digital Paper-editing](https://pietropassarelli.gitbooks.io/how-to-tell-compelling-stories-out-of-video-inter/content/digital-paper-editing/autoedit-2-digital-paper-editing-software.html).


![Overview diagram ](https://github.com/OpenNewsLabs/autoEdit_2/raw/master/assets/autoEdit_overview_diagram_1.0.7.png)


## System Architecture 
_High level overview of system architecture_

See [Architecture overview](https://autoedit.gitbook.io/documentation/overview/architecture) in
 [developer's documentation](https://autoedit.gitbook.io/documentation).


## Development env

 _How to run the development environment_
_Coding style convention ref optional, eg which linter to use_
_Linting, github pre-push hook - optional_

- node 8 or greater
- npm 5 or greater
- [speech to text credentials](https://autoedit.gitbook.io/user-manual/setup-stt-apis)

### linting 

Use [`.eslintrc.json`](./.eslintrc.json) in your code editor of choice to keep style consistency.

## Build
_How to run build_

[See documentation section for build / deployment in OS X, Linux, Windows](https://autoedit.gitbook.io/documentation/overview/deploymentbuild)


## Travis CI Deployment

[See documentation section for Travis CI continuos build](https://autoedit.gitbook.io/documentation/overview/deploymentbuild/travis-ci-continuous-build)


### Deployment as adobe panel - work in progress 🚧

[See documentation section for more info](https://autoedit.gitbook.io/documentation/adobe-panel/autoedit-adobe-cep-panel-dev-setup)


## Tests

_How to carry out tests_

At the moment some unit tests are in the `spec` folder using `jasmine`, and you can run them using

```
npm run test
```

However they still need to be fixed up a bit. And perhaps move to `jest`.

- [ ] PR and help on improving test coverage welcome.


## Build project page & demo
See documentation section for
- [building project page](https://autoedit.gitbook.io/documentation/project-page/build-project-page)
- [building demo front end](https://autoedit.gitbook.io/documentation/project-page/build-update-demo-front-end-page)

## Open source 

This is an open source project, in it's current version it was originally created as part of a [Open News Knight-Mozilla fellowship](https://opennews.org/what/fellowships/) by [Pietro Passarelli](http://pietropassarelli.com) with the [Vox Media product team](http://product.voxmedia.com). You can [contribute](https://github.com/OpenNewsLabs/autoEdit_2) and/or <a href="mailto:{{site.email}}?Subject=autoEdit%202%20question">propose ideas</a> you have for this project.

This tool is under development and you may find some bugs. In that case we will appreciate if you can [fill an issue](https://github.com/OpenNewsLabs/autoEdit_2/issues) or  <a href="mailto:pietro@autoEdit.io?Subject=Hello" target="_top">get in touch</a>.

If you are curious about [whatever happened to autoEdit "1" check this out](http://pietropassarelli.com/autoEdit.html).

## Contributing

Feel free to get in touch with any questions. Via email <pietro@autoedit.io> or [twitter @pietropassarell](https://twitter.com/pietropassarell). 

[Github issuess](https://help.github.com/articles/about-issues/) to sudgest ideas and report bugs welcome. And/or fork the project and send me a [pull request](https://help.github.com/articles/about-pull-requests/).

Sign up to the [mailing list](http://eepurl.com/cMzwSX), follow on [twitter](http://twitter.com/autoEdit2) and/or [facebook](https://www.facebook.com/autoEdit.io/) to keep up to date with the latest releases. 

Check out the [issues section](https://github.com/OpenNewsLabs/autoEdit_2/issues) and [waffle.io Dashboard](https://waffle.io/OpenNewsLabs/autoEdit_2)

[![Stories in Ready](https://badge.waffle.io/OpenNewsLabs/autoEdit_2.png?label=ready&title=Ready)](https://waffle.io/OpenNewsLabs/autoEdit_2)


## Contributors

List of contributors that have helped shaped autoEdit by contributing and/or advising on this or previous versions in no particular order.

- [Andrea Baldo](https://twitter.com/and_baldo)
- [Dan Zajdband](https://twitter.com/impronunciable)
- [Rosario Rascuna](https://twitter.com/_sarhus)
- [Daniele Bottillo](https://twitter.com/dbottillo)
- [Sanette Tanaka](https://twitter.com/ssktanaka)
- [Ryan Mark](https://twitter.com/ryanmark)
- [Katie O'Dowd]()
- [Pietro Passarelli](http://github.com/pietrop)

### Active contributors 

- [Pietro Passarelli](http://github.com/pietrop)

---

## Support the project 
<!-- Sign up to the [mailing list](http://eepurl.com/cMzwSX), follow on [twitter](http://twitter.com/autoEdit2) and/or [facebook](https://www.facebook.com/autoEdit.io/) to keep up to date with the latest releases. Say hi at <a href="mailto:pietro@autoEdit.io?Subject=Hello" target="_top">pietro@autoEdit.io</a>, always curious to hear what autoEdit is helping you with. -->

[autoEdit.io](http://www.autoEdit.io) it's free and open source. Free as in free speech as well as in free beer. [Help support the autoEdit project to keep it that way](https://donorbox.org/c9762eef-0e08-468e-90cb-2d00643697f8?recurring=true). Support will go towards fixing bugs, adding features, provide support for users etc...

 
