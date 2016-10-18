# Gentle STT Node module 

A gentle STT module to  connect to localhost version of gentle to be able to do offline transcriptions. For when the internet is too slow to use IBM, or when the material is too sensitive to be shared.


## Implementation 

### gentle stt

converts this curl comand in a node post `request`

```
curl -F "audio=@norman_door_trimmed2.mp4.wav"  "http://localhost:8765/transcriptions?async=false"
```

in Curl `-F` is a multipart form, from curl help.

```
 -F, --form CONTENT  Specify HTTP multipart POST data (H)
     --form-string STRING  Specify HTTP multipart POST data (H)
     --ftp-account DATA  Account data string (F)
     --ftp-alternative-to-user COMMAND  String to replace "USER [name]" (F)
     --ftp-create-dirs  Create the remote dirs if not present (F)
     --ftp-method [MULTICWD/NOCWD/SINGLECWD]  Control CWD usage (F)
     --ftp-pasv      Use PASV/EPSV instead of PORT (F)
```

### parser

`parse_gentle_stt` is a module that converts gentle json to an array of words. 

 ```javascript
 [
    {
      "id": 0,
      "text": "good",
      "startTime": 0.1,
      "endTime": 0.29
    },
   ...
]
```

For an example of gentle json to see what it look like before parsing check out `/example/allign.json`



## Usage 

### Download gentle dmg 

1. Download [Gentle version 0.9.1](https://github.com/lowerquality/gentle/releases/tag/0.9.1) about `104mb`

2. start the Gentle app

3. click `Enable full transcription`, this will dowload the language model comonent to be able to work offline.

![enable_full_transcription](/img/enable_full_transcription.png)

4. restart the app

5. the Gentle server is now up and running. 

Future times, you just need to launch gentle anche check local host is working

###  use the node module 


#### Example 

```javascript
var  transcribe =  require("./index.js")

//takes in fiel as absolute path, use node module `path` if you need to figure out out.
var demo_audio  ="#yourFile.wav";
var demo_text = "./demo.txt"


transcribe({audio: demo_audio, text: demo_text}, function(resp){
  console.log(JSON.stringify(resp, null, '\t'))
  // console.log(resp)
})

```

Where the text attribute is optional. If you pass it through it will re-allign the text to the video. 
If you don't pass it then it will transcribe the video automatically.


## TODO

add usefull error message if server(gentle) is offline


response if server is offline is 

```
{ [Error: connect ECONNREFUSED 127.0.0.1:8765]
  code: 'ECONNREFUSED',
  errno: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 8765 }
```

## Contributors

Initially developed at Hacks/Hackers Buenos Aires Media Party 2016

- [Pietro Passarelli](http://github.com/pietrop)
- [Martin Shelton](http://github.com/martinshelton)
- [Dan Zajdband](http://github.com/impronunciable)
