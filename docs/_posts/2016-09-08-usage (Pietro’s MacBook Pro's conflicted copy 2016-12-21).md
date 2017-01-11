---
layout: page
title: "User Manual "
category: user_manual
date: 2016-09-08 17:07:45
---


<!-- TOC -->

<!-- Overview Giff -->


If first time using the tool go ahead and [setup the STT API system first]({{site.baseurl}}/user_manual/setup.html).

### 1. Adding a video/audio

1. Click on `new`
2. Chose the media you want to open, audio or video.
3. Fill in title and description 
4. Chose Speech To Text system you want to use (IBM American English is the default)
5. `Save Transcription`

<img src="{{ site.baseurl }}/img/gif/1_getting_started.gif" class="sixtypercent" alt="Getting started adding media">

<!-- if you using Gentle STT for offline transcription seee setup STT API for Gentle []()-->


[For a list of supported media file type see ffmpeg(which is what has been used for the file conversion under the hood)](https://ffmpeg.org/general.html#Supported-File-Formats_002c-Codecs-or-Features)


---

The transcription will take a round **5 minutes** to process regardless of the length of the media.

<img src="{{ site.baseurl }}/img/gif/2_processing_transcription.gif" class="sixtypercent" alt="processing transcription">

---

### 2. Selecting text from a transcription 

Make selections of text you'd like to include in your video sequence.

<img src="{{ site.baseurl }}/img/gif/3_transcription.gif" class="sixtypercent" alt="Transcription">

---

<!-- gif  -->

###	3. Exporting a video sequence(EDL)

Export an EDL, which is an [Edit decision list](https://en.wikipedia.org/wiki/Edit_decision_list){:target="_blank"}.

<img src="{{ site.baseurl }}/img/gif/4_export.gif" class="sixtypercent" alt="Transcription">


You can export a video sequence of selection as they appear chronologically in the video. 
Or you can export them in the order you selected them, getting you closer to make a paper edit.

---

<!-- gif  -->

### 4. Reconnect in video editing software of choice 


EDL is compatible with all major editing software. 

- Adobe Premiere
- Avid Media Composer 
- Final Cut Pro 7 
- And any other editing software that lets you import an EDL file...

To import the EDL and reconnect the sequence

1. Import the EDL
2. Go to the sequence
3. Reconnect the offline sequence
4. Continue your editing



#### Adobe Premiere example

<img src="{{ site.baseurl }}/img/gif/5_EDL_in_premiere.gif" class="sixtypercent" alt="processing transcription">

More info on 

- [Importing EDL in Premiere Pro](https://helpx.adobe.com/premiere-pro/using/importing-sequences-clip-lists-libraries.html#import_cmx3600_edl_projects)
- [How to relink offline media here](https://helpx.adobe.com/premiere-pro/using/relinking-media.html).



**Note:** When you are reconnecting the offline sequence in premiere. Select all of segments in the sequence (cmd + a) then do right click and chose link media. This saves you from having to reconnect them one at a time.

<!-- ---

[Adobe EDL import]()

#### Avid Media Composer

click click ...

[Avid EDL import]()

---

#### Final cut pro 7 

[Final Cut Pro 7 EDL import]()

---
 -->

**a Note on working with Final cut pro X**       
For now a workaround for Final cut pro X not supporting EDL is that you can open the  EDL in [Davinci resolve](https://www.blackmagicdesign.com/products/davinciresolve) convert it to XML that will work with final cut X.

---

<!-- To be tried out -->