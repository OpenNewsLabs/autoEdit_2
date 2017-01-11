# current dbsetup - draft 

https://github.com/Ivshti/linvodb3

has option to use 

>NW.js/Electron friendly - JS-only backend is level-js or Medea

initially tried  [level-js](https://github.com/maxogden/level.js)

>level.js an implementation of the [leveldown](https://github.com/rvagg/node-leveldown) API on top of [IndexedDB](https://developer.mozilla.org/en-US/docs/IndexedDB) (which is in turn implemented on top of [LevelDB](https://code.google.com/p/leveldb/), which brings this whole shebang full circle)

>LevelDOWN was extracted from [LevelUP](https://github.com/level/levelup) and now serves as a stand-alone binding for LevelDB.


However indexDb has a 50mb total file size restriction. This might seem ok at first, but some transcriptions can reach 5mb in size in their json representation. So this would not scale if you add n number of transcription.

Decided to move to medea instead.

the way to set up medea is to use [medeadown](https://github.com/medea/medeadown). [as described in this issue](https://github.com/Ivshti/linvodb3/issues/36)

medeadown is a [leveldown](https://github.com/Level/leveldown)-compatible interface to [medea](https://github.com/medea/medea)


this required installing medeadown separatly 

```
npm install medeadown -save
```

and changing the `LinvoDB` data store to it.

```js
LinvoDB.defaults.store = { db: require("medeadown") };

```

as well as setting up the `dbPath`

```js
LinvoDB.dbPath = window.config.dataPath;
```

In this case using [App.dataPath](http://docs.nwjs.io/en/latest/References/App/#appdatapath) `require('nw.gui').App.dataPath` eg  `"/Users/pietropassarelli/Library/Application Support/autoEdit2"`


and the db would be stored in the folder

```
/Users/pietropassarelli/Library/Application Support/autoEdit2/transcription.db
```

<!-- `window.config.dataPath = require('nw.gui').App.dataPath;` -->