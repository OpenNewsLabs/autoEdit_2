
From terminal from root of app, run the  deployment script

```
npm install 
```

Then

```bash
npm run build
```

This creates a folder called `build` where you can find your packaged app. 

before deployment you may want to change the toolabr visible to false. in `package.json`

```json
"toolbar": false,
```

[more info on deploy/packaging of app in nwjs boilerplate project](https://github.com/pietrop/nwjs_boilerplate#deploy)
<!-- use script -->


<!-- 
Need to change the deployment script so that it ignores the 
- build folder 
- cache 
- docs folder 
- Notes
- wttskeys.json 
and any video or audio files. 
 -->