# FrontEnd Setup

## List of added features
- Sass compiler
- CSS concat
- Watcher
- Run Sequence
- ESLinter
- Browserify
- Autoprefixer
- Babel
- Minification 

### Gulp Installation
From: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

- Installed Gulp globally:
`$ npm install -g gulp-cli`

- Installed Gulp in project _devDependency_:
`$ npm install --save-dev gulp`

- Installed _gulp utilities plugin_ to have a runnable task that vibily shows it executed:
`$ npm install --save-dev gulp-util`

- Created `gulpfile.js` at the project root with empty tasks:
```
const gutil = require('gulp-util');

gulp.task('default', () => {
   return gutil.log('Gulp is running!')
});
```

- Verified `gulpfile.js` operation:
`$ gulp`
(the simple command `gulp` runs the task labeled `default`)

It should return a similar output:
```
[17:39:51] Using gulpfile ~/autoEdit_2/gulpfile.js
[17:39:51] Starting 'default'...
[17:39:51] Gulp is running!
[17:39:51] Finished 'default' after 2 ms
```

### Sass Compiler
From: https://css-tricks.com/gulp-for-beginners/ 
- Installed `gulp-sass` plugin:
`$ npm install gulp-sass --save-dev`

- Added `gulp-sass` as a require in the `gulpfile.js`:
`const sass = require('gulp-sass');`

- Created `sass` task:
```
gulp.task('sass', () => {
  return gulp.src('source-files')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('destination'))
});
```

### Watcher Task Setup
From: https://css-tricks.com/gulp-for-beginners/

_Gulp already provides a_ `watch` _method with has got the following syntax:_
```
// Gulp watch syntax
gulp.watch('files-to-watch', ['tasks', 'to', 'run']); 
```

- Created `watch` task:
```
gulp.task('watch', () => {
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Other watchers
})
```

### Run Sequence
From: https://css-tricks.com/gulp-for-beginners/

- In order to run multiple Gulp tasks in the right order, so that it will avoid errors `run-sequence` is needed: 
`$ npm install run-sequence --save-dev`

`run-sequence` has got the following syntax:

```
var runSequence = require('run-sequence');

gulp.task('task-name', function(callback) {
  runSequence('task-one', 'task-two', 'task-three', callback);
});
```

When task-name is called, Gulp will run `task-one` first. When `task-one` finishes, Gulp will automatically start `task-two`. Finally, when `task-two` is complete, Gulp will run `task-three`.

Run Sequence also allows you to run tasks simultaneously if you place them in an array:
```
gulp.task('task-name', function(callback) {
  runSequence('task-one', ['tasks','two','run','in','parallel'], 'task-three', callback);
});
```

In this case, Gulp first runs `task-one`. When `task-one` is completed, Gulp runs every task in the second argument simultaneously. All tasks in this second argument must be completed before `task-three` is run.

### ESLinter

- Installed `gulp-eslint` plugin (ESLint does require a few more packages than JSHint):
`$ npm install gulp-eslint --save-dev`

- Added the `require()`ing:
`const eslint = require('gulp-eslint');`

- Created task

### Autoprefixer
Installed `autoprefixer`

### Browserify 
Not yet implemented

### Minification
Not yet implemented on `publish.css`

### Babel
From: https://markgoodyear.com/2015/06/using-es6-with-gulp/

- Installed `$ npm install babel-core babel-preset-es2015 --save-dev`
- Created `.babelrc`:
  ```
  {
    "presets": ["es2015"]
  }
  ```

# How to configure further tasks in Gulp and overview on it

### Overview
Gulp is a streaming build system. It’s streaming nature is what allows it to pipe and pass around the data being manipulated or used by it’s plugins. The plugins are intended to only do one job each, so it’s not uncommon to pass a singular file through multiple plugins.

The gulp api is incredibly light containing 4 top level functions. They are

- `gulp.task`
- `gulp.src`
- `gulp.dest`
- `gulp.watch`

`gulp.task` defines your tasks. Its arguments are name, deps and fn.

Where name is a string, deps is an array of task names, and fn is the function that performs your task. Deps is optional so gulp.task in it’s two forms are:
```
gulp.task('mytask', function() {
  //do stuff
});

gulp.task('dependenttask', ['mytask'], function() {
  //do stuff after 'mytask' is done.
});
```

`gulp.src` points to the files we want to use. It’s parameters are globs and an optional options object. It uses .pipe for chaining it’s output into other plugins.

`gulp.dest` points to the output folder we want to write files to.


`gulp.src` and `gulp.dest` used to simply copy files looks like:
```
gulp.task('copyHtml', function() {
  // copy any html files in source/ to public/
  gulp.src('source/*.html').pipe(gulp.dest('public'));
});
```
(surce: https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js)

### Create a new task
A task with the current gulp configuration is made up of an `index.js` file for the main task and possibily few configuration or utilities files.

