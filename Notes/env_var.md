# Env variables

<!-- not in use  -->

using [dotenv](https://github.com/motdotla/dotenv) library, as exmplained in their README.


set the var in `.env` file

```
FFMPEG=="/backEnd_node/interactive_transcription_generator/bin/ffmpeg"
FFPROBE="/backEnd_node/interactive_transcription_generator/bin/ffprobe"
TMP_MEDIA="/tmp_media"
MEDIA="/media"
```


in `index.html` right after establishing that we are in node nwjs mode load them up using 


```node
require('dotenv').config()
```

in node code call them up like so  

```node
process.env.MEDIA
```