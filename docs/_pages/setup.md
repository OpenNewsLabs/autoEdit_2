---
layout: page
title: "Setup: STT APIs"
category: user_manual
date: 2016-09-07 16:04:16
---

There are two options for speech to text APIs that you can use with this system.
One is the IBM Watson STT and the Other is the Gentle STT.

### Overview 

#### IBM Watson STT Service

Pros: 

- 16 hours a month included in service
- 0.02 cent a minute after that [see pricing]()
- generally pretty accurate (my opinion, judge for yourself)
- supports a number of languages [see here]() including distiction between british and american english <!-- link -->

Cons: 

- Need to provide card details for pay as you go fee. 
- is in the cloud so no offline support.

#### Gentle Open Source STT

Pros:

- Free as in free speech as well as in free beer. 
- working locally on your machine. no internet connection needed
- because of that, good for sensitive material.
- Open source [github repo]() and [I made a node module to work with the API](https://github.com/OpenNewsLabs/gentle_stt_node).

Cons: 

- Not as accurate as IBM one (in my opinion, but decide for yourself). 
- Only support english STT.
- At the moment not as fast as IBM one. 

### Setup 

#### IBM Bluemix Speech To Text API Keys

For a tutorial on how to get IBM Bluemix API keys for the Speech to Text service follow this link [link]()

<!-- find link -->

When you first launch the app by double clicking on it a prompt asks for IBM Watson username and password API keys, these are then stored inside the app. 

<!-- Keyboard shortcut to reset them? -->


#### Gentle STT, Open Source + Free 


##### first time setup 

Frist time you launch this version of the app it will download the ...

##### launching local server 

click etc..

<!-- See node module readme insturcitons for how to launch server  https://github.com/OpenNewsLabs/gentle_stt_node -->