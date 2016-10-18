# Edl Composer

## Usage

The EDL sequence should have the following attributes

```javascript
var edlSq = {
    "title": "Demo Title of project",
    "events":  [
      { "id":0,
        "startTime": 30,
        "endTime": 60,
        "reelName":"SomeReelName",
        "clipName":"Something.mov"
      },
      { "id":2,
        "startTime": 40,
        "endTime": 70,
        "reelName":"SomeOtherReelName",
        "clipName":"SomethingElse.mov"
      }
    ]
}
```

And it can be parsed and composed into an EDL as following. This returns a string that you can write to file or else.

```javascript

var edl = new EDL(edlSq)
console.log(edl.compose())
```


## understandign the EDL specs

Example EDL. For more on how to read an edl and understand the specs [check this out](https://documentation.apple.com/en/finalcutpro/usermanual/index.html#chapter=96%26section=1%26tasks=true).

```
TITLE: TEST PAPEREDIT
FCM: NON-DROP FRAME

001  Card01Ky AA/V  C        00:02:26:21 00:02:30:12 00:00:00:00 00:00:03:16
* FROM CLIP NAME:  KYLE_INTERVIEW.MOV
* COMMENT:
FINAL CUT PRO REEL: Card01_Kyle_Interview REPLACED BY: Card01Ky

002  Card01Ky AA/V  C        00:02:30:12 00:02:34:13 00:00:03:16 00:00:07:17
* FROM CLIP NAME:  KYLE_INTERVIEW.MOV
* COMMENT:
FINAL CUT PRO REEL: Card01_Kyle_Interview REPLACED BY: Card01Ky

003  Card02Je AA/V  C        00:00:26:12 00:00:27:00 00:00:07:17 00:00:08:05
* FROM CLIP NAME:  JEFF_INTERVIEW.MOV
* COMMENT:
FINAL CUT PRO REEL: Card02_Jeff_Interview REPLACED BY: Card02Je

004  Card02Je AA/V  C        00:00:28:22 00:00:32:00 00:00:08:05 00:00:11:08
* FROM CLIP NAME:  JEFF_INTERVIEW.MOV
* COMMENT:
FINAL CUT PRO REEL: Card02_Jeff_Interview REPLACED BY: Card02Je

005  Card01Ky AA/V  C        00:01:08:03 00:01:12:19 00:00:11:08 00:00:15:24
* FROM CLIP NAME:  KYLE_INTERVIEW.MOV
* COMMENT:
FINAL CUT PRO REEL: Card01_Kyle_Interview REPLACED BY: Card01Ky
```


Most important par is that
```
001  Card01Ky AA/V  C        00:02:26:21 00:02:30:12 00:00:00:00 00:00:03:16
```



I refer to the first part as edl head, which contains the title of the project
```
TITLE: {{projectTitle}}
FCM: NON-DROP FRAME
```

This is a edl line event, and group of lines I refer to it as the the edl body.
```
001  Card01Ky AA/V  C        00:02:26:21 00:02:30:12 00:00:00:00 00:00:03:16
* FROM CLIP NAME:  KYLE_INTERVIEW.MOV
* COMMENT:
FINAL CUT PRO REEL: Card01_Kyle_Interview REPLACED BY: Card01Ky
```
it might help to consider what are the variables we need to interpolate

```
{{line event number}}  {{reel name 7 digit abbreviation}} AA/V  C   {{clip in}} {{clip out}} {{tape/timeline in}} {{tape/timeline out}}
* FROM CLIP NAME:  {{clip name}}
* COMMENT:
FINAL CUT PRO REEL: {{reel full name}} REPLACED BY: {reel name 7 digit abbreviation}}
```

We could do more such as change the type of track `AA/V` and the type of cut `C` but since we are doing relativly simple edits we are not interested in this for now.

However let's consider the first line of the EDL event line in more details, because the timecodes part is where it can get confusing to understand what does what. It might be useful to understand a tiny bit of EDL history:

>In the days of linear tape editing, EDLs were used to save and restore the timecode information for each edit performed on a computer-controlled editing system. Because timecode editing systems were expensive, many editors would perform offline edits with window dubs (low-quality copies of original footage with timecode visually superimposed, or burned, directly onto the
image) and then create an EDL by hand for delivery to a computer-controlled editing system for the online edit.



- `001` line number  
- `Card01Ky`
- `AA/V` type of line event. audio and video in this case
- `C` type of edit, cut in this case, but could also be dissolve, however that would require two tracks in the same line
-  clip in poin     `00:02:26:21`
- clip out point `00:02:30:12`
- tape/timeline in point, starts with zero `00:00:00:00`  on first line event, then is the timeline out point of the previous line event
- tape/timeline out point is duration of the clip(clip out point - clip in point) + tape/timeline in point of this line event. `00:00:03:16`

What this means is that you have timecodes relative to the clip of the edl event line, in and out point, and then you have timecodes relative to the timeline of the sequence the edl is describing(that back in the day used to be referred to as tape).

![](https://documentation.apple.com/en/finalcutpro/usermanual/Art/S03/S0323_ImportEDL3.png)