To create a new task add a folder with task name in `gulpfile/tasks`.
You can use the following boilerplate as structure for the `index.js` :
```
const gulp = require('gulp');
const paths = require('../../paths');
const path = require('path');

function FUNCTION_NAME(cb) {

  // add code here
  
  cb();
}

gulp.task('TASK_NAME', cb => {
  FUNCTION_NAME(cb);
});
```

Eventually modify `enabledTask.js` by adding the new task label.

## Globbing in Node
Globs are matching patterns for files that allow you to add more than one file into gulp.src. It's like regular expressions, but specifically for file paths.

When you use a glob, the computer checks file names and paths for the specified pattern. If the pattern exists, then a file is matched.

Most workflows with Gulp tend to only require 4 different globbing patterns:

- *.scss: The * pattern is a wildcard that matches any pattern in the current directory. In this case, we’re matching any files ending with .scss in the root folder (project).
- **/*.scss: This is a more extreme version of the * pattern that matches any file ending with .scss in the root folder and any child directories.
- !not-me.scss: The ! indicates that Gulp should exclude the pattern from its matches, which is useful if you had to exclude a file from a matched pattern. In this case, not-me.scss would be excluded from the match.
- *.+(scss|sass): The plus + and parentheses () allows Gulp to match multiple patterns, with different patterns separated by the pipe | character. In this case, Gulp will match any file ending with .scss or .sass in the root folder.

(source: https://css-tricks.com/gulp-for-beginners/)



# The `gulpfile.js` is falling apart
## `/`
### Created `gulpfile.js` folder in the root
The `gulpfile.js` now `require()`s `gulpfile/index.js`.


### Using `gulpfile.js` as `gulpfile.babel.js`
Rename the `gulpfile.js` if transpiling ES6 is needed (babel will automatically kick in).

### Created `paths.js` for files paths 
##### (installed `path` through `npm install path --save-dev` [not sure whether this is needed])

The `path` module contains all the path variables and provides the following paths combination:
```
===== PATHS CONFIGURATION OUTPUT =====
frontendBaseDir 
designPackage 
gulp 

----- SASS SRCS -----
sass 
sassCommon 
sassCommonFiles 
sassPublishFiles 
targetPublishCss 
targetPublishCssFiles 
targetPublishCssFilesForPostProccessing 

----- JS SRCS -----
src 
libJS 
nwjsJS 
allJSFiles 
jsPublishEntry 
jsPublishFiles
target 
targetArtifacts 
targetJSComponents 
targetPublish 
===========================
```




### Created `enabledTasks.js` to activate/deactivated tasks 
**Requires** `underscore`

This module provides the groups of tasks that must be exectuted.

The **order of execution** can be established by assigning a task to one of the five groups:
- `all`: all the tasks run at the same time
- `beforeCode`: tasks needed before touching system files (babel ?)
- `code`: tasks needed during development (like watcher, etc...)
- `afterCode`: tasks for post processign
- `delayed`

## `libs/`
### `error.js` 
####(Installed `gulp-notify` for pop-up errors)
Provides pop-ups when a syntax error occurs

### `object.js` 
Utility methods on objects
### `taskHelper.js`
### `time.js`
### `git.js`

## `tasks/`
### `default.js` 
For _default_ task

## `tasks/watch/`
### `index.js`

## `tasks/sass/`
### `index.js`
### `config.js`
### `paths.js`
### `util.js`

## `tasks/eslint/`
### `index.js`
### `paths.js`
### `util.js`

## `tasks/cssconcat/`
### `index.js`
### `paths.js`
### `postcss.config.js`
### `util.js`

#### Further dependencies
- Installed, `css-mqpacker`(for media queries utilities), `gulp-postcss`, `gulp-concat-css`, `gulp-cached`, `susy`, `del`




#### Notes
* [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
* [Gulp Recepies](https://github.com/gulpjs/gulp/tree/master/docs/recipes)
* [Gulp Doc](https://github.com/gulpjs/gulp/blob/master/docs/API.md)
* [Gulp Plugins](http://gulpjs.com/plugins/)
* [Gulp + Browserify: The Everything Post](https://www.viget.com/articles/gulp-browserify-starter-faq)
* [Automate Your Tasks Easily with Gulp.js](https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js)
* [Gulp for beginners](https://css-tricks.com/gulp-for-beginners/)
* [Adding ESLint with Gulp.js](https://davidwalsh.name/gulp-eslint)
* [ESLint using Gulp.js](http://justinchmura.com/2016/06/28/eslint-using-gulp/)
* [Simple Linting using SCSSlint, ESlint, and Gulp in Atom](http://brendan-quinn.xyz/post/simple-linting-using-scsslint-eslint-and-gulp-in-atom/)
* [Using ES6 with gulp](https://markgoodyear.com/2015/06/using-es6-with-gulp/)
* [How can you delete a folder and its contents after all tasks have been run in Gulp?](http://stackoverflow.com/questions/28648312/how-can-you-delete-a-folder-and-its-contents-after-all-tasks-have-been-run-in-gu)
* [Gulp Series Introduction](http://learningwithjb.com/posts/gulp-series-introduction)