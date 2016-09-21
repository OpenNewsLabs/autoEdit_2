
<!-- here in wiki or in tips tricks and quick fix or both -->
<!-- This article originaly from somewhere else  -->


http://www.panda-os.com/2014/08/basic-ffmpeg-commands/#.Vg6ckWDDUfk

## BASIC FFMPEG COMMANDS 

FFmpeg is an open source command line tool that is able to convert pretty much any video format available. You can use FFmpeg in countless ways. In this post we will review the more basic commands.
First, if you don’t have FFmpeg, you can download it here. An awesome guide to install FFmpeg can be found here.
After you download and install FFmpeg, open your terminal and lets get down to business!

Basic FFmpeg commands:

To convert a video to another format, lets say mpg, you need to type the following:

```
ffmpeg -i originalFile newFile.mpg
```

You can create an audio file from a video:

```
ffmpeg -i video.mov audio.mp3
```

If you wish to reduce your video size, you can reduce the bit-rate of the audio:

```
ffmpeg -i originalFile.xxx b:a 128k newFile.xxx
```

Or reduce the bit-rate of the video:


```
ffmpeg -i originalFile.xxx b:v 1200k newFile.xxx
```

Or do both:

```
ffmpeg -i originalFile.xxx b:a 128k b:v 1200k newFile.xxx
```

Trim your video:

```
ffmpeg -i originalFile.mp4 -ss 10 -t 12 newFile.mp4
```

`-ss` is the start time and `-t` specifies the duration. You can use `-t` o instead of `t`

to specify the end time instead.


Create images from video:

```
ffmpeg -i video.mpg -f image2 output%d.jpg
```

By default it will produce an image from every frame, but you can determine the frame rate by adding the flag -r and the desired frame rate.


Create a gif from video:

```
ffmpeg -i video.avi -ss 10 -t 5 someGif.gif
```

As you can see, this is very similar to the above command.
We already learned how to convert a video, and how to trim a video. All we did here was to combine the two commands.


This is just the tip of the iceberg as FFmpeg has an endless amount of options, but you have to start somewhere, and those basic commands are the most useful commands as well as most commonly used.
Feel free to comment for any questions or suggestions.