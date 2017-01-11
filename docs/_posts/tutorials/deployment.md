
From terminal from root of app, run the  deployment script

```
npm install 
```

Then

```bash
npm run build
```

It creates a `cache` and a `build` folder. `cache` is a folder used by deploy to keep the latest version needed to build and package the app, to avoid having to re-download it every time.  While the packaged app ready for use can be found in the `build` folder.

Deployment script originally from [`nwjs_boilerplate`](https://github.com/pietrop/nwjs_boilerplate#deploy).

to package the app as a `dmg` for distribution on os x. 

```
npm run make_dmg
```

which uses [`appdmg`](https://www.npmjs.com/package/appdmg) to put the app from the build folder inside a `dmg` and save it on the `~/Desktop`.

Preferences for `appdmg` script are in `/appdmg.json`.
